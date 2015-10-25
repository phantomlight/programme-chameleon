<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use App\Utils\Hashing\JCryption;

class SiteController extends Controller {

	public function home() {
		// return redirect('home')->with('flashMessage', ['class' => 'danger', 'message' => 'Test Error Message']);
		return view('index');
	}

	public function getPublicKey() {
		try {
			$jCryption = new JCryption();
			return $jCryption->getPublicKey();
		}
		catch (\Exception $e) {
			return env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.';
		}
	}

	public function getHandshakeKey() {
		try {
			$jCryption = new JCryption();
			return $jCryption->handshake();
		}
		catch (\Exception $e) {
			return env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.';
		}
	}

}