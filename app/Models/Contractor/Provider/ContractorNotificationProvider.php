<?php namespace App\Models\Contractor\Provider;

use App\Models\Contractor\Interfaces\ContractorNotificationProviderInterface;

class ContractorNotificationProvider implements ContractorNotificationProviderInterface {

	protected $model = 'App\Models\Contractor\Eloquent\ContractorNotificationModel';

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