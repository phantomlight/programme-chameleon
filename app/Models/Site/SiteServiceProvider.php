<?php namespace App\Models\Site;

use Illuminate\Support\ServiceProvider;
use App\Models\Site\Provider\SiteProvider;
use App\Models\Site\Site;

class siteServiceProvider extends ServiceProvider {

	public function boot() {
    $this->mergeConfigFrom(__DIR__.'/../../../config/site/config.php', 'site');
	}

	public function register() {
		$this->registerSiteProvider();
		$this->registerSite();
	}

	public function registerSiteProvider() {
		$this->app['site.model'] = $this->app->share(function($app) {
			$model = $app['config']['site::site.model'];
			return new siteProvider($model);
		});
	}

	public function registerSite() {
		$this->app['site'] = $this->app->share(function($app) {
			return new Site(
				$app['site.model']
			);
		});
		$this->app->alias('site', 'App\Models\Site\Site');
	}

}