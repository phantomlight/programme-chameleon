<?php namespace App\Models\Contractor\Eloquent;

use Eloquent;
use App\Models\Contractor\Interfaces\ContractorExpenseModelInterface;

class ContractorExpenseModel extends Eloquent implements ContractorExpenseModelInterface {

	protected $table = 'tb_contractor_expense';
	protected static $contractorModel = 'App\Models\Contractor\Eloquent\ContractorModel';
	protected static $jobModel = 'App\Models\Job\Eloquent\JobModel';
	protected $guarded = [];
	protected $hidden = [];

	public function contractor() {
		return $this->belongsTo(static::$contractorModel, 'contractor_id');
	}

	public function job() {
		return $this->belongsTo(static::$jobModel, 'contractor_id');
	}
	
}