<?php namespace App\Models\Deal;

use App\Models\Deal\Provider\DealProvider;
use App\Models\Deal\Interfaces\DealProviderInterface;
use App\Models\Deal\Provider\DealCategoryProvider;
use App\Models\Deal\Interfaces\DealCategoryProviderInterface;
use App\Models\Deal\Provider\VoucherProvider;
use App\Models\Deal\Interfaces\VoucherProviderInterface;

class Deal {
	protected $dealProvider, $dealCategoryProvider, $voucherProvider;

	public function __construct(
		DealProviderInterface $dealProvider = null,
		DealCategoryProviderInterface $dealCategoryProvider = null,
		VoucherProviderInterface $voucherProvider = null
	) {
		$this->dealProvider = $dealProvider ?: new DealProvider();
		$this->dealCategoryProvider = $dealCategoryProvider ?: new DealCategoryProvider();
		$this->voucherProvider = $voucherProvider ?: new VoucherProvider();
	}

	public function createDeal(array $data) {
		return $this->dealProvider->create($data);
	}

	public function updateDeal($deal, array $data) {
		return $this->dealProvider->update($deal, $data);
	}

	public function removeDealById($id) {
		return $this->dealProvider->removeById($id);
	}

	public function createDealCategory(array $data) {
		return $this->dealCategoryProvider->create($data);
	}

	public function createVoucher(array $data) {
		return $this->voucherProvider->create($data);
	}

	public function updateVoucher($voucher, array $data) {
		return $this->voucherProvider->update($voucher, $data);
	}

	public function removeVoucherById($id) {
		return $this->voucherProvider->removeById($id);
	}

	public function getAllVouchers(array $data) {
		return $this->voucherProvider->getAllVouchers($data);
	}

	public function getVoucherById($id) {
		return $this->voucherProvider->getVoucherById($id);
	}

	public function getVoucherByCode($code) {
		return $this->voucherProvider->getVoucherByCode($code);
	}

	public function getAllCategories(array $data) {
		return $this->dealCategoryProvider->getAllCategories($data);
	}

	public function getCategoryById($id) {
		return $this->dealCategoryProvider->getCategoryById($id);
	}

	public function getAllParentCategories() {
		return $this->dealCategoryProvider->getAllParentCategories();
	}

	public function getAllSubCategories() {
		return $this->dealCategoryProvider->getAllSubCategories();
	}

	public function editCategoryById($id, array $data) {
		return $this->dealCategoryProvider->editById($id, $data);
	}

	public function removeCategoryById($id) {
		return $this->dealCategoryProvider->removeById($id);
	}

	public function getAllDeals(array $data) {
		return $this->dealProvider->getAllDeals($data);
	}

	public function getDealById($id) {
		return $this->dealProvider->getDealById($id);
	}

	public function getNewest($limit) {
		return $this->dealProvider->getNewest($limit);
	}

	public function getVoucherUniqueCode($voucher, $quantity) {
		return $this->voucherProvider->getUniqueCode($voucher, $quantity);
	}

	public function restoreUniqueCode($order) {
		return $this->voucherProvider->restoreUniqueCode($order);
	}
}