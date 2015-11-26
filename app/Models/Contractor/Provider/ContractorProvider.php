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

	public function updateData($contractor, $data) {
		try {
			foreach ($data as $k=>$v) {
				$contractor->{$k} = $v;
			}

			$contractor->updated_at = Carbon::now();
			$contractor->save();
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
			return $contractor;
		}
		catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			return;
		}
	}

	public function makeJobAlert($contractor, $data) {
		return false;
	}

}