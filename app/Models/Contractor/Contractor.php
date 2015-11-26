<?php namespace App\Models\Contractor;

use App\Models\Contractor\Interfaces\ContractorModelInterface;
use App\Models\Contractor\Interfaces\ContractorProviderInterface;
use App\Models\Contractor\Interfaces\ContractorExpenseModelInterface;
use App\Models\Contractor\Interfaces\ContractorExpenseProviderInterface;
use App\Models\Contractor\Interfaces\ContractorNotificationModelInterface;
use App\Models\Contractor\Interfaces\ContractorNotificationProviderInterface;
use App\Models\Contractor\Interfaces\ContractorResumeModelInterface;
use App\Models\Contractor\Interfaces\ContractorResumeProviderInterface;
use App\Models\Contractor\Interfaces\ContractorTimesheetModelInterface;
use App\Models\Contractor\Interfaces\ContractorTimesheetProviderInterface;
use App\Models\Contractor\Provider\ContractorExpenseProvider;
use App\Models\Contractor\Provider\ContractorNotificationProvider;
use App\Models\Contractor\Provider\ContractorProvider;
use App\Models\Contractor\Provider\ContractorResumeProvider;
use App\Models\Contractor\Provider\ContractorTimesheetProvider;

class Contractor {

	protected $contractor, $contractorProvider, $contractorExpenseProvider, $contractorNotificationProvider, $contractorResumeProvider, $contractorTimesheetProvider;

	public function __construct(
		ContractorProviderInterface $contractorProvider = null,
		ContractorExpenseProviderInterface $contractorExpenseProvider = null,
		ContractorNotificationProviderInterface $contractorNotificationProvider = null,
		ContractorResumeProviderInterface $contractorResumeProvider = null,
		ContractorTimesheetProviderInterface $contractorTimesheetProvider = null
	) {
		$this->contractorProvider = $contractorProvider ?: new ContractorProvider();
		$this->contractorExpenseProvider = $contractorExpenseProvider ?: new ContractorExpenseProvider();
		$this->contractorNotificationProvider = $contractorNotificationProvider ?: new ContractorNotificationProvider();
		$this->contractorResumeProvider = $contractorResumeProvider ?: new ContractorResumeProvider();
		$this->contractorTimesheetProvider = $contractorTimesheetProvider ?: new ContractorTimesheetProvider();
	}

	public function __call($method, $parameters) {
		if (isset($this->contrator)) {
			return call_user_func_array(array($this->contractor, $method), $parameters);
		}
		throw new \BadMethodCallException("Method [$method] is not supported.");
	}

	public function register($data) {
		$contractor = $this->contractorProvider->create($data);
		return $this->contractor = $contractor;
	}

	public function getContractor() {
		if (!\Session::has('_sess_contractor')) {
			try {
				$user = \User::getUser();
				$contractor = $user->contractor;
				session(['_sess_contractor' => ['model'=> $contractor]]);
				return $contractor;
			}
			catch (\Exception $e) {
				return env('APP_DEBUG') ? $e->getMessage() : 'User is not or has no contractor data!';
			}
		}
		else {
			$contractor = session('_sess_contractor');
			return $contractor['model'];
		}
	}
	
}