<?php namespace App\Models\Agency\Provider;

use App\Models\Agency\Interfaces\AgencyProviderInterface;

class AgencyProvider implements AgencyProviderInterface {

	protected $model = 'App\Models\Agency\Eloquent\AgencyModel';

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

}