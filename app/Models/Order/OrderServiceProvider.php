<?php namespace App\Models\Order;

use Illuminate\Support\ServiceProvider;

use App\Models\Order\Provider\OrderProvider;
use App\Models\Order\Order;

class OrderServiceProvider extends ServiceProvider {

	public function boot() {
    $this->mergeConfigFrom(__DIR__.'/../../../config/order/config.php', 'Order');
	}

	public function register() {
		$this->registerOrderProvider();
		$this->registerOrder();
	}

	public function registerOrderProvider() {
		$this->app['order.model'] = $this->app->share(function($app) {
			$model = $app['config']['order::order.model'];
			return new OrderProvider($model);
		});
	}

	public function registerOrder() {
		$this->app['order'] = $this->app->share(function($app) {
			return new Order($app['order.model']);
		});

		$this->app->alias('Order', 'App\Models\Order\Order');
	}

}