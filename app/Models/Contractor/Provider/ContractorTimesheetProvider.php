<?php namespace App\Models\Contractor\Provider;

use Carbon\Carbon;
use App\Utils\File\FileUploader;
use App\Models\Contractor\Interfaces\ContractorTimesheetProviderInterface;

class ContractorTimesheetProvider implements ContractorTimesheetProviderInterface {

	protected $model = 'App\Models\Contractor\Eloquent\ContractorTimesheetModel';

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

	public function findById($id) {
		$model = $this->getModel();
		return $model->where('id', $id)->first();
	}

	public function findByJob($contractor, $job) {
		$model = $this->getModel();
		$model = $model->findByJob($contractor, $job);
		return $model;
	}

	public function addNew($job, $data, $file) {
		if ( ! $contractor = \Contractor::getContractor()) {
			throw new \Exception("Current user is not a contractor.", 1);
			return;
		}

		if ( ! is_null($file) && $data['timesheet_type'] === 'file') {
			$uploader = new FileUploader;
			$location = 'uploads/contractors/' . $contractor->id . '/timesheet/' . date('m') . '/';

			try {
				$uploadedFile = $uploader->upload($file, $location, 'resume');
			}
			catch (\Exception $e) {
				throw new \Exception($e->getMessage(), 1);
				return;
			}
		}

		$model = $this->getModel();

		if ($data['timesheet_type'] === 'data') {
			$startDate = Carbon::createFromFormat('Y-m-d', $data['timesheet_date_from']);
			$endDate = Carbon::createFromFormat('Y-m-d', $data['timesheet_date_to']);
		}

		$model->fill([
			'contractor_id'	=>	$contractor->id,
			'job_id'				=>	$job->id,
			'auth_company'	=>	false,
			'auth_agency'		=>	is_null($job->agency_id) ? true : false,
			'name'					=>	$data['timesheet_name'],
			'type'					=>	$data['timesheet_type'],
			'file'					=>	$data['timesheet_type'] === 'file' ? $uploadedFile : null,
			'report'				=>	$data['timesheet_type']	===	'data' ? $data['report_time'] : null,
			'hours'					=>	$data['timesheet_type']	===	'data' ? $data['num_hours'] : null,
			'start_date'		=>	isset($startDate) ? $startDate : null,
			'end_date'			=>	isset($endDate) ? $endDate : null,
		]);

		if ($model->save()) return $model;
		else {
			throw new \Exception("Something wrong when saving data.", 1);
			return;
		}
	}

	public function remove($contractor, $id) {
		if ( ! $model = $this->findById($id)) {
			throw new \Exception("Timesheet not found.", 1);
			return;
		}

		if ($model->contractor_id !== $contractor->id) {
			throw new \Exception("Timesheet does not belong to you.", 1);
			return;
		}

		if ( ! is_null($model->file)) {
			if (\File::exists(public_path() . '/' . $model->file)) {
				\File::delete(public_path() . '/' . $model->file);
			}
		}

		$model->delete();
		return;
	}

}