<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Http\Controllers\Controller;
use App\Jobs\EmailJob;
use App\Utils\Hashing\JCryption;
use App\Utils\Location;
use App\Utils\Hash;
use PayPal;

class SiteController extends Controller {

	public function home() {
		// return redirect('home')->with('flashMessage', ['class' => 'danger', 'message' => 'Test Error Message']);
		return view('index');
	}

	public function getCountryList() {
		try {
			$loc = new Location;
			return $loc->getAllCountries();
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
				]);
		}
	}

	public function getCityList() {
		try {
			$loc = new Location;
			return $loc->getCityByCountry(\Input::get('value'));
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
				]);
		}
	}

	public function getPublicKey() {
		try {
			$jCryption = new JCryption();
			return $jCryption->getPublicKey();
		}
		catch (\Exception $e) {
			return env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.';
		}
	}

	public function getHandshakeKey() {
		try {
			$jCryption = new JCryption();
			return $jCryption->handshake();
		}
		catch (\Exception $e) {
			return env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.';
		}
	}

	public function getLogin() {
		if (\User::check()) { 
			return redirect()->back()->with('flashMessage', [
				'class' 	=> 'info',
				'message' => 'Already logged in. Please log out first to login again.',
				]);
		}
		return view('front.login'); 
	}

	public function postLogin() {
		try {
			$jCryption = new JCryption();
			$data = json_decode(\Input::get('data'), true);
			parse_str($jCryption->decrypt(session('jkey'), $data), $output);

			$remember = isset($output['rememberme']) ? true : false;
			$user = \User::authenticate(['email'=>$output['email'], 'password'=>$output['password']], $remember);

			if ($user->hasAccess('admin')) {
				$user->logout();
				throw new \Exception("Your account cannot be authenthicate this panel.", 1);
				return;
			}

			$redirect = null;

			if ($user->hasAccess('contractor')) {
				$redirect = url('contractor');
				session(['_sess_contractor' => ['model' => $user->contractor]]);
			}
			else if ($user->hasAccess('company')) {
				$redirect = url('company');
				session(['_sess_company' => ['model' => $user->company]]);
			}
			else if ($user->hasAccess('agency')) {
				$redirect = url('agency');
				session(['_sess_agency' => ['model'=> $user->agency]]);
			}

			if (is_null($redirect)) {
				$user->logout();
				throw new \Exception("Your account cannot be authenthicate this panel.", 1);
				return;
			}

			return \Response::json([
				'type'			=>	'success',
				'message'		=>	'Login success, redirecting..',
				'redirect'	=>	$redirect,
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function getLogout(Request $req) {
		if (\User::check()) {
			\User::logout();
			$req->session()->flush();
		}

		return redirect()->to('/')->with('flashMessage', [
			'class' 	=> 'success',
			'message' => 'Logged out successfully.',
		]);
	}

	public function jobSearch() {
		return view('front.jobSearch');
	}

	public function getResumeSearch() {
		return view('front.resumeSearch');
	}

	public function postMessage(Request $req) {
		if ($req->cookie('MsgCookie')) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Your 1 hour limit still exists.',
			]);
		}

		if ( ! $data = \Input::get('data')) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Data incomplete.',
			]);
		}

		if ( ! isset($data['email']) && ! isset($data['name']) && ! isset($data['message'])) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Data incomplete.',
			]);
		}

		$mailData = [
			'layout'	=>	'emails.message',
			'data'		=>	[
				'data'	=>	$data,
			],
			'subject'	=>	'Message from user',
			'from_email'	=>	$data['email'],
			'to_email'	=>	'forddyce92@gmail.com',
		];

		if (env('APP_ENV') === 'production') {
			$job = (new EmailJob($mailData))->onQueue('email-queue');
			$this->dispatch($job);
		}
		else { // for devs only
			\Mail::send($mailData['layout'], $mailData['data'], function ($message) use ($mailData) {
				$message->from($mailData['from_email'], 'Programme Chameleon Mailing Service');
				$message->to($mailData['to_email'])->subject($mailData['subject']);
			});
		}

		return \Response::json([
			'type'		=>	'success',
			'message'	=>	'Your message has been sent, you cannot send another until 1 hour passes',
		])->withCookie(cookie('MsgCookie', true, 60));
	}

	public function forgotPassword() {
		$data = \Input::get('data');

		try {
			$user = \User::findUserByLogin($data['email']);

			if ($user->hasAccess('admin')) { // should never happen, just in case
				return \Response::json([
					'type'		=>	'danger',
					'message'	=>	'You cannot reset this account password',
				]);
			}

			$mailData = [
				'layout'	=>	'emails.resetPassword',
				'data'		=>	[
					'user'	=>	$user,
				],
				'subject'	=>	'Reset Password Programme Chameleon',
				'from_email'	=>	'noreply@programmechameleon.com',
				'to_email'	=>	$user->email,
			];

			if (env('APP_ENV') === 'production') {
				$job = (new EmailJob($mailData))->onQueue('email-queue');
				$this->dispatch($job);
			}
			else { // for devs only
				\Mail::send($mailData['layout'], $mailData['data'], function ($message) use ($mailData) {
					$message->from($mailData['from_email'], 'Programme Chameleon Mailing Service');
					$message->to($mailData['to_email'])->subject($mailData['subject']);
				});
			}

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Your password reset instruction has been sent to "' . $user->email . '"',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function getResetPassword() {
		return view('front.resetPassword');
	}

	public function postResetPassword() {
		if ( ! $data = \Input::get('data')) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Email and reset code not found.',
			]);
		}

		try {
			$user = \User::findUserByLogin($data['e']);
			if ($user->hasAccess('admin')) {
				throw new \Exception("Account not elligible to reset from here.", 1);
				return;
			}

			$user->attemptResetPassword($data['c'], $data['password']);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Successfully reset password. You can login <a href="' . route('front.login') . '">here</a>',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function getJobListingFrame($id, $type) {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		switch ($type) {
			case 'company':
				if ( ! $company = \Company::findCompanyById($_hash->decode($id))) {
					return view('frame.job')->with('flashMessage', [
						'class'		=>	'danger',
						'message'	=>	'Company not found.',
					]);
				}

				if ( ! $jobs = $company->jobs()->get()) {
					return view('frame.job')->with('flashMessage', [
						'class'		=>	'danger',
						'message'	=>	'Jobs not found.',
					]);
				}

				return view('frame.job')->with('jobs', $jobs);
				break;

			case 'agency':
				if ( ! $agency = \Agency::findAgencyById($_hash->decode($id))) {
					return view('frame.job')->with('flashMessage', [
						'class'		=>	'danger',
						'message'	=>	'Agency not found.',
					]);
				}

				if ( ! $jobs = $agency->jobs()->get()) {
					return view('frame.job')->with('flashMessage', [
						'class'		=>	'danger',
						'message'	=>	'Jobs not found.',
					]);
				}

				return view('frame.job')->with('jobs', $jobs);
				break;
			
			default:
				return view('frame.job')->with('flashMessage', [
					'class'		=>	'danger',
					'message'	=>	'Type is incorrectly defined.',
				]);
				break;
		}
	}

}