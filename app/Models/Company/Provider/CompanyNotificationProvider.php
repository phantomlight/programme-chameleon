<?php namespace App\Models\Company\Provider;

use App\Models\Company\Interfaces\CompanyNotificationProviderInterface;

class CompanyNotificationProvider implements CompanyNotificationProviderInterface {

	protected $model = 'App\Models\Company\Eloquent\CompanyNotificationModel';

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