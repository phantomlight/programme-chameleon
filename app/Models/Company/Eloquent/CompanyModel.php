<?php namespace App\Models\Company\Eloquent;

use Eloquent;
use App\Models\Company\Interfaces\CompanyModelInterface;

class CompanyModel extends Eloquent implements CompanyModelInterface {

	protected $table = 'tb_company';
	protected static $companyCreditModel = 'App\Models\Company\Eloquent\CompanyCreditModel';
	protected static $notificationModel = 'App\Models\Company\Eloquent\CompanyNotificationModel';
	protected static $jobModel = 'App\Models\Job\Eloquent\JobModel';
	protected $guarded = [];
	protected $hidden = [];

	public function jobs() {
		return $this->hasMany(static::$jobModel, 'company_id', 'id');
	}

	public function credits() {
		return $this->hasMany(static::$companyCreditModel, 'company_id', 'id');
	}

	public function notifications() {
		return $this->hasMany(static::$CompanyNotificationModel, 'company_id', 'id');
	}

	public function delete() {
		$this->credits()->delete(); // or archive it?
		$this->jobs()->delete();
		$this->notifications()->delete();
		return parent::delete();
	}

}