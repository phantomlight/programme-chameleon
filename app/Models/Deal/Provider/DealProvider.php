<?php namespace App\Models\Deal\Provider;

use Carbon\Carbon;
use App\Models\Deal\Interfaces\DealProviderInterface;

class DealProvider implements DealProviderInterface {
	protected $model = 'App\Models\Deal\Eloquent\DealModel';

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

	public function getEmptyDeal() {
		return $this->createModel();
	}

	public function create(array $data) {
		$model = $this->createModel();
		$model->fill($data);
		$model->save();
		return $model;
	}

	public function update($deal, $data) {
		foreach ($data as $k=>$d) {
			if ($k === 'image') {
				if ( ! is_null($data['images'])) $deal->images = $data['images'];
			}
			else {
				$deal->{$k} = $d;
			}
		}
		$deal->save();
		return $deal;
	}

	public function getAllDeals(array $data) {
		$model = $this->createModel();
		return $model->findByQuery($data);
	}

	public function getNewest($limit=1) {
		$model = $this->createModel();
		return $model->findByNewest($limit);
	}

	public function getDealById($id) {
		$model = $this->createModel();
		return $model->findById($id);
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

		try {
			$deal = $model->findById($id);

			if ( ! $model) {
				throw new \Exception("Tidak ada data.", 1);
				return;
			}

			if (\File::exists(public_path() . '/' . $deal->images)) {
				\File::delete(public_path() . '/' . $deal->images);
			}

			$deal->delete();
			return;
		}
		catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			return;
		}
	}
}