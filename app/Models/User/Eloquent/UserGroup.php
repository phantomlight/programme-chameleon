<?php namespace App\Models\User\Eloquent;

use Eloquent;
use App\Models\User\Interfaces\UserGroupInterface;

class UserGroup extends Eloquent implements UserGroupInterface {

	protected $table = 'tb_users_groups';
	protected $guarded = [];
	protected $hidden = [];

	protected $allowedPermissionsValues = [0, 1];
	protected static $userModel = 'App\Models\User\Eloquent\UserModel';
	protected static $userGroupsPivot = 'tb_users_groups_pivot';

	public function users() {
		return $this->belongsToMany(static::$userModel, static::$userGroupsPivot, 'group_id', 'user_id');
	}

	public function getId() {
		return $this->getKey();
	}

	public function getName() {
		return $this->name;
	}

	public function getPermissions() {
		return $this->permissions;
	}

	public function hasAccess($permissions, $all = true) {
		$groupPermissions = $this->getPermissions();

		if ( ! is_array($permissions)) {
			$permissions = (array) $permissions;
		}

		foreach ($permissions as $permission) {
			$matched = true;
			if ((strlen($permission) > 1) and ends_with($permission, '*')) {
				$matched = false;

				foreach ($groupPermissions as $groupPermission => $value) {
					$checkPermission = substr($permission, 0, -1);
					if ($checkPermission != $groupPermission and starts_with($groupPermission, $checkPermission) and $value == 1) {
						$matched = true;
						break;
					}
				}
			}
			elseif ((strlen($permission) > 1) and starts_with($permission, '*')) {
				$matched = false;

				foreach ($groupPermissions as $groupPermission => $value) {
					$checkPermission = substr($permission, 1);
					if ($checkPermission != $groupPermission and ends_with($groupPermission, $checkPermission) and $value == 1) {
						$matched = true;
						break;
					}
				}
			}
			else {
				$matched = false;

				foreach ($groupPermissions as $groupPermission => $value) {
					if ((strlen($groupPermission) > 1) and ends_with($groupPermission, '*')) {
						$matched = false;
						$checkGroupPermission = substr($groupPermission, 0, -1);
						if ($checkGroupPermission != $permission and starts_with($permission, $checkGroupPermission) and $value == 1) {
							$matched = true;
							break;
						}
					}
					elseif ($permission == $groupPermission and $groupPermissions[$permission] == 1) {
						$matched = true;
						break;
					}
				}
			}

			if ($all === true and $matched === false) { return false; }
			elseif ($all === false and $matched === true) { return true; }
		}
		return $all;
	}

	public function hasAnyAccess(array $permissions) {
		return $this->hasAccess($permissions, false);
	}

	public static function setUserModel($model) {
		static::$userModel = $model;
	}

	public static function setUserGroupsPivot($tableName) {
		static::$userGroupsPivot = $tableName;
	}

	public function save(array $options = array()) {
		$this->validate();
		return parent::save();
	}

	public function delete() {
		$this->users()->detach();
		return parent::delete();
	}

	public function getPermissionsAttribute($permissions) {
		if ( ! $permissions) {
			return array();
		}

		if (is_array($permissions)) {
			return $permissions;
		}

		if ( ! $_permissions = json_decode($permissions, true)) {
			throw new \InvalidArgumentException("Cannot JSON decode permissions [$permissions].");
		}
		return $_permissions;
	}

	public function setPermissionsAttribute(array $permissions) {
		$permissions = array_merge($this->getPermissions(), $permissions);
		foreach ($permissions as $permission => &$value) {
			if ( ! in_array($value = (int) $value, $this->allowedPermissionsValues)) {
				throw new \InvalidArgumentException("Invalid value [$value] for permission [$permission] given.");
			}

			if ($value === 0) {
				unset($permissions[$permission]);
			}
		}

		$this->attributes['permissions'] = ( ! empty($permissions)) ? json_encode($permissions) : '';
	}

	public function toArray() {
		$attributes = parent::toArray();

		if (isset($attributes['permissions'])) {
			$attributes['permissions'] = $this->getPermissionsAttribute($attributes['permissions']);
		}

		return $attributes;
	}

	public function validate() {
		if ( ! $name = $this->name) {
			throw new NameRequiredException("A name is required for a group, none given.");
		}

		$query = $this->newQuery();
		$persistedGroup = $query->where('name', '=', $name)->first();

		if ($persistedGroup and $persistedGroup->getId() != $this->getId()) {
			throw new \Exception("A group already exists with name [$name], names must be unique for groups.");
		}

		return true;
	}

}