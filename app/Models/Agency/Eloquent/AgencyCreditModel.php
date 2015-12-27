<?php namespace App\Models\Agency\Eloquent;

use Eloquent;
use App\Models\Agency\Interfaces\AgencyCreditModelInterface;

class AgencyCreditModel extends Eloquent implements AgencyCreditModelInterface {

	protected $table = 'tb_agency_credit_history';
	protected static $agencyModel = 'App\Models\Agency\Eloquent\AgencyModel';
	protected $guarded = [];
	protected $hidden = [];

	public function agency() {
		return $this->belongsTo(static::$agencyModel, 'agency_id');
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