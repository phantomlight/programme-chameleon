<?php namespace App\Models\Job;

use App\Models\Job\Interfaces\JobIndustryModelInterface;
use App\Models\Job\Interfaces\JobIndustryProviderInterface;
use App\Models\Job\Interfaces\JobModelInterface;
use App\Models\Job\Interfaces\JobProviderInterface;
use App\Models\Job\Provider\JobProvider;
use App\Models\Job\Provider\JobIndustryProvider;

class Job {
	protected $job, $jobProvider, $jobIndustryProvider;

	public function __construct(
		JobProviderInterface $jobProvider = null,
		JobIndustryProviderInterface $jobIndustryProvider= null
	) {
		$this->jobProvider = $jobProvider ?: new JobProvider;
		$this->jobIndustryProvider = $jobIndustryProvider ?: new JobIndustryProvider;
	}

	public function __call($method, $parameters) {
		if (isset($this->job)) {
			return call_user_func_array(array($this->job, $method), $parameters);
		}
		throw new \BadMethodCallException("Method [$method] is not supported.");
	}

	public function getAllIndustries($search=null) {
		if ( ! is_null($search)) return $this->jobIndustryProvider->findByQuery($search);
		return $this->jobIndustryProvider->getAll();
	}

	public function makeNewIndustry($data) {
		return $this->jobIndustryProvider->makeNew($data);
	}

	public function findIndustryById($id) {
		return $this->jobIndustryProvider->findById($id);
	}

	public function createJob($data) {
		return $this->jobProvider->create($data);
	}

	public function updateJob($job, $data) {
		return $this->jobProvider->update($job, $data);
	}

	public function findJobById($id) {
		return $this->jobProvider->findById($id);
	}

	public function findAllJob() {
		return $this->jobProvider->findAll();
	}

	public function findJobByType($type='contract') {
		return $this->jobProvider->findByType($type);
	}

	public function searchJob($data) {
		return $this->jobProvider->search($data);
	}

	public function applyToContractor($job, $contractor) {
		return $this->jobProvider->applyToContractor($job, $contractor);
	}

	public function removeContractorFromJob($job, $contractor) {
		return $this->jobProvider->removeContractorFromJob($job, $contractor);
	}

}