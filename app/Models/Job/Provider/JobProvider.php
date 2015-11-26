<?php namespace App\Models\Job\Provider;

use App\Models\Job\Interfaces\JobProviderInterface;

class JobProvider extends JobProviderInterface {

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

}