<?php namespace App\Models\Deal;

use Illuminate\Support\ServiceProvider;

use App\Models\Deal\Provider\DealProvider;
use App\Models\Deal\Provider\DealCategoryProvider;
use App\Models\Deal\Provider\VoucherProvider;
use App\Models\Deal\Deal;

class DealServiceProvider extends ServiceProvider {

	public function boot() {
    $this->mergeConfigFrom(__DIR__.'/../../../config/deal/config.php', 'deal');
	}

	public function register() {
		$this->registerDealProvider();
		$this->registerDealCategoryProvider();
		$this->registerVoucherProvider();
		$this->registerDeal();
	}

	public function registerDealProvider() {
		$this->app['deal.deal.model'] = $this->app->share(function($app) {
			$model = $app['config']['deal::deal.model'];
			return new DealProvider($model);
		});
	}

	public function registerDealCategoryProvider() {
		$this->app['deal.category.model'] = $this->app->share(function($app) {
			$model = $app['config']['deal::deal_category.model'];
			return new DealCategoryProvider($model);
		});
	}

	public function registerVoucherProvider() {
		$this->app['deal.voucher.model'] = $this->app->share(function($app) {
			$model = $app['config']['deal::voucher.model'];
			return new VoucherProvider($model);
		});
	}

	public function registerDeal() {
		$this->app['deal'] = $this->app->share(function($app) {
			return new Deal(
				$app['deal.deal.model'],
				$app['deal.category.model'],
				$app['deal.voucher.model']
			);
		});

		$this->app->alias('Deal', 'App\Models\Deal\Deal');
	}

}