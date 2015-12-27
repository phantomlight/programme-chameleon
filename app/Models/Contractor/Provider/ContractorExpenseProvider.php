<?php namespace App\Models\Contractor\Provider;

use App\Utils\File\FileUploader;
use App\Models\Contractor\Interfaces\ContractorExpenseProviderInterface;

class ContractorExpenseProvider implements ContractorExpenseProviderInterface {

	protected $model = 'App\Models\Contractor\Eloquent\ContractorExpenseModel';

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

		if ( ! is_null($file)) {
			$uploader = new FileUploader;
			$location = 'uploads/contractors/' . $contractor->id . '/expense/' . date('m') . '/';

			try {
				$uploadedFile = $uploader->upload($file, $location, 'expense');
			}
			catch (\Exception $e) {
				throw new \Exception($e->getMessage(), 1);
				return;
			}
		}

		$model = $this->getModel();

		$model->fill([
			'contractor_id'	=>	$contractor->id,
			'job_id'				=>	$job->id,
			'auth_company'	=>	false,
			'auth_agency'		=>	is_null($job->agency_id) ? true : false,
			'title'					=>	$data['title'],
			'amount'				=>	$data['amount'],
			'type'					=>	$data['type'],
			'file'					=>	isset($uploadedFile) ? $uploadedFile : null,
			'description'		=>	($data['description'] !== '') ? $data['description'] : null,
		]);

		if ($model->save()) return $model;
		else {
			throw new \Exception("Something wrong when saving data.", 1);
			return;
		}
	}

	public function remove($contractor, $id) {
		if ( ! $model = $this->findById($id)) {
			throw new \Exception("Expense data not found.", 1);
			return;
		}

		if ($model->contractor_id !== $contractor->id) {
			throw new \Exception("Expense does not belong to you.", 1);
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