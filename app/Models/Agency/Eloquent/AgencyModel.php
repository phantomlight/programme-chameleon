<?php namespace App\Models\Agency\Eloquent;

use Eloquent;
use App\Models\Agency\Interfaces\AgencyModelInterface;

class AgencyModel extends Eloquent implements AgencyModelInterface {

	protected $table = 'tb_agency';
	protected static $contractorModel = 'App\Models\Contractor\Eloquent\ContractorModel';
	protected static $notificationModel = 'App\Models\Agency\Eloquent\AgencyNotificationModel';
	protected static $contractorPivotTable = 'tb_agency_contractor';
	protected $guarded = [];
	protected $hidden = [];

	public function contractors() {
		return $this->belongsToMany(static::$contractorModel, static::$contractorPivotTable, 'agency_id', 'contractor_id');
	}

	public function notifications() {
		return $this->hasMany(static::$notificationModel, 'id', 'agency_id');
	}

	public function delete() {
		$this->contractors()->detach();
		$this->notifications()->delete();
		return parent::delete();
	}

}