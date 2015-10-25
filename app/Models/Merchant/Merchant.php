<?php namespace App\Models\Merchant;

use App\Models\Merchant\Provider\MerchantProvider;
use App\Models\Merchant\Interfaces\MerchantProviderInterface;

class Merchant {
	protected $merchantProvider;

	public function __construct(
		MerchantProviderInterface $merchantProvider = null
	) {
		$this->merchantProvider = $merchantProvider ?: new MerchantProvider();
	}

	public function createMerchant(array $data) {
		return $this->merchantProvider->create($data);
	}

	public function getAllMerchants(array $data) {
		return $this->merchantProvider->getAllMerchants($data);
	}

	public function getMerchantById($id) {
		return $this->merchantProvider->getMerchantById($id);
	}

	public function updateMerchant($merchant, array $data) {
		return $this->merchantProvider->update($merchant, $data);
	}

	public function removeMerchantById($id) {
		return $this->merchantProvider->removeById($id);
	}

	public function getMerchantByPayoutWeek() {
		return $this->merchantProvider->getByPayoutDate('week');
	}
}