<?php namespace App\Models\NewsLetter;

use Illuminate\Support\ServiceProvider;

use App\Models\NewsLetter\Provider\NewsLetterProvider;
use App\Models\NewsLetter\Provider\NewsLetterIndustryProvider;

use App\Models\NewsLetter\NewsLetter;

class NewsLetterServiceProvider extends ServiceProvider {

	public function boot() {
    $this->mergeConfigFrom(__DIR__.'/../../../config/newsletter/config.php', 'newsletter');
	}

	public function register() {
		$this->registerNewsLetterProvider();
		$this->registerNewsLetter();
	}

	public function registerNewsLetterProvider() {
		$this->app['newsletter.model'] = $this->app->share(function($app) {
			$model = $app['config']['newsletter::newsletter.model'];
			return new NewsLetterProvider($model);
		});
	}

	public function registerNewsLetter() {
		$this->app['newsletter'] = $this->app->share(function($app) {
			return new NewsLetter(
				$app['newsletter.model']
			);
		});
		$this->app->alias('NewsLetter', 'App\Models\NewsLetter\NewsLetter');
	}

}