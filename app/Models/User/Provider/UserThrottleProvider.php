<?php namespace App\Models\User\Provider;

use App\Models\User\Interfaces\UserThrottleProviderInterface;
use App\Models\User\Interfaces\UserModelInterface;
use App\Models\User\Interfaces\UserModelProviderInterface;

class UserThrottleProvider implements UserThrottleProviderInterface {

	protected $model = 'App\Models\User\Eloquent\UserThrottle';
	protected $enabled = true;
	protected $userProvider;

	public function __construct(UserModelProviderInterface $userProvider, $model = null) {
		$this->userProvider = $userProvider;

		if (isset($model)) {
			$this->model = $model;
		}
	}

	public function findByUser(UserModelInterface $user, $ipAddress = null) {
		$model = $this->createModel();
		$query = $model->where('user_id', '=', ($userId = $user->getId()));

		if ($ipAddress) {
			$query->where(function($query) use ($ipAddress) {
				$query->where('ip_address', '=', $ipAddress);
				$query->orWhere('ip_address', '=', NULL);
			});
		}

		if ( ! $throttle = $query->first()) {
			$throttle = $this->createModel();
			$throttle->user_id = $userId;
			if ($ipAddress) $throttle->ip_address = $ipAddress;
			$throttle->save();
		}

		return $throttle;
	}

	public function findByUserId($id, $ipAddress = null) {
		return $this->findByUser($this->userProvider->findById($id), $ipAddress);
	}

	public function findByUserLogin($login, $ipAddress = null) {
		return $this->findByUser($this->userProvider->findByLogin($login),$ipAddress);
	}

	public function enable() {
		$this->enabled = true;
	}

	public function disable() {
		$this->enabled = false;
	}

	public function isEnabled() {
		return $this->enabled;
	}

	public function createModel() {
		$class = '\\'.ltrim($this->model, '\\');
		return new $class;
	}

	public function setModel($model) {
		$this->model = $model;
	}

}