<?php namespace App\Models\NewsLetter;

use App\Models\NewsLetter\Interfaces\NewsLetterModelInterface;
use App\Models\NewsLetter\Interfaces\NewsLetterProviderInterface;
use App\Models\NewsLetter\Provider\NewsLetterProvider;

class NewsLetter {
	protected $newsLetter, $newsLetterProvider;

	public function __construct(
		NewsLetterProviderInterface $newsLetterProvider = null
	) {
		$this->newsLetterProvider = $newsLetterProvider ?: new NewsLetterProvider;
	}

	public function __call($method, $parameters) {
		if (isset($this->newsLetter)) {
			return call_user_func_array(array($this->newsLetter, $method), $parameters);
		}
		throw new \BadMethodCallException("Method [$method] is not supported.");
	}

	public function register($email) {
		return $this->newsLetterProvider->register($email);
	}

	public function getAllRecipients() {
		return $this->newsLetterProvider->getAll();
	}

	public function remove($email) {
		return $this->newsLetterProvider->remove($email);
	}
}