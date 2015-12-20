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

	public function findById($id) {
		$model = $this->getModel();
		return $model->where('id', $id)->first();
	}

	public function add($contractor, array $data) {
		$model = $this->getModel();
		$model->fill($data);
		$model->save();
		return $model;
	}

	public function update($notification, $contractor, array $data) {
		if ( ! $model = $this->findById($notification)) {
			throw new \Exception("Notification not found.", 1);
			return;
		}

		if ($model->contractor_id !== $contractor->id) {
			throw new \Exception("Notification does not belong to this contractor", 1);
			return;
		}

		foreach ($data as $k=>$d) {
			if (isset($model->{$k})) $model->{$k} = $d;
		}

		$model->save();
		return $model;
	}

	public function remove($notification, $contractor) {
		if ( ! $model = $this->findById($notification->id)) {
			throw new \Exception("Notification not found.", 1);
			return;
		}

		if ($model->contractor_id !== $contractor->id) {
			throw new \Exception("Notification does not belong to this contractor", 1);
			return;
		}

		$model->delete();
		return;
	}

}