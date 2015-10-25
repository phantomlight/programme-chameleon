<?php namespace App\Models\User\Provider;

use App\Models\User\Interfaces\UserGroupProviderInterface;

class UserGroupProvider implements UserGroupProviderInterface {

	protected $model = 'App\Models\User\Eloquent\UserGroup';

	public function __construct($model = null) {
		if (isset($model)) {
			$this->model = $model;
		}
	}

	public function findById($id) {
		$model = $this->createModel();

		if ( ! $group = $model->newQuery()->find($id)) {
			throw new GroupNotFoundException("A group could not be found with ID [$id].");
		}

		return $group;
	}

	public function findByName($name) {
		$model = $this->createModel();

		if ( ! $group = $model->newQuery()->where('name', '=', $name)->first()) {
			throw new \Exception("A group could not be found with the name [$name].");
		}

		return $group;
	}

	public function findAll() {
		$model = $this->createModel();
		return $model->newQuery()->get()->all();
	}

	public function create(array $attributes) {
		$group = $this->createModel();
		$group->fill($attributes);
		$group->save();
		return $group;
	}

	public function createModel() {
		$class = '\\'.ltrim($this->model, '\\');
		return new $class;
	}

	public function setModel($model) {
		$this->model = $model;
	}

}