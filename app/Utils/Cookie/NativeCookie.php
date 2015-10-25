<?php namespace App\Utils\Cookie;

class NativeCookie implements CookieInterface {

	protected $key = [
		'user'	=>	'seo_user',
		'shop'	=>	'seo_shop',
	];

	protected $defaults = array();

	public function __construct(array $config = array(), $key = null) {
		$defaults = [
			'domain'    => '',
			'path'      => '/',
			'secure'    => false,
			'http_only' => false
		];

		$this->defaults = array_merge($defaults, $config);

		if (isset($key)) {
			$this->key = $key;
		}
	}

	public function getKey($type) {
		return $this->key[$type];
	}

	public function put($type, $value, $minutes) {
		$this->setCookie($type, $value, $this->minutesToLifetime($minutes));
	}

	public function forever($value) {
		$this->put($value, 2628000);
	}

	public function get($type) {
		return $this->getCookie($type);
	}

	public function forget($type) {
		$this->put($type, null, -2628000);
	}

	public function minutesToLifetime($minutes) {
		return time() + $minutes;
	}

	public function setCookie($type, $value, $lifetime, $path = null, $domain = null, $secure = null, $httpOnly = null) {
		if ( ! isset($path))     $path     = $this->defaults['path'];
		if ( ! isset($domain))   $domain   = $this->defaults['domain'];
		if ( ! isset($secure))   $secure   = $this->defaults['secure'];
		if ( ! isset($httpOnly)) $httpOnly = $this->defaults['http_only'];

		setcookie($this->getKey($type), serialize($value), $lifetime, $path, $domain, $secure, $httpOnly);
	}

	public function getCookie() {
		if (isset($_COOKIE[$this->getKey()])) {
			return unserialize($_COOKIE[$this->getKey()]);
		}
	}

}
