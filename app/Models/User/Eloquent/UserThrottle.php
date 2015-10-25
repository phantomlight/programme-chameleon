<?php namespace App\Models\User\Eloquent;

use Eloquent;
use DateTime;
use App\Models\User\Interfaces\UserThrottleInterface;

class UserThrottle extends Eloquent implements UserThrottleInterface {

	public $timestamps = false;

	protected $table = 'tb_users_throttle';
	protected $enabled = true;
	protected $guarded = [];
	protected $hidden = [];
	
	protected static $userModel = 'App\Models\User\Eloquent\UserModel';
	protected static $attemptLimit = 5;
	protected static $suspensionTime = 15;

	public function user() {
		return $this->belongsTo(static::$userModel, 'user_id');
	}

	public static function setUserModel($model) {
		static::$userModel = $model;
	}

	public function getUser() {
		return $this->user()->getResults();
	}

	public function getLoginAttempts() {
		if ($this->attempts > 0 and $this->last_attempt_at) {
			$this->clearLoginAttemptsIfAllowed();
		}

		return $this->attempts;
	}

	public function getRemainingLoginAttempts() {
		return static::getAttemptLimit() - $this->getLoginAttempts();
	}

	public function addLoginAttempt() {
		$this->attempts++;
		$this->last_attempt_at = $this->freshTimeStamp();

		if ($this->getLoginAttempts() >= static::$attemptLimit) {
			$this->suspend();
		}
		else {
			$this->save();
		}
	}

	public function clearLoginAttempts() {
		if ($this->getLoginAttempts() == 0 or $this->suspended) {
			return;
		}

		$this->attempts        = 0;
		$this->last_attempt_at = null;
		$this->suspended       = false;
		$this->suspended_at    = null;
		$this->save();
	}

	public function suspend() {
		if ( ! $this->suspended) {
			$this->suspended    = true;
			$this->suspended_at = $this->freshTimeStamp();
			$this->save();
		}
	}

	public function unsuspend() {
		if ($this->suspended) {
			$this->attempts        = 0;
			$this->last_attempt_at = null;
			$this->suspended       = false;
			$this->suspended_at    = null;
			$this->save();
		}
	}

	public function isSuspended() {
		if ($this->suspended and $this->suspended_at) {
			$this->removeSuspensionIfAllowed();
			return (bool) $this->suspended;
		}

		return false;
	}

	public function ban() {
		if ( ! $this->banned) {
			$this->banned = true;
			$this->banned_at = $this->freshTimeStamp();
			$this->save();
		}
	}

	public function unban() {
		if ($this->banned) {
			$this->banned = false;
			$this->banned_at = null;
			$this->save();
		}
	}

	public function isBanned() {
		return $this->banned;
	}

	public function check() {
		if ($this->isBanned()) {
			throw new \Exception(sprintf(
				'User [%s] has been banned.',
				$this->getUser()->getLogin()
			));
		}

		if ($this->isSuspended()) {
			throw new \Exception(sprintf(
				'User [%s] has been suspended.',
				$this->getUser()->getLogin()
			));
		}

		return true;
	}

	public function clearLoginAttemptsIfAllowed() {
		$lastAttempt = clone $this->last_attempt_at;

		$suspensionTime  = static::$suspensionTime;
		$clearAttemptsAt = $lastAttempt->modify("+{$suspensionTime} minutes");
		$now             = $this->freshTimestamp();

		if ($clearAttemptsAt <= $now) {
			$this->attempts = 0;
			$this->save();
		}

		unset($lastAttempt);
		unset($clearAttemptsAt);
		unset($now);
	}

	public function removeSuspensionIfAllowed() {
		$suspended = clone $this->suspended_at;

		$suspensionTime = static::$suspensionTime;
		$unsuspendAt    = $suspended->modify("+{$suspensionTime} minutes");
		$now            = $this->freshTimestamp();

		if ($unsuspendAt <= $now) {
			$this->unsuspend();
		}

		unset($suspended);
		unset($unsuspendAt);
		unset($now);
	}

	public function getSuspendedAttribute($suspended) {
		return (bool) $suspended;
	}

	public function getBannedAttribute($banned) {
		return (bool) $banned;
	}

	public function getDates() {
		return array_merge(parent::getDates(), array('last_attempt_at', 'suspended_at', 'banned_at'));
	}

	public function toArray() {
		$result = parent::toArray();

		if (isset($result['suspended'])) {
			$result['suspended'] = $this->getSuspendedAttribute($result['suspended']);
		}
		if (isset($result['banned'])) {
			$result['banned'] = $this->getBannedAttribute($result['banned']);
		}
		if (isset($result['last_attempt_at']) and $result['last_attempt_at'] instanceof DateTime) {
			$result['last_attempt_at'] = $result['last_attempt_at']->format('Y-m-d H:i:s');
		}
		if (isset($result['suspended_at']) and $result['suspended_at'] instanceof DateTime) {
			$result['suspended_at'] = $result['suspended_at']->format('Y-m-d H:i:s');
		}

		return $result;
	}

	public static function getAttemptLimit() {
		return static::$attemptLimit;
	}

	public static function setAttemptLimit($limit) {
		static::$attemptLimit = (int) $limit;
	}

	public static function getSuspensionTime() {
		return static::$suspensionTime;
	}

	public static function setSuspensionTime($minutes) {
		static::$suspensionTime = (int) $minutes;
	}

	public function getRemainingSuspensionTime() {
		if( ! $this->isSuspended()) return 0;

		$lastAttempt = clone $this->last_attempt_at;

		$suspensionTime  = static::$suspensionTime;
		$clearAttemptsAt = $lastAttempt->modify("+{$suspensionTime} minutes");
		$now             = $this->freshTimestamp();

		$timeLeft = $clearAttemptsAt->diff($now);

		$minutesLeft = ($timeLeft->s != 0 ?
						($timeLeft->days * 24 * 60) + ($timeLeft->h * 60) + ($timeLeft->i) + 1 :
						($timeLeft->days * 24 * 60) + ($timeLeft->h * 60) + ($timeLeft->i));

		return $minutesLeft;
	}

}