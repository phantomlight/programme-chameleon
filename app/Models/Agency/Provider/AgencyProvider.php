<?php namespace App\Models\Agency\Provider;

use App\Models\Agency\Interfaces\AgencyProviderInterface;
use App\Utils\File\FileUploader;
use Carbon\Carbon;
use Illuminate\Support\Str;

class AgencyProvider implements AgencyProviderInterface {

	protected $model = 'App\Models\Agency\Eloquent\AgencyModel';

	public function __construct($model=null) {
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

	public function getModel() {
		return $this->createModel();
	}

	public function create($data) {
		$model = $this->createModel();
		$model->fill($data);
		$model->save();
		return $model;
	}

	public function findById($id) {
		$model = $this->getModel();
		return $model->where('id', $id)->first();
	}

	public function addAffiliate($company) {
		if ( ! $agency = \Agency::getAgency() ) {
			throw new \Exception("Agency not found.", 1);
			return;
		}

		if ($agency->companies->contains($company->id)) {
			throw new \Exception("You have already make this company as your affiliate.", 1);
			return;
		}

		$agency->companies()->attach($company->id, ['status' => 'request']);
		return $agency;
	}

	public function removeAffiliate($company) {
		if ( ! $agency = \Agency::getAgency() ) {
			throw new \Exception("Agency not found.", 1);
			return;
		}

		if ( ! $agency->companies->contains($company->id)) {
			throw new \Exception("You never make this company your affiliate.", 1);
			return;
		}

		$agency->companies()->detach($company->id);
		return $agency;
	}

	public function update($data) {
		if ( ! $agency = \Agency::getAgency()) {
			throw new \Exception("You are not in agency account.", 1);
			return;
		}

		foreach ($data as $k=>$d) {
			if (isset($agency->{$k})) $agency->{$k} = $d;
		}

		$agency->save();
		return $agency;
	}

	public function updateAvatar($file) {
		if ( ! $agency = \Agency::getAgency()) {
			throw new \Exception("You are not in agency account.", 1);
			return;
		}

		if ( ! is_null($agency->image)) {
			if (\File::exists(public_path() . '/' . $agency->image)) {
				\File::delete(public_path() . '/' . $agency->image);
			}
		}

		$uploader = new FileUploader;
		$location = 'uploads/agency/' . $agency->id . '/images/' . date('m') . '/';

		try {
			$uploadedFile = $uploader->upload($file, $location);
			$agency->image = $uploadedFile;
			$agency->updated_at = Carbon::now();
			$agency->save();
			session(['_sess_agency' => ['model'=> $agency]]);
			return $agency;
		}
		catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			return;
		}
	}

}