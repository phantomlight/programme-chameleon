<?php namespace App\Models\Contractor;

use Illuminate\Support\ServiceProvider;

use App\Models\Contractor\Provider\ContractorProvider;
use App\Models\Contractor\Provider\ContractorExpenseProvider;
use App\Models\Contractor\Provider\ContractorNotificationProvider;
use App\Models\Contractor\Provider\ContractorResumeProvider;
use App\Models\Contractor\Provider\ContractorTimesheetProvider;

use App\Models\Contractor\Contractor;

class ContractorServiceProvider extends ServiceProvider {

	public function boot() {
    $this->mergeConfigFrom(__DIR__.'/../../../config/contractor/config.php', 'contractor');
	}

	public function register() {
		$this->registerContractorProvider();
		$this->registerContractorExpenseProvider();
		$this->registerContractorNotificationProvider();
		$this->registerContractorResumeProvider();
		$this->registerContractorTimesheetProvider();
		$this->registerContractor();
	}

	public function registerContractorProvider() {
		$this->app['contractor.model'] = $this->app->share(function($app) {
			$model = $app['config']['contractor::contractor.model'];
			return new ContractorProvider($model);
		});
	}

	public function registerContractorExpenseProvider() {
		$this->app['contractor.expense'] = $this->app->share(function($app) {
			$model = $app['config']['contractor::contractorExpense.model'];
			return new ContractorExpenseProvider($model);
		});
	}

	public function registerContractorNotificationProvider() {
		$this->app['contractor.notification'] = $this->app->share(function($app) {
			$model = $app['config']['contractor::contractorNotification.model'];
			return new ContractorNotificationProvider($model);
		});
	}

	public function registerContractorResumeProvider() {
		$this->app['contractor.resume'] = $this->app->share(function($app) {
			$model = $app['config']['contractor::contractorResume.model'];
			return new ContractorResumeProvider($model);
		});
	}

	public function registerContractorTimesheetProvider() {
		$this->app['contractor.timesheet'] = $this->app->share(function($app) {
			$model = $app['config']['contractor::contractorTimesheet.model'];
			return new ContractorTimesheetProvider($model);
		});
	}

	public function registerContractor() {
		$this->app['contractor'] = $this->app->share(function($app) {
			return new Contractor(
				$app['contractor.model'],
				$app['contractor.expense'],
				$app['contractor.notification'],
				$app['contractor.resume'],
				$app['contractor.timesheet']
			);
		});

		$this->app->alias('Contractor', 'App\Models\Contractor\Contractor');
	}

}