<?php namespace App\Utils\Hashing;

interface HasherInterface {
	public function hash($string);
	public function checkhash($string, $hashedString);
}