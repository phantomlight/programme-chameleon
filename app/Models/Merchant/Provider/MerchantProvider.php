<?php namespace App\Models\Merchant\Provider;

use App\Models\Merchant\Interfaces\MerchantProviderInterface;

class MerchantProvider implements MerchantProviderInterface {
	protected $model = 'App\Models\Merchant\Eloquent\MerchantModel';

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

	public function getEmptyMerchant() {
		return $this->createModel();
	}

	public function create(array $credentials) {
		$merchant = $this->createModel();
		$merchant->fill($credentials);
		$merchant->save();
		return $merchant;
	}

	public function update($merchant, array $data) {
		$merchant->name = $data['name'];
		$merchant->description = $data['description'];
		$merchant->map_lat = $data['map_lat'];
		$merchant->map_lng = $data['map_lng'];
		$merchant->payout_percent = $data['payout_percent'];
		$merchant->payout_date = $data['payout_date'];
		$merchant->location = $data['location'];
		if ( ! is_null($data['image'])) $merchant->image = $data['image'];
		$merchant->save();
		return $merchant;
	}

	public function getAllMerchants(array $data) {
		$model = $this->createModel();
		return $model->findByQuery($data);
	}

	public function getMerchantById($id) {
		$model = $this->createModel();
		return $model->findById($id);
	}

	public function removeById($id) {
		$model = $this->createModel();

		try {
			$merchant = $model->findById($id);

			if ( ! $model) {
				throw new \Exception("Tidak ada data.", 1);
				return;
			}

			if (\File::exists(public_path() . '/' . $merchant->image)) {
				\File::delete(public_path() . '/' . $merchant->image);
			}

			$user = $merchant->user;
			$group = \User::findGroupByName('Merchant');
			if ( ! $user->inGroup($group)) {
				throw new \Exception("Pengguna bukan merupakan merchant.", 1);
				return;
			}

			$merchant->delete();
			return;
		}
		catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			return;
		}
	}

	public function getByPayoutDate($time='week') {
		$model = $this->createModel();

		switch ($time) {
			case 'week':
				return $model->findByPayoutWeek();
				break;
			
			default:
				throw new \Exception("Time is not defined.", 1);
				break;
		}
	}
}
