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

	public function updateVIP($company, $active) {
		if ($active) {
			$company->is_vip = true;
			$today = Carbon::now();
			$company->vip_start = $today;
			$company->vip_end = $today->addMonths(6);
		}
		else {
			$company->is_vip = false;
			$company->vip_start = '0000-00-00 00:00:00';
			$company->vip_end = '0000-00-00 00:00:00';
		}

		$company->save();
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

}