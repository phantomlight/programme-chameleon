<?php namespace App\Models\Agency\Provider;

use App\Jobs\EmailJob;
use App\Models\Agency\Interfaces\AgencyNotificationProviderInterface;
use Illuminate\Foundation\Bus\DispatchesJobs;

class AgencyNotificationProvider implements AgencyNotificationProviderInterface {

	use DispatchesJobs;
	protected $model = 'App\Models\Agency\Eloquent\AgencyNotificationModel';

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

	public function add($agency, array $data) {
		$model = $this->getModel();
		$data['agency_id'] = $agency->id;
		$model->fill($data);
		$model->save();

		if (env('APP_ENV') === 'production') {
			if ($user = $agency->user) {
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

	public function update($notification, $agency, array $data) {
		if ( ! $model = $this->findById($notification)) {
			throw new \Exception("Notification not found.", 1);
			return;
		}

		if ($model->agency_id !== $agency->id) {
			throw new \Exception("Notification does not belong to this agency", 1);
			return;
		}

		foreach ($data as $k=>$d) {
			if (isset($model->{$k})) $model->{$k} = $d;
		}

		$model->save();
		return $model;
	}

	public function remove($notification, $agency) {
		if ( ! $model = $this->findById($notification->id)) {
			throw new \Exception("Notification not found.", 1);
			return;
		}

		if ($model->contractor_id !== $agency->id) {
			throw new \Exception("Notification does not belong to this agency", 1);
			return;
		}

		$model->delete();
		return;
	}

}