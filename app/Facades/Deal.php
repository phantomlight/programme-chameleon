<?php namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class Deal extends Facade {
	protected static function getFacadeAccessor() { return 'deal'; }
}