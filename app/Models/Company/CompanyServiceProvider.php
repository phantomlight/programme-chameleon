<?php namespace App\Models\Company;

use Illuminate\Support\ServiceProvider;

use App\Models\Company\Provider\CompanyProvider;
use App\Models\Company\Provider\CompanyNotificationProvider;
use App\Models\Company\Provider\CompanyCreditProvider;
use App\Models\Company\Company;

class CompanyServiceProvider extends ServiceProvider {

	public function boot() {
    $this->mergeConfigFrom(__DIR__.'/../../../config/company/config.php', 'company');
	}

	public function register() {
		$this->registerCompanyProvider();
		$this->registerCompanyCreditProvider();
		$this->registerCompanyNotificationProvider();
		$this->registerCompany();
	}

	public function registerCompanyProvider() {
		$this->app['company.model'] = $this->app->share(function($app) {
			$model = $app['config']['company::company.model'];
			return new CompanyProvider($model);
		});
	}

	public function registerCompanyCreditProvider() {
		$this->app['company.credit'] = $this->app->share(function($app) {
			$model = $app['config']['company::companyCredit.model'];
			return new CompanyCreditProvider($model);
		});
	}

	public function registerCompanyNotificationProvider() {
		$this->app['company.notification'] = $this->app->share(function($app) {
			$model = $app['config']['company::companyNotification.model'];
			return new CompanyNotificationProvider($model);
		});
	}

	public function registerCompany() {
		$this->app['company'] = $this->app->share(function($app) {
			return new Company(
				$app['company.model'],
				$app['company.credit'],
				$app['company.notification']
			);
		});

		$this->app->alias('Company', 'App\Models\Company\Company');
	}

}