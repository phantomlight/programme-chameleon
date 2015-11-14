<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class CompanyController extends Controller {

	public function getIndex() {
		return view('front.company.index');
	}

	public function getRegister() {
		return view('front.company.register');
	}

	public function getJobPost() {
		return view('front.company.jobPost');
	}

	public function getResumeSearch() {
		return view('front.company.resumeSearch');
	}

}