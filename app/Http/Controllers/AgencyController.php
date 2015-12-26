<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use App\Utils\Hash;
use App\Utils\Hashing\JCryption;

class AgencyController extends Controller {

	public function __construct() {
		$this->middleware('agency', ['except' => ['getRegister', 'postRegister']]);
	}
	
	public function getIndex() {
		return view('front.agency.index');
	}

	public function getPublicProfilePage($id, $slug) {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		$agency = \Agency::findAgencyById($_hash->decode($id));

		if ( ! $agency) {
			return abort(404);
		}
		
		return view('front.agency.publicProfile')->with('model', $agency);
	}

	public function getRegister() {
		return view('front.agency.register');
	}

	public function getAccount() {
		return view('front.agency.account');
	}

	public function getJobAdd() {
		return view('front.agency.job.add');
	}

	public function getJobApplication() {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		$job = \Job::findJobById($_hash->decode(\Input::get('i')));

		if ( ! $job) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'Job does not exists.']);
		}

		$agency = \Agency::getAgency();

		if ($job->agency_id !== $agency->id) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'You cannot edit this job.']);
		}

		return view('front.agency.job.application')->with('job', $job);
	}

	public function getJobEdit() {
		$agency = \Agency::getAgency();

		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		$job = \Job::findJobById($_hash->decode(\Input::get('i')));

		if ( ! $job) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'Job does not exists.']);
		}

		if ($job->agency_id !== $agency->id) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'You cannot edit this job.']);
		}

		return view('front.agency.job.edit')->with('job', $job);
	}

	public function getJobList() {
		return view('front.agency.job.list');
	}

	public function getCompanyList() {
		return view('front.agency.company.list');
	}

	public function postRegister() {
		try {
			$jCryption = new JCryption();
			$data = json_decode(\Input::get('data'), true);
			parse_str($jCryption->decrypt(session('jkey'), $data), $output);

			$group = \User::findGroupByName('Agency');
			$user = \User::register([
				'email'			=>	$output['email'],
				'password'	=>	$output['password'],
				'activated'	=>	true,
			]);

			$user->addGroup($group);

			$aData = [
				'user_id'	=>	$user->id,
				'name'		=>	$output['name'],
				'owner_name'	=>	$output['owner_name'],
				'city'		=>	$output['city'],
				'country'	=>	$output['country'],
				'address'	=>	$output['address'],
				'phone'		=>	$output['phone'],
				'image'		=>	null,
			];

			$agency = \Agency::register($aData);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Successfully registered. You can login <a href="' . route('front.login') . '">here</a>',
			]);
		}
		catch (\Exception $e) {
			if (isset($user)) $user->delete();
			if (isset($agency)) $agency->delete();
			
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
			]);
		}
	}

	public function postUpdateAccount() {
		$data = \Input::get('data');

		try {
			$user = \User::getUser();

			if ( ! $user->hasAccess('agency')) {
				throw new \Exception("Only agency can update their account information", 1);
				return;
			}

			if ($data['password'] !== '') {
				$code = $user->getResetPasswordCode();
				$user->attemptResetPassword($code, $data['password']);
			}

			$agencyData = [
				'address'			=>	$data['address'],
				'phone'				=>	$data['phone'],
				'country'			=>	$data['country'],
				'city'				=>	$data['city'],
			];

			$agency = \Agency::updateData($agencyData);

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

	public function postUpdateAvatar() {
		try {
			$user = \User::getUser();
			if ( ! $user->hasAccess('agency')) {
				throw new \Exception("Only agency can update their account information", 1);
				return;
			}

			$image = \Agency::updateAvatar($_FILES['file']);

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

	public function postAddAffiliate() {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$id = $_hash->decode(trim(\Input::get('id')));
		if ( ! $company = \Company::findCompanyById($id) ) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Company not found'
			]);
		}

		try {
			$affiliate = \Agency::addAffiliate($company);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Affiliate added, please wait for the company to accept',
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
		$id = trim($_hash->decode(\Input::get('id')));
		if ( ! $company = \Company::findCompanyById($id) ) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Company not found'
			]);
		}

		try {
			$affiliate = \Agency::removeAffiliate($company);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Affiliate removed.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postSubmitJob() {
		$data = \Input::get('data');
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		if (!isset($data['company'])) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'You need to post on behalf at least a company.',
			]);
		}
		
		if ( ! $company = \Company::findCompanyById($_hash->decode($data['company']))) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Company not found.',
			]);
		}

		if ( ! $agency = \Agency::getAgency()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not an agency account.',
			]);
		}

		$status = $company->agencies()
			->wherePivot('company_id', $company->id)
			->wherePivot('status', 'accept')
			->first();

		if ( ! $status ) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'You do not have permission from this company to post a job',
			]);
		}

		$data['agency_id'] = $agency->id;
		$data['company_id'] = $company->id;

		if ($data['job_apply_type'] === 'job_apply_by_email') {
			if ($data['job_apply_application_email'] === '' && $data['job_apply_direct_email'] === '') {
				return \Response::json([
					'type'		=>	'warning',
					'message'	=>	'Job application by email is chosen, please input at least one email.',
				]);
			}

			$data['job_apply_details'] = json_encode([
				'type'	=>	'email',
				'application_email'	=>	$data['job_apply_application_email'],
				'direct_email'	=>	$data['job_apply_direct_email'],
			]);
		}
		elseif ($data['job_apply_type'] === 'job_apply_by_url') {
			if ($data['job_apply_url'] === '') {
				return \Response::json([
					'type'		=>	'warning',
					'message'	=>	'Job application by url is chosen, please input the application url.',
				]);
			}

			$data['job_apply_details'] = json_encode([
				'type'	=>	'url',
				'url'		=>	$data['job_apply_url'],
			]);
		}

		try {
			$job = \Job::createJob($data);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Job posted successfully',
			]);
		}
		catch (\Exception $e) {
			if (isset($job)) $job->delete();

			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
			]);
		}
	}

	public function postEditJob() {
		$data = \Input::get('data');
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		if ( ! $job = \Job::findJobById(trim(\Input::get('job')))) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Job not found.',
			]);
		}

		if ( ! $company = \Company::findCompanyById($_hash->decode($data['company']))) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Company not found.',
			]);
		}

		if ( ! $agency = \Agency::getAgency()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not an agency account.',
			]);
		}

		$status = $company->agencies()
			->wherePivot('company_id', $company->id)
			->wherePivot('status', 'accept')
			->first();

		if ( ! $status ) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'You do not have permission from this company to post a job',
			]);
		}

		$data['agency_id'] = $agency->id;
		$data['company_id'] = $company->id;

		if ($data['job_apply_type'] === 'job_apply_by_email') {
			if ($data['job_apply_application_email'] === '' && $data['job_apply_direct_email'] === '') {
				return \Response::json([
					'type'		=>	'warning',
					'message'	=>	'Job application by email is chosen, please input at least one email.',
				]);
			}

			$data['job_apply_details'] = json_encode([
				'type'	=>	'email',
				'application_email'	=>	$data['job_apply_application_email'],
				'direct_email'	=>	$data['job_apply_direct_email'],
			]);
		}
		elseif ($data['job_apply_type'] === 'job_apply_by_url') {
			if ($data['job_apply_url'] === '') {
				return \Response::json([
					'type'		=>	'warning',
					'message'	=>	'Job application by url is chosen, please input the application url.',
				]);
			}

			$data['job_apply_details'] = json_encode([
				'type'	=>	'url',
				'url'		=>	$data['job_apply_url'],
			]);
		}

		try {
			$job = \Job::updateJob($job, $data);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Job posted successfully',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
			]);
		}
	}

	public function postUpdateNotif() {
		if ( ! $agency = \Agency::getAgency()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not an agency account',
			]);
		}

		try {
			$notification = \Agency::updateNotification(trim(\Input::get('id')), $agency, ['has_read' => 1]);

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
		if ( ! $agency = \Agency::getAgency()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not an agency account',
			]);
		}

		$agency->notifications()->where('has_read', 1)->delete();

		return \Response::json([
			'type'		=>	'success',
			'message'	=>	'Notification marked "read" removed successfully',
		]);
	}

	public function postAcceptTimesheet() {
		if ( ! $agency = \Agency::getAgency()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not an agency account',
			]);
		}

		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$id = $_hash->decode(trim(\Input::get('id')));

		try {
			$model = \Agency::updateTimesheetStatus($id, $agency, true);
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
		if ( ! $agency = \Agency::getAgency()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not an agency account',
			]);
		}

		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$id = $_hash->decode(trim(\Input::get('id')));

		try {
			$model = \Agency::updateTimesheetStatus($id, $agency, false);
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
		if ( ! $agency = \Agency::getAgency()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not an agency account',
			]);
		}

		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$id = $_hash->decode(trim(\Input::get('id')));

		try {
			$model = \Agency::updateExpenseStatus($id, $agency, true);
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
		if ( ! $agency = \Agency::getAgency()) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Not an agency account',
			]);
		}

		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$id = $_hash->decode(trim(\Input::get('id')));

		try {
			$model = \Agency::updateExpenseStatus($id, $agency, false);
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

	public function getJobDetails() {
		$agency = \Agency::getAgency();
		
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		$job = \Job::findJobById($_hash->decode(\Input::get('i')));

		if ( ! $job) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'Job does not exists.']);
		}

		if ($job->agency_id !== $agency->id) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'You cannot edit this job.']);
		}

		return view('front.agency.job.detail')->with('job', $job);
	}

}