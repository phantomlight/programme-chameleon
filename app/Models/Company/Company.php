<?php namespace App\Models\Company;

use App\Models\Company\Interfaces\CompanyCreditModelInterface;
use App\Models\Company\Interfaces\CompanyCreditProviderInterface;
use App\Models\Company\Interfaces\CompanyModelInterface;
use App\Models\Company\Interfaces\CompanyProviderInterface;
use App\Models\Company\Interfaces\CompanyNotificationModelInterface;
use App\Models\Company\Interfaces\CompanyNotificationProviderInterface;

use App\Models\Company\Provider\CompanyCreditProvider;
use App\Models\Company\Provider\CompanyNotificationProvider;
use App\Models\Company\Provider\CompanyProvider;

class Company {
	protected $company, $companyProvider, $companyCreditProvider, $companyNotificationProvider;

	public function __construct(
		CompanyProviderInterface $companyProvider = null,
		CompanyCreditProviderInterface $companyCreditProvider = null,
		CompanyNotificationProviderInterface $companyNotificationProvider = null
	) {
		$this->companyProvider = $companyProvider ?: new CompanyProvider();
		$this->companyCreditProvider = $companyCreditProvider ?: new CompanyCreditProvider();
		$this->companyNotificationProvider = $companyNotificationProvider ?: new CompanyNotificProvider();
	}

	public function __call($method, $parameters) {
		if (isset($this->company)) {
			return call_user_func_array(array($this->company, $method), $parameters);
		}
		throw new \BadMethodCallException("Method [$method] is not supported.");
	}

	public function register($data) {
		$company = $this->companyProvider->create($data);
		return $this->company = $company;
	}

	public function updateCredit($company, $value) {
		return $this->companyCreditProvider->update($company, $value);
	}

	public function getCompany() {
		if (!\Session::has('_sess_company')) {
			try {
				$user = \User::getUser();
				$company = $user->company;
				session(['_sess_company' => ['model'=> $company]]);
				return $company;
			}
			catch (\Exception $e) {
				return env('APP_DEBUG') ? $e->getMessage() : 'User is not or has no Company data!';
			}
		}
		else {
			$company = session('_sess_company');
			return $company['model'];
		}
	}

	public function updateVIP($company, $active=false) {
		return $this->companyProvider->updateVIP($company, $active);
	}

	public function updateData($data) {
		return $this->companyProvider->update($data);
	}

}