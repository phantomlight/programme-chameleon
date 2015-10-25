<?php namespace App\Models\Order\Provider;

use App\Models\Order\Interfaces\OrderProviderInterface;

class OrderProvider implements OrderProviderInterface {
	protected $model = 'App\Models\Order\Eloquent\OrderModel';

	public function __construct($model = null) {
		if (isset($model)) {
			$this->model = $model;
		}
	}

	public function createModel() {
		$class = '\\'.ltrim($this->model, '\\');
		return new $class;
	}

	public function setModel($model) {
		$this->model = $model;
	}

	public function getEmptyOrder() {
		return $this->createModel();
	}

	public function getAllOrders(array $data) {
		$model = $this->createModel();
		return $model->findByQuery($data);
	}

	public function getOrderById($id) {
		$model = $this->createModel();
		return $model->findById($id);
	}

	public function create(array $credentials, array $data) {
		$model = $this->createModel();
		$model->fill($data);
		$model->save();

		// TODO: queue this
		// $this->mailOrder($model, $credentials, $data);
		
		return $model;
	}

	public function update($order, $data) {
		if ($data['status'] === 'cancel') {
			\Deal::restoreUniqueCode($order);
		}

		foreach ($data as $k=>$d) {
			$order->{$k} = $d;
		}
		$order->save();
		return $order;
	}

	public function mailOrder($model, array $credentials, array $data) {
		$data['order'] = $model;

		try {
			switch ($data['order_type']) {
				case 'cash':
					\Mail::send('email.order.cash', $data, function ($message) use ($credentials) {
						$message->from('noreply@dealindo.com', 'DO NOT REPLY');
						$message->to($credentials['user']->email)->subject('DealIndo Customer Order');;
					});
					break;
				case 'wallet':
					\Mail::send('email.order.wallet', $data, function ($message) use ($credentials) {
						$message->from('noreply@dealindo.com', 'DO NOT REPLY');
						$message->to($credentials['user']->email)->subject('DealIndo Customer Order');;
					});
					break;
				case 'transfer':
					\Mail::send('email.order.transfer', $data, function ($message) use ($credentials) {
						$message->from('noreply@dealindo.com', 'DO NOT REPLY');
						$message->to($credentials['user']->email)->subject('DealIndo Customer Order');
					});
					break;
				default:
					throw new \Exception("Order type error!", 1);
					break;
			}
			return;
		}
		catch (\Exception $e) {
			$model->delete();
			throw new \Exception($e->getMessage(), 1);
			return;
		}
	}

	public function removeById($id) {
		$model = $this->createModel();

		try {
			$order = $model->findById($id);

			if ( ! $model) {
				throw new \Exception("Tidak ada data.", 1);
				return;
			}

			\Deal::restoreUniqueCode($order);
			$order->delete();
			return;
		}
		catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			return;
		}
	}
}
