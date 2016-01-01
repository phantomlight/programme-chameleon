<?php namespace App\Models\Contractor\Provider;

use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Models\Contractor\Interfaces\ContractorResumeProviderInterface;
use App\Utils\File\FileUploader;

class ContractorResumeProvider implements ContractorResumeProviderInterface {

	protected $model = 'App\Models\Contractor\Eloquent\ContractorResumeModel';

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

	public function makeResume($contractor, $file) {
		try {
			$uploader = new FileUploader;
			$location = 'uploads/contractors/' . $contractor->id . '/resume/' . date('m') . '/';
			$uploadedFile = $uploader->upload($file, $location, 'document');

			$model = $this->createModel();
			$model->fill([
				'contractor_id'	=>	$contractor->id,
				'file' => $uploadedFile
			]);
			$model->save();
			\Session::forget('_sess_contractor');
			return $model;
		}
		catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			return;
		}
	}

	public function remove($contractor, $id) {
		if ( ! $model = $this->findById($id)) {
			throw new \Exception("Not found", 1);
			return;
		}

		if ($model->contractor_id !== $contractor->id) {
			throw new \Exception("Permission error", 1);
			return;
		}

		if (\File::exists(public_path() . '/' . $model->file)) {
			\File::delete(public_path() . '/' . $model->file);
		}

		$model->delete();
		return true;
	}

	public function updateSalary($contractor, $data) {
		foreach ($data as $k=>$d) {
			if (isset($contractor->{$k})) {
				$contractor->{$k} = $d;
			}
		}

		if ($contractor->save()) {
			\Session::forget('_sess_contractor');
			return $contractor;
		}

		return false;
	}

}