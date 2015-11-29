<?php namespace App\Models\Job\Provider;

use Carbon\Carbon;
use App\Models\Job\Interfaces\JobProviderInterface;
use App\Models\Job\Provider\JobIndustryProvider;

class JobProvider implements JobProviderInterface {

	protected $model = 'App\Models\Job\Eloquent\JobModel';

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
		$model = $this->getModel();

		$model->fill([
			'company_id'	=>	$data['company_id'],
			'experience_year'	=>	$data['experience_year'],
			'title'		=>	$data['title'],
			'city'		=>	$data['city'],
			'country'	=>	$data['country'],
			'duration'	=>	$data['job_post_duration'],
			'contact_name'	=>	$data['contact_name'],
			'contact_phone'	=>	$data['contact_phone'],
			'salary'	=>	$data['salary'],
			'salary_type'	=>	$data['salary_type'],
			'visa'	=>	$data['visa'] ? 1 : 0,
			'eligible_to_work_in_country'	=>	isset($data['eligible_to_work_in_country']) ? 1 : 0,
			'security_clearance'	=>	isset($data['security_clearance']) ? 1 : 0,
			'type'	=>	$data['type'],
			'status'	=>	'open',
			'job_apply_details'	=>	$data['job_apply_details'],
			'description'	=>	$data['description'],
		]);

		if ($model->save()) {
			$industryProvider = new JobIndustryProvider;

			foreach ($data['job_industry'] as $d) {
				$industry = $industryProvider->findById($d);
				if ($industry) $model->industries()->attach($industry->id, ['created_at' => Carbon::now()]);
			}

			return $model;
		}
		else {
			throw new \Exception("Error Processing Request", 1);
		}

		return;
	}

	public function update($job, $data) {
		$jobData = [
			'experience_year'	=>	$data['experience_year'],
			'title'		=>	$data['title'],
			'city'		=>	$data['city'],
			'country'	=>	$data['country'],
			'duration'	=>	$data['job_post_duration'],
			'contact_name'	=>	$data['contact_name'],
			'contact_phone'	=>	$data['contact_phone'],
			'salary'	=>	$data['salary'],
			'salary_type'	=>	$data['salary_type'],
			'visa'	=>	$data['visa'] ? 1 : 0,
			'eligible_to_work_in_country'	=>	isset($data['eligible_to_work_in_country']) ? 1 : 0,
			'security_clearance'	=>	isset($data['security_clearance']) ? 1 : 0,
			'type'	=>	$data['type'],
			'status'	=>	$data['status'],
			'job_apply_details'	=>	$data['job_apply_details'],
			'description'	=>	$data['description'],
		];

		if ($job->save()) {
			$job->industries()->sync($data['job_industry']);
		}

		return $job;
	}

	public function findById($id) {
		$model = $this->getModel();
		return $model->findById($id);
	}

}