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

}