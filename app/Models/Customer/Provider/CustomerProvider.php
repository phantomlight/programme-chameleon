<?php namespace App\Models\Customer\Provider;

use App\Models\Customer\Interfaces\CustomerProviderInterface;

class CustomerProvider implements CustomerProviderInterface {
	protected $model = 'App\Models\Customer\Eloquent\CustomerModel';

	public function __construct($model = null) {
		if (isset($model)) {
			$this->model = $model;
		}
	}

	public function createModel() {
		$class = '\\'.ltrim($this->model, '\\');
		return new $class;
	}

	public function setModel($model) {
		$this->model = $model;
	}

	public function getEmptyCustomer() {
		return $this->createModel();
	}

	public function create(array $credentials) {
		$model = $this->createModel();
		$model->fill($credentials);
		$model->save();

		$this->sendWelcomeEmail($model);
		return $model;
	}

	public function sendWelcomeEmail($model) {
		$data = [
			'user'	=>	$model->user,
		];

		try {
			\Mail::send('email.welcome', $data, function ($message) use ($data) {
				$message->from('noreply@dealindo.com', 'DO NOT REPLY');
				$message->to($data['user']->email)->subject('Welcome to DealIndo');;
			});
		}
		catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			return;
		}
	}
}