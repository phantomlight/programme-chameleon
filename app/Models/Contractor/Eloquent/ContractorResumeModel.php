<?php namespace App\Models\Contractor\Eloquent;

use Eloquent;
use App\Models\Contractor\Interfaces\ContractorResumeModelInterface;

class ContractorResumeModel extends Eloquent implements ContractorResumeModelInterface {

	protected $table = 'tb_contractor_cv';
	protected static $contractorModel = 'App\Models\Contractor\Eloquent\ContractorModel';
	protected $guarded = [];
	protected $hidden = [];

	public function contractor() {
		return $this->belongsTo(static::$contractorModel, 'contractor_id');
	}

}