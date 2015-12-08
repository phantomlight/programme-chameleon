<?php namespace App\Utils;

use Hashids\Hashids;

class Hash {

	private $context = null;

	public function __construct() {
		if (is_null($this->context)) {
			$this->context = new Hashids(env('APP_KEY'), 8, 'abcdefghij1234567890');
		}
	}

	public function getHasher() {
		return $this->context;
	}

}