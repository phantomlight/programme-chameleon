<?php namespace App\Models\User\Interfaces;

interface UserGroupInterface {

	public function getId();
	public function getName();
	public function getPermissions();
	public function save();
	public function delete();
	
}