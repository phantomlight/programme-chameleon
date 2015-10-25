<?php namespace App\Utils\Tags;

use Illuminate\Database\Eloquent\Builder;

trait TaggableTrait {
	protected static $delimiter = ',';
	protected static $tagsModel = 'App\Utils\Tags\IlluminateTag';
	protected static $slugGenerator = 'Illuminate\Support\Str::slug';

	public static function getTagsDelimiter() {
		return static::$delimiter;
	}

	public static function setTagsDelimiter($delimiter) {
		static::$delimiter = $delimiter;
		return get_called_class();
	}


	public static function getTagsModel() {
		return static::$tagsModel;
	}

	public static function setTagsModel($model) {
		static::$tagsModel = $model;
	}

	public static function getSlugGenerator() {
		return static::$slugGenerator;
	}

	public static function setSlugGenerator($slugGenerator) {
		static::$slugGenerator = $slugGenerator;
	}

	public function tags() {
		return $this->morphToMany(static::$tagsModel, 'taggable', 'tb_tagged', 'taggable_id', 'tag_id');
	}

	public static function allTags() {
		$instance = new static;

		return $instance->createTagsModel()->whereNamespace(
			$instance->getEntityClassName()
			);
	}

	public static function scopeWhereTag(Builder $query, $tags, $type = 'slug') {
		$tags = (new static)->prepareTags($tags);

		foreach ($tags as $tag)
		{
			$query->whereHas('tags', function ($query) use ($type, $tag) {
				$query->where($type, $tag);
			});
		}

		return $query;
	}

	public static function scopeWithTag(Builder $query, $tags, $type = 'slug') {
		$tags = (new static)->prepareTags($tags);

		return $query->whereHas('tags', function ($query) use ($type, $tags) {
			$query->whereIn($type, $tags);
		});
	}

	public function tag($tags) {
		foreach ($this->prepareTags($tags) as $tag) {
			$this->addTag($tag);
		}

		return true;
	}

	public function untag($tags = null) {
		$tags = $tags ?: $this->tags->lists('name');

		foreach ($this->prepareTags($tags) as $tag) {
			$this->removeTag($tag);
		}

		return true;
	}

	public function setTags($tags, $type = 'name') {
		$tags = $this->prepareTags($tags);
		$entityTags = $this->tags->lists($type);
		$tagsToAdd = array_diff($tags, $entityTags);
		$tagsToDel = array_diff($entityTags, $tags);

		if ( ! empty($tagsToDel)) {
			$this->untag($tagsToDel);
		}

		if ( ! empty($tagsToAdd)) {
			$this->tag($tagsToAdd);
		}

		return true;
	}

	public function addTag($name) {
		$tag = $this->createTagsModel()->firstOrNew([
			'slug'      => $this->generateTagSlug($name),
			'namespace' => $this->getEntityClassName(),
			]);

		if (! $tag->exists) {
			$tag->name = $name;

			$tag->save();
		}

		if ( ! $this->tags->contains($tag->id)) {
			$tag->update([ 'count' => $tag->count + 1 ]);

			$this->tags()->attach($tag);
		}
	}

	public function removeTag($name) {
		$namespace = $this->getEntityClassName();

		$tag = $this
						->createTagsModel()
						->whereNamespace($namespace)
						->where(function($query) use ($name) {
							$query
							->orWhere('name', $name)
							->orWhere('slug', $name)
							;
						})
						->first()
		;

		if ($tag) {
			$tag->update([ 'count' => $tag->count - 1 ]);

			$this->tags()->detach($tag);
		}
	}

	public function prepareTags($tags) {
		if (is_null($tags)) {
			return [];
		}

		if (is_string($tags)) {
			$delimiter = preg_quote($this->getTagsDelimiter(), '#');

			$tags = array_map('trim',
				preg_split("#[{$delimiter}]#", $tags, null, PREG_SPLIT_NO_EMPTY)
				);
		}

		return array_unique(array_filter($tags));
	}

	public static function createTagsModel() {
		return new static::$tagsModel;
	}

	protected function generateTagSlug($name) {
		return call_user_func(static::$slugGenerator, $name);
	}

	protected function getEntityClassName() {
		if (isset(static::$entityNamespace)) {
			return static::$entityNamespace;
		}

		return $this->tags()->getMorphClass();
	}
}