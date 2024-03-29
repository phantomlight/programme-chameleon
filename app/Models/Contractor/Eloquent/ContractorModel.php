<?php namespace App\Models\Contractor\Eloquent;

use Eloquent;
use App\Models\Contractor\Interfaces\ContractorModelInterface;

class ContractorModel extends Eloquent implements ContractorModelInterface {
	protected $table = 'tb_contractor';

	protected static $expenseModel = 'App\Models\Contractor\Eloquent\ContractorExpenseModel';
	protected static $notificationModel = 'App\Models\Contractor\Eloquent\ContractorNotificationModel';
	protected static $resumeModel = 'App\Models\Contractor\Eloquent\ContractorResumeModel';
	protected static $timesheetModel = 'App\Models\Contractor\Eloquent\ContractorTimesheetModel';
	protected static $industryModel = 'App\Models\Job\Eloquent\JobIndustryModel';
	protected static $jobModel = 'App\Models\Job\Eloquent\JobModel';
	protected static $userModel = 'App\Models\User\Eloquent\UserModel';

	protected static $alertTablePivot = 'tb_contractor_job_alert';
	protected static $jobTablePivot = 'tb_contractor_job';

	protected $guarded = [];
	protected $hidden = [];

	public function user() {
		return $this->belongsTo(static::$userModel, 'user_id');
	}

	public function expenses() {
		return $this->hasMany(static::$expenseModel, 'contractor_id', 'id');
	}

	public function notifications() {
		return $this->hasMany(static::$notificationModel, 'contractor_id', 'id');
	}

	public function resumes() {
		return $this->hasMany(static::$resumeModel, 'contractor_id', 'id');
	}

	public function timesheets() {
		return $this->hasMany(static::$timesheetModel, 'contractor_id', 'id');
	}

	public function jobAlerts() {
		return $this
			->belongsToMany(static::$industryModel, static::$alertTablePivot, 'contractor_id', 'industry_id')
			->withPivot('industry_id', 'type', 'email', 'country', 'city');
	}

	public function jobs() {
		return $this
			->belongsToMany(static::$jobModel, static::$jobTablePivot, 'contractor_id', 'job_id')
			->withPivot('status')
			->withTimestamps();
	}

	public function delete() {
		$this->expenses()->delete();
		$this->notifications()->delete();
		$this->resumes()->delete();
		$this->timesheets()->delete();
		$this->jobAlerts()->detach();
		$this->jobs()->detach();
		return parent::delete();
	}

}