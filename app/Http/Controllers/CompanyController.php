<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use App\Utils\Hash;
use App\Utils\Hashing\JCryption;

class CompanyController extends Controller {

	public function __construct() {
		$this->middleware('company', ['except' => ['getRegister', 'postRegister', 'getPublicProfilePage']]);
	}

	public function getIndex() {
		return view('front.company.index');
	}

	public function getAccount() {
		return view('front.company.account');
	}

	public function getPublicProfilePage($id, $slug) {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		$company = \Company::findCompanyById($_hash->decode($id));

		if ( ! $company) {
			return abort(404);
		}
		
		return view('front.company.publicProfile')->with('model', $company);
	}

	public function getRegister() {
		return view('front.company.register');
	}

	public function getPostJob() {
		return view('front.company.job.add');
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

	public function getEditJob() {
		$company = \Company::getCompany();

		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		$job = \Job::findJobById($_hash->decode(\Input::get('i')));

		if ( ! $job) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'Job does not exists.']);
		}

		if ($job->company_id !== $company->id) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'You cannot edit this job.']);
		}

		return view('front.company.job.edit')->with('job', $job);
	}

	public function getJobApplication() {
		$company = \Company::getCompany();
		
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		$job = \Job::findJobById($_hash->decode(\Input::get('i')));

		if ( ! $job) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'Job does not exists.']);
		}

		if ($job->company_id !== $company->id) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'You cannot edit this job.']);
		}

		return view('front.company.job.application')->with('job', $job);
	}

	public function getJobDetails() {
		$company = \Company::getCompany();
		
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		$job = \Job::findJobById($_hash->decode(\Input::get('i')));

		if ( ! $job) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'Job does not exists.']);
		}

		if ($job->company_id !== $company->id) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'You cannot edit this job.']);
		}

		return view('front.company.job.detail')->with('job', $job);
	}

	public function postUpdateAccount() {
		$data = \Input::get('data');

		try {
			$company = \Company::updateData($data);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Data updated successfully.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Something went wrong, please contact webmaster',
			]);
		}
	}

	public function postAddAffiliate() {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$id = $_hash->decode(trim(\Input::get('id')));
		if ( ! $agency = \Agency::findAgencyById($id)) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Agency not found.'
			]);
		}

		try {
			$affiliate = \Company::addAffiliate($agency);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Affiliate "' . $agency->name . '" added.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postRemoveAffiliate() {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$id = $_hash->decode(trim(\Input::get('id')));
		if ( ! $agency = \Agency::findAgencyById($id)) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Agency not found.'
			]);
		}

		try {
			$affiliate = \Company::removeAffiliate($agency);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Affiliate "' . $agency->name . '" removed.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postRemoveVip() {
		if ( ! $company = \Company::getCompany()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'You are not in company account.',
			]);
		}

		if ( ! $company->is_vip) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'You are not in VIP account',
			]);
		}

		try {
			$company = \Company::removeVip($company);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'VIP status removed',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postUpdateNotif() {
		if ( ! $company = \Company::getCompany()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not a company account',
			]);
		}

		try {
			$notification = \Company::updateNotification(trim(\Input::get('id')), $company, ['has_read' => 1]);

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
		if ( ! $company = \Company::getCompany()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not a company account',
			]);
		}

		$company->notifications()->where('has_read', 1)->delete();

		return \Response::json([
			'type'		=>	'success',
			'message'	=>	'Notification marked "read" removed successfully',
		]);
	}

	public function postAcceptTimesheet() {
		if ( ! $company = \Company::getCompany()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not a company account',
			]);
		}

		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$id = $_hash->decode(trim(\Input::get('id')));

		try {
			$model = \Company::updateTimesheetStatus($id, $company, true);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Timesheet accepted, page will reload',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postRemoveTimesheet() {
		if ( ! $company = \Company::getCompany()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not a company account',
			]);
		}

		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$id = $_hash->decode(trim(\Input::get('id')));

		try {
			$model = \Company::updateTimesheetStatus($id, $company, false);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Timesheet de-authorized, page will reload',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postAcceptExpense() {
		if ( ! $company = \Company::getCompany()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not a company account',
			]);
		}

		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$id = $_hash->decode(trim(\Input::get('id')));

		try {
			$model = \Company::updateExpenseStatus($id, $company, true);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Expense accepted, page will reload',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postRemoveExpense() {
		if ( ! $company = \Company::getCompany()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not a company account',
			]);
		}

		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$id = $_hash->decode(trim(\Input::get('id')));

		try {
			$model = \Company::updateExpenseStatus($id, $company, false);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Expense de-authorized, page will reload',
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