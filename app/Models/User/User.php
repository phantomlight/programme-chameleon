<?php namespace App\Models\User;

use App\Utils\Session\SessionInterface;
use App\Utils\Session\IlluminateSession;
use App\Utils\Cookie\CookieInterface;
use App\Utils\Cookie\IlluminateCookie;
use App\Utils\Hashing\NativeHasher;
use App\Models\User\Interfaces\UserModelInterface;
use App\Models\User\Interfaces\UserThrottleInterface;
use App\Models\User\Interfaces\UserGroupInterface;
use App\Models\User\Interfaces\UserModelProviderInterface;
use App\Models\User\Interfaces\UserGroupProviderInterface;
use App\Models\User\Interfaces\UserThrottleProviderInterface;
use App\Models\User\Provider\UserModelProvider;
use App\Models\User\Provider\UserThrottleProvider;
use App\Models\User\Provider\UserGroupProvider;

class User {

	protected $user, $session, $cookie, $userProvider, $groupProvider, $throttleProvider;
	protected $ipAddress = '0.0.0.0';
	
	public function __construct(
		UserModelProviderInterface $userProvider = null,
		UserGroupProviderInterface $groupProvider = null,
		UserThrottleProviderInterface $throttleProvider = null,
		SessionInterface $session = null,
		CookieInterface $cookie = null,
		$ipAddress = null
		) {
		$this->userProvider    	= $userProvider ?: new UserModelProvider(new NativeHasher);
		$this->groupProvider    = $groupProvider ?: new UserGroupProvider;
		$this->throttleProvider = $throttleProvider ?: new UserThrottleProvider($this->userProvider);

		$this->session          = $session ?: new NativeSession;
		$this->cookie           = $cookie ?: new NativeCookie;

		if (isset($ipAddress)) {
			$this->ipAddress = $ipAddress;
		}
	}

	public function __call($method, $parameters) {
		if (isset($this->user)) {
			return call_user_func_array(array($this->user, $method), $parameters);
		}
		throw new \BadMethodCallException("Method [$method] is not supported.");
	}

	public function register(array $credentials, $activate = false) {
		$user = $this->userProvider->create($credentials);

		if ($activate) {
			$user->attemptActivation($user->getActivationCode());
		}
		
		return $this->user = $user;
	}

	public function authenticate(array $credentials, $remember = false) {
		$loginName = $this->userProvider->getEmptyUser()->getLoginName();
		$loginCredentialKey = (isset($credentials[$loginName])) ? $loginName : 'login';

		if (empty($credentials[$loginCredentialKey])) {
			throw new \Exception("The [$loginCredentialKey] attribute is required.");
		}

		if (empty($credentials['password'])) {
			throw new \Exception('The password attribute is required.');
		}

		if ($loginCredentialKey !== $loginName) {
			$credentials[$loginName] = $credentials[$loginCredentialKey];
			unset($credentials[$loginCredentialKey]);
		}

		if ($throttlingEnabled = $this->throttleProvider->isEnabled()) {
			if ($throttle = $this->throttleProvider->findByUserLogin($credentials[$loginName], $this->ipAddress)) {
				$throttle->check();
			}
		}

		try {
			$user = $this->userProvider->findByCredentials($credentials);
		}
		catch (\Exception $e) {
			if ($throttlingEnabled and isset($throttle)) {
				$throttle->addLoginAttempt();
			}
			throw $e;
		}

		if ($throttlingEnabled and isset($throttle)) {
			$throttle->clearLoginAttempts();
		}

		$user->clearResetPassword();
		$this->login($user, $remember);
		return $this->user;
	}

	public function authenticateAndRemember(array $credentials) {
		return $this->authenticate($credentials, true);
	}

	public function loginAndRemember(UserModelInterface $user) {
		$this->login($user, true);
	}

