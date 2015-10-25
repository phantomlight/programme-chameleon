<?php namespace App\Utils\File;

use Carbon\Carbon;

class FileUploader {

	protected $allowedFileSize = 3000000;
	protected $allowedFileImage = ['gif','png' ,'jpg'];

	public function upload($file, $location) {
		$info = pathinfo($file['name']);

		if ( ! is_dir(public_path(). '/' . $location)) {
			mkdir(public_path() . '/' . $location, 0755, true);
		}

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

	protected function compress($source, $destination, $quality) {
		$info = getimagesize($source); 
		if ($info['mime'] == 'image/jpeg') $image = imagecreatefromjpeg($source); 
		elseif ($info['mime'] == 'image/gif') $image = imagecreatefromgif($source); 
		elseif ($info['mime'] == 'image/png') $image = imagecreatefrompng($source); 
		imagejpeg($image, $destination, $quality);
		return $destination;
	}

	public function checkAdsFile($file) {
		if ($file['size'] > $this->allowedFileSize) {
			throw new \Exception("File is too big!", 1);
			return false;
		}

		$filename = $file['name'];
		$ext = pathinfo($filename, PATHINFO_EXTENSION);

		if ( ! in_array($ext, $this->allowedFileImage)) {
   		throw new \Exception("File is not image !", 1);
   		return false;
		}

		return true;
	}

}