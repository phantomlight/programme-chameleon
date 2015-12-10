<?php namespace App\Models\Job\Eloquent;

use Eloquent;
use App\Models\Job\Interfaces\JobModelInterface;

class JobModel extends Eloquent implements JobModelInterface {

	protected $table = 'tb_job';
	protected static $contractorModel = 'App\Models\Contractor\Eloquent\ContractorModel';
	protected static $companyModel = 'App\Models\Company\Eloquent\CompanyModel';
	protected static $jobIndustryModel = 'App\Models\Job\Eloquent\JobIndustryModel';
	protected static $contractorTimesheetModel = 'App\Models\Contractor\Eloquent\ContractorTimesheetModel';

	protected static $contractorTablePivot = 'tb_contractor_job';
	protected static $jobIndustryPivotTable = 'tb_job_industry';

	protected $guarded = [];
	protected $hidden = [];

	private $allowedJobType = ['permanent', 'contract'];
	private $allowedSalaryType = ['hourly', 'monthly', 'one-time'];

	public function industries() {
		return $this->belongsToMany(static::$jobIndustryModel, static::$jobIndustryPivotTable, 'job_id', 'industry_id');
	}

	public function contractors() {
		return $this->belongsToMany(static::$contractorModel, static::$contractorTablePivot, 'job_id', 'contractor_id');
	}

	public function company() {
		return $this->belongsTo(static::$companyModel, 'company_id');
	}

	public function timesheets() {
		return $this->hasMany(static::$contractorTimesheetModel, 'job_id');
	}

	public function save(array $options = array()) {
		$this->validate();
		return parent::save($options);
	}

	public function validate() {
		if ( ! in_array($this->salary_type, $this->allowedSalaryType)) {
			throw new \Exception("Salary type not allowed.", 1);
		}

		if ( ! in_array($this->type, $this->allowedJobType)) {
			throw new \Exception("Job type not allowed.", 1);
		}

		return true;
	}

	public function findById($id) {
		return self::where('id', $id)->first();
	}

	public function delete() {
		$this->contractors()->detach();
		$this->industries()->detach();
		$this->timesheets()->delete();
		return parent::delete();
	}

}