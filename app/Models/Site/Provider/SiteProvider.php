<?php namespace App\Models\Site\Provider;

use Carbon\Carbon;
use App\Utils\Hash;
use App\Utils\File\FileUploader;
use Illuminate\Support\Str;
use App\Models\Site\Interfaces\SiteProviderInterface;

class SiteProvider implements SiteProviderInterface {

	protected $model = 'App\Models\Site\Eloquent\SiteModel';

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
		$model->fill($data);
		$model->save();
		return $model;
	}

	public function update($id, $data) {
		if ( ! $model = $this->findById($id)) {
			throw new \Exception("Model not found", 1);
			return;
		}

		foreach ($data as $k=>$d) {
			if (isset($model->{$k})) $model->{$k} = $d;
		}
		$model->save();
		return $model;
	}

	public function remove($id) {
		if ( ! $model = $this->findById($id)) {
			throw new \Exception("Model not found", 1);
			return;
		}

		if ( ! is_null($model->file)) {
			if (\File::exists(public_path() . '/' . $model->file)) {
				\File::delete(public_path() . '/' . $model->file);
			}
		}

		$model->delete();
		return true;
	}

	public function upload($file, $type) {
		$uploader = new FileUploader;
		$location = 'uploads/services/' . date('m') . '/';
		$uploadedFile = $uploader->upload($file, $location, $type);
		return $uploadedFile;
	}

	public function findById($id) {
		$model = $this->getModel();
		return $model->findById($id);
	}

	public function getAll() {
		$model = $this->getModel();
		return $model->all();
	}

}