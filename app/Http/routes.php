<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function() { return view('front.index'); });
Route::get('login', function() { return view('front.login'); });

Route::controller('admin', 'AdminController', [
	'getIndex'	=>	'admin.index',
	'getLogin'	=>	'admin.login',
	'getCms'		=>	'admin.cms',
	'getJob'		=>	'admin.job',
	'getContractor'		=>	'admin.contractor',
	'getAgency'				=>	'admin.agency',
	'getCompany'			=>	'admin.company',
	'getTimesheet'		=>	'admin.timesheet',
	'getPriceList'		=>	'admin.price',
	'getResources'		=>	'admin.resources',
]);

Route::controller('company', 'CompanyController', [
	'getRegister' =>	'company.register',
	'getIndex'		=>	'company.index',
	'getPostJob'	=>	'company.job.post',
	'getResumeSearch'	=>	'company.resume.search',
]);

Route::controller('agency', 'AgencyController', [
	'getRegister' =>	'agency.register',
	'getIndex'		=>	'agency.index',
	'getNotifList'	=>	'agency.notif.all',
	'getOfferJob'	=> 'agency.offerJob',
]);

Route::controller('contractor', 'ContractorController', [
	'getRegister' 			=>	'contractor.register',
	'getIndex'					=>	'contractor.index',
	'getAccount'				=>	'contractor.account',
	'getCreateJobAlert'	=>	'contractor.jobAlert.create',
	'getSearchJob'			=>	'contractor.job.search',
	'getSubmitTimesheet'	=>	'contractor.timesheet.submit',
]);