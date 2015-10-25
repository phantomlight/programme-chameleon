<?php namespace App\Models\User\Interfaces;

use App\Models\User\Interfaces\UserGroupInterface;

interface UserModelInterface {

	public function getId();
	public function getLoginName();
	public function getLogin();
	public function getPasswordName();
	public function getPassword();
	public function getPermissions();
	public function isActivated();
	public function isSuperUser();
	public function validate();
	public function save();
	public function delete();
	public function getPersistCode();
	public function checkPersistCode($persistCode);
	public function getActivationCode();
	public function attemptActivation($activationCode);
	public function checkPassword($password);
	public function getResetPasswordCode();
	public function checkResetPasswordCode($resetCode);
	public function attemptResetPassword($resetCode, $newPassword);
	public function clearResetPassword();
	public function getGroups();
	public function addGroup(UserGroupInterface $group);
	public function removeGroup(UserGroupInterface $group);
	public function inGroup(UserGroupInterface $group);
	public function getMergedPermissions();
	public function hasAccess($permissions, $all = true);
	public function hasPermission($permissions, $all = true);
	public function hasAnyAccess(array $permissions);
	public function recordLogin();
	
}