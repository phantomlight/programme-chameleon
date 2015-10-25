<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder {

	protected $groups = [
		'super-user'	=>	[
			'name'	=>	'Super User',
			'permissions'	=>	[
				'superuser'	=>	1,
			],
		],
		'admin' => [
			'name'		=>	'Admin',
			'permissions'	=>	[
				'admin'			=>	1,
				'manager'		=>	1,
				'merchant'	=>	1,
				'user'			=>	1,
			],
		],
		'manager' => [
			'name'		=>	'Manager',
			'permissions'	=>	[
				'manager'		=>	1,
				'merchant'	=>	1,
			],
		],
		'merchant' => [
			'name'		=>	'Merchant',
			'permissions'	=>	[
				'merchant'	=>	1,
			],
		],
		'user' => [
			'name'		=>	'User',
			'permissions'	=>	[
				'user'	=>	1,
			],
		],
	];

	public function run() {
		try {
			foreach ($this->groups as $g) {
				User::createGroup($g);
			}

			// Add super user
			$super = [
				'email'				=>	'forddyce92@gmail.com',
				'password'		=>	'password',
				'first_name'	=>	'Fordyce',
				'last_name'		=>	'Gozali',
				'slug'				=>	'fordyce-gozali',
				'activated'		=>	true,
			];

			$group = User::findGroupByName('Super User');

			if ($group) {
				$user = User::createUser($super);
				$user->addGroup($group);
			}

			//Add admins
			$admins = [
				[
					'email'				=>	'admin@email.com',
					'password'		=>	'password',
					'first_name'	=>	'Admin',
					'last_name'		=>	'',
					'slug'				=>	'admin',
					'activated'		=>	true,
				],
			];

			$group = User::findGroupByName('Admin');

			if ($group) {
				foreach ($admins as $a) {
					$user = User::createUser($a);
					$user->addGroup($group);
				}
			}
		}
		catch (\Exception $e) {
			return $this->command->info($e->getMessage());
		}
	}

}