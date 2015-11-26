<?php namespace App\Models\Company\Eloquent;

use Eloquent;
use App\Models\Company\Interfaces\CompanyNotificationModelInterface;

class CompanyNotificationModel extends Eloquent implements CompanyNotificationModelInterface {

	protected $table = 'tb_company_notification';
	protected static $companyModel = 'App\Models\Company\Eloquent\CompanyModel';
	protected $guarded = [];
	protected $hidden = [];

	public function company() {
		return $this->belongsTo(static::$companyModel, 'company_id');
	}

}