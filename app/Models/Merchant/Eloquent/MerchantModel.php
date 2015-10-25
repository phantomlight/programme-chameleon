<?php namespace App\Models\Merchant\Eloquent;

use Eloquent;
use Carbon\Carbon;
use App\Models\Merchant\Interfaces\MerchantModelInterface;

class MerchantModel extends Eloquent implements MerchantModelInterface {
	
	protected $table = 'tb_merchants';
	protected $hidden = [];
	protected $guarded = [];

	protected static $userModel = 'App\Models\User\Eloquent\UserModel';
	protected static $dealModel = 'App\Models\Deal\Eloquent\DealModel';
	protected static $orderModel = 'App\Models\Order\Eloquent\OrderModel';

	public function orders() {
		return $this->hasMany(static::$orderModel, 'merchant_id');
	}

	public function deals() {
		return $this->hasMany(static::$dealModel, 'id', 'merchant_id');
	}

	public function user() {
		return $this->belongsTo(static::$userModel);
	}

	public function delete() {
		$this->deals()->delete();
		$this->user()->delete();
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

	public function findByPayoutWeek() {
		$today = Carbon::now();
		$cache_time = $today->addDays(1);

		$model = \Cache::remember('_merchant_payout_week', $cache_time->minute, function() use ($today) {
			$from = ($today->day)-1;
			$to = $today->addDays(7)->day;
			if ($to < $from) { $to = 31; }
			return self::whereBetween('payout_date', [$from, $to])->get();
		});

		return $model;
	}

}