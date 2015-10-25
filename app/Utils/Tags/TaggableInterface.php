<?php namespace App\Utils\Tags;

use Illuminate\Database\Eloquent\Builder;

interface TaggableInterface {
	public static function getTagsDelimiter();
	public static function setTagsDelimiter($delimiter);
	public static function getTagsModel();
	public static function setTagsModel($model);
	public static function getSlugGenerator();
	public static function setSlugGenerator($name);
	public function tags();
	public static function allTags();
	public static function scopeWhereTag(Builder $query, $tags, $type = 'slug');
	public static function scopeWithTag(Builder $query, $tags, $type = 'slug');
	public function tag($tags);
	public function untag($tags = null);
	public function setTags($tags, $type = 'name');
	public function addTag($name);
	public function removeTag($name);
	public function prepareTags($tags);
	public static function createTagsModel();
}
