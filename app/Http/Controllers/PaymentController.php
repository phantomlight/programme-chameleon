<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Paypal;

class PaymentController extends Controller {

	private $paymentType = [
	'1'	=>	[
		'name'		=>	'6 Months Contract',
		'description'	=>	'A six months contract for company on Programme Chameleon.',
		'amount'	=>	250,
		'type'		=>	'contract',
		'successMessage'	=>	'Your account company contract for 6 months has been renewed',
	],
	'2'	=>	[
		'name'		=>	' credit(s) on Programme Chameleon',
		'description'	=>	'Buy company credits to use on programmechameleon.com',
		'amount'	=>	10,
		'type'		=>	'credit',
		'successMessage'	=>	'You have successfully buy ',
		],
	];

	private $paypalApiContext;

	public function __construct() {
		$data = \Site::getDataByKey('price.vip');
		$this->paymentType['1']['amount']	=	(float) $data->description;

		$data = \Site::getDataByKey('price.credit');
		$this->paymentType['2']['amount']	=	(float) $data->description;

		$this->paypalApiContext = PayPal::ApiContext(
			config('services.paypal.client_id'),
			config('services.paypal.secret')
		);

		if (env('APP_ENV') === 'local') {
			$endPoint = 'https://api.sandbox.paypal.com';
		}
		else if (env('APP_ENV') === 'production') {
			$endPoint = 'https://api.paypal.com';
		}

		$this->paypalApiContext->setConfig([
			'mode' => 'sandbox',
			'service.EndPoint' => $endPoint,
			'http.ConnectionTimeOut' => 30,
			'log.LogEnabled' => true,
			'log.FileName' => storage_path('logs/paypal.log'),
			'log.LogLevel' => 'FINE',
		]);	
	}

