<?php namespace App\Models\Job;

use Illuminate\Support\ServiceProvider;

use App\Models\Job\Provider\JobProvider;
use App\Models\Job\Provider\JobIndustryProvider;

use App\Models\Job\Job;

class JobServiceProvider extends ServiceProvider {

	public function boot() {
    $this->mergeConfigFrom(__DIR__.'/../../../config/job/config.php', 'job');
	}

	public function register() {
		$this->registerJobProvider();
		$this->registerJobIndustryProvider();
		$this->registerJob();
	}

	public function registerJobProvider() {
		$this->app['job.model'] = $this->app->share(function($app) {
			$model = $app['config']['job::job.model'];
			return new JobProvider($model);
		});
	}

	public function registerJobIndustryProvider() {
		$this->app['job.industry'] = $this->app->share(function($app) {
			$model = $app['config']['job::jobIndustry.model'];
			return new JobIndustryProvider($model);
		});
	}

	public function registerJob() {
		$this->app['job'] = $this->app->share(function($app) {
			return new Job(
				$app['job.model'],
				$app['job.industry']
			);
		});
		$this->app->alias('Job', 'App\Models\Job\Job');
	}

}