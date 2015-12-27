<?php namespace App\Models\Agency;

use App\Models\Agency\Interfaces\AgencyProviderInterface;
use App\Models\Agency\Interfaces\AgencyNotificationProviderInterface;
use App\Models\Agency\Interfaces\AgencyCreditProviderInterface;
use App\Models\Agency\Interfaces\AgencyModelInterface;
use App\Models\Agency\Interfaces\AgencyNotificationModelInterface;
use App\Models\Agency\Interfaces\AgencyCreditModelInterface;

use App\Models\Agency\Provider\AgencyProvider;
use App\Models\Agency\Provider\AgencyNotificationProvider;
use App\Models\Agency\Provider\AgencyCreditProvider;

class Agency {
	protected $agency, $agencyProvider, $agencyNotificationProvider, $agencyCreditProvider;

	public function __construct(
		AgencyProviderInterface $agencyProvider = null,
		AgencyNotificationProviderInterface $agencyNotificationProvider = null,
		AgencyCreditProviderInterface $agencyCreditProvider = null
	) {
		$this->agencyProvider = $agencyProvider ?: new AgencyProvider();
		$this->agencyNotificationProvider = $agencyNotificationProvider ?: new AgencyNotificationProvider();
		$this->agencyCreditProvider = $agencyCreditProvider ?: new AgencyCreditProvider();
	}

	public function __call($method, $parameters) {
		if (isset($this->agency)) {
			return call_user_func_array(array($this->agency, $method), $parameters);
		}
		throw new \BadMethodCallException("Method [$method] is not supported.");
	}

	public function register($data) {
		$agency = $this->agencyProvider->create($data);
		return $this->agency = $agency;
	}

	public function updateCredit($agency, $value) {
		return $this->agencyCreditProvider->update($agency, $value);
	}

	public function updateVIP($agency, $active=false) {
		return $this->agencyProvider->updateVIP($agency, $active);
	}

	public function getAgency() {
		if (!\Session::has('_sess_agency')) {
			try {
				$user = \User::getUser();
				$agency = $user->agency;
				session(['_sess_agency' => ['model'=> $agency]]);
				return $agency;
			}
			catch (\Exception $e) {
				return env('APP_DEBUG') ? $e->getMessage() : 'User is not or has no agency data!';
			}
		}
		else {
			$agency = session('_sess_agency');
			return $agency['model'];
		}
	}

	public function updateData(array $data) {
		return $this->agencyProvider->update($data);
	}

	public function updateAvatar($file) {
		return $this->agencyProvider->updateAvatar($file);
	}

	public function findAgencyById($id) {
		return $this->agencyProvider->findById($id);
	}

	public function addAffiliate($company) {
		return $this->agencyProvider->addAffiliate($company);
	}

	public function removeAffiliate($company) {
		return $this->agencyProvider->removeAffiliate($company);
	}

	public function addNotification($agency, array $data) {
		return $this->agencyNotificationProvider->add($agency, $data);
	}

	public function updateNotification($notification, $agency, array $data) {
		return $this->agencyNotificationProvider->update($notification, $agency, $data);
	}

	public function removeNotification($notification, $agency) {
		return $this->agencyNotificationProvider->remove($notification, $agency);
	}

	public function updateTimesheetStatus($id, $agency, $status=false) {
		return $this->agencyProvider->updateTimesheet($id, $agency, $status);
	}

	public function updateExpenseStatus($id, $agency, $status=false) {
		return $this->agencyProvider->updateExpense($id, $agency, $status);
	}

}