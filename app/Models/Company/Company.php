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

	public function findCompanyById($id) {
		return $this->companyProvider->findById($id);
	}

	public function getAll($paginate=false, $ipp=15) {
		return $this->companyProvider->getAll($paginate, $ipp);
	}

	public function getAllCompanies(array $data) {
		return $this->companyProvider->getAllCompanies($data);
	}

	public function banCompany($id, $ban) {
		return $this->companyProvider->updateBan($id, $ban);
	}

	public function getByQuery($query, $paginate=false, $ipp=15) {
		return $this->companyProvider->getByQuery($query, $paginate, $ipp);
	}

	public function updateVIP($company, $active=false) {
		return $this->companyProvider->updateVIP($company, $active);
	}

	public function updateData($data) {
		return $this->companyProvider->update($data);
	}

	public function addAffiliate($agency) {
		return $this->companyProvider->addAffiliate($agency);
	}

	public function removeAffiliate($agency) {
		return $this->companyProvider->removeAffiliate($agency);
	}

	public function removeVip($company) {
		return $this->companyProvider->removeVip($company);
	}

	public function addNotification($company, array $data) {
		return $this->companyNotificationProvider->add($company, $data);
	}

	public function updateNotification($notification, $company, array $data) {
		return $this->companyNotificationProvider->update($notification, $company, $data);
	}

	public function removeNotification($notification, $company) {
		return $this->companyNotificationProvider->remove($notification, $company);
	}

	public function updateTimesheetStatus($id, $company, $status=false) {
		return $this->companyProvider->updateTimesheet($id, $company, $status);
	}

	public function updateExpenseStatus($id, $company, $status=false) {
		return $this->companyProvider->updateExpense($id, $company, $status);
	}

}