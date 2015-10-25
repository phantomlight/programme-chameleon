<?php namespace App\Models\Merchant;

use Illuminate\Support\ServiceProvider;

use App\Models\Merchant\Provider\MerchantProvider;
use App\Models\Merchant\Merchant;

class MerchantServiceProvider extends ServiceProvider {

	public function boot() {
    $this->mergeConfigFrom(__DIR__.'/../../../config/merchant/config.php', 'merchant');
	}

	public function register() {
		$this->registerMerchantProvider();
		$this->registerMerchant();
	}

	public function registerMerchantProvider() {
		$this->app['merchant.model'] = $this->app->share(function($app) {
			$model = $app['config']['merchant::merchant.model'];
			return new MerchantProvider($model);
		});
	}

	public function registerMerchant() {
		$this->app['merchant'] = $this->app->share(function($app) {
			return new Merchant($app['merchant.model']);
		});

		$this->app->alias('merchant', 'App\Models\Merchant\Merchant');
	}

}