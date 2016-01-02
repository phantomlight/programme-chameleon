<?php namespace App\Models\Company\Provider;

use App\Jobs\EmailJob;
use Illuminate\Foundation\Bus\DispatchesJobs;
use App\Models\Company\Interfaces\CompanyNotificationProviderInterface;

class CompanyNotificationProvider implements CompanyNotificationProviderInterface {
	
	use DispatchesJobs;
	protected $model = 'App\Models\Company\Eloquent\CompanyNotificationModel';

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

	public function findById($id) {
		$model = $this->getModel();
		return $model->where('id', $id)->first();
	}

	public function add($company, array $data) {
		$model = $this->getModel();
		$model->fill($data);
		$model->save();

		if (env('APP_ENV') === 'production') {
			if ($user = $company->user) {
				$mailData = [
					'layout'	=>	'emails.notification',
					'data'		=>	[
						'description'	=>	isset($data['description']) ? $data['description'] : null,
						'url'					=>	(isset($data['url']) ? ($data['url'] !== '' || $data['url'] !== '#' ? $data['url'] : null) : null),
					],
					'subject'			=>	$data['title'],
					'from_email'	=>	'noreply@programmechameleon.com',
					'to_email'		=>	$user->email,
				];
				$job = (new EmailJob($mailData))->onQueue('email-queue');
				$this->dispatch($job);
			}
		}

		return $model;
	}

	public function update($notification, $company, array $data) {
		if ( ! $model = $this->findById($notification)) {
			throw new \Exception("Notification not found.", 1);
			return;
		}

		if ($model->company_id !== $company->id) {
			throw new \Exception("Notification does not belong to this company", 1);
			return;
		}

		foreach ($data as $k=>$d) {
			if (isset($model->{$k})) $model->{$k} = $d;
		}

		$model->save();
		return $model;
	}

	public function remove($notification, $company) {
		if ( ! $model = $this->findById($notification->id)) {
			throw new \Exception("Notification not found.", 1);
			return;
		}

		if ($model->contractor_id !== $company->id) {
			throw new \Exception("Notification does not belong to this company", 1);
			return;
		}

		$model->delete();
		return;
	}
	
}