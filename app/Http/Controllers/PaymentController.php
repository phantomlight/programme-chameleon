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
		$this->paypalApiContext = PayPal::ApiContext(
			config('services.paypal.client_id'),
			config('services.paypal.secret')
		);

		$this->paypalApiContext->setConfig([
			'mode' => 'sandbox',
			'service.EndPoint' => 'https://api.sandbox.paypal.com',
			'http.ConnectionTimeOut' => 30,
			'log.LogEnabled' => true,
			'log.FileName' => storage_path('logs/paypal.log'),
			'log.LogLevel' => 'FINE',
		]);	
	}

	public function postProcessPayment() {
		$index = \Input::get('value');

		if ( ! array_key_exists($index, $this->paymentType)) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Payment not recognized!',
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
			$amount->setCurrency('EUR');
			$amount->setTotal($total);

			$item = PayPal::Item();
			$item->setName($paymentData['name'])
						->setDescription($paymentData['description'])
						->setCurrency('EUR')
						->setQuantity(isset($xAmount) ? $xAmount : 1)
						->setTax(0)
						->setPrice($paymentData['amount']);

			$itemList = PayPal::ItemList();
			$itemList->setItems([$item]);

			$transaction = PayPal::Transaction();
			$transaction->setAmount($amount);
			$transaction->setItemList($itemList);
			$transaction->setDescription('Transaction for programmechameleon.com website.');

			$redirectUrls = PayPal::RedirectUrls();
			$redirectUrls->setReturnUrl(action('PaymentController@getCompanyPaymentDone'));
			$redirectUrls->setCancelUrl(action('PaymentController@getCompanyPaymentCancel'));

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

}