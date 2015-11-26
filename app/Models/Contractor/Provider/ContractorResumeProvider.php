<?php namespace App\Models\Contractor\Provider;

use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Models\Contractor\Interfaces\ContractorResumeProviderInterface;
use App\Utils\File\FileUploader;

class ContractorResumeProvider implements ContractorResumeProviderInterface {

	protected $model = 'App\Models\Contractor\Eloquent\ContractorResumeModel';

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

	public function updateResumeData($contractor, $file) {
		try {
			$uploader = new FileUploader;
			$location = 'uploads/contractors/' . $contractor->id . '/resume/' . date('m') . '/';
			$uploadedFile = $uploader->upload($file, $location, 'resume');

			$model = $this->createModel();
			$resume = $model->findByContractorId($contractor->id);

			if (count($resume) > 0) {
				if (\File::exists(public_path() . '/' . $resume->file)) {
					\File::delete(public_path() . '/' . $resume->file);
				}
				$resume->file = $uploadedFile;
				$resume->updated_at = Carbon::now();
				$resume->save();
				return $resume;
			}
			else {
				$model->fill([
					'file'	=>	$uploadedFile,
					'contractor_id'	=> $contractor->id,
				]);
				$model->save();
				return $model;
			}
		}
		catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			return;
		}
	}

}