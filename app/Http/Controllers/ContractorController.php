<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use App\Utils\Hashing\JCryption;
use App\Utils\Hash;

class ContractorController extends Controller {

	public function __construct() {
		$this->middleware('contractor', ['except' => [
			'getRegister',
			'postRegister',
			'getPublicProfilePage',
		]]);
	}

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

	public function getPublicProfilePage($id, $slug) {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		$contractor = \Contractor::findContractorById($_hash->decode($id));

		if ( ! $contractor) {
			return abort(404);
		}
		
		return view('front.contractor.publicProfile')->with('contractor', $contractor);
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
		try {
			$data = \Input::get('data');
			$user = \User::getUser();

			if ( ! $user->hasAccess('contractor')) {
				throw new \Exception("Only contractor can update their account information", 1);
				return;
			}

			if ($data['password'] !== '') {
				$code = $user->getResetPasswordCode();
				$user->attemptResetPassword($code, $data['password']);
			}

			$socialData = [
				'facebook'	=> $data['socials_facebook'],
				'twitter'		=> $data['socials_twitter'],
				'linkedin'	=> $data['socials_linkedin'],
			];

			$contractorData = [
				'address'			=>	$data['address'],
				'phone'				=>	$data['phone'],
				'country'			=>	$data['account_country'],
				'city'				=>	$data['account_city'],
				'occupation'	=>	$data['occupation'],
				'skills'			=>	$data['skills'],
				'description'	=>	trim(\Input::get('description')),
				'experiences'	=>	trim(\Input::get('expData')),
				'educations'	=>	trim(\Input::get('eduData')),
				'urls'				=>	trim(\Input::get('urlData')),
				'socials'			=>	json_encode($socialData),
			];

			$contractor = \Contractor::getContractor();
			\Contractor::updateData($contractor, $contractorData);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Your data has been updated successfully',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
			]);
		}
	}

	public function postUpdateResume() {
		try {
			$user = \User::getUser();
			if ( ! $user->hasAccess('contractor')) {
				throw new \Exception("Only contractor can update their account information", 1);
				return;
			}

			$contractor = \Contractor::getContractor();
			// TODO: change to symfony request file input
			\Contractor::updateResume($contractor, $_FILES['file']);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Resume file has been updated.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
			]);
		}
	}

	public function postUpdateAvatar() {
		try {
			$user = \User::getUser();
			if ( ! $user->hasAccess('contractor')) {
				throw new \Exception("Only contractor can update their account information", 1);
				return;
			}
			
			$contractor = \Contractor::getContractor();
			// TODO: change to symfony request file input
			$image = \Contractor::updateAvatar($contractor, $_FILES['file']);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Avatar has been updated.',
				'image'		=>	asset($image->image),
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
			]);
		}
	}

	public function postUpdateSalary() {
		$data = \Input::get('data');

		if ($data['range_salary_min'] >= $data['range_salary_max']) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Minimum value must be smaller or not equal than maximum value',
			]);
		}

		try {
			$contractor = \Contractor::getContractor();
			\Contractor::updateSalary($contractor, $data);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Salary data has been updated',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster',
			]);
		}
	}

	public function postJobAlert() {
		$data = \Input::get('data');

		try {
			$user = \User::getUser();
			if ( ! $user->hasAccess('contractor')) {
				throw new \Exception("Only contractor can update their account information", 1);
				return;
			}
			$contractor = \Contractor::getContractor();
			$model = \Contractor::makeJobAlert($contractor, $data);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Job alert has been created. If you ever need to change, you have to make a new one.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
			]);
		}
	}

}