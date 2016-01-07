<?php namespace App\Models\NewsLetter\Eloquent;

use Eloquent;
use App\Models\NewsLetter\Interfaces\NewsLetterModelInterface;

class NewsLetterModel extends Eloquent implements NewsLetterModelInterface {

	protected $table = 'tb_newsletter';

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