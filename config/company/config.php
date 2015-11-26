<?php

return [
	'company' => [
		'model' =>	'App\Models\Company\Eloquent\CompanyModel',
	],
	'companyCredit'	=>	[
		'model'	=>	'App\Models\Company\Eloquent\CompanyCreditModel',
	],
	'companyNotification'	=>	[
		'model'	=>	'App\Models\Company\Eloquent\CompanyNotificationModel',
		'notifWeb'		=>	true,
		'notifEmail'	=>	true,
	],
];