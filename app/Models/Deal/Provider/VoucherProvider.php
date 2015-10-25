<?php namespace App\Models\Deal\Provider;

use App\Models\Deal\Interfaces\VoucherProviderInterface;

class VoucherProvider implements VoucherProviderInterface {
	protected $model = 'App\Models\Deal\Eloquent\VoucherModel';

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

	public function getEmptyVoucher() {
		return $this->createModel();
	}

	public function create(array $data) {
		$model = $this->createModel();
		$model->fill($data);
		$model->save();
		return $model;
	}

	public function getAllVouchers(array $data) {
		$model = $this->createModel();
		return $model->findByQuery($data);
	}

	public function getVoucherById($id) {
		$model = $this->createModel();
		return $model->findById($id);
	}

	public function update($voucher, $data) {
		foreach ($data as $k=>$d) {
			$voucher->{$k} = $d;
		}
		$voucher->save();
		return $voucher;
	}

	public function removeById($id) {
		$model = $this->createModel();

		try {
			$voucher = $model->findById($id);

			if ( ! $model) {
				throw new \Exception("Tidak ada data.", 1);
				return;
			}
			$voucher->delete();
			return;
		}
		catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			return;
		}
	}

	public function getUniqueCode($voucher, $quantity=1) {
		$codes = json_decode($voucher->code_pool, true);
		$unique = array_slice($codes, 0, $quantity);
		$remains = array_slice($codes, $quantity);
		
		if (count($remains) > 0) {
			$codeString = "[";

			foreach ($remains as $r) {
				$codeString .= '"' . $r . '",';
			}

			$codeString = rtrim($codeString, ',');
			$codeString .= "]";
			$codeString = json_decode($codeString, true);
			$voucher->code_pool = json_encode($codeString);
		}
		else {
			$voucher->code_pool = null;
		}

		$voucher->save();
		return $unique;
	}

	public function restoreUniqueCode($order) {
		$codes = json_decode($order->vouchers, true);
		if (count($codes) > 0) {
			foreach ($codes as $id=>$code) {
				$voucher = $this->getVoucherById($id);
				if ( ! is_null($voucher)) {
					$codeString = "[";

					foreach ($code as $c) {
						foreach ($c as $c1) {
							$codeString .= '"' . $c1 . '",';
						}
					}

					$code_pool = json_decode($voucher->code_pool, true);

					if (count($code_pool) > 0) {
						foreach ($code_pool as $cp) {
							$codeString .= '"' . $cp . '",';
						}
					}

					$codeString = rtrim($codeString, ',');
					$codeString .= "]";
					$codeString = json_decode($codeString, true);
					$voucher->code_pool = json_encode($codeString);
					$voucher->save();
				}
			}
		}
		return;
	}
}