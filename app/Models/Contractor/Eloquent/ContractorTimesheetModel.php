<?php namespace App\Models\Contractor\Eloquent;

use Eloquent;
use App\Models\Contractor\Interfaces\ContractorTimesheetModelInterface;

class ContractorTimesheetModel extends Eloquent implements ContractorTimesheetModelInterface {

	protected $table = 'tb_contractor_timesheet';
	protected static $contractorModel = 'App\Models\Contractor\Eloquent\ContractorModel';
	protected $guarded = [];
	protected $hidden = [];

	public function contractor() {
		return $this->belongsTo(static::$contractorModel, 'contractor_id');
	}

	public function findByJob($contractor, $job) {
		return $this
			->where('contractor_id', $contractor->id)
			->where('job_id', $job->id)
			->first();
	}

}