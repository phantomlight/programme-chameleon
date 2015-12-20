<?php namespace App\Models\Company\Provider;

use Carbon\Carbon;
use App\Models\Company\Interfaces\CompanyProviderInterface;

class CompanyProvider implements CompanyProviderInterface {

	protected $model = 'App\Models\Company\Eloquent\CompanyModel';

	public function __construct($model=null) {
		if (isset($model)) {
			$this->model = $model;
		}
	}

	public function createModel() {
		$class = '\\'.ltrim($this->model, '\\');
		return new $class;
	}

	public function setModel($model) {
		$this->model = $model;
	}

	public function getModel() {
		return $this->createModel();
	}

	public function create($data) {
		$model = $this->createModel();
		$model->fill($data);
		$model->save();
		return $model;
	}

	public function findById($id) {
		$model = $this->getModel();
		return $model->where('id', $id)->first();
	}

	public function updateVIP($company, $active) {
		if ($active) {
			$company->is_vip = true;
			$today = Carbon::now();
			$company->vip_start = Carbon::now();
			$company->vip_end = $today->addMonths(6);
		}
		else {
			$company->is_vip = false;
			$company->vip_start = '0000-00-00 00:00:00';
			$company->vip_end = '0000-00-00 00:00:00';
		}

		$company->save();

		$jobs = $company->jobs()->get();
		if (count($jobs) > 0) {
			foreach ($jobs as $job) {
				if ( ! $job->is_active) {
					$job->is_active = true;
					$job->save();
				}
			}
		}

		return $company;
	}

	public function update($data) {
		$company = \Company::getCompany();

		if ($data['password'] !== '') {
			$user = \User::getUser();
			$code = $user->getResetPasswordCode();
			$user->attemptResetPassword($code, $data['password']);
		}

		$data['socials'] = json_encode([
			'facebook'	=>	$data['socials_facebook'],
			'google'		=>	$data['socials_google'],
			'twitter'		=>	$data['socials_twitter'],
			'url'				=>	$data['socials_url'],
		]);

		$data['industry'] = json_encode($data['industry']);

		$skip = [
			'socials_facebook',
			'socials_google',
			'socials_twitter',
			'socials_url',
			'password',
		];

		foreach ($data as $k=>$d) {
			if (in_array($k, $skip)) {
				continue;
			}
			else {
				$company->{$k} = $d;
			}
		}

		$company->save();
		return $company;
	}

	public function getAll($paginate, $ipp) {
		$model = $this->getModel();
		if ($paginate) {
			return $model->orderBy('created_at', 'desc')->paginate($ipp);
		}
		return $model->orderBy('created_at', 'desc')->get();
	}

	public function getByQuery($query, $paginate, $ipp) {
		$model = $this->getModel();

		if ($paginate) {
			return $model->where('name', 'like', '%' . $query . '%')->orderBy('created_at', 'desc')->paginate($ipp);
		}

		return $model->where('name', 'like', '%' . $query . '%')->orderBy('created_at', 'desc')->get();
	}

	public function addAffiliate($agency) {
		if ( ! $company = \Company::getCompany()) {
			throw new \Exception("You are not currently in a company account.", 1);
			return;
		}

		if ( ! $company->agencies->contains($agency->id)) {
			throw new \Exception("This agency has never made a request to you.", 1);
			return;
		}

		$company->agencies()->sync([$agency->id => ['status' => 'accept']], false);
		return $company;
	}

	public function removeAffiliate($agency) {
		if ( ! $company = \Company::getCompany()) {
			throw new \Exception("You are not currently in a company account.", 1);
			return;
		}

		if ( ! $company->agencies->contains($agency->id)) {
			throw new \Exception("This agency has never made a request to you.", 1);
			return;
		}

		$company->agencies()->detach($agency->id);
		return $company;
	}

	public function removeVip($company) {
		$company->is_vip = false;
		$company->save();
		return $company;
	}

}