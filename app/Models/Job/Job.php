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
}