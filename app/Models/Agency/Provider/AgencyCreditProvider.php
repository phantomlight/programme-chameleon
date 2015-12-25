<?php namespace App\Models\Agency\Provider;

use App\Models\Agency\Interfaces\AgencyCreditProviderInterface;

class AgencyCreditProvider implements AgencyCreditProviderInterface {

	protected $model = 'App\Models\Agency\Eloquent\AgencyCreditModel';

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

	public function update($agency, $value) {
		$value = (int) $value;
		$model = $this->getModel();
		$model->fill([
			'agency_id'		=>	$agency->id,
			'amount'			=>	$value,
			'status'			=>	'done',
		]);

		if ($model->save()) {
			if ($value < 0) $agency->credit -= $value;
			else $agency->credit += $value;
			$agency->save();
			session(['_sess_agency' => ['model' => $agency]]);
			return $agency;
		}
		else {
			throw new \Exception("Error Processing Request.", 1);
		}

		return true;
	}


}