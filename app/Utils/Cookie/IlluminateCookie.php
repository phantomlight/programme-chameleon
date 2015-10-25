<?php namespace App\Utils\Cookie;

use Illuminate\Container\Container;
use Illuminate\Cookie\CookieJar;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Cookie;

class IlluminateCookie implements CookieInterface {

	protected $key = [
		'user'	=>	'seo_user',
		'shop'	=>	'seo_shop',
	];

	protected $jar, $cookie, $strategy;

	public function __construct(Request $request, CookieJar $jar, $key = null, $strategy = 'request') {
		$this->request = $request;
		$this->jar = $jar;
		$this->strategy = $strategy;

		if (isset($key)) {
			$this->key = $key;
		}
	}

	public function getKey($type) {
		return $this->key[$type];
	}

	public function put($type, $value, $minutes) {
		$cookie = $this->jar->make($this->getKey($type), $value, $minutes);
		$this->jar->queue($cookie);
	}

	public function forever($type, $value) {
		$cookie = $this->jar->forever($this->getKey($type), $value);
		$this->jar->queue($cookie);
	}

	public function get($type) {
		$key = $this->getKey($type);
		$queued = $this->jar->getQueuedCookies();

		if (isset($queued[$key])) {
			return $queued[$key];
		}

		if ($this->strategy === 'request') {
			return $this->request->cookie($key);
		}
		else {
			return $this->jar->get($key);
		}
	}

	public function forget($type) {
		$cookie = $this->jar->forget($this->getKey($type));
		$this->jar->queue($cookie);
	}

}
