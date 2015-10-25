<?php namespace App\Models\User\Eloquent;

use Eloquent;
use App\Models\User\Interfaces\UserModelInterface;
use App\Models\User\Interfaces\UserGroupInterface;
use App\Utils\Hashing\HasherInterface;

class UserModel extends Eloquent implements UserModelInterface {
	
	protected $table = 'tb_users';

	protected $hidden = [
		'password',
		'reset_password_code',
		'activation_code',
		'persist_code',
	];

	protected $guarded = [
		'reset_password_code',
		'activation_code',
		'persist_code',
	];

	protected $hashableAttributes = [
		'password',
		'persist_code',
	];

	protected $userGroups, $mergedPermission;

	protected static $hasher;
	protected $allowedPermissionsValues = [-1, 0, 1];
	protected static $groupModel = 'App\Models\User\Eloquent\UserGroup';
	protected static $customerModel = 'App\Models\Customer\Eloquent\CustomerModel';
	protected static $userGroupsPivot = 'tb_users_groups_pivot';
	protected static $loginAttribute = 'email';

	public function customer() {
		return $this->hasOne(static::$customerModel, 'user_id');
	}

	public function groups() {
		return $this->belongsToMany(static::$groupModel, static::$userGroupsPivot, 'user_id', 'group_id');
	}

	public static function setGroupModel($model) {
		static::$groupModel = $model;
	}

	public static function setUserGroupsPivot($tableName) {
		static::$userGroupsPivot = $tableName;
	}

	public function getId() {
		return $this->getKey();
	}

	public function getLoginName() {
		return static::$loginAttribute;
	}

	public function getLogin() {
		return $this->{$this->getLoginName()};
	}

	public function getPasswordName() {
		return 'password';
	}

	public function getPassword() {
		return $this->{$this->getPasswordName()};
	}

	public function getPermissions() {
		return $this->permissions;
	}

	public function getPersistCode() {
		$this->persist_code = $this->getRandomString();
		$persistCode = $this->persist_code;
		unset($this->mergedPermissions);
		$this->save();
		return $persistCode;
	}

	public function checkPersistCode($persistCode) {
		if ( ! $persistCode) {
			return false;
		}
		return $persistCode === $this->persist_code;
	}

	public function getActivationCode() {
		$this->activation_code = $activationCode = $this->getRandomString();
		unset($this->mergedPermissions);
		$this->save();
		return $activationCode;
	}

	public function getResetPasswordCode() {
		$this->reset_password_code = $resetCode = $this->getRandomString();
		unset($this->mergedPermissions);
		$this->save();
		return $resetCode;
	}

	public function checkResetPasswordCode($resetCode) {
		return ($this->reset_password_code == $resetCode);
	}

	public function isActivated() {
		return (bool) $this->activated;
	}

