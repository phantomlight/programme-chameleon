<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class ContractorController extends Controller {

	public function getRegister() {
		return view('front.contractor.register');
	}

	public function getIndex() {
		return view('front.contractor.index');
	}

	public function getAccount() {
		return view('front.contractor.account');
	}

	public function getCreateJobAlert() {
		return view('front.contractor.createJobAlert');
	}

	public function getSearchJob() {
		return view('front.contractor.searchJob');
	}

	public function getSubmitTimesheet() {
		return view('front.contractor.submitTimesheet');
	}

}