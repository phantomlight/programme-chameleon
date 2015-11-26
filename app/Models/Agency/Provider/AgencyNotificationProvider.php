<?php namespace App\Models\Agency\Provider;

use App\Models\Agency\Interfaces\AgencyNotificationProviderInterface;

class AgencyNotificationProvider implements AgencyNotificationProviderInterface {

	protected $model = 'App\Models\Agency\Eloquent\AgencyNotificationModel';

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