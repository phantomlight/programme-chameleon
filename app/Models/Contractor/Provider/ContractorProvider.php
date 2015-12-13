<?php namespace App\Models\Contractor\Provider;

use App\Models\Contractor\Interfaces\ContractorProviderInterface;
use App\Utils\File\FileUploader;
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

		$model = $model->whereHas('user', function ($query) use ($data) {
			$query->where('first_name', 'like', '%' . $data['query'] . '%');
		});

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
					->where('range_salary_min', '>=', $data['salary_min'])
					->where('range_salary_max', '<=', $data['salary_max']);
		}

		return $model->orderBy('created_at', 'desc');
	}

	public function applyForJob($contractor, $job) {
		if ( $contractor->jobs->contains($job->id) ) {
			throw new \Exception("You have already applied for this job.", 1);
			return;
		}
		
		$contractor->jobs()->attach($job->id, [
			'status' => 'request',
			'created_at'	=>	Carbon::now(),
			'updated_at'	=>	Carbon::now(),
		]);
		
		return $contractor;
	}

}