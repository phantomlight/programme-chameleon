<?php namespace App\Models\Agency\Eloquent;

use Eloquent;
use App\Models\Agency\Interfaces\AgencyNotificationModelInterface;

class AgencyNotificationModel extends Eloquent implements AgencyNotificationModelInterface {

	protected $table = 'tb_agency_notification';
	protected static $agencyModel = 'App\Models\Agency\Eloquent\AgencyModel';
	protected $guarded = [];
	protected $hidden = [];

	public function agency() {
		return $this->belongsTo(static::$agencyModel, 'agency_id');
	}

}