<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class AgencyController extends Controller {

	public function getIndex() {
		return view('front.agency.index');
	}

	public function getRegister() {
		return view('front.agency.register');
	}

	public function getNotifList() {
		return view('front.agency.notifList');
	}

	public function getOfferJob() {
		return view('front.agency.offerJob');
	}

}