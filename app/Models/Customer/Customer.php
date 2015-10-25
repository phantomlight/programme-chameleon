<?php namespace App\Models\Customer;

use App\Models\Customer\Provider\CustomerProvider;
use App\Models\Customer\Interfaces\CustomerProviderInterface;

class Customer {
	protected $customer = null;
	protected $customerProvider;

	public function __construct(
		CustomerProviderInterface $customerProvider = null
	) {
		$this->customerProvider = $customerProvider ?: new CustomerProvider();
	}

	public function createCustomer(array $data) {
		return $this->customerProvider->create($data);
	}

	public function setCustomer($user) {
		try {
			$customer = $user->customer;
			session(['_login_customer' => $customer]);
			$this->customer = $customer;
		}
		catch (\Exception $e) {
			return env('APP_DEBUG') ? false : $e->getMessage();
		}
	}

	public function getCustomer() {
		if (is_null($this->customer)) {
			$this->customer = \Session::get('_login_customer');
		}
		return $this->customer;
	}
}