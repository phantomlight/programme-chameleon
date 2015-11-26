<?php namespace App\Models\Contractor\Eloquent;

use Eloquent;
use App\Models\Contractor\Interfaces\ContractorNotificationModelInterface;

class ContractorNotificationModel extends Eloquent implements ContractorNotificationModelInterface {

	protected $table = 'tb_contractor_notification';
	protected static $contractorModel = 'App\Models\Contractor\Eloquent\ContractorModel';
	protected $guarded = [];
	protected $hidden = [];

	public function contractor() {
		return $this->belongsTo(static::$contractorModel, 'contractor_id');
	}

}