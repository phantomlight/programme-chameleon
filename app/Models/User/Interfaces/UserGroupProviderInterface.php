<?php namespace App\Models\User\Interfaces;

interface UserGroupProviderInterface {

	public function findById($id);
	public function findByName($name);
	public function findAll();
	public function create(array $attributes);

}
