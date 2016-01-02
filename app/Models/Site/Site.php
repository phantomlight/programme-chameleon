<?php namespace App\Models\Site;

use App\Models\Site\Interfaces\SiteModelInterface;
use App\Models\Site\Interfaces\SiteProviderInterface;
use App\Models\Site\Provider\SiteProvider;

class Site {
	protected $site, $siteProvider;

	public function __construct(
		SiteProviderInterface $siteProvider = null
	) {
		$this->siteProvider = $siteProvider ?: new SiteProvider;
	}

	public function __call($method, $parameters) {
		if (isset($this->site)) {
			return call_user_func_array(array($this->site, $method), $parameters);
		}
		throw new \BadMethodCallException("Method [$method] is not supported.");
	}

	public function getAllConfigs() {
		return $this->siteProvider->getAll();
	}

	public function addResource($data) {
		return $this->siteProvider->create($data);
	}

	public function editResource($id, $data) {
		return $this->siteProvider->update($id, $data);
	}

	public function removeResource($id) {
		return $this->siteProvider->remove($id);
	}

	public function uploadFile($file, $type) {
		return $this->siteProvider->upload($file, $type);
	}

	public function updateService($id, $data) {
		return $this->siteProvider->update($id, $data);
	}

	public function getAllServices() {
		return $this->siteProvider->getAllServices();
	}

	public function getAllResources() {
		return $this->siteProvider->getAllResources();
	}

}