<?php namespace App\Utils\Tags;

use Eloquent;

class TagModel extends Eloquent {
	public $timestamps = false;
	public $table = 'tb_tagged';
}
