<?php

return [
	'contractor' => [
		'model' =>	'App\Models\Contractor\Eloquent\ContractorModel',
	],
	'contractorExpense' => [
		'model'	=>	'App\Models\Contractor\Eloquent\ContractorExpenseModel',
	],
	'contractorNotification' => [
		'model'	=>	'App\Models\Contractor\Eloquent\ContractorNotificationModel',
		'notifWeb'		=>	true,
		'notifEmail'	=>	true,
	],
	'contractorResume' => [
		'model'	=>	'App\Models\Contractor\Eloquent\ContractorExpenseModel',
		'allowedType'	=>	['file'],
	],
	'contractorTimesheet' => [
		'model'	=>	'App\Models\Contractor\Eloquent\ContractorExpenseModel',
		'allowedType'	=>	['file', 'data'],
	],
];