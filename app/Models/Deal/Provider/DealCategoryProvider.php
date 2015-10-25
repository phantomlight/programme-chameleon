<?php namespace App\Models\Deal\Provider;

use Carbon\Carbon;
use App\Models\Deal\Interfaces\DealCategoryProviderInterface;

class DealCategoryProvider implements DealCategoryProviderInterface {
	protected $model = 'App\Models\Deal\Eloquent\DealCategoryModel';

	public function __construct($model = null) {
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

	public function getEmptyDealCategory() {
		return $this->createModel();
	}

	public function create(array $data) {
		$model = $this->createModel();
		$model->fill($data);
		$model->save();
		return $model;
	}

	public function getAllSubCategories() {
		$model = $this->createModel();
		return $model->subCategory()->get();
	}

	public function getAllParentCategories() {
		$model = $this->createModel();
		return $model->parentCategory()->get();
	}

	public function getCategoryById($id) {
		$model = $this->createModel();
		return $model->findById($id);
	}

	public function getAllCategories(array $data) {
		$model = $this->createModel();
		return $model->findByQuery($data);
	}

	public function editById($id, array $data) {
		$model = $this->createModel();
		$model = $model->find($id);
		if ($model) {
			$data['updated_at'] = Carbon::now();
			$model->update($data);
			return;
		}
		else {
			throw new \Exception("No data!", 1);
			return;
		}
	}

	public function removeById($id) {
		$model = $this->createModel();
		return $model->removeById($id);
	}

}
