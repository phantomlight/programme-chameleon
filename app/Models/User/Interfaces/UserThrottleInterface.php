<?php namespace App\Models\User\Interfaces;

interface UserThrottleInterface {

	public function getUser();
	public function getLoginAttempts();
	public function addLoginAttempt();
	public function clearLoginAttempts();
	public function suspend();
	public function unsuspend();
	public function isSuspended();
	public function ban();
	public function unban();
	public function isBanned();
	public function check();
	public function save();
	
}