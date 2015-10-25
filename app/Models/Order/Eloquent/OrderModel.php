<?php namespace App\Models\Order\Eloquent;

use Eloquent;
use App\Models\Order\Interfaces\OrderModelInterface;

class OrderModel extends Eloquent implements OrderModelInterface {
	
	protected $table = 'tb_orders';
	protected $hidden = [];
	protected $guarded = [];
	protected static $merchantModel = 'App\Models\Merchant\Eloquent\MerchantModel';
	protected static $customerModel = 'App\Models\Customer\Eloquent\CustomerModel';
	protected static $dealModel = 'App\Models\Deal\Eloquent\DealModel';

	public function merchant() {
		return $this->belongsTo(static::$merchantModel, 'merchant_id');
	}

	public function deal() {
		return $this->belongsTo(static::$dealModel, 'deal_id');
	}

	public function customer() {
		return $this->belongsTo(static::$customerModel, 'customer_id');
	}

	public function findById($id) {
		return self::where('id', $id)->first();
	}

	public function findByQuery(array $data) {
		$model = new self;

		if (isset($data['search'])) {
			$model = self::where('id', $data['search']);
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
}