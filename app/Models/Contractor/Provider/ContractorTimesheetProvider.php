<?php namespace App\Models\Contractor\Provider;

use App\Models\Contractor\Interfaces\ContractorTimesheetProviderInterface;

class ContractorTimesheetProvider implements ContractorTimesheetProviderInterface {

	protected $model = 'App\Models\Contractor\Eloquent\ContractorTimesheetModel';

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