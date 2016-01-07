<?php namespace App\Models\NewsLetter\Provider;

use App\Models\NewsLetter\Interfaces\NewsLetterProviderInterface;

class NewsLetterProvider implements NewsLetterProviderInterface {

	protected $model = 'App\Models\NewsLetter\Eloquent\NewsLetterModel';

	public function __construct($model=null) {
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

	public function getModel() {
		return $this->createModel();
	}

	public function findByEmail($email) {
		$model = $this->getModel();
		return $model->where('email', strtolower($email))->first();
	}

	public function getAll() {
		$model = $this->getModel();
		return $model->orderBy('created_at', 'desc')->get();
	}

	public function register($email) {
		if ( $check = $this->findByEmail($email) ) {
			throw new \Exception("You have already registered to the list.", 1);
			return;
		}

		$model = $this->getModel();

		$model->fill([
			'email'		=>	strtolower($email),
			'active'	=>	true,
		]);

		$model->save();
		return $model;
	}

	public function remove($email) {
		if ( ! $model = $this->findByEmail($email) ) {
			throw new \Exception("You are not subscribed to the list.", 1);
			return;
		}

		$model->delete();
		return true;
	}

}