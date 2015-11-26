<?php namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class Contractor extends Facade {
	protected static function getFacadeAccessor() { return 'contractor'; }
}