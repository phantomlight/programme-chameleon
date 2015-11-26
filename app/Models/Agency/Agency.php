<?php namespace App\Models\Agency;

use App\Models\Agency\Interfaces\AgencyProviderInterface;
use App\Models\Agency\Interfaces\AgencyNotificationProviderInterface;
use App\Models\Agency\Interfaces\AgencyModelInterface;
use App\Models\Agency\Interfaces\AgencyNotificationModelInterface;

use App\Models\Agency\Provider\AgencyProvider;
use App\Models\Agency\Provider\AgencyNotificationProvider;

class Agency {
	protected $agency, $agencyProvider, $agencyNotificationProvider;

	public function __construct(
		AgencyProviderInterface $agencyProvider = null,
		AgencyNotificationProviderInterface $agencyNotificationProvider = null
	) {
		$this->agencyProvider = $agencyProvider ?: new AgencyProvider();
		$this->agencyNotificationProvider = $agencyNotificationProvider ?: new AgencyNotificationProvider();
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
}