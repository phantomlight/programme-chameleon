<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Utils\Email\EmailInliner;
use Mailgun\Mailgun;

class NewsLetterController extends Controller {

	public function __construct() {
		$this->middleware('admin', ['except' => ['postRegister', 'getUnsubscribe']]);
	}

	public function postRegister() {
		$data = \Input::get('data');

		try {
			$recipient = \NewsLetter::register($data['email']);

			return \Response::json([
				'type'		=>	'success',
				'message'	=>	'Registered to newsletter successfully.',
			]);
		}
		catch (\Exception $e) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function postSendMail() {
		if ( ! \Input::has('subject') && ! \Input::has('message')) {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'Email data not complete.',
			]);
		}

		$recipients = \NewsLetter::getAllRecipients();

		if (count($recipients) > 0) {
			$recipientsTo = [];

			foreach ($recipients as $recipient) {
				$recipientsTo[$recipient->email] = [
					'email'	=>	$recipient->email,
				];
			}

			try {
				$mg = new Mailgun(env('MAILGUN_PRIVATE_KEY'));

				$data = [	
					'content'	=>	\Input::get('message'),
				];

				$inliner = new EmailInliner('emails.newsletter', $data);
        $content = $inliner->convert();

				$mg->sendMessage('programmechameleon.com', [
					'from'		=>	'newsletter@programmechameleon.com',
					'to'			=>	implode(",", array_keys($recipientsTo)),
					'subject'	=>	\Input::get('subject'),
					'html'		=>	$content,
					'text'		=>	'Programme Chameleon Text Message',
					'recipient-variables'	=>	json_encode($recipientsTo),
				]);

				return \Response::json([
					'type'		=>	'success',
					'message'	=>	'Message successfully sent.',
				]);
			}
			catch (\Exception $e) {
				return \Response::json([
					'type'		=>	'danger',
					'message'	=>	$e->getMessage(),
				]);
			}
		}
		else {
			return \Response::json([
				'type'		=>	'danger',
				'message'	=>	'No emails to send.',
			]);
		}
	}

	public function postRemove() {

	}

	public function getUnsubscribe() {
		if ( ! \Input::has('e')) {
			return redirect('/')->with('flashMessage', [
				'class'		=>	'danger',
				'message'	=>	'No inputs, cannot unsubscribe.',
			]);
		}

		try {
			\NewsLetter::remove(trim(\Input::get('e')));

			return redirect('/')->with('flashMessage', [
				'class'		=>	'success',
				'message'	=>	'successfully unsubscribe.',
			]);
		}
		catch (\Exception $e) {
			return redirect('/')->with('flashMessage', [
				'class'		=>	'danger',
				'message'	=>	$e->getMessage(),
			]);
		}
	}

	public function getNewsLetter() {
		return view('back.newsletter');
	}

}