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

Route::get('login', ['as'=>'front.login', 'uses' => 'SiteController@getLogin']);
Route::get('logout', ['as'=>'front.logout', 'uses' => 'SiteController@getLogout']);
Route::get('api/country', 'SiteController@getCountryList');
Route::get('api/city', 'SiteController@getCityList');
Route::post('login', ['as' =>'front.postLogin', 'uses' => 'SiteController@postLogin']);

Route::get('free-resources', function() { return view('front.resources'); } );
Route::get('company/company-sample', function() { return view('front.company.sample'); });
Route::get('job/job-sample', function() { return view('front.jobSample'); });

Route::get('gen', 'SiteController@getPublicKey');
Route::post('handshake', 'SiteController@getHandshakeKey');

Route::get('contractor/{id}/{slug}', [
	'as' 		=>	'contractor.profile',
	'uses'	=>	'ContractorController@getPublicProfilePage',
]);

Route::get('submit-timesheet/{id}', [
	'as'		=>	'contractor.apply',
	'uses'	=>	'ContractorController@getSubmitTimesheet',
]);

Route::get('job-search', [
	'as'		=>	'job.search',
	'uses'	=>	'SiteController@jobSearch',
]);

Route::get('job/{id}/{slug}', [
	'as'		=>	'job.public',
	'uses'	=>	'JobController@getPublicJobPage',
]);

Route::controller('api/payment', 'PaymentController', []);

Route::controller('admin', 'AdminController', [
	'getIndex'	=>	'admin.index',
	'getLogin'	=>	'admin.login',
	'getCms'		=>	'admin.cms',
	'getJob'		=>	'admin.job.index',
	'getJobIndustry'	=>	'admin.job.industry',
	'getContractor'		=>	'admin.contractor',
	'getAgency'				=>	'admin.agency',
	'getCompany'			=>	'admin.company',
	'getResources'		=>	'admin.resources',
]);

Route::controller('company', 'CompanyController', [
	'getRegister' 		=>	'company.register',
	'postRegister'		=>	'company.postRegister',
	'getIndex'				=>	'company.index',
	'getPostJob'			=>	'company.job.post',
	'getEditJob'			=>	'company.job.edit',
	'getJobApplication'	=>	'company.job.application',
	'getJobTimesheet'	=>	'company.job.timesheet',
	'getResumeSearch'	=>	'company.resume.search',
	'getAccount'			=>	'company.account',
]);

Route::controller('agency', 'AgencyController', [
	'getRegister'	 	=>	'agency.register',
	'postRegister'	=>	'agency.postRegister',
	'getIndex'			=>	'agency.index',
	'getNotifList'	=>	'agency.notif.all',
	'getOfferJob'		=>	'agency.offerJob',
]);

Route::controller('contractor', 'ContractorController', [
	'getRegister' 			=>	'contractor.register',
	'postRegister'			=>	'contractor.postRegister',
	'getIndex'					=>	'contractor.index',
	'getAccount'				=>	'contractor.account',
	'getCreateJobAlert'	=>	'contractor.jobAlert.create',
]);

Route::controller('job', 'JobController', [
	'getIndustryList'			=>	'admin.job.industry.list',
	'getEditIndustry'			=>	'admin.job.industry.edit',
	'postAddIndustry'			=>	'admin.job.industry.postAdd',
	'postEditIndustry'		=>	'admin.job.industry.postEdit',
	'postRemoveIndustry' 	=>	'admin.job.industry.remove',
]);

//Route::get('test-mail', 'SiteController@testSendEmail');
Route::post('mail/receive', function () { return \Queue::marshal(); });