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
			'start_date'	=>	$data['start_date'],
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
			'start_date'	=>	$data['start_date'],
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

		foreach ($jobData as $k=>$d) {
			$job->{$k} = $d;
		}

		if ($job->save()) {
			$job->industries()->sync($data['job_industry']);
		}

		return $job;
	}

	public function findById($id) {
		$model = $this->getModel();
		return $model->findById($id);
	}

	public function findAll() {
		$model = $this->getModel();
		return $model->orderBy('created_at', 'desc');
	}

	public function findByType($type) {
		if ($type !== 'permanent' && $type !== 'contract') {
			throw new \Exception("Error Processing Request", 1);
			return;
		}

		$model = $this->getModel();
		$model = $model->where('type', $type)->orderBy('created_at', 'desc');
		return $model;
	}

	public function search($data) {
		foreach ($data as $k=>$d) {
			$data[$k] = trim($d);
		}

		$model = $this->getModel();
		$model = $model->where('title', 'like', '%' . $data['query'] . '%');

		if ($data['country'] !== 'any') {
			$model->where('country', $data['country']);
		}

		if ($data['job_industry'] !== '' && $data['job_industry'] !== 'any') {
			$model = $model->whereHas('industries', function ($query) use ($data) {
				$query->where('industry_id', $data['job_industry']);
			});
		}

		if ($data['job_type'] !== 'any') {
			$model = $model->where('type', $data['job_type']);
		}

		if ($data['experience_min'] !== 'any' && $data['experience_max'] !== 'any') {
			$model = $model->whereBetween('experience_year', [(int) $data['experience_min'], (int) $data['experience_max']]);
		}

		if ($data['salary_type'] !== 'any') {
			$model->where('salary_type', $data['salary_type'])
						->whereBetween('salary', [(int) $data['salary_min'], (int) $data['salary_max']]);
		}

		return $model->orderBy('created_at', 'desc');
	}

}