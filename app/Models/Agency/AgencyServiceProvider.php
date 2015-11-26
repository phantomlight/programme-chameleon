<?php namespace App\Models\Agency;

use Illuminate\Support\ServiceProvider;

use App\Models\Agency\Provider\AgencyProvider;
use App\Models\Agency\Provider\AgencyNotificationProvider;
use App\Models\Agency\Agency;

class AgencyServiceProvider extends ServiceProvider {

	public function boot() {
    $this->mergeConfigFrom(__DIR__.'/../../../config/agency/config.php', 'agency');
	}

	public function register() {
		$this->registerAgencyProvider();
		$this->registerAgencyNotificationProvider();
		$this->registerAgency();
	}

	public function registerAgencyProvider() {
		$this->app['agency.model'] = $this->app->share(function($app) {
			$model = $app['config']['agency::agency.model'];
			return new AgencyProvider($model);
		});
	}

	public function registerAgencyNotificationProvider() {
		$this->app['agency.notification'] = $this->app->share(function($app) {
			$model = $app['config']['agency::agencyNotification.model'];
			return new AgencyNotificationProvider($model);
		});
	}

	public function registerAgency() {
		$this->app['agency'] = $this->app->share(function($app) {
			return new Agency(
				$app['agency.model'],
				$app['agency.notification']
			);
		});

		$this->app->alias('Agency', 'App\Models\Agency\Agency');
	}

}