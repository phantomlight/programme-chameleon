<?php namespace App\Models\Company\Eloquent;

use Eloquent;
use App\Models\Company\Interfaces\CompanyCreditModelInterface;

class CompanyCreditModel extends Eloquent implements CompanyCreditModelInterface {

	protected $table = 'tb_company_credit_history';
	protected static $companyModel = 'App\Models\Company\Eloquent\CompanyModel';
	protected $guarded = [];
	protected $hidden = [];

	public function company() {
		return $this->belongsTo(static::$companyModel, 'company_id');
	}

	public function save(array $options = array()) {
		$this->validate();
		return parent::save($options);
	}

	public function validate() {
		if ( ! is_int($this->amount)) {
			throw new \Exception("Amount is not a number.", 1);
		}

		return true;
	}

}