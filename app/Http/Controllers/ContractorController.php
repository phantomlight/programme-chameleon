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

	public function getPublicProfilePage($id, $slug) {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		$contractor = \Contractor::findContractorById($_hash->decode($id));

		if ( ! $contractor) {
			return abort(404);
		}
		
		return view('front.contractor.publicProfile')->with('model', $contractor);
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
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postUpdateAccount() {
		$data = \Input::get('data');
		
		try {
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
				'message'	=>	$e->getMessage(),
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
			\Contractor::makeResume($contractor, $_FILES['file']);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Resume file has been uploaded.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postRemoveResume() {
		try {
			$contractor = \Contractor::getContractor();
			\Contractor::removeResume($contractor, \Input::get('file'));
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Resume file removed',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
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
				'message'	=>	$e->getMessage(),
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
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postCreateJobAlert() {
		$data = \Input::get('data');
		$contractor = \Contractor::getContractor();

		try {
			$alert = \Contractor::makeJobAlert($contractor, $data);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Job alert created successfully.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postRemoveJobAlert() {
		$contractor = \Contractor::getContractor();

		try {
			$alert = \Contractor::removeJobAlert($contractor);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Job alert removed.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function getAddExpense() {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		$job = \Job::findJobById($_hash->decode(\Input::get('i')));

		if ( ! $job) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'That job is no longer exists in our database.']);
		}

		return view('front.contractor.job.expense')->with('job', $job);
	}

	public function getAddTimesheet() {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		$job = \Job::findJobById($_hash->decode(\Input::get('i')));

		if ( ! $job) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'That job is no longer exists in our database.']);
		}

		return view('front.contractor.job.timesheet')->with('job', $job);
	}

	public function postUpdateNotif() {
		if ( ! $contractor = \Contractor::getContractor()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not a contractor account',
			]);
		}

		try {
			$notification = \Contractor::updateNotification(trim(\Input::get('id')), $contractor, ['has_read' => 1]);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Notification updated',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postRemoveNotif() {
		if ( ! $contractor = \Contractor::getContractor()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not a contractor account',
			]);
		}

		$contractor->notifications()->where('has_read', 1)->delete();

		return \Response::json([
			'type'		=>	'success',
			'message'	=>	'Notification marked "read" removed successfully',
		]);
	}

}