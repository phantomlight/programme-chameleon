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
		return view('back.job.index');
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

	public function getAccount() {
		return view('back.account');
	}

	public function postAccount() {
		$data = \Input::get('data');

		try {
			$user = \User::getUser();
			if ( ! $user->hasAccess('admin')) {
				throw new \Exception("Not an admin account", 1);
				return;
			}

			$user->email = $data['email'];

			if ($data['password'] !== '') {
				$user->attemptResetPassword($user->getResetPasswordCode(), $data['password']);
			}

			$user->save();

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Account updated',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function getLogout() {
		\User::logout();
		\Session::flush();
		return redirect('admin/login')->with('flashMessage', ['class' => 'success', 'message' => 'You have logged out.']);
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

	public function getJobList() {
		$data = \Input::has('data') ? \Input::get('data') : [];
		$jsonData = [];
		$model = \Job::getAllJobs($data);
		try {
			if ($model) {
				foreach ($model as $mData) {
					if ($mCompany = $mData->company) {
						$mData->company_name = $mCompany->name;
					}
					if ($mAgency = $mData->agency) {
						$mData->agency_name = $mAgency->name;
					}
					else {
						$mData->agency_name = "<label class='label label-danger'>Not an agency job</label>";
					}

					if ($mData->is_active) {
						$mData->is_active = "<label class='label label-success'>Active</label>";
					}
					else {
						$mData->is_active = "<label class='label label-danger'>Not Active</label>";
					}

					$mData->removeLink = route('admin.job.remove') . '?i=' . $mData->id;	
					array_push($jsonData, $mData);
				}
			}
			return \Response::json($jsonData);
		}
		catch (\Exception $e) {
			return $e->getMessage();
		}
	}

	public function postJobRemove() {
		if ( ! $id = \Input::get('i')) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'No input.',
			]);
		}

		try {
			if ( ! \Job::removeJobByAdmin($id)) {
				throw new \Exception("Error Processing Request", 1);
				return;
			}

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Job removed.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postUpdateService() {
		$data = \Input::get('data');

		$dbData = [
			'title'	=>	$data['title'],
			'description'	=>	\Input::get('description'),
		];

		try {
			$model = \Site::updateService(trim(\Input::get('id')), $dbData);
			\Cache::forget('site.services');
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Service data "' . $model->title . '" updated',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postUpdateServiceImage() {
		$id = \Input::get('id');

		if ( ! isset($_FILES['file'])) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'No image uploaded',
			]);
		}

		try {
			$image = \Site::uploadFile($_FILES['file'], 'image');
			$dbData = ['file' => $image];
			$model = \Site::updateService($id, $dbData);

			\Cache::forget('site.services');
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Image updated',
				'image'		=>	asset($image),
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postAddResource() {
		$data = json_decode(\Input::get('data'), true);
		$description = \Input::get('description');

		try {
			$file = \Site::uploadFile($_FILES['file'], 'document');
			$dbData = [
				'title'		=>	$data['title'],
				'description'	=>	$description,
				'file'		=>	$file,
				'key'			=>	'resource.' . $data['key'],
			];
			$model = \Site::addResource($dbData);

			if (\Cache::has('site.resources')) \Cache::forget('site.resources');
			
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Resource ' . $model->title . ' added. Reload page to see effect.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postEditResourceFile() {
		$id = trim(\Input::get('id'));

		try {
			$file = \Site::uploadFile($_FILES['file'], 'document');
			$dbData = ['file'	=>	$file];
			$model = \Site::editResource($id, $dbData);

			if (\Cache::has('site.resources')) \Cache::forget('site.resources');

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Resource ' . $model->title . ' updated. Reload page to see effect.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postEditResource() {
		$id = trim(\Input::get('id'));
		$data = \Input::get('data');
		$description = \Input::get('description');

		try {
			$dbData = [
				'title'		=>	$data['title'],
				'description'	=>	$description,
				'key'			=>	'resource.' . $data['key'],
			];
			$model = \Site::editResource($id, $dbData);

			if (\Cache::has('site.resources')) \Cache::forget('site.resources');

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Resource ' . $model->title . ' updated. Reload page to see effect.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postRemoveResource() {
		if ( ! $id = \Input::get('id')) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Resources not found',
			]);
		}

		try {
			\Site::removeResource($id);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Resource removed',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postUpdatePrice() {
		$data = \Input::get('data');
		if ( ! \Input::has('id') || ! isset($data['value'])) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Data not complete.',
			]);
		}

		try {
			$price = (float) $data['value'];
			if ( ! is_float($price)) {
				throw new \Exception("Value is not a number.", 1);
				return;
			}

			if (\Cache::has('site.resources')) \Cache::forget('site.resources');

			$model = \Site::updateService(trim(\Input::get('id')), ['description' => $price]);
			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Price updated.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postUpdateCms() {
		$data = \Input::get('data');
		if ( ! \Input::has('id') || ! isset($data)) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Data not complete.',
			]);
		}

		try {
			$model = \Site::updateService(trim(\Input::get('id')), ['description' => $data]);
			if (\Cache::has('site.resources')) \Cache::forget('site.resources');

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Data updated.',
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