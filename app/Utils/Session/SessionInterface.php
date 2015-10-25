<?php namespace App\Utils\Session;

interface SessionInterface {

	public function getKey($type);
	public function put($type, $value);
	public function get($type);
	public function forget($type);

}
