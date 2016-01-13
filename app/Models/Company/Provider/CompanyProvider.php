<?php namespace App\Models\Company\Provider;

use Carbon\Carbon;
use App\Utils\Hash;
use App\Models\Company\Interfaces\CompanyProviderInterface;

class CompanyProvider implements CompanyProviderInterface {

	protected $model = 'App\Models\Company\Eloquent\CompanyModel';

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

	public function updateVIP($company, $active) {
		if ($active) {
			$company->is_vip = true;
			$today = Carbon::now();
			$company->vip_start = Carbon::now();
			$company->vip_end = $today->addMonths(6);
		}
		else {
			$company->is_vip = false;
			$company->vip_start = '0000-00-00 00:00:00';
			$company->vip_end = '0000-00-00 00:00:00';
		}

		$company->save();

		$jobs = $company->jobs()->get();
		if (count($jobs) > 0) {
			foreach ($jobs as $job) {
				if ( ! $job->is_active) {
					$job->is_active = true;
					$job->save();
				}
			}
		}

		return $company;
	}

	public function update($data) {
		$company = \Company::getCompany();

		if ($data['password'] !== '') {
			$user = \User::getUser();
			$code = $user->getResetPasswordCode();
			$user->attemptResetPassword($code, $data['password']);
		}

		$data['socials'] = json_encode([
			'linkedin'	=>	$data['socials_linkedin'],
			'facebook'	=>	$data['socials_facebook'],
			'google'		=>	$data['socials_google'],
			'twitter'		=>	$data['socials_twitter'],
			'url'				=>	$data['socials_url'],
		]);

		$data['industry'] = json_encode($data['industry']);

		$skip = [
			'socials_linkedin',
			'socials_facebook',
			'socials_google',
			'socials_twitter',
			'socials_url',
			'password',
		];

		foreach ($data as $k=>$d) {
			if ( ! in_array($k, $skip)) {
				$company->{$k} = $d;
			}
		}

		$company->save();
		return $company;
	}

	public function getAll($paginate, $ipp) {
		$model = $this->getModel();
		if ($paginate) {
			return $model->orderBy('created_at', 'desc')->paginate($ipp);
		}
		return $model->orderBy('created_at', 'desc')->get();
	}

