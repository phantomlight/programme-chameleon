<?php namespace App\Models\Agency\Provider;

use App\Models\Agency\Interfaces\AgencyProviderInterface;
use App\Utils\File\FileUploader;
use App\Utils\Hash;
use Carbon\Carbon;
use Illuminate\Support\Str;

class AgencyProvider implements AgencyProviderInterface {

	protected $model = 'App\Models\Agency\Eloquent\AgencyModel';

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

	public function create($data) {
		$model = $this->createModel();
		$model->fill($data);
		$model->save();
		return $model;
	}

	public function findById($id) {
		$model = $this->getModel();
		return $model->where('id', $id)->first();
	}

	public function updateVIP($agency, $active) {
		if ($active) {
			$agency->is_vip = true;
			$today = Carbon::now();
			$agency->vip_start = Carbon::now();
			$agency->vip_end = $today->addMonths(6);
		}
		else {
			$agency->is_vip = false;
			$agency->vip_start = '0000-00-00 00:00:00';
			$agency->vip_end = '0000-00-00 00:00:00';
		}

		$agency->save();

		$jobs = $agency->jobs()->get();
		if (count($jobs) > 0) {
			foreach ($jobs as $job) {
				if ( ! $job->is_active) {
					$job->is_active = true;
					$job->save();
				}
			}
		}

		return $agency;
	}

	public function getAllAgencies($data) {
		$model = $this->createModel();
		if (isset($data['search'])) {
			$model = $model->where('name', 'like', '%' . $data['search'] . '%');
		}

		if (isset($data['limit'])) {
			$model->take($data['limit']);
		}
		else {
			$model->take(100);
		}

		$model->orderBy('created_at', 'desc');
		return $model->get();
	}

	public function addAffiliate($company) {
		if ( ! $agency = \Agency::getAgency() ) {
			throw new \Exception("Agency not found.", 1);
			return;
		}

		if ($agency->companies->contains($company->id)) {
			throw new \Exception("You have already make this company as your affiliate.", 1);
			return;
		}

		$agency->companies()->attach($company->id, ['status' => 'request']);
		return $agency;
	}

	public function removeAffiliate($company) {
		if ( ! $agency = \Agency::getAgency() ) {
			throw new \Exception("Agency not found.", 1);
			return;
		}

		if ( ! $agency->companies->contains($company->id)) {
			throw new \Exception("You never make this company your affiliate.", 1);
			return;
		}

		$agency->companies()->detach($company->id);
		return $agency;
	}

	public function update($data) {
		if ( ! $agency = \Agency::getAgency()) {
			throw new \Exception("You are not in agency account.", 1);
			return;
		}

		foreach ($data as $k=>$d) {
			if (isset($agency->{$k})) $agency->{$k} = $d;
		}

		$agency->save();
		return $agency;
	}

