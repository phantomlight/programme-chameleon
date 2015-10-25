<?php namespace App\Utils\Session;

use Illuminate\Session\Store as SessionStore;

class IlluminateSession implements SessionInterface {

	protected $key = [
		'user'	=>	'seo_user',
		'shop'	=>	'seo_shop',
	];

	protected $session;

	public function __construct(SessionStore $session, $key = null) {
		$this->session = $session;
		if (isset($key)) {
			$this->key = $key;
		}
	}

	public function getKey($type) {
		return $this->key[$type];
	}

	public function put($type, $value) {
		$this->session->put($this->getKey($type), $value);
	}

	public function get($type) {
		return $this->session->get($this->getKey($type));
	}

	public function forget($type) {
		$this->session->forget($this->getKey($type));
	}

}
