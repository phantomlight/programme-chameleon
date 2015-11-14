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
				'admin'				=>	1,
				'company'			=>	1,
				'contractor'	=>	1,
				'agency'			=>	1,
			],
		],
		'company' => [
			'name'		=>	'Company',
			'permissions'	=>	[
				'company'			=>	1,
			],
		],
		'contractor' => [
			'name'		=>	'Contrator',
			'permissions'	=>	[
				'contrator'			=>	1,
			],
		],
		'agency'	=>	[
			'name'		=>	'Agency',
			'permissions'	=>	[
				'agency'			=>	1,
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
				'email'				=>	'superadmin@email.com',
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