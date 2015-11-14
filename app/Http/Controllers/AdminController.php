<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class AdminController extends Controller {

	public function getLogin() {
		return view('back.login');
	}

	public function getIndex() {
		return view('back.index');
	}

	public function getCms() {
		return view('back.cms');
	}

	public function getJob() {
		return view('back.job');
	}

	public function getContractor() {
		return view('back.contractor');
	}

	public function getCompany() {
		return view('back.company');
	}

	public function getAgency() {
		return view('back.agency');
	}

	public function getTimesheet() {
		return view('back.timesheet');
	}

	public function getPriceList() {
		return view('back.price');
	}

	public function getResources() {
		return view('back.resources');
	}

}