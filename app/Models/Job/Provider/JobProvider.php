<?php namespace App\Models\Job\Provider;

use Carbon\Carbon;
use App\Utils\Hash;
use Illuminate\Support\Str;
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
			'agency_id'		=>	isset($data['agency_id']) ? $data['agency_id'] : null,
			'experience_year'	=>	$data['experience_year'],
			'start_date'	=>	$data['start_date'],
			'title'		=>	$data['title'],
			'city'		=>	$data['city'],
			'country'	=>	$data['country'],
			'duration'	=>	isset($data['job_post_duration']) ? $data['job_post_duration'] : 999,
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

			$contractors = \Contractor::findAllByJobAlerts($model, $data['job_industry']);

			if (count($contractors) > 0) {
				$_hash = new Hash();
				$_hash = $_hash->getHasher();

				foreach ($contractors as $contractor) {
					if ($contractor->pivot->type === 'any' || $contractor->pivot->type === $model->type) {
						$notificationData = [
							'contractor_id'	=>	$contractor->id,
							'alert_from'	=>	'System: Programme Chameleon',
							'has_read'	=>	false,
							'title'	=>	'A new job matching your job alert found.',
							'url'		=>	url('job/' . $_hash->encode($model->id) . '/' . Str::slug($model->title)),
						];

						$notification = \Contractor::addNotification($contractor, $notificationData);
					}
				}
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
			'company_id'	=>	isset($data['company_id']) ? $data['company_id'] : $job->company_id,
			'experience_year'	=>	$data['experience_year'],
			'start_date'	=>	$data['start_date'],
			'title'		=>	$data['title'],
			'city'		=>	$data['city'],
			'country'	=>	$data['country'],
			'duration'	=>	isset($data['job_post_duration']) ? $data['job_post_duration'] : 999,
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
			$job->industries()->sync($data['job_industry'], false);
		}

		return $job;
	}

	public function findById($id) {
		$model = $this->getModel();
		return $model->findById($id);
	}

	public function findAll() {
		$model = $this->getModel();
		return $model->where('status', 'open')->orderBy('created_at', 'desc');
	}

	public function findByCompany($company, $type) {
		if ( ! is_null($type)) {
			return $company->jobs()->where('type', $type)->orderBy('created_at', 'desc');
		}
		return $company->jobs()->orderBy('created_at', 'desc');
	}

	public function findByAgency($agency) {
		if ( ! is_null($type)) {
			return $agency->jobs()->where('type', $type)->orderBy('created_at', 'desc');
		}
		return $agency->jobs()->orderBy('created_at', 'desc');
	}

	public function findByType($type) {
		if ($type !== 'permanent' && $type !== 'contract') {
			throw new \Exception("Error Processing Request", 1);
			return;
		}

		$model = $this->getModel();
		$model = $model->where('status', 'open')->where('type', $type)->orderBy('created_at', 'desc');
		return $model;
	}

	public function search($data) {
		foreach ($data as $k=>$d) {
			$data[$k] = trim($d);
		}

		$model = $this->getModel();

		if (isset($data['query'])) {
			$model = $model->where('title', 'like', '%' . $data['query'] . '%');
		}

		if (isset($data['country'])) {
			if ($data['country'] !== 'any') {
				$model->where('country', $data['country']);
			}
		}

		if (isset($data['job_industry'])) {
			if ($data['job_industry'] !== '' && $data['job_industry'] !== 'any') {
				$model = $model->whereHas('industries', function ($query) use ($data) {
					$query->where('industry_id', $data['job_industry']);
				});
			}
		}

		if (isset($data['job_type'])) {
			if ($data['job_type'] !== 'any') {
				$model = $model->where('type', $data['job_type']);
			}
		}

		if (isset($data['experience_min']) && $data['experience_max']) {
			if ($data['experience_min'] !== 'any' && $data['experience_max'] !== 'any') {
				$model = $model->whereBetween('experience_year', [(int) $data['experience_min'], (int) $data['experience_max']]);
			}
		}

		if (isset($data['salary_type'])) {
			if ($data['salary_type'] !== 'any') {
				$model->where('salary_type', $data['salary_type'])
							->whereBetween('salary', [(int) $data['salary_min'], (int) $data['salary_max']]);
			}
		}

		return $model->where('status', 'open')->where('is_active', true)->orderBy('created_at', 'desc');
	}

	public function applyToContractor($job, $contractor) {
		try {
			if ( ! $job->contractors->contains($contractor->id)) {
				throw new \Exception("This contractor has never applied to this job.", 1);
				return;
			}

			$job->contractors()->sync([$contractor->id => ['status' => 'accept']], false);

			$_hash = new Hash();
			$_hash = $_hash->getHasher();

			$notificationData = [
				'contractor_id'	=>	$contractor->id,
				'alert_from'	=>	'System: Programme Chameleon',
				'has_read'	=>	false,
				'title'	=>	'Added to ' . $job->title,
				'description'	=>	'You have been awarded the job "' . $job->title . '"',
				'url'		=>	url('job/' . $_hash->encode($job->id) . '/' . Str::slug($job->title)),
			];

			$notification = \Contractor::addNotification($contractor, $notificationData);
			return $job;
		}
		catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			return;
		}
	}

	public function removeContractorFromJob($job, $contractor) {
		try {
			if ( ! $job->contractors->contains($contractor->id)) {
				throw new \Exception("This contractor has never applied to this job.", 1);
				return;
			}

			$job->contractors()->detach($contractor->id);

			$notificationData = [
				'contractor_id'	=>	$contractor->id,
				'alert_from'	=>	'System: Programme Chameleon',
				'has_read'	=>	false,
				'title'	=>	'Removed from ' . $job->title,
				'description'	=>	'You have been removed from ' . $job->title,
				'url'		=>	null,
			];

			$notification = \Contractor::addNotification($contractor, $notificationData);

			return $job;
		}
		catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			return;
		}
	}

	public function remove($data) {
		if (is_array($data)) {
			$model = $this->getModel();
			if ($model->destroy($data)) return true;
		}
		else {
			$model = $this->findByModel($data);
			if ($model->delete()) return true;
		}

		return false;
	}

	public function getAllJobs($data) {
		$model = $this->createModel();
		if (isset($data['search'])) {
			$model = $model->where('title', 'like', '%' . $data['search'] . '%');
		}

		if (isset($data['limit'])) {
			$model->take($data['limit']);
		}
		else {
			$model->take(100);
		}

		$model->orderBy('created_at', 'desc');
		return $model->get();
	}

	public function removeByAdmin($id) {
		$user = \User::getUser();

		if ( ! $user->hasAccess('admin')) {
			throw new \Exception("Not admin.", 1);
			return;
		}

		if ( ! $job = $this->findById($id)) {
			throw new \Exception("Job not found", 1);
			return;
		}

		$company = $job->company;
		if ( ! is_null($job->agency_id)) $agency = $job->agency;

		$tmpJob = $job;

		if ($job->delete()) {
			$notificationData = [
				'company_id'	=>	$company->id,
				'alert_from'	=>	'System: Programme Chameleon',
				'has_read'	=>	false,
				'title'	=>	'Your job "' . $tmpJob->title . '" has been removed by admin',
				'url'		=>	null,
			];

			$notification = \Company::addNotification($company, $notificationData);

			if (isset($agency)) {
				$notificationData = [
					'agency_id'	=>	$agency->id,
					'alert_from'	=>	'System: Programme Chameleon',
					'has_read'	=>	false,
					'title'	=>	'Your job "' . $tmpJob->title . '" has been removed by admin',
					'url'		=>	null,
				];

				$notification = \Agency::addNotification($agency, $notificationData);
			}

			return true;
		}

		return false;
	}

}