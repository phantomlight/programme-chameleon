<?php namespace App\Models\Job\Eloquent;

use Eloquent;
use App\Models\Job\Interfaces\JobModelInterface;

class JobModel extends Eloquent implements JobModelInterface {

	protected $table = 'tb_job';
	protected static $contractorModel = 'App\Models\Contractor\Eloquent\ContractorModel';
	protected static $companyModel = 'App\Models\Company\Eloquent\CompanyModel';
	protected static $contractorTablePivot = 'tb_contractor_job';
	protected $guarded = [];
	protected $hidden = [];

	public function contractors() {
		return $this->belongsToMany(static::$contractorModel, static::$contractorTablePivot, 'job_id', 'contractor_id');
	}

	public function company() {
		return $this->belongsTo(static::$companyModel, 'company_id');
	}

}