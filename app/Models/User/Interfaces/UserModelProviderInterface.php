<?php namespace App\Models\User\Interfaces;

use App\Models\User\Interfaces\UserGroupInterface;

interface UserModelProviderInterface {

	public function findById($id);
	public function findByLogin($login);
	public function findByCredentials(array $credentials);
	public function findByActivationCode($code);
	public function findByResetPasswordCode($code);
	public function findAll();
	public function findAllInGroup(UserGroupInterface $group);
	public function findAllWithAccess($permissions);
	public function findAllWithAnyAccess(array $permissions);
	public function create(array $credentials);
	public function getEmptyUser();
	
}