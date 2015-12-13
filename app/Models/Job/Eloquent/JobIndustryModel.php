<?php namespace App\Models\Job\Eloquent;

use Eloquent;
use App\Models\Job\Interfaces\JobIndustryModelInterface;

class JobIndustryModel extends Eloquent implements JobIndustryModelInterface {
	
	protected $table = 'tb_industry';
	protected static $jobModel = 'App\Models\Job\Eloquent\JobModel';
	protected static $contractorModel = 'App\Models\Contractor\Eloquent\ContractorModel';
	protected static $contractorTablePivot = 'tb_contractor_job_alert';
	protected static $jobIndustryPivotTable = 'tb_job_industry';
	protected $guarded = [];
	protected $hidden = [];

	public function jobs() {
		return $this->belongsToMany(static::$jobModel, static::$jobIndustryPivotTable, 'industry_id', 'job_id');
	}

	public function contractorAlerts() {
		return $this->belongsToMany(static::$contractorModel, static::$contractorTablePivot, 'job_id', 'contractor_id');
	}

	public function company() {
		return $this->belongsTo(static::$companyModel, 'company_id');
	}

	public function findByQuery($data) {
		if (isset($data['search'])) {
			$model = self::where('title', 'like', '%' . $data['search'] . '%');
		}
		else {
			$model = new self;
		}

		if (isset($data['limit'])) {
			$model->take($data['limit']);
		}
		else {
			$model->take(100);
		}

		$model = $model->orderBy('created_at', 'desc');
		return $model->get();
	}

}