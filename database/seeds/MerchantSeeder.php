<?php

use Illuminate\Database\Seeder;

class MerchantSeeder extends Seeder {

	public function run() {
		$merchants = [
		[
		'email'				=>	'merchant1@email.com',
		'password'		=>	'password',
		'first_name'	=>	'Merchant',
		'last_name'		=>	'First',
		'slug'				=>	'merchant-first',
		'activated'		=>	true,
		],
		[
		'email'				=>	'merchant2@email.com',
		'password'		=>	'password',
		'first_name'	=>	'Merchant',
		'last_name'		=>	'Second',
		'slug'				=>	'merchant-second',
		'activated'		=>	true,
		],
		];

		foreach ($merchants as $k=>$m) {
			$group = User::findGroupByName('Merchant');

			if ($group) {
				$user = User::createUser($m);
				$user->addGroup($group);

				$merchantData = [
				'name'		=>	'Merchant Shop ' . $k,
				'user_id'	=>	$user->id,
				];

				Merchant::createMerchant($merchantData);
			}
		}
	}

}