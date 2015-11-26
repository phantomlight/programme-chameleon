<?php namespace App\Utils\Hashing;

class JCryption {

	public function getPublicKey() {
		$config = [
			"digest_alg" => "sha512",
			"private_key_bits" => 4096,
			"private_key_type" => OPENSSL_KEYTYPE_RSA,
		];

		$res = openssl_pkey_new($config);		
		openssl_pkey_export($res, $privKey);		
		session(['j_privkey' => $privKey]);
		$pubKey = openssl_pkey_get_details($res);

		return \Response::json([
			'publickey'	=> $pubKey['key'],
		]);
	}

	public function handshake() {
		openssl_private_decrypt(base64_decode(\Input::get('key')), $key, session('j_privkey'));
		session(['jkey' => $key]);
		return \Response::json([
			'challenge'	=>	$this->encrypt($key, $key),
		]);
	}

	public function encrypt($password, $data) {
		$salt = openssl_random_pseudo_bytes(8);
		$salted = '';
		$dx = '';

		while (strlen($salted) < 48) {
			$dx = md5($dx . $password . $salt, true);
			$salted .= $dx;
		}

		$key = substr($salted, 0, 32);
		$iv  = substr($salted, 32, 16);
		$encrypted_data = openssl_encrypt($data, 'aes-256-cbc', $key, true, $iv);
		return base64_encode('Salted__' . $salt . $encrypted_data);
	}

	public function decrypt($password, $edata) {
		$data = base64_decode($edata);
		$salt = substr($data, 8, 8);
		$ct = substr($data, 16);
		$rounds = 3;
		$data00 = $password . $salt;
		$md5_hash = array();
		$md5_hash[0] = md5($data00, true);
		$result = $md5_hash[0];
		for ($i = 1; $i < $rounds; $i++) {
			$md5_hash[$i] = md5($md5_hash[$i - 1].$data00, true);
			$result .= $md5_hash[$i];
		}
		$key = substr($result, 0, 32);
		$iv  = substr($result, 32, 16);
		return openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
	}
}