<?php namespace App\Models\Contractor\Provider;

use App\Models\Contractor\Interfaces\ContractorProviderInterface;
use App\Utils\File\FileUploader;
use App\Utils\Hash;
use Carbon\Carbon;
use Illuminate\Support\Str;

class ContractorProvider implements ContractorProviderInterface {

	protected $model = 'App\Models\Contractor\Eloquent\ContractorModel';

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
		$model = $this->createModel();
		$model->fill($data);
		$model->save();
		return $model;
	}

	public function findById($id) {
		$model = $this->createModel();
		return $model->where('id', $id)->first();
	}

	public function findByJobAlerts($job, $industries) {
		$model = $this->getModel();
		$model = $model->jobAlerts()
							->wherePivot('country', $job->country)
							->wherePivot('city', $job->city);

		if (count($industries) > 0) {
			foreach ($industries as $industry) {
				$model = $model->orWherePivot('industry_id', $industry);
			}
		}

		return $model->get();
	}

	public function updateData($contractor, $data) {
		try {
			foreach ($data as $k=>$v) {
				$contractor->{$k} = $v;
			}

			$contractor->updated_at = Carbon::now();
			$contractor->save();
			session(['_sess_contractor' => ['model'=> $contractor]]);
			return $contractor;
		}
		catch (\Exception $e) {
			return $e->getMessage();
		}
	}

	public function updateAvatar($contractor, $file) {
		if ( ! is_null($contractor->image)) {
			if (\File::exists(public_path() . '/' . $contractor->image)) {
				\File::delete(public_path() . '/' . $contractor->image);
			}
		}

		$uploader = new FileUploader;
		$location = 'uploads/contractors/' . $contractor->id . '/images/' . date('m') . '/';

		try {
			$uploadedFile = $uploader->upload($file, $location);
			$contractor->image = $uploadedFile;
			$contractor->updated_at = Carbon::now();
			$contractor->save();
			session(['_sess_contractor' => ['model'=> $contractor]]);
			return $contractor;
		}
		catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			return;
		}
	}

	public function makeJobAlert($contractor, $data) {
		$contractor->jobAlerts()->detach();

		foreach ($data['job_industry'] as $industry) {
			if ( ! $contractor->jobAlerts->contains($industry)) {
				$contractor->jobAlerts()->attach($industry, [
					'email' 			=>	$data['email'],
					'type' 				=>	$data['type'], 
					'country' 		=>	$data['country'],
					'city'				=>	$data['city'],
					'created_at'	=>	Carbon::now(),
				]);
			}
		}

		return true;
	}

	public function removeJobAlert($contractor) {
		$contractor->jobAlerts()->detach();
		return true;
	}

	public function search($data) {
		$model = $this->getModel();

		if ($data['query'] !== '') {
			$model = $model->whereHas('user', function ($query) use ($data) {
				$query->where('first_name', 'like', '%' . $data['query'] . '%');
			});
		}

		if ($data['country'] !== 'any') {
			$model
				->where('city', $data['city'])
				->where('country', $data['country']);
		}

		if ($data['industry'] !== '0') {
			$model->where('occupation', $data['industry']);
		}

		if ($data['cv_search_salary'] === 'range') {
			$model = $model->where('salary_rate', $data['salary_type'])
					->where('range_salary_min', '<=', $data['salary_min'])
					->where('range_salary_max', '>=', $data['salary_max']);
		}

		return $model->orderBy('created_at', 'desc');
	}

	public function applyForJob($contractor, $job) {
		if ( ! $company = $job->company) {
			throw new \Exception("Company for this job not found.", 1);
			return;
		}

		// not efficient, need to change
		if ( ! $contractor = $this->findById($contractor->id)) {
			throw new \Exception("Contractor not found.", 1);
			return;
		}

		if ( $contractor->jobs->contains($job->id) ) {
			throw new \Exception("You have already applied for this job.", 1);
			return;
		}
		
		$contractor->jobs()->sync([$job->id => [
			'status' => 'request',
			'created_at'	=>	Carbon::now(),
			'updated_at'	=>	Carbon::now(),
		]], false);

		// TODO: Move to background worker

		$cUser = $contractor->user;
		$_hash = new Hash();
		$_hash = $_hash->getHasher();

		$notificationData = [
			'company_id'	=>	$company->id,
			'title'				=>	'New Job Application',
			'alert_from'	=>	$cUser->first_name . ' ' . $cUser->last_name,
			'has_read'		=>	false,
			'url'					=>	route('company.job.application') . '?i=' . $_hash->encode($job->id),
		];

		$notification = \Company::addNotification($company, $notificationData);

		if ( ! is_null($job->agency_id)) {
			if ($agency = $job->agency) {
				$notificationData = [
					'agency_id'		=>	$job->agency_id,
					'title'				=>	'New Job Application',
					'alert_from'	=>	$cUser->first_name . ' ' . $cUser->last_name,
					'has_read'		=>	false,
					'url'					=>	route('agency.job.application') . '?i=' . $_hash->encode($job->id),
				];

				$notification = \Agency::addNotification($agency, $notificationData);
			}
		}

		// END TODO

		return $contractor;
	}

}