	public function postProcessPayment() {
		$index = \Input::get('value');
		$user = \Input::get('user');

		if ($user !== 'company' && $user !== 'agency') {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'User not recognized',
			]);
		}

		if ( ! array_key_exists($index, $this->paymentType)) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Payment not recognized',
			]);
		}

		$paymentData = $this->paymentType[$index];

		if ($index === '2') {
			$xAmount = \Input::get('amount');
			if ($xAmount <= 0) {
				return \Response::json([
					'type'		=>	'danger',
					'message'	=>	'Minimum of amount of credit to be bought is 1.',
				]);
			}
			$paymentData['name'] = $xAmount . ' company credit(s) on Programme Chameleon.';
			$paymentData['xCreditAmount'] = $xAmount;
			$paymentData['successMessage'] .= $xAmount . ' credit(s)';
		}

		session(['_temp_payment_sess' => $paymentData]);
		$total = isset($xAmount) ? $xAmount * $paymentData['amount'] : $paymentData['amount'];

		try {
			$payer = PayPal::Payer();
			$payer->setPaymentMethod('paypal');

			$amount = PayPal::Amount();
			$amount->setCurrency('GBP');
			$amount->setTotal($total + (0.2*$total));

			$item = PayPal::Item();
			$item->setName($paymentData['name'])
						->setDescription($paymentData['description'])
						->setCurrency('GBP')
						->setQuantity(isset($xAmount) ? $xAmount : 1)
						->setTax(0)
						->setPrice($paymentData['amount']);

			$tax = PayPal::Item();
			$tax->setName('VAT TAX')
						->setDescription('20% VAT Tax')
						->setCurrency('GBP')
						->setQuantity(1)
						->setTax(0)
						->setPrice(0.2*$total);

			$itemList = PayPal::ItemList();
			$itemList->setItems([$item, $tax]);

			$transaction = PayPal::Transaction();
			$transaction->setAmount($amount);
			$transaction->setItemList($itemList);
			$transaction->setDescription('Transaction for programmechameleon.com website.');

			$redirectUrls = PayPal::RedirectUrls();
			if ($user === 'company') {
				$redirectUrls->setReturnUrl(action('PaymentController@getCompanyPaymentDone'));
				$redirectUrls->setCancelUrl(action('PaymentController@getCompanyPaymentCancel'));
			}
			else if ($user === 'agency') {
				$redirectUrls->setReturnUrl(action('PaymentController@getAgencyPaymentDone'));
				$redirectUrls->setCancelUrl(action('PaymentController@getAgencyPaymentCancel'));
			}

			$payment = PayPal::Payment();
			$payment->setIntent('sale');
			$payment->setPayer($payer);
			$payment->setRedirectUrls($redirectUrls);
			$payment->setTransactions(array($transaction));

			$response = $payment->create($this->paypalApiContext);
			$redirectUrl = $response->links[1]->href;

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Paypal init success',
				'redirect'	=>	$redirectUrl,
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=> 'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function getCompanyPaymentDone(Request $request) {
		if ( ! \Session::has('_temp_payment_sess')) {
			return redirect(url('company'))->with('flashMessage', [
				'class'		=>	'danger',
				'message'	=>	'Your session has expired, please try again.',
			]);
		}

		$data = session('_temp_payment_sess');

		$id = $request->get('paymentId');
		$token = $request->get('token');
		$payer_id = $request->get('PayerID');
		$payment = PayPal::getById($id, $this->paypalApiContext);
		$paymentExecution = PayPal::PaymentExecution();
		$paymentExecution->setPayerId($payer_id);
		$executePayment = $payment->execute($paymentExecution, $this->paypalApiContext);

		$company = \Company::getCompany();

		try {
			switch ($data['type']) {
				case 'credit':
				\Company::updateCredit($company, $data['xCreditAmount']);
				break;

				case 'contract':
				\Company::updateVIP($company, true);
				break;

				default:
				break;
			}
			session(['_sess_company' => ['model'=> $company]]);
			\Session::forget('_temp_payment_sess');
		}
		catch (\Exception $e) {
			// TODO: Need better error handler
			// re-run try with queue?
			\Session::forget('_temp_payment_sess');

			return redirect(url('company'))->with('flashMessage', [
				'class'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}

		return redirect(url('company'))->with('flashMessage', [
			'class'		=>	'success',
			'message'	=>	$data['successMessage'],
			]);
	}

	public function getCompanyPaymentCancel(Request $request) {
		\Session::forget('_temp_payment_sess');

		return redirect($data['redirect'])->with('flashMessage', [
			'class'		=>	'info',
			'message'	=>	'You have cancelled your last payment',
		]);
	}

	public function getAgencyPaymentDone(Request $request) {
		if ( ! \Session::has('_temp_payment_sess')) {
			return redirect(url('agency'))->with('flashMessage', [
				'class'		=>	'danger',
				'message'	=>	'Your session has expired, please try again.',
			]);
		}

		$data = session('_temp_payment_sess');

		$id = $request->get('paymentId');
		$token = $request->get('token');
		$payer_id = $request->get('PayerID');
		$payment = PayPal::getById($id, $this->paypalApiContext);
		$paymentExecution = PayPal::PaymentExecution();
		$paymentExecution->setPayerId($payer_id);
		$executePayment = $payment->execute($paymentExecution, $this->paypalApiContext);

		$agency = \Agency::getAgency();

		try {
			switch ($data['type']) {
				case 'credit':
				\Agency::updateCredit($agency, $data['xCreditAmount']);
				break;

				case 'contract':
				\Agency::updateVIP($agency, true);
				break;

				default:
				break;
			}
			session(['_sess_agency' => ['model'=> $agency]]);
			\Session::forget('_temp_payment_sess');
		}
		catch (\Exception $e) {
			// TODO: Need better error handler
			// re-run try with queue?
			\Session::forget('_temp_payment_sess');

			return redirect(url('agency'))->with('flashMessage', [
				'class'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}

		return redirect(url('agency'))->with('flashMessage', [
			'class'		=>	'success',
			'message'	=>	$data['successMessage'],
		]);
	}

	public function getAgencyPaymentCancel(Request $request) {
		\Session::forget('_temp_payment_sess');

		return redirect($data['redirect'])->with('flashMessage', [
			'class'		=>	'info',
			'message'	=>	'You have cancelled your last payment',
		]);
	}

}