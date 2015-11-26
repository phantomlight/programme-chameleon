<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use App\Utils\Hashing\JCryption;

class ContractorController extends Controller {

	public function getRegister() {
		return view('front.contractor.register');
	}

	public function getIndex() {
		return view('front.contractor.index');
	}

	public function getAccount() {
		return view('front.contractor.account');
	}

	public function getCreateJobAlert() {
		return view('front.contractor.createJobAlert');
	}

	public function getSearchJob() {
		return view('front.contractor.searchJob');
	}

	public function getSubmitTimesheet() {
		return view('front.contractor.submitTimesheet');
	}

	public function postRegister() {
		try {
			$jCryption = new JCryption();
			$data = json_decode(\Input::get('data'), true);
			parse_str($jCryption->decrypt(session('jkey'), $data), $output);

			if (!isset($output['terms'])) {
				throw new \Exception("You need to agree to the terms and conditions.", 1);
				return;
			}

			$group = \User::findGroupByName('Contractor');

			$user = \User::register([
				'email'			=>	$output['email'],
				'first_name'	=>	$output['first_name'],
				'last_name'	=>	$output['last_name'],
				'password'	=>	$output['password'],
				'activated'	=>	true,
			]);

			$user->addGroup($group);

			$cData = [
				'user_id'	=>	$user->id,
				'address'	=>	$output['address'],
				'phone'		=>	$output['phone'],
				'image'		=>	null,
			];

			$contractor = \Contractor::register($cData);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Successfully registered. You can login now.',
			]);
		}
		catch (\Exception $e) {
			if (isset($user)) $user->delete();
			if (isset($contractor)) $contractor->delete();
			
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
			]);
		}
	}

	public function postUpdateAccount() {
		var_dump(\Input::get('data'));
	}

}