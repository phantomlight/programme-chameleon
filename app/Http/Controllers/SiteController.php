<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Http\Controllers\Controller;
use App\Jobs\EmailJob;
use App\Utils\Hashing\JCryption;
use App\Utils\Location;
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

	public function testSendEmail(Request $req) {
		$data = [
		'layout'	=>	'emails.test',
		'data'		=>	[
		'text'	=>	'This is a test',
		],
		'subject'	=>	'Test Email Queue',
		'from_email'	=>	'noreply@programmechameleon.com',
		'to_email'	=>	'forddyce92@gmail.com',
		];

		$job = (new EmailJob($data))->onQueue('email-queue');
		$this->dispatch($job);
		return 'test!';
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

}