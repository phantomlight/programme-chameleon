<?php namespace App\Models\Customer\Eloquent;

use Eloquent;
use App\Models\Customer\Interfaces\CustomerModelInterface;

class CustomerModel extends Eloquent implements CustomerModelInterface {
	
	protected $table = 'tb_customers';
	protected $hidden = [];
	protected $guarded = [];

	protected static $userModel = 'App\Models\User\Eloquent\UserModel';
	protected static $orderModel = 'App\Models\Order\Eloquent\OrderModel';

	public function user() {
		return $this->belongsTo(static::$userModel);
	}

	public function orders() {
		return $this->hasMany(static::$orderModel, 'customer_id');
	}

	public function delete() {
		$this->user()->delete();
		return parent::delete();
	}

}