	public function updateAvatar($file) {
		if ( ! $agency = \Agency::getAgency()) {
			throw new \Exception("You are not in agency account.", 1);
			return;
		}

		if ( ! is_null($agency->image)) {
			if (\File::exists(public_path() . '/' . $agency->image)) {
				\File::delete(public_path() . '/' . $agency->image);
			}
		}

		$uploader = new FileUploader;
		$location = 'uploads/agency/' . $agency->id . '/images/' . date('m') . '/';

		try {
			$uploadedFile = $uploader->upload($file, $location);
			$agency->image = $uploadedFile;
			$agency->updated_at = Carbon::now();
			$agency->save();
			session(['_sess_agency' => ['model'=> $agency]]);
			return $agency;
		}
		catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			return;
		}
	}

	public function updateTimesheet($id, $agency, $status) {
		if ( ! $timesheet = \Contractor::findTimesheetById($id)) {
			throw new \Exception("Timesheet not found", 1);
			return;
		}

		$job = $timesheet->job;

		if ($agency->id !== $job->agency_id) {
			throw new \Exception("Timesheet does not belong to the agency.", 1);
			return;
		}

		if ($status) {
			$timesheet->auth_agency = true;
			$timesheet->save();

			if ($contractor = $timesheet->contractor) {
				$notificationData = [
					'contractor_id'	=>	$contractor->id,
					'alert_from'	=>	'System: Programme Chameleon',
					'has_read'	=>	false,
					'title'	=>	'Your timesheet "' . $timesheet->name . '" for "' . $job->title . '" has been accepted.',
					'description'	=>	'Accepted by ' . $agency->name,
					'url'		=>	'#',
				];

				\Contractor::addNotification($contractor, $notificationData);
			}

			if ( ! is_null($job->company_id)) {
				if ($company = \Company::findCompanyById($job->company_id)) {
					$_hash = new Hash();
					$_hash = $_hash->getHasher();

					$notificationData = [
						'company_id'	=>	$company->id,
						'alert_from'	=>	'System: Programme Chameleon',
						'has_read'	=>	false,
						'title'	=>	'Timesheet "' . $timesheet->name . '" for "' . $job->title . '" has been accepted.',
						'description'	=>	'Accepted by ' . $agency->name,
						'url'		=>	route('company.job.detail') . '?i=' . $_hash->encode($job->id),
					];

					\Company::addNotification($company, $notificationData);
				}
			}
		}
		else {
			$timesheet->auth_agency = true;
			$timesheet->save();

			if ($contractor = $timesheet->contractor) {
				$notificationData = [
					'contractor_id'	=>	$contractor->id,
					'alert_from'	=>	'System: Programme Chameleon',
					'has_read'	=>	false,
					'title'	=>	'Your timesheet "' . $timesheet->name . '" for "' . $job->title . '" has been accepted.',
					'description'	=>	'Accepted by ' . $agency->name,
					'url'		=>	'#',
				];

				\Contractor::addNotification($contractor, $notificationData);
			}

			if ( ! is_null($job->company_id)) {
				if ($company = \Company::findCompanyById($job->company_id)) {
					$_hash = new Hash();
					$_hash = $_hash->getHasher();

					$notificationData = [
						'company_id'	=>	$company->id,
						'alert_from'	=>	'System: Programme Chameleon',
						'has_read'	=>	false,
						'title'	=>	'Timesheet "' . $timesheet->name . '" for "' . $job->title . '" has been accepted.',
						'description'	=>	'Accepted by ' . $agency->name,
						'url'		=>	route('agency.job.detail') . '?i=' . $_hash->encode($job->id),
					];

					\Company::addNotification($company, $notificationData);
				}
			}
		}

		return $timesheet;
	}

	public function updateExpense($id, $agency, $status) {
		if ( ! $expense = \Contractor::findExpenseById($id)) {
			throw new \Exception("Expense not found", 1);
			return;
		}

		$job = $expense->job;

		if ($agency->id !== $job->agency_id) {
			throw new \Exception("Expense does not belong to the agency.", 1);
			return;
		}

		if ($status) {
			$expense->auth_agency = true;
			$expense->save();

			if ($contractor = $expense->contractor) {
				$notificationData = [
					'contractor_id'	=>	$contractor->id,
					'alert_from'	=>	'System: Programme Chameleon',
					'has_read'	=>	false,
					'title'	=>	'Your expense "' . $expense->title . '" for "' . $job->title . '" has been accepted.',
					'description'	=>	'Accepted by ' . $agency->name,
					'url'		=>	'#',
				];

				\Contractor::addNotification($contractor, $notificationData);
			}

			if ( ! is_null($job->company_id)) {
				$_hash = new Hash();
				$_hash = $_hash->getHasher();

				if ($company = \Company::findCompanyById($job->company_id)) {
					$notificationData = [
						'company_id'	=>	$company->id,
						'alert_from'	=>	'System: Programme Chameleon',
						'has_read'	=>	false,
						'title'	=>	'Expense "' . $expense->title . '" for "' . $job->title . '" has been accepted.',
						'description'	=>	'Accepted by ' . $agency->name,
						'url'		=>	route('company.job.detail') . '?i=' . $_hash->encode($job->id),
					];

					\Company::addNotification($company, $notificationData);
				}
			}
		}
		else {
			$expense->auth_agency = true;
			$expense->save();

			if ($contractor = $expense->contractor) {
				$notificationData = [
					'contractor_id'	=>	$contractor->id,
					'alert_from'	=>	'System: Programme Chameleon',
					'has_read'	=>	false,
					'title'	=>	'Your expense "' . $expense->title . '" for "' . $job->title . '" has been de-authorized.',
					'description'	=>	'De-authorize by ' . $agency->name,
					'url'		=>	'#',
				];

				\Contractor::addNotification($contractor, $notificationData);
			}

			if ( ! is_null($job->company_id)) {
				if ($company = \Company::findCompanyById($job->company_id)) {
					$_hash = new Hash();
					$_hash = $_hash->getHasher();

					$notificationData = [
						'company_id'	=>	$company->id,
						'alert_from'	=>	'System: Programme Chameleon',
						'has_read'	=>	false,
						'title'	=>	'Expense "' . $expense->title . '" for "' . $job->title . '" has been de-authorized.',
						'description'	=>	'De-authorize by ' . $agency->name,
						'url'		=>	route('agency.job.detail') . '?i=' . $_hash->encode($job->id),
					];

					\Company::addNotification($company, $notificationData);
				}
			}
		}

		return $expense;
	}

	public function updateBan($id, $ban) {
		if ( ! $model = $this->findById($id)) {
			throw new \Exception("Agency not found", 1);
			return;
		}

		if ( ! $user = $model->user) {
			throw new \Exception("User not found", 1);
			return;
		}

		if ((! $throttle = \User::findThrottlerByUserId($user->id)) || ! $user->hasAccess('agency')) {
			throw new \Exception("User is not agency", 1);
			return;
		}

		if ($ban === 'true') $throttle->ban();
		else {
			$throttle->unban();
			if ($throttle->isSuspended()) {
				$throttle->unsuspend();
			}
		}

		return true;
	}

}