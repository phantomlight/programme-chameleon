<?php namespace App\Models\User\Interfaces;

use App\Models\User\Interfaces\UserModelInterface;

interface UserThrottleProviderInterface {

	public function findByUser(UserModelInterface $user, $ipAddress = null);
	public function findByUserId($id, $ipAddress = null);
	public function findByUserLogin($login, $ipAddress = null);
	public function enable();
	public function disable();
	public function isEnabled();
	
}