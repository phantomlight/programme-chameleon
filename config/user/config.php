<?php

return [

	'hasher' => 'native',

	'cookie' => [
		'key' => 'custom_user',
 	],

	'groups' => [
		'model' => 'App\Models\User\Eloquent\UserGroup',
	],

	'users' => [
		'model' => 'App\Models\User\Eloquent\UserModel',
		'login_attribute' => 'email',
	],

	'user_groups_pivot_table' => 'tb_users_groups_pivot',

	'throttling' => [
		'enabled' => true,
		'model' => 'App\Models\User\Eloquent\UserThrottle',
		'attempt_limit' => 5,
		'suspension_time' => 15,
	],

];