<?php namespace App\Models\Deal\Eloquent;

use Eloquent;
use App\Models\Deal\Interfaces\VoucherModelInterface;

class VoucherModel extends Eloquent implements VoucherModelInterface {
	
	protected $table = 'tb_vouchers';
	protected $hidden = [];
	protected $guarded = [];
	protected static $dealModel = 'App\Models\Deal\Eloquent\DealModel';

	public function deal() {
		return $this->belongsTo(static::$dealModel, 'deal_id');
	}

	public function findById($id) {
		return self::where('id', $id)->first();
	}

	public function findByQuery(array $data) {
		$model = new self;

		if (isset($data['search'])) {
			$model = self::where('name', 'like', '%' . $data['search'] . '%')->orWhere('code', 'like', '%' . $data['search'] . '%');
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

	public function removeById($id) {
		$model = self::where('id', $id)->first();
		if ($model) {
			$model->delete();
		}
		else {
			throw new \Exception("Data not found!", 1);
		}
		return;
	}

}