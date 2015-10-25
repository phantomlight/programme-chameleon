<?php namespace App\Models\Deal\Eloquent;

use Eloquent;
use App\Models\Deal\Interfaces\DealModelInterface;

class DealModel extends Eloquent implements DealModelInterface {
	
	protected $table = 'tb_deals';
	protected $hidden = [];
	protected $guarded = [];
	protected static $dealCategoryModel = 'App\Models\Deal\Eloquent\DealCategoryModel';
	protected static $voucherModel = 'App\Models\Deal\Eloquent\VoucherModel';
	protected static $merchantModel = 'App\Models\Merchant\Eloquent\MerchantModel';

	public function category() {
		return $this->belongsTo(static::$dealCategoryModel, 'deal_category_id');
	}

	public function vouchers() {
		return $this->hasMany(static::$voucherModel, 'deal_id');
	}

	public function merchant() {
		return $this->belongsTo(static::$merchantModel, 'merchant_id');
	}

	public function delete() {
		$this->vouchers()->delete();
		return parent::delete();
	}

	public function findById($id) {
		return self::where('id', $id)->first();
	}

	public function findByQuery(array $data) {
		$model = new self;

		if (isset($data['search'])) {
			$model = self::where('name', 'like', '%' . $data['search'] . '%');
		}

		if (isset($data['limit'])) {
			$model->take($data['limit']);
		}
		else {
			$model->take(100);
		}

		$model->orderBy('created_at', 'desc');
		return $model->get();
	}

	public function findByNewest($limit) {
		$model = new self;
		return $model->orderBy('created_at', 'desc')->take(3)->get();
	}

	public function removeById($id) {
		$model = self::where('id', $id)->first();
		if ($model) {
			$model->vouchers()->delete();
			$model->delete();
		}
		else {
			throw new \Exception("Data not found!", 1);
		}
		return;
	}

}