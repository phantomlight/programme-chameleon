<?php namespace App\Utils\Hashing;

class BcryptHasher extends BaseHasher implements HasherInterface {

	public $strength = 8;
	public $saltLength = 22;

	public function hash($string) {
		$strength = str_pad($this->strength, 2, '0', STR_PAD_LEFT);
		$salt = $this->createSalt();
		$prefix = PHP_VERSION_ID < 50307 ? '$2a$' : '$2y$';
		return crypt($string, $prefix.$strength.'$'.$salt.'$');
	}

	public function checkhash($string, $hashedString) {
		return $this->slowEquals(crypt($string, $hashedString), $hashedString);
	}

}
