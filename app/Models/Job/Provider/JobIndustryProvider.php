<?php namespace App\Models\Job\Provider;

use App\Models\Job\Interfaces\JobIndustryProviderInterface;

class JobIndustryProvider implements JobIndustryProviderInterface {

	protected $model = 'App\Models\Job\Eloquent\JobIndustryModel';

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

	public function getAll() {
		$model = $this->getModel();
		return $model->orderBy('title', 'asc')->get();
	}

	public function findById($id) {
		$model = $this->getModel();
		return $model->where('id', $id)->first();
	}

	public function findByQuery($data) {
		$model = $this->getModel();
		return $model->findByQuery($data);
	}

	public function makeNew($data) {
		$model = $this->getModel();
		$model->fill(['title' => $data['title']]);
		$model->save();
		return $model;
	}

	public function update($id, $data) {
		if ( ! $model = $this->findById($id)) {
			throw new \Exception("Industry not found.", 1);
			return;
		}

		foreach ($data as $k=>$d) {
			if (isset($model->{$k})) $model->{$k} = $d;
		}

		$model->save();
		return $model;
	}

	public function remove($data) {
		if (is_array($data)) {
			$model = $this->getModel();
			if ($model->destroy($data)) return true;
		}
		else {
			$model = $this->findById($data);
			if ($model->delete()) return true;
		}

		return false;
	}

}