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

		$data = json_decode(\Input::get('data'), true);
		$file = null;
		$_hash = new Hash();
		$_hash = $_hash->getHasher();
		$job = \Job::findJobById($_hash->decode(trim(\Input::get('job'))));

		if ( ! $job) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Sorry, that job does not longer exists in our database.',
			]);
		}

		try {
			if ($data['timesheet_type'] === 'file') {
				$file = $_FILES['file'];

				if (is_null($file)) {
					throw new \Exception("Please choose a file when applying with file option.", 1);
					return;
				}
			}
			
			$timesheet = \Contractor::submitTimesheet($job, $data, $file);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Your application has been submitted, you will be notified via email when you have been selected for the job',
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