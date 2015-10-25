<?php namespace App\Utils\Session;

class NativeSession implements SessionInterface {

	protected $key = [
		'user'	=>	'seo_user',
		'shop'	=>	'seo_shop',
	];

	public function __construct($key = null) {
		if (isset($key)) {
			$this->key = $key;
		}

		$this->startSession();
	}

	public function __destruct() {
		$this->writeSession();
	}

	public function getKey($type) {
		return $this->key[$type];
	}

	public function put($type, $value) {
		$this->setSession($type, $value);
	}

	public function get($type) {
		return $this->getSession($type);
	}

	public function forget() {
		$this->forgetSession();
	}

	public function startSession() {
		if (session_id() == '') {
			session_start();
		}
	}

	public function writeSession() {
		session_write_close();
	}

	public function setSession($type, $value) {
		$_SESSION[$this->getKey($type)] = serialize($value);
	}

	public function getSession($type) {
		if (isset($_SESSION[$this->getKey($type)])) {
			return unserialize($_SESSION[$this->getKey($type)]);
		}
	}

	public function forgetSession($type) {
		if (isset($_SESSION[$this->getKey($type)])) {
			unset($_SESSION[$this->getKey($type)]);
		}
	}

}
