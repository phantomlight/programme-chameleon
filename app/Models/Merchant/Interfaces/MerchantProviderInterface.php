<?php namespace App\Models\Merchant\Interfaces;

interface MerchantProviderInterface {
	public function createModel();
	public function setModel($model);
	public function getEmptyMerchant();
	public function create(array $credentials);	
}