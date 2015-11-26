<?php namespace App\Utils\File;

use Carbon\Carbon;

class FileUploader {

	protected $allowedFileSize = 5000000;
	protected $allowedFileImage = ['gif','png','jpg'];
	protected $allowedFileResume = ['doc','docx'];

	public function upload($file, $location, $checkFor='image') {
		if ( ! is_dir(public_path(). '/' . $location)) {
			mkdir(public_path() . '/' . $location, 0755, true);
		}

		try {
			if ($checkFor === 'image') {
				if ( ! $this->checkImageFile($file)) return;
				$info = pathinfo($file['name']);
				$im = \Image::make($file['tmp_name']);
				$width = $im->width();
				$height = $im->height();

				if ($height > $width && $height > 600) {
					$newHeight = 600;
					$newWidth = (600 / $height) * $width;
					$im->resize($newWidth, $newHeight)->save();
				} 
				elseif ($width > $height && $width > 800) {
					$newWidth = 800;
					$newHeight = (800 / $width) * $height;
					$im->resize($newWidth, $newHeight)->save();
				}

				$location .= Carbon::now()->format('Ymd') . '-' . uniqid() . '.' . $info['extension'];
				$compressed = $this->compress($file['tmp_name'], $location, 80);
				return $compressed;
			}
			elseif ($checkFor === 'resume') {
				if ( ! $this->checkResumeFile($file)) return;
				$info = pathinfo($file['name']);
				$location .= Carbon::now()->format('Ymd') . '-' . uniqid() . '.' . $info['extension'];
				if ( ! move_uploaded_file($file['tmp_name'], $location)) {
					throw new RuntimeException('Failed to upload file.', 1);
					return;
				}
				return $location;
			}
		}
		catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			return;
		}
	}

	protected function compress($source, $destination, $quality) {
		$info = getimagesize($source); 
		if ($info['mime'] == 'image/jpeg') $image = imagecreatefromjpeg($source); 
		elseif ($info['mime'] == 'image/gif') $image = imagecreatefromgif($source); 
		elseif ($info['mime'] == 'image/png') $image = imagecreatefrompng($source); 
		imagejpeg($image, $destination, $quality);
		return $destination;
	}

	public function checkResumeFile($file) {
		if ($file['size'] > $this->allowedFileSize) {
			throw new \Exception("File is too big. Max is 5Mb.", 1);
			return false;
		}

		$filename = $file['name'];
		$ext = pathinfo($filename, PATHINFO_EXTENSION);

		if ( ! in_array($ext, $this->allowedFileResume)) {
			throw new \Exception("File is not document. Only .doc or .docx allowed.", 1);
			return false;
		}

		return true;
	}

	public function checkImageFile($file) {
		if ($file['size'] > $this->allowedFileSize) {
			throw new \Exception("File is too big. Max is 5Mb.", 1);
			return false;
		}

		$filename = $file['name'];
		$ext = pathinfo($filename, PATHINFO_EXTENSION);

		if ( ! in_array($ext, $this->allowedFileImage)) {
			throw new \Exception("File is not image. Only .jpg, .png, and .gif.", 1);
			return false;
		}

		return true;
	}

}