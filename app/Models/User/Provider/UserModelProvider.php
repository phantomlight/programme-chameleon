<?php namespace App\Models\User\Provider;

use App\Models\User\Interfaces\UserModelProviderInterface;
use App\Models\User\Interfaces\UserGroupInterface;
use App\Utils\Hashing\HasherInterface;

class UserModelProvider implements UserModelProviderInterface {

	protected $model = 'App\Models\User\Eloquent\UserModel';
	protected $hasher;

	public function __construct(HasherInterface $hasher, $model = null) {
		$this->hasher = $hasher;
		if (isset($model)) {
			$this->model = $model;
		}
		$this->setupHasherWithModel();
	}

	public function setupHasherWithModel() {
		if (method_exists($this->model, 'setHasher')) {
			forward_static_call_array(array($this->model, 'setHasher'), array($this->hasher));
		}
	}

	public function createModel() {
		$class = '\\'.ltrim($this->model, '\\');
		return new $class;
	}

	public function setModel($model) {
		$this->model = $model;
		$this->setupHasherWithModel();
	}

	public function getEmptyUser() {
		return $this->createModel();
	}

	public function findById($id) {
		$model = $this->createModel();
		if ( ! $user = $model->newQuery()->find($id)) {
			throw new \Exception("A user could not be found with ID [$id].");
		}
		return $user;
	}

	public function findByLogin($login) {
		$model = $this->createModel();
		if ( ! $user = $model->newQuery()->where($model->getLoginName(), '=', $login)->first()) {
			throw new \Exception("A user could not be found with login name [$login].");
		}

		return $user;
	}

	public function findByCredentials(array $credentials) {
		$model     = $this->createModel();
		$loginName = $model->getLoginName();

		if ( ! array_key_exists($loginName, $credentials)) {
			throw new \InvalidArgumentException("Login attribute [$loginName] was not provided.");
		}

		$passwordName = $model->getPasswordName();
		$query              = $model->newQuery();
		$hashableAttributes = $model->getHashableAttributes();
		$hashedCredentials  = array();

		foreach ($credentials as $credential => $value) {
			if (in_array($credential, $hashableAttributes)) {
				$hashedCredentials = array_merge($hashedCredentials, array($credential => $value));
			}
			else {
				$query = $query->where($credential, '=', $value);
			}
		}

		if ( ! $user = $query->first()) {
			throw new \Exception("User not found.");
		}

		foreach ($hashedCredentials as $credential => $value) {
			if ( ! $this->hasher->checkhash($value, $user->{$credential})) {
				$message = "User with that credential is found, however password does not match.";
				if ($credential == $passwordName) {
					throw new \Exception($message);
				}
				throw new \Exception($message);
			}
			else if ($credential == $passwordName) {
				if (method_exists($this->hasher, 'needsRehashed') && 
					$this->hasher->needsRehashed($user->{$credential})) {
					$user->{$credential} = $value;
					$user->save();
				}
			}
		}

		return $user;
	}

	public function findByActivationCode($code) {
		if ( ! $code) {
			throw new \InvalidArgumentException("No activation code found.");
		}

		$model = $this->createModel();
		$result = $model->newQuery()->where('activation_code', '=', $code)->get();

		if (($count = $result->count()) > 1) {
			throw new \RuntimeException("A user is found with the same activation code.");
		}

		if ( ! $user = $result->first()) {
			throw new \Exception("No user found with that activation code.");
		}

		return $user;
	}

	public function findByResetPasswordCode($code) {
		$model = $this->createModel();
		$result = $model->newQuery()->where('reset_password_code', '=', $code)->get();

		if (($count = $result->count()) > 1) {
			throw new \RuntimeException("A user is found with the same reset code.");
		}

		if ( ! $user = $result->first()) {
			throw new \Exception("No user found with that reset code.");
		}

		return $user;
	}

	public function findAll() {
		return $this->createModel()->newQuery()->get()->all();
	}

	public function findAllInGroup(UserGroupInterface $group) {
		return $group->users()->get();
	}

	public function create(array $credentials) {
		$user = $this->createModel();
		$user->fill($credentials);
		$user->save();
		return $user;
	}

	public function findAllWithAccess($permissions) {
		return array_filter($this->findAll(), function($user) use ($permissions) {
			return $user->hasAccess($permissions);
		});
	}

	public function findAllWithAnyAccess(array $permissions) {
		return array_filter($this->findAll(), function($user) use ($permissions) {
			return $user->hasAnyAccess($permissions);
		});
	}

}