<?php namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class Agency extends Facade {
	protected static function getFacadeAccessor() { return 'agency'; }
}