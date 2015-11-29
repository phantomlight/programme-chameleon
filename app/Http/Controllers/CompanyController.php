<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use App\Utils\Hashing\JCryption;

class CompanyController extends Controller {

	public function __construct() {
		$this->middleware('company', ['except' => 'getRegister']);
	}

	public function getIndex() {
		return view('front.company.index');
	}

	public function getRegister() {
		return view('front.company.register');
	}

	public function getPostJob() {
		return view('front.company.job.add');
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

	public function getEditJob() {
		$company = \Company::getCompany();
		$job = \Job::findJobById(trim(\Input::get('i')));

		if ( ! $job) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'Job does not exists.']);
		}

		if ($job->company_id !== $company->id) {
			return redirect()->back()->with('flashMessage', ['class' => 'danger', 'message' => 'You cannot edit this job.']);
		}

		return view('front.company.job.edit')->with('job', $job);
	}

	public function getEditTimesheet() {

	}

	public function getJobTimesheet() {

	}

}