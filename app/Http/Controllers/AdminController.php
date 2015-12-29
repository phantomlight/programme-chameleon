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

	public function getCompanyList() {
		$data = \Input::has('data') ? \Input::get('data') : [];
		$jsonData = [];
		$model = \Company::getAllCompanies($data);
		try {
			if ($model) {
				foreach ($model as $mData) {
					if ($mUser = $mData->user) {
						if ($throttle = \User::findThrottlerByUserId($mUser->id)) {
							if ($throttle->isBanned()) {
								$mData->ban = '<label class="label label-danger">Banned</label>';
							}
							else {
								$mData->ban = '<label class="label label-success">Active</label>';
							}
						}
						else {
							$mData->ban = '<label class="label label-danger">Cannot find ban status.</label>';
						}
						if ( ! is_null($mUser->last_login)) {
							$mData->last_login = date('d M, H:i A', strtotime($mUser->last_login->format('Y-m-d')));
						}
						else {
							$mData->last_login = "Haven't login yet.";
						}
						if ($throttle->isBanned()) {
							$mData->userUnBanLink = route('admin.company.ban') . '?i=' . $mData->id;
						}
						else {
							$mData->userBanLink = route('admin.company.ban') . '?i=' . $mData->id;
						}
						array_push($jsonData, $mData);
					}
				}
			}
			return \Response::json($jsonData);
		}
		catch (\Exception $e) {
			return $e->getMessage();
		}
	}

	public function postCompanyBan() {
		if ((! $id = \Input::get('i')) || ! $ban = \Input::get('ban')) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Data incomplete',
			]);
		}

		try {
			\Company::banCompany($id, $ban);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	$ban === 'true' ? 'Company banned.' : 'Company unbanned.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function getContractorList() {
		$data = \Input::has('data') ? \Input::get('data') : [];
		$jsonData = [];
		$model = \Contractor::getAllContractors($data);
		try {
			if ($model) {
				foreach ($model as $mData) {
					if ($mUser = $mData->user) {
						if ($throttle = \User::findThrottlerByUserId($mUser->id)) {
							if ($throttle->isBanned()) {
								$mData->ban = '<label class="label label-danger">Banned</label>';
							}
							else {
								$mData->ban = '<label class="label label-success">Active</label>';
							}
						}
						else {
							$mData->ban = '<label class="label label-danger">Cannot find ban status.</label>';
						}
						if ( ! is_null($mUser->last_login)) {
							$mData->last_login = date('d M, H:i A', strtotime($mUser->last_login->format('Y-m-d')));
						}
						else {
							$mData->last_login = "Haven't login yet.";
						}
						$mData->name = $mUser->first_name . ' ' . $mUser->last_name;

						if ($throttle->isBanned()) {
							$mData->userUnBanLink = route('admin.contractor.ban') . '?i=' . $mData->id;
						}
						else {
							$mData->userBanLink = route('admin.contractor.ban') . '?i=' . $mData->id;
						}

						array_push($jsonData, $mData);
					}
				}
			}
			return \Response::json($jsonData);
		}
		catch (\Exception $e) {
			return $e->getMessage();
		}
	}

	public function postContractorBan() {
		if ((! $id = \Input::get('i')) || ! $ban = \Input::get('ban')) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Data incomplete',
			]);
		}

		try {
			\Contractor::banContractor($id, $ban);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	$ban === 'true' ? 'Contractor banned.' : 'Contractor unbanned.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function getAgencyList() {
		$data = \Input::has('data') ? \Input::get('data') : [];
		$jsonData = [];
		$model = \Agency::getAllAgencies($data);
		try {
			if ($model) {
				foreach ($model as $mData) {
					if ($mUser = $mData->user) {
						if ($throttle = \User::findThrottlerByUserId($mUser->id)) {
							if ($throttle->isBanned()) {
								$mData->ban = '<label class="label label-danger">Banned</label>';
							}
							else {
								$mData->ban = '<label class="label label-success">Active</label>';
							}
						}
						else {
							$mData->ban = '<label class="label label-danger">Cannot find ban status.</label>';
						}
						if ( ! is_null($mUser->last_login)) {
							$mData->last_login = date('d M, H:i A', strtotime($mUser->last_login->format('Y-m-d')));
						}
						else {
							$mData->last_login = "Haven't login yet.";
						}

						if ($throttle->isBanned()) {
							$mData->userUnBanLink = route('admin.agency.ban') . '?i=' . $mData->id;
						}
						else {
							$mData->userBanLink = route('admin.agency.ban') . '?i=' . $mData->id;
						}

						array_push($jsonData, $mData);
					}
				}
			}
			return \Response::json($jsonData);
		}
		catch (\Exception $e) {
			return $e->getMessage();
		}
	}

	public function postAgencyBan() {
		if ((! $id = \Input::get('i')) || ! $ban = \Input::get('ban')) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Data incomplete',
			]);
		}

		try {
			\Agency::banAgency($id, $ban);

			return \Response::json([
				'type'		=>	'success',
				'message'	=> 	$ban === 'true' ? 'Agency banned.' : 'Agency unbanned.',
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