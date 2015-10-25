<?php

return [
	'order' => [
		'model' => 'App\Models\Order\Eloquent\OrderModel',
	],
	'methods' => [
		'cash'			=>	env('PAYMENT_CASH', false),
		'wallet'		=>	env('PAYMENT_WALLET', false),
		'transfer'	=>	env('PAYMENT_TRANSFER', false),
	],
];