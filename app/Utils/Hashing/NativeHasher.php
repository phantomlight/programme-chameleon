<?php namespace App\Utils\Hashing;

class NativeHasher implements HasherInterface {
	
	private static $fallbacks = [];

	public static function addFallback($algo, $function, $options = array()) {
		static::$fallbacks[$algo] = [
			'function' => $function,
			'options' => $options
		];
	}

	public function hash($string) {
		if ( ! function_exists('password_hash')) {
			throw new \RuntimeException('The function password_hash() does not exist, your PHP environment is probably incompatible. Try running [vendor/ircmaxell/password-compat/version-test.php] to check compatibility or use an alternative hashing strategy.');
		}

		if (($hash = password_hash($string, PASSWORD_DEFAULT)) === false) {
			throw new \RuntimeException('Error generating hash from string, your PHP environment is probably incompatible. Try running [vendor/ircmaxell/password-compat/version-test.php] to check compatibility or use an alternative hashing strategy.');
		}

		return $hash;
	}

	public function checkhash($string, $hashedString) {
		$verified = password_verify($string, $hashedString);
		if ( ! $verified) {
			foreach (static::$fallbacks as $algo => $fallback) {
				$verified = $fallback['function']($string, $hashedString, $fallback['options']);
				if ($verified) break;
			}
		}
		return $verified;
	}

	public function needsRehashed($hashedString) {
		return password_needs_rehash($hashedString, PASSWORD_DEFAULT);
	}
}