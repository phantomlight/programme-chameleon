<?php namespace App\Models\Customer;

use Illuminate\Support\ServiceProvider;

use App\Models\Customer\Provider\CustomerProvider;
use App\Models\Customer\Customer;

class CustomerServiceProvider extends ServiceProvider {

	public function boot() {
    $this->mergeConfigFrom(__DIR__.'/../../../config/customer/config.php', 'customer');
	}

	public function register() {
		$this->registerCustomerProvider();
		$this->registerCustomer();
	}

	public function registerCustomerProvider() {
		$this->app['customer.model'] = $this->app->share(function($app) {
			$model = $app['config']['customer::customer.model'];
			return new CustomerProvider($model);
		});
	}

	public function registerCustomer() {
		$this->app['customer'] = $this->app->share(function($app) {
			return new Customer($app['customer.model']);
		});

		$this->app->alias('Customer', 'App\Models\Customer\Customer');
	}

}