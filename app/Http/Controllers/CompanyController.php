<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use App\Utils\Hashing\JCryption;

class CompanyController extends Controller {

	public function getIndex() {
		return view('front.company.index');
	}

	public function getRegister() {
		return view('front.company.register');
	}

	public function getPostJob() {
		return view('front.company.jobPost');
	}

	public function getResumeSearch() {
		return view('front.company.resumeSearch');
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

			$group = \User::findGroupByName('Company');

			$user = \User::register([
				'email'			=>	$output['email'],
				'password'	=>	$output['password'],
				'activated'	=>	true,
			]);

			$user->addGroup($group);

			$cData = [
				'user_id'		=>	$user->id,
				'address'		=>	$output['address'],
				'phone'			=>	$output['phone'],
				'name'			=>	$output['company_name'],
				'position'	=>	$output['company_position'],
				'image'			=>	null,
			];

			$company = \Company::register($cData);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Successfully registered. You can login now.',
			]);
		}
		catch (\Exception $e) {
			if (isset($user)) $user->delete();
			if (isset($company)) $company->delete();
			
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
			]);
		}
	}

}