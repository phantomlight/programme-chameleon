<?php namespace App\Models\Company\Provider;

use App\Models\Company\Interfaces\CompanyCreditProviderInterface;

class CompanyCreditProvider implements CompanyCreditProviderInterface {

	protected $model = 'App\Models\Company\Eloquent\CompanyCreditModel';

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

	public function update($company, $value) {
		$value = (int) $value;
		$model = $this->getModel();
		$model->fill([
			'company_id'	=>	$company->id,
			'amount'			=>	$value,
			'status'			=>	'done',
		]);

		if ($model->save()) {
			if ($value < 0) $company->credit -= abs($value);
			else $company->credit += $value;
			$company->save();
			session(['_sess_company' => ['model' => $company]]);
			return $company;
		}
		else {
			throw new \Exception("Error Processing Request.", 1);
		}

		return true;
	}


}