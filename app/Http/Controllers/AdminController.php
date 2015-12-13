<?php

namespace App\Http\Controllers;

use App\Utils\Hashing\JCryption;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class AdminController extends Controller {

	public function __construct() {
		$this->middleware('admin', ['except' => ['getLogin', 'postLogin']]);
	}

	public function getLogin() {
		return view('back.login');
	}

	public function getIndex() {
		return view('back.index');
	}

	public function getCms() {
		return view('back.cms');
	}

	public function getJob() {
		return view('back.job');
	}

	public function getContractor() {
		return view('back.contractor');
	}

	public function getCompany() {
		return view('back.company');
	}

	public function getAgency() {
		return view('back.agency');
	}

	public function getResources() {
		return view('back.resources');
	}

	public function getJobIndustry() {
		return view('back.job.industry');
	}

	public function postLogin() {
		try {
			$jCryption = new JCryption();
			$data = json_decode(\Input::get('data'), true);
			parse_str($jCryption->decrypt(session('jkey'), $data), $output);

			$remember = isset($output['rememberme']) ? true : false;
			$user = \User::authenticate(['email'=>$output['email'], 'password'=>$output['password']], $remember);
			if ( ! $user->hasAccess('admin')) {
				$user->logout();
				throw new \Exception("Your account cannot be authenthicated this panel.", 1);
				return;
			}

			return \Response::json([
				'type'			=>	'success',
				'message'		=>	'Login success, redirecting..',
				'redirect'	=>	route('admin.index'),
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

}