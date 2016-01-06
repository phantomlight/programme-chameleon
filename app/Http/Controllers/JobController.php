<?php

namespace App\Http\Controllers;

use App\Utils\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use App\Utils\Hashing\JCryption;

class JobController extends Controller {

	public function postSubmitJob() {
		$data = \Input::get('data');
		$company = \Company::getCompany();

		// if company not subscribed to 6 month contract, check the credit
		// TODO: update this to retrieve from db
		
		if ( ! $company->is_vip) {
			$value = [
				'1'	=>	-1,
				'2'	=>	-3,
			];

			$checkValue = abs($value[$data['job_post_duration']]);

			if ($company->credit < $checkValue) {
				return \Response::json([
					'type'		=>	'danger',
					'message'	=>	'You have ' . $company->credit . ' credit. You need at least ' . $checkValue . ' credit(s) to post this job. <a href="' . route('company.account') . '" target="_blank">buy some?</a>',
				]);
			}
		}
		else {
			$data['job_post_duration'] = 999;
		}

		$data['company_id'] = $company->id;

		// WTF?
		// TODO: move to model

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
			// if company not subscribed to 6 month contract, substract the credit

			if ( ! $company->is_vip) {
				\Company::updateCredit($company, $value[$data['job_post_duration']]);
			}

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Job posted successfully.',
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
		$job = \Job::findJobById(trim(\Input::get('job')));
		$company = \Company::getCompany();

		if ($job->company_id !== $company->id) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'You cannot edit the job that does not belong to you.',
			]);
		}

		// if company not subscribed to 6 month contract, check the credit
		// TODO: update this to retrieve from db
		
		if ($data['job_post_duration'] !== '0') {
			if ( ! $company->is_vip) {
				$value = [
					'1'	=>	-1,
					'2'	=>	-3,
				];

				$checkValue = abs($value[$data['job_post_duration']]);

				if ($company->credit < $checkValue) {
					return \Response::json([
						'type'		=>	'warning',
						'message'	=>	'You have ' . $company->credit . ' credit. You need at least ' . $checkValue . ' credit(s) to post this job.',
					]);
				}
			}
		}

		$data['company_id'] = $company->id;

		// WTF?
		// TODO: move to model

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

			// if company not subscribed to 6 month contract, substract the credit
			if ( ! $company->is_vip && $data['job_post_duration'] !== '0') {
				\Company::updateCredit($company, $value[$data['job_post_duration']]);
			}

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Job updated successfully',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
			]);
		}
	}

	public function getPublicJobPage($id, $slug) {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		$job = \Job::findJobById($_hash->decode($id));

		if ( ! $job) {
			return abort(404);
		}
		
		return view('front.jobPublic')->with('job', $job);	
	}

	public function postApply() {
		$user = \User::getUser();

		if ( ! $user->hasAccess('contractor')) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Only contractors can submit a timesheet',
			]);
		}

		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$job = \Job::findJobById($_hash->decode(trim(\Input::get('job'))));

		if ( ! $job) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Sorry, that job does not longer exists in our database.',
			]);
		}

		if ( ! $job->is_active || $job->status !== 'open') {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'The job is not available for applying.',
			]);
		}

		try {
			$contractor = \Contractor::getContractor();
			$application = \Contractor::applyForJob($contractor, $job);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Your application has been submitted, you will be notified when you have been selected for the job.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
			]);
		}
	}

	public function postGiveJob() {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		try {
			$job = \Job::findJobById($_hash->decode(trim(\Input::get('job'))));

			if ( ! $job) {
				throw new \Exception("Job not found.", 1);
				return;
			}

			$contractor = \Contractor::findContractorById($_hash->decode(trim(\Input::get('contractor'))));
			if ( ! $contractor) {
				throw new \Exception("Contractor not found.", 1);
				return;
			}

			$jobApplication = \Job::applyToContractor($job, $contractor);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Job assignment success, reload page?',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postStatusChange() {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$job = \Job::findJobById($_hash->decode(trim(\Input::get('job'))));

		if ( ! $job) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Job not found.',
			]);
		}

		$value = \Input::get('value');
		if ($value !== 'taken' && $value !== 'open') {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Status not recognized.',
			]); 
		}

		$job->status = $value;

		if ($job->save()) {
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Job status updated/',
			]);
		}
		else {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Something wrong while saving job status.',
			]);
		}
	}

	public function postRemoveJob() {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$job = \Job::findJobById($_hash->decode(trim(\Input::get('job'))));

		if ( ! $job) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Job not found.',
			]);
		}

		if ($job->delete()) {
			return \Response::json([
				'type'			=>	'success',
				'message'		=>	'Job removed. You will be redirected to the main page.',
				'redirect'	=>	route('company.index'),
			]);
		}
		else {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Something wrong while removing job.',
			]);
		}
	}

	public function postCancelContractor() {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$job = \Job::findJobById($_hash->decode(trim(\Input::get('job'))));

		if ( ! $job) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Job not found.',
			]);
		}

		$contractor = \Contractor::findContractorById($_hash->decode(trim(\Input::get('contractor'))));

		if ( ! $contractor) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Contractor not found.',
			]);
		}

		try {
			\Job::removeContractorFromJob($job, $contractor);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Contractor has been removed from the job.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postSubmitTimesheet() {
		$user = \User::getUser();

		if ( ! $user->hasAccess('contractor')) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Only contractors can submit a timesheet',
			]);
		}

		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$job = \Job::findJobById($_hash->decode(trim(\Input::get('job'))));

		if ( ! $job) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Sorry, that job does not longer exists in our database.',
			]);
		}

		$data = json_decode(\Input::get('data'), true);
		$file = ($data['timesheet_type'] === 'file') ? $_FILES['file'] : null;

		try {
			$timesheet = \Contractor::submitTimesheet($job, $data, $file);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Your timesheet has been submitted.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
			]);
		}
	}

	public function postRemoveTimesheet() {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		try {
			$contractor = \Contractor::getContractor();
			$id = $_hash->decode(\Input::get('i'));
			\Contractor::removeTimesheet($contractor, $id);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Expense data removed from this job.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postSubmitExpense() {
		$user = \User::getUser();

		if ( ! $user->hasAccess('contractor')) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Only contractors can submit a timesheet',
			]);
		}

		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$job = \Job::findJobById($_hash->decode(trim(\Input::get('job'))));

		if ( ! $job) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Sorry, that job does not longer exists in our database.',
			]);
		}

		$data = json_decode(\Input::get('data'), true);
		$file = isset($_FILES['file']) ? $_FILES['file'] : null;

		try {
			$timesheet = \Contractor::submitExpense($job, $data, $file);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Your expense data has been submitted.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
			]);
		}
	}

	public function postRemoveExpense() {
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		try {
			$contractor = \Contractor::getContractor();
			$id = $_hash->decode(\Input::get('i'));
			\Contractor::removeExpense($contractor, $id);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Expense data removed from this job.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function getIndustryList() {
		$data = \Input::has('data') ? \Input::get('data') : [];
		$jsonData = [];
		$model = \Job::getAllIndustries($data);
		try {
			if ($model) {
				foreach ($model as $mData) {
					$mData->jobs_count = $mData->jobs->count();
					$mData->editLink = route('admin.job.industry.edit') . '?i=' . $mData->id;
					$mData->removeLink = route('admin.job.industry.remove') . '?i=' . $mData->id;
					array_push($jsonData, $mData);
				}
			}
			return \Response::json($jsonData);
		}
		catch (\Exception $e) {
			return $e->getMessage();
		}
	}

	public function getEditIndustry() {
		$industry = \Job::findIndustryById(trim(\Input::get('i')));

		if ($industry) {
			return view('back.job.industryEdit')->with('model', $industry);
		}
		return redirect()->back()->with('flashMessage',[
			'class' 	=> 'danger', 
			'message' => 'Industry not found.'
		]);
	}

	public function postAddIndustry() {
		$data = json_decode(\Input::get('data'), true);

		try {
			$industry = \Job::makeNewIndustry($data);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Industry successfully created.',
			]);
		}
		catch(\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postEditIndustry() {
		if ( ! $id = \Input::get('i')) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'No input.',
			]);
		}

		$data = json_decode(\Input::get('data'), true);

		try {
			$job = \Job::updateIndustry($id, $data);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Industry updated.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postRemoveIndustry() {
		$data = \Input::get('i');

		try {
			\Job::removeIndustry($data);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Industry removed',
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