	public function check() {
		if (is_null($this->user)) {
			if ( ! $userArray = $this->session->get('user') and ! $userArray = $this->cookie->get('user')) {
				return false;
			}

			if ( ! is_array($userArray) or count($userArray) !== 2) {
				return false;
			}

			list($id, $persistCode) = $userArray;

			try {
				$user = $this->getUserProvider()->findById($id);
			}
			catch (\Exception $e) {
				return false;
			}

			if ( ! $user->checkPersistCode($persistCode)) {
				return false;
			}

			$this->user = $user;
		}

		if ( ! $user = $this->getUser() or ! $user->isActivated()) {
			return false;
		}

		if( $this->getThrottleProvider()->isEnabled()) {
			$throttle = $this->getThrottleProvider()->findByUser( $user );

			if( $throttle->isBanned() or $throttle->isSuspended()) {
				$this->logout();
				return false;
			}
		}

		return true;
	}

	public function login(UserModelInterface $user, $remember = false) {
		if ( ! $user->isActivated()) {
			$login = $user->getLogin();
			throw new \Exception("Cannot login user [$login] as they are not activated.");
		}

		$this->user = $user;
		$toPersist = array($user->getId(), $user->getPersistCode());
		$this->session->put('user', $toPersist);

		if ($remember) {
			$this->cookie->forever('user', $toPersist);
		}

		$user->recordLogin();
	}

	public function logout() {
		$this->user = null;
		$this->session->forget('user');
		$this->cookie->forget('user');
	}

	public function setUser(UserModelInterface $user) {
		$this->user = $user;
	}

	public function getUser() {
		if (is_null($this->user)) {
			$this->check();
		}

		return $this->user;
	}

	public function setSession(SessionInterface $session) {
		$this->session = $session;
	}

	public function getSession() {
		return $this->session;
	}

	public function setCookie(CookieInterface $cookie) {
		$this->cookie = $cookie;
	}

	public function getCookie() {
		return $this->cookie;
	}

	public function setGroupProvider(UserGroupProviderInterface $groupProvider) {
		$this->groupProvider = $groupProvider;
	}

	public function getGroupProvider() {
		return $this->groupProvider;
	}

	public function setUserProvider(UserModelProviderInterface $userProvider) {
		$this->userProvider = $userProvider;
	}

	public function getUserProvider() {
		return $this->userProvider;
	}

	public function setThrottleProvider(UserThrottleProviderInterface $throttleProvider) {
		$this->throttleProvider = $throttleProvider;
	}

	public function getThrottleProvider() {
		return $this->throttleProvider;
	}

	public function setIpAddress($ipAddress) {
		$this->ipAddress = $ipAddress;
	}

	public function getIpAddress() {
		return $this->ipAddress;
	}

	public function findGroupById($id) {
		return $this->groupProvider->findById($id);
	}

	public function findGroupByName($name) {
		return $this->groupProvider->findByName($name);
	}

	public function findAllGroups() {
		return $this->groupProvider->findAll();
	}

	public function createGroup(array $attributes) {
		return $this->groupProvider->create($attributes);
	}

	public function findUserById($id) {
		return $this->userProvider->findById($id);
	}

	public function findUserByLogin($login) {
		return $this->userProvider->findByLogin($login);
	}

	public function findUserByCredentials(array $credentials){
		return $this->userProvider->findByCredentials($credentials);
	}

	public function findUserByActivationCode($code) {
		return $this->userProvider->findByActivationCode($code);
	}

	public function findUserByResetPasswordCode($code) {
		return $this->userProvider->findByResetPasswordCode($code);
	}

	public function findAllUsers() {
		return $this->userProvider->findAll();
	}

	public function findAllUsersInGroup($group) {
		return $this->userProvider->findAllInGroup($group);
	}

	public function findAllUsersWithAccess($permissions) {
		return $this->userProvider->findAllWithAccess($permissions);
	}

	public function findAllUsersWithAnyAccess(array $permissions) {
		return $this->userProvider->findAllWithAnyAccess($permissions);
	}

	public function createUser(array $credentials) {
		return $this->userProvider->create($credentials);
	}

	public function getEmptyUser() {
		return $this->userProvider->getEmptyUser();
	}

	public function findThrottlerByUserId($id, $ipAddress = null) {
		return $this->throttleProvider->findByUserId($id, $ipAddress);
	}

	public function findThrottlerByUserLogin($login, $ipAddress = null) {
		return $this->throttleProvider->findByUserLogin($login, $ipAddress);
	}

}