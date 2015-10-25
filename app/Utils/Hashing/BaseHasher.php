<?php namespace App\Utils\Hashing;

abstract class BaseHasher {

	final protected function slowEquals($a, $b) {
		$diff = strlen($a) ^ strlen($b);

		for($i = 0; $i < strlen($a) && $i < strlen($b); $i++) {
			$diff |= ord($a[$i]) ^ ord($b[$i]);
		}
		return $diff === 0;
	}

	public function createSalt() {
		$pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		return substr(str_shuffle(str_repeat($pool, 5)), 0, $this->saltLength);
	}

}