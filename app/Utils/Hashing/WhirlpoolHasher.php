<?php namespace App\Utils\Hashing;

class WhirlpoolHasher extends BaseHasher implements HasherInterface {

	public $saltLength = 16;

	public function hash($string) {
		$salt = $this->createSalt();
		return $salt.hash('whirlpool', $salt.$string);
	}

	public function checkhash($string, $hashedString) {
		$salt = substr($hashedString, 0, $this->saltLength);
		return $this->slowEquals($salt.hash('whirlpool', $salt.$string), $hashedString);
	}

}