	public function getAllCompanies($data) {
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

	public function getByQuery($query, $paginate, $ipp) {
		$model = $this->getModel();

		if ($paginate) {
			return $model->where('name', 'like', '%' . $query . '%')->orderBy('created_at', 'desc')->paginate($ipp);
		}

		return $model->where('name', 'like', '%' . $query . '%')->orderBy('created_at', 'desc')->get();
	}

	public function addAffiliate($agency) {
		if ( ! $company = \Company::getCompany()) {
			throw new \Exception("You are not currently in a company account.", 1);
			return;
		}

		if ( ! $company->agencies->contains($agency->id)) {
			throw new \Exception("This agency has never made a request to you.", 1);
			return;
		}

		$company->agencies()->sync([$agency->id => ['status' => 'accept']], false);
		return $company;
	}

	public function removeAffiliate($agency) {
		if ( ! $company = \Company::getCompany()) {
			throw new \Exception("You are not currently in a company account.", 1);
			return;
		}

		if ( ! $company->agencies->contains($agency->id)) {
			throw new \Exception("This agency has never made a request to you.", 1);
			return;
		}

		$company->agencies()->detach($agency->id);
		return $company;
	}

	public function removeVip($company) {
		$company->is_vip = false;
		$company->save();
		return $company;
	}

	public function updateTimesheet($id, $company, $status) {
		if ( ! $timesheet = \Contractor::findTimesheetById($id)) {
			throw new \Exception("Timesheet not found", 1);
			return;
		}

		$job = $timesheet->job;

		if ($company->id !== $job->company_id) {
			throw new \Exception("Timesheet does not belong to the company.", 1);
			return;
		}

		if ($status) {
			$timesheet->auth_company = true;
			$timesheet->save();

			if ( ! is_null($job->agency_id) && ! $timesheet->auth_agency) {
				$_hash = new Hash();
				$_hash = $_hash->getHasher();
				
				if ($agency = \Agency::findAgencyById($job->agency_id)) {
					$notificationData = [
						'agency_id'	=>	$agency->id,
						'alert_from'	=>	'System: Programme Chameleon',
						'has_read'	=>	false,
						'title'	=>	'Timesheet "' . $timesheet->name . '" for "' . $job->title . '" has been accepted by "' . $company->name . '". Please authorise it.',
						'description'	=>	'Accepted by ' . $company->name,
						'url'		=>	route('agency.job.detail') . '?i=' . $_hash->encode($job->id),
					];

					\Agency::addNotification($agency, $notificationData);
				}
			}
			else {
				if ($contractor = $timesheet->contractor) {
					$notificationData = [
						'contractor_id'	=>	$contractor->id,
						'alert_from'	=>	'System: Programme Chameleon',
						'has_read'	=>	false,
						'title'	=>	'Your timesheet "' . $timesheet->name . '" for "' . $job->title . '" has been de-authorized.',
						'description'	=>	'De-authorize by ' . $company->name,
						'url'		=>	'#',
					];

					\Contractor::addNotification($contractor, $notificationData);
				}
			}
		}
		else {
			$timesheet->auth_company = false;
			$timesheet->save();

			if ( ! is_null($job->agency_id)) {
				if ($agency = \Agency::findAgencyById($job->agency_id)) {
					$notificationData = [
						'agency_id'	=>	$agency->id,
						'alert_from'	=>	'System: Programme Chameleon',
						'has_read'	=>	false,
						'title'	=>	'Timesheet "' . $timesheet->name . '" for "' . $job->title . '" has been de-authorized.',
						'description'	=>	'De-authorize by ' . $company->name,
						'url'		=>	'#',
					];

					\Agency::addNotification($agency, $notificationData);
				}
			}
		}

		return $timesheet;
	}

	public function updateExpense($id, $company, $status) {
		if ( ! $expense = \Contractor::findExpenseById($id)) {
			throw new \Exception("Expense not found.", 1);
			return;
		}

		$job = $expense->job;

		if ($company->id !== $job->company_id) {
			throw new \Exception("Expense does not belong to the company.", 1);
			return;
		}

		if ($status) {
			$expense->auth_company = true;
			$expense->save();

			if ( ! is_null($job->agency_id) && ! $expense->auth_agency) {
				$_hash = new Hash();
				$_hash = $_hash->getHasher();

				if ($agency = \Agency::findAgencyById($job->agency_id)) {
					$notificationData = [
						'agency_id'	=>	$agency->id,
						'alert_from'	=>	'System: Programme Chameleon',
						'has_read'	=>	false,
						'title'	=>	'Expense "' . $expense->title . '" for "' . $job->title . '" has been accepted by "' . $company->name . '". Please authorize it.',
						'description'	=>	'Accepted by ' . $company->name,
						'url'		=>	route('agency.job.detail') . '?i=' . $_hash->encode($job->id),
					];

					\Agency::addNotification($agency, $notificationData);
				}
			}
			else {
				if ($contractor = $expense->contractor) {
					$notificationData = [
						'contractor_id'	=>	$contractor->id,
						'alert_from'	=>	'System: Programme Chameleon',
						'has_read'	=>	false,
						'title'	=>	'Your expense "' . $expense->title . '" for "' . $job->title . '" has been accepted.',
						'description'	=>	'Accepted by ' . $company->name,
						'url'		=>	'#',
					];

					\Contractor::addNotification($contractor, $notificationData);
				}
			}
		}
		else {
			$expense->auth_company = false;
			$expense->save();

			if ($contractor = $expense->contractor) {
				$notificationData = [
					'contractor_id'	=>	$contractor->id,
					'alert_from'	=>	'System: Programme Chameleon',
					'has_read'	=>	false,
					'title'	=>	'Your expense "' . $expense->title . '" for "' . $job->title . '" has been de-authorized.',
					'description'	=>	'De-authorize by ' . $company->name,
					'url'		=>	'#',
				];

				\Contractor::addNotification($contractor, $notificationData);
			}

			if ( ! is_null($job->agency_id)) {
				if ($agency = \Agency::findAgencyById($job->agency_id)) {
					$notificationData = [
						'agency_id'	=>	$agency->id,
						'alert_from'	=>	'System: Programme Chameleon',
						'has_read'	=>	false,
						'title'	=>	'Expense "' . $expense->title . '" for "' . $job->title . '" has been de-authorized.',
						'description'	=>	'De-authorize by ' . $company->name,
						'url'		=>	'#',
					];

					\Agency::addNotification($agency, $notificationData);
				}
			}
		}

		return $expense;
	}

	public function updateBan($id, $ban) {
		if ( ! $model = $this->findById($id)) {
			throw new \Exception("Company not found", 1);
			return;
		}

		if ( ! $user = $model->user) {
			throw new \Exception("User not found", 1);
			return;
		}

		if ((! $throttle = \User::findThrottlerByUserId($user->id)) || ! $user->hasAccess('company')) {
			throw new \Exception("User is not company", 1);
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