	public function getActivatedAttribute($activated) {
		return (bool) $activated;
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

	public function getGroups() {
		if ( ! $this->userGroups) {
			$this->userGroups = $this->groups()->get();
		}

		return $this->userGroups;
	}

	public function invalidateMergedPermissionsCache() {
		$this->mergedPermissions = null;
	}

	public function invalidateUserGroupsCache() {
		$this->userGroups = null;
	}

	public function addGroup(UserGroupInterface $group) {
		if ( ! $this->inGroup($group)) {
			$this->groups()->attach($group);
			$this->invalidateUserGroupsCache();
			$this->invalidateMergedPermissionsCache();
		}

		return true;
	}

	public function removeGroup(UserGroupInterface $group) {
		if ($this->inGroup($group)) {
			$this->groups()->detach($group);
			$this->invalidateUserGroupsCache();
			$this->invalidateMergedPermissionsCache();
		}

		return true;
	}

	public function inGroup(USerGroupInterface $group) {
		foreach ($this->getGroups() as $_group) {
			if ($_group->getId() == $group->getId()) {
				return true;
			}
		}

		return false;
	}

	public function getMergedPermissions() {
		if ( ! $this->mergedPermissions) {
			$permissions = array();

			foreach ($this->getGroups() as $group) {
				$permissions = array_merge($permissions, $group->getPermissions());
			}

			$this->mergedPermissions = array_merge($permissions, $this->getPermissions());
		}

		return $this->mergedPermissions;
	}

	public function isSuperUser() {
		return $this->hasPermission('superuser');
	}

	public function hasAccess($permissions, $all = true) {
		if ($this->isSuperUser()) {
			return true;
		}

		return $this->hasPermission($permissions, $all);
	}

	public function hasPermission($permissions, $all = true) {
		$mergedPermissions = $this->getMergedPermissions();

		if ( ! is_array($permissions)) {
			$permissions = (array) $permissions;
		}

		foreach ($permissions as $permission) {
			$matched = true;

			if ((strlen($permission) > 1) and ends_with($permission, '*')) {
				$matched = false;

				foreach ($mergedPermissions as $mergedPermission => $value) {
					$checkPermission = substr($permission, 0, -1);
					if ($checkPermission != $mergedPermission and starts_with($mergedPermission, $checkPermission) and $value == 1) {
						$matched = true;
						break;
					}
				}
			}
			elseif ((strlen($permission) > 1) and starts_with($permission, '*')) {
				$matched = false;

				foreach ($mergedPermissions as $mergedPermission => $value) {
					$checkPermission = substr($permission, 1);

					if ($checkPermission != $mergedPermission and ends_with($mergedPermission, $checkPermission) and $value == 1) {
						$matched = true;
						break;
					}
				}
			}
			else {
				$matched = false;
				foreach ($mergedPermissions as $mergedPermission => $value) {
					if ((strlen($mergedPermission) > 1) and ends_with($mergedPermission, '*')) {
						$matched = false;
						$checkMergedPermission = substr($mergedPermission, 0, -1);
						if ($checkMergedPermission != $permission and starts_with($permission, $checkMergedPermission) and $value == 1) {
							$matched = true;
							break;
						}
					}
					elseif ($permission == $mergedPermission and $mergedPermissions[$permission] == 1) {
						$matched = true;
						break;
					}
				}
			}

			if ($all === true and $matched === false) {
				return false;
			}
			elseif ($all === false and $matched === true) {
				return true;
			}
		}

		if ($all === false) {
			return false;
		}

		return true;
	}

	public function hasAnyAccess(array $permissions) {
		return $this->hasAccess($permissions, false);
	}

	public function save(array $options = array()) {
		$this->validate();
		return parent::save($options);
	}

	public function delete() {
		$this->groups()->detach();
		return parent::delete();
	}

	public function validate() {
		if ( ! $login = $this->{static::$loginAttribute}) {
			throw new \Exception("A login is required for a user, none given.");
		}

		if ( ! $password = $this->getPassword()) {
			throw new \Exception("A password is required for user [$login], none given.");
		}

		$query = $this->newQuery();
		$persistedUser = $query->where($this->getLoginName(), '=', $login)->first();

		if ($persistedUser and $persistedUser->getId() != $this->getId()) {
			throw new \Exception("A user already exists with login [$login], logins must be unique for users.");
		}

		return true;
	}

	public function attemptActivation($activationCode) {
		if ($this->activated) {
			throw new \Exception('Cannot attempt activation on an already activated user.');
		}

		if ($activationCode == $this->activation_code) {
			$this->activation_code = null;
			$this->activated       = true;
			$this->activated_at    = $this->freshTimestamp();
			unset($this->mergedPermissions);
			return $this->save();
		}

		return false;
	}

	public function checkPassword($password) {
		return $this->checkHash($password, $this->getPassword());
	}

	public function attemptResetPassword($resetCode, $newPassword) {
		if ($this->checkResetPasswordCode($resetCode)) {
			$this->password = $newPassword;
			$this->reset_password_code = null;
			unset($this->mergedPermissions);
			return $this->save();
		}

		return false;
	}

	public function clearResetPassword() {
		if ($this->reset_password_code) {
			$this->reset_password_code = null;
			unset($this->mergedPermissions);
			$this->save();
		}
	}

	public function recordLogin() {
		$this->last_login = $this->freshTimestamp();
		unset($this->mergedPermissions);
		$this->save();
	}

	public function getHashableAttributes() {
		return $this->hashableAttributes;
	}

	public function checkHash($string, $hashedString) {
		if ( ! static::$hasher) {
			throw new \RuntimeException("A hasher has not been provided for the user.");
		}

		return static::$hasher->checkHash($string, $hashedString);
	}

	public static function setHasher(HasherInterface $hasher) {
		static::$hasher = $hasher;
	}

	public static function getHasher() {
		return static::$hasher;
	}

	public static function unsetHasher() {
		static::$hasher = null;
	}

	public function hash($string) {
		if ( ! static::$hasher) {
			throw new \RuntimeException("A hasher has not been provided for the user.");
		}
		return static::$hasher->hash($string);
	}

	public function getRandomString($length = 42) {
		if (function_exists('openssl_random_pseudo_bytes')) {
			$bytes = openssl_random_pseudo_bytes($length * 2);
			if ($bytes === false) {
				throw new \RuntimeException('Unable to generate random string.');
			}

			return substr(str_replace(array('/', '+', '='), '', base64_encode($bytes)), 0, $length);
		}

		$pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		return substr(str_shuffle(str_repeat($pool, 5)), 0, $length);
	}

	public function setAttribute($key, $value) {
		if (in_array($key, $this->hashableAttributes) and ! empty($value)) {
			$value = $this->hash($value);
		}

		return parent::setAttribute($key, $value);
	}

	public function getDates() {
		return array_merge(parent::getDates(), array('activated_at', 'last_login'));
	}

	public function toArray() {
		$result = parent::toArray();
		if (isset($result['activated'])) {
			$result['activated'] = $this->getActivatedAttribute($result['activated']);
		}

		if (isset($result['permissions'])) {
			$result['permissions'] = $this->getPermissionsAttribute($result['permissions']);
		}

		if (isset($result['suspended_at'])) {
			$result['suspended_at'] = $result['suspended_at']->format('Y-m-d H:i:s');
		}

		return $result;
	}

	public static function setLoginAttributeName($loginAttribute) {
		static::$loginAttribute = $loginAttribute;
	}

	public static function getLoginAttributeName() {
		return static::$loginAttribute;
	}

}