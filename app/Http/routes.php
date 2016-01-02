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

Route::get('gen', 'SiteController@getPublicKey');
Route::post('handshake', 'SiteController@getHandshakeKey');

Route::get('resume-search', [
	'as'		=>	'resume.search',
	'uses'	=>	'SiteController@getResumeSearch',
]);

Route::get('contractor/{id}/{slug}', [
	'as' 		=>	'contractor.profile',
	'uses'	=>	'ContractorController@getPublicProfilePage',
]);

Route::get('company/{id}/{slug}', [
	'as' 		=>	'company.profile',
	'uses'	=>	'CompanyController@getPublicProfilePage',
]);

Route::get('agency/{id}/{slug}', [
	'as' 		=>	'agency.profile',
	'uses'	=>	'AgencyController@getPublicProfilePage',
]);

Route::get('job-search', [
	'as'		=>	'job.search',
	'uses'	=>	'SiteController@jobSearch',
]);

Route::get('job/{id}/{slug}', [
	'as'		=>	'job.public',
	'uses'	=>	'JobController@getPublicJobPage',
]);

Route::post('forgot-password', ['as' => 'password.forgot', 'uses' => 'SiteController@forgotPassword']);
Route::get('reset-password', ['as' => 'password.reset', 'uses' => 'SiteController@getResetPassword']);
Route::post('reset-password', ['as' => 'password.postReset', 'uses' => 'SiteController@postResetPassword']);
Route::post('contact-message', ['as' => 'contact', 'uses' => 'SiteController@postMessage']);

Route::controller('api/payment', 'PaymentController', []);

Route::controller('admin', 'AdminController', [
	'getIndex'	=>	'admin.index',
	'getLogin'	=>	'admin.login',
	'getLogout'	=>	'admin.logout',
	'getCms'		=>	'admin.cms',
	'getAccount'	=>	'admin.account',
	'postAccount'	=>	'admin.postAccount',
	'getJob'		=>	'admin.job.index',
	'getJobIndustry'	=>	'admin.job.industry',
	'getContractor'		=>	'admin.contractor',
	'getAgency'				=>	'admin.agency',
	'getCompany'			=>	'admin.company',
	'getCompanyList'	=>	'admin.company.list',
	'postCompanyBan'	=>	'admin.company.ban',
	'getContractorList'	=>	'admin.contractor.list',
	'postContractorBan'	=>	'admin.contractor.ban',
	'getAgencyList'	=>	'admin.agency.list',
	'postAgencyBan'	=>	'admin.agency.ban',
	'getJobList'			=>	'admin.job.list',
	'postJobRemove'		=>	'admin.job.remove',
]);

Route::controller('company', 'CompanyController', [
	'getRegister' 		=>	'company.register',
	'postRegister'		=>	'company.postRegister',
	'getIndex'				=>	'company.index',
	'getPostJob'			=>	'company.job.post',
	'getEditJob'			=>	'company.job.edit',
	'getJobApplication'	=>	'company.job.application',
	'getJobDetails'		=>	'company.job.detail',
	'getAccount'			=>	'company.account',
	'getNotif'				=>	'company.allNotif',
]);

Route::controller('agency', 'AgencyController', [
	'getRegister'	 	=>	'agency.register',
	'postRegister'	=>	'agency.postRegister',
	'getIndex'			=>	'agency.index',
	'getAccount'		=>	'agency.account',
	'getJobAdd'			=>	'agency.job.add',
	'getJobApplication'	=>	'agency.job.application',
	'getJobEdit'		=>	'agency.job.edit',
	'getJobList'		=>	'agency.job.list',
	'getJobDetails'		=>	'agency.job.detail',
	'getCompanyList'	=>	'agency.company.list',
	'getNotif'				=>	'agency.allNotif',
]);

Route::controller('contractor', 'ContractorController', [
	'getRegister' 			=>	'contractor.register',
	'postRegister'			=>	'contractor.postRegister',
	'getIndex'					=>	'contractor.index',
	'getAccount'				=>	'contractor.account',
	'getCreateJobAlert'	=>	'contractor.jobAlert.create',
	'getAddTimesheet'		=>	'contractor.job.timesheet',
	'getAddExpense'			=>	'contractor.job.expense',
	'getNotif'					=>	'contractor.allNotif',
]);

Route::controller('job', 'JobController', [
	'getIndustryList'			=>	'admin.job.industry.list',
	'getEditIndustry'			=>	'admin.job.industry.edit',
	'postAddIndustry'			=>	'admin.job.industry.postAdd',
	'postEditIndustry'		=>	'admin.job.industry.postEdit',
	'postRemoveIndustry' 	=>	'admin.job.industry.remove',
	'postRemoveTimesheet'	=>	'contractor.job.timesheet.remove',
	'postRemoveExpense'		=>	'contractor.job.expense.remove',
]);

//Route::get('test-mail', 'SiteController@testSendEmail');
Route::post('mail/receive', function () { return \Queue::marshal(); });