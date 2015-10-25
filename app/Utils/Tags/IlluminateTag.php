<?php namespace App\Utils\Tags;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;

class IlluminateTag extends Eloquent {
	
	public $timestamps = false;
	public $table = 'tb_tags';
	protected $fillable = [
		'name',
		'slug',
		'count',
		'namespace',
	];

	protected static $taggedModel = 'App\Utils\TagModel';

	public function delete() {
		if ($this->exists) {
			$this->tagged()->delete();
		}
		return parent::delete();
	}

	public function taggable() {
		return $this->morphTo();
	}

	public function tagged() {
		return $this->hasMany(static::$taggedModel);
	}

	public function scopeName(Builder $query, $name) {
		return $query->whereName($name);
	}

	public function scopeSlug(Builder $query, $slug) {
		return $query->whereSlug($slug);
	}

	public static function getTaggedModel() {
		return static::$taggedModel;
	}

	public static function setTaggedModel($taggedModel) {
		static::$taggedModel = $taggedModel;
	}
}
