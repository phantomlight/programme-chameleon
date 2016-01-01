<?php namespace App\Models\Site\Eloquent;

use Eloquent;
use App\Models\Site\Interfaces\SiteModelInterface;

class SiteModel extends Eloquent implements SiteModelInterface {

	protected $table = 'tb_site';

	protected $guarded = [];
	protected $hidden = [];

	public function save(array $options = array()) {
		$this->validate();
		return parent::save($options);
	}

	public function validate() {
		return true;
	}

	public function findById($id) {
		return self::where('id', $id)->first();
	}

	public function delete() {
		return parent::delete();
	}

}