<?php namespace App\Utils;

class Location {

	protected $countryTable = 'Country';
	protected $cityTable = 'City';
	protected $countryLangTable = 'CountryLanguage';

	public function getAllCountries() {
		if ( ! \Storage::has('location/countryList.json')) {
			$data = json_encode(\DB::table($this->countryTable)->orderBy('name', 'asc')->get());
			\Storage::put('location/countryList.json', $data);
			return $data;
		}
		else {
			try {
				$country = \Storage::get('location/countryList.json');
				return $country;
			}
			catch (\Exception $e) {
				return $e->getMessage();
			}
		}
	}

	public function getCityByCountry($countryCode) {
		$file = 'city_list_' . $countryCode;
		if ( ! \Storage::has('location/' . $file)) {
			$data = json_encode(\DB::table($this->cityTable)->where('countryCode', $countryCode)->orderBy('name', 'asc')->get());
			\Storage::put('location/' . $file, $data);
			return $data;
		}
		else {
			try {
				$city = \Storage::get('location/' . $file);
				return $city;
			}
			catch (\Exception $e) {
				return $e->getMessage();
			}
		}
	}

}