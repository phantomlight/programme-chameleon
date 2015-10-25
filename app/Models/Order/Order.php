<?php namespace App\Models\Order;

use App\Models\Order\Provider\OrderProvider;
use App\Models\Order\Interfaces\OrderProviderInterface;

class Order {
	protected $orderProvider;

	public function __construct(
		OrderProviderInterface $orderProvider = null
	) {
		$this->orderProvider = $orderProvider ?: new OrderProvider();
	}

	public function createOrder(array $credentials, array $data) {
		return $this->orderProvider->create($credentials, $data);
	}

	public function getOrderById($id) {
		return $this->orderProvider->getOrderById($id);
	}

	public function getAllOrders(array $data) {
		return $this->orderProvider->getAllOrders($data);
	}

	public function updateOrder($order, array $data) {
		return $this->orderProvider->update($order, $data);
	}

	public function removeOrderById($id) {
		return $this->orderProvider->removeById($id);
	}
}