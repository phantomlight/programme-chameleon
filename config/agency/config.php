<?php

return [
	'agency' => [
		'model' => 'App\Models\Agency\Eloquent\AgencyModel',
	],
	'agencyNotification'	=>	[
		'model'				=>	'App\Models\Agency\Eloquent\AgencyNotificationModel',
		'notifWeb'		=>	true,
		'notifEmail'	=>	true,
	],
];