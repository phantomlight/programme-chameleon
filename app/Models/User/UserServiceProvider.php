<?php namespace App\Models\User;

use Illuminate\Support\ServiceProvider;

use App\Models\User\Provider\UserModelProvider;
use App\Models\User\Provider\UserGroupProvider;
use App\Models\User\Provider\UserThrottleProvider;
use App\Models\User\User;

use App\Utils\Hashing\NativeHasher;
use App\Utils\Hashing\BcryptHasher;
use App\Utils\Hashing\Sha256Hasher;
use App\Utils\Hashing\WhirlpoolHasher;
use App\Utils\Session\IlluminateSession;
use App\Utils\Cookie\IlluminateCookie;

class UserServiceProvider extends ServiceProvider {

	public function boot() {
    $this->mergeConfigFrom(__DIR__.'/../../../config/user/config.php', 'user'); 
	}

	public function register() {
		$this->registerHasher();
		$this->registerUserProvider();
		$this->registerGroupProvider();
		$this->registerThrottleProvider();
		$this->registerSession();
		$this->registerCookie();
		$this->registerUser();
	}

	protected function registerHasher() {
		$this->app['hasher'] = $this->app->share(function($app) {
			$hasher = config('user.hasher');

			switch ($hasher) {
				case 'native':
					return new NativeHasher;
					break;

				case 'bcrypt':
					return new BcryptHasher;
					break;

				case 'sha256':
					return new Sha256Hasher;
					break;

				case 'whirlpool':
					return new WhirlpoolHasher;
					break;
			}

			throw new \InvalidArgumentException("Invalid hasher [$hasher] chosen for User.");
		});
	}

	protected function registerUserProvider() {
		$this->app['user.model'] = $this->app->share(function($app) {
			$model = $app['config']['user::users.model'];

			if (method_exists($model, 'setLoginAttributeName')) {
				$loginAttribute = $app['config']['user::users.login_attribute'];

				forward_static_call_array(
					array($model, 'setLoginAttributeName'),
					array($loginAttribute)
				);
			}

			if (method_exists($model, 'setGroupModel')) {
				$groupModel = $app['config']['user:groups.model'];

				forward_static_call_array(
					array($model, 'setGroupModel'),
					array($groupModel)
				);
			}

			if (method_exists($model, 'setUserGroupsPivot')) {
				$pivotTable = $app['config']['user::user_groups_pivot_table'];

				forward_static_call_array(
					array($model, 'setUserGroupsPivot'),
					array($pivotTable)
				);
			}

			return new UserModelProvider($app['hasher'], $model);
		});
	}

	protected function registerGroupProvider() {
		$this->app['user.group'] = $this->app->share(function($app) {
			$model = $app['config']['user::groups.model'];

			if (method_exists($model, 'setUserModel')) {
				$userModel = $app['config']['user::users.model'];

				forward_static_call_array(
					array($model, 'setUserModel'),
					array($userModel)
				);
			}

			if (method_exists($model, 'setUserGroupsPivot')) {
				$pivotTable = $app['config']['user:user_groups_pivot_table'];

				forward_static_call_array(
					array($model, 'setUserGroupsPivot'),
					array($pivotTable)
				);
			}

			return new UserGroupProvider($model);
		});
	}

	protected function registerThrottleProvider() {
		$this->app['user.throttle'] = $this->app->share(function($app) {
			$model = $app['config']['user::throttling.model'];

			$throttleProvider = new UserThrottleProvider($app['user.model'], $model);

			if ($app['config']['user::throttling.enabled'] === false) {
				$throttleProvider->disable();
			}

			if (method_exists($model, 'setAttemptLimit')) {
				$attemptLimit = $app['config']['user::throttling.attempt_limit'];

				forward_static_call_array(
					array($model, 'setAttemptLimit'),
					array($attemptLimit)
				);
			}

			if (method_exists($model, 'setSuspensionTime')) {
				$suspensionTime = $app['config']['user::throttling.suspension_time'];

				forward_static_call_array(
					array($model, 'setSuspensionTime'),
					array($suspensionTime)
				);
			}
			
			if (method_exists($model, 'setUserModel')) {
				$userModel = $app['config']['user::users.model'];

				forward_static_call_array(
					array($model, 'setUserModel'),
					array($userModel)
				);
			}

			return $throttleProvider;
		});
	}

	protected function registerSession() {
		$this->app['user.session'] = $this->app->share(function($app) {
			$key = $app['config']['user::cookie.key'];
			return new IlluminateSession($app['session.store'], $key);
		});
	}

	protected function registerCookie() {
		$this->app['user.cookie'] = $this->app->share(function($app) {
			$key = $app['config']['user::cookie.key'];
			$strategy = 'request';
			if (preg_match('/^4\.0\.\d*$/D', $app::VERSION)) {
				$strategy = 'jar';
			}
			return new IlluminateCookie($app['request'], $app['cookie'], $key, $strategy);
		});
	}

	public function registerUser() {
		$this->app['user'] = $this->app->share(function($app) {
			return new User(
				$app['user.model'],
				$app['user.group'],
				$app['user.throttle'],
				$app['user.session'],
				$app['user.cookie'],
				$app['request']->getClientIp()
			);
		});

		$this->app->alias('user', 'App\Models\User\User');
	}
	
}