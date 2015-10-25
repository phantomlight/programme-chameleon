<?php namespace App\Events;

use Carbon\Carbon;

class EmailEventHandler {

	public function handle($data) {
		$data = json_decode($data, true);
		\Mail::send($data['layout'], $data['data'], function($message) use ($data) {
			$message->from($data['from_email'], 'WebSEOServ Mail Service');
			$message->to($data['to_email'])->subject($data['subject']);
		});
	}

}