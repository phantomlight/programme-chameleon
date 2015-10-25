<?php namespace App\Utils\Cookie;

interface CookieInterface {

	public function getKey($type);
	public function put($type, $value, $minutes);
	public function forever($type, $value);
	public function get($type);
	public function forget($type);

}
