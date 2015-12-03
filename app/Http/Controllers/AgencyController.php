<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use App\Utils\Hashing\JCryption;

class AgencyController extends Controller {

	public function __construct() {
		$this->middleware('agency', ['except' => ['getRegister', 'postRegister']]);
	}
	
	public function getIndex() {
		return view('front.agency.index');
	}

	public function getRegister() {
		return view('front.agency.register');
	}

	public function getNotifList() {
		return view('front.agency.notifList');
	}

	public function getOfferJob() {
		return view('front.agency.offerJob');
	}

	public function postRegister() {
		try {
			$jCryption = new JCryption();
			$data = json_decode(\Input::get('data'), true);
			parse_str($jCryption->decrypt(session('jkey'), $data), $output);

			$group = \User::findGroupByName('Agency');
			$user = \User::register([
				'email'			=>	$output['email'],
				'password'	=>	$output['password'],
				'activated'	=>	true,
			]);

			$user->addGroup($group);

			$aData = [
				'user_id'	=>	$user->id,
				'name'		=>	$output['name'],
				'owner_name'	=>	$output['owner_name'],
				'city'		=>	$output['city'],
				'country'	=>	$output['country'],
				'address'	=>	$output['address'],
				'phone'		=>	$output['phone'],
				'image'		=>	null,
			];

			$agency = \Agency::register($aData);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Successfully registered. You can login now.',
			]);
		}
		catch (\Exception $e) {
			if (isset($user)) $user->delete();
			if (isset($agency)) $agency->delete();
			
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	env('APP_DEBUG') ? $e->getMessage() : 'Error, please contact webmaster.',
			]);
		}
	}

}