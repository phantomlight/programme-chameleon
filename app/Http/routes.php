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

Route::get('/', function() { return view('index'); });
Route::get('home', function() { return view('index'); });
Route::get('login', function() { return view('login'); });
Route::get('register', function() { return view('register'); });
Route::get('job-detail', function() { return view('jobDetail'); });
Route::get('company-detail', function() { return view('companyDetail'); });
Route::get('resume-detail', function() { return view('resumeDetail'); });