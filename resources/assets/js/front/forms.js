const jKey = { // jcryption aes key
	key1: 'VefT5WpnGT',
	key2: 'lRYj3IbU0e',
	pub_key: 	window.origin + '/gen',
	handshake: window.origin + '/handshake'
}

export class Forms {
	constructor() {
		if ($('#register-form')[0]) {
			this.initRegisterForm();
		}

		if ($('#login-form')[0]) {
			this.initLoginForm();
		}

		if ($('#forgotPasswordForm')[0]) {
			this.initForgotPasswordForm();
		}
	}
	initRegisterForm() {
		var aes;
		var $form = $('#register-form');
		var processing = false;
		var $route = $form.data('route');

		$form.find('[type=submit]').on('click', function (f) {
			if ($form.parsley().validate() && ! processing) {
				processing = true;
				$('.page-preloader').show();
				aes = $.jCryption.encrypt(jKey.key1, jKey.key2);
				$form.find('[type=submit]').disable(true);

				$.jCryption.authenticate(aes, jKey.pub_key, jKey.handshake, (function () {
					$.post($route, {
						data: JSON.stringify($.jCryption.encrypt($form.serialize(), aes))
					}).done(function(e) {
						processing = false;
						$('.page-preloader').hide();
						$form.showMessage(e.message, e.type);
						$form.find('[type=submit]').disable(false);
					}).fail(function (xhr, status, e) {
						processing = false;
						$('.page-preloader').hide();
						$form.showMessage(xhr.responseText, 'danger');
						$form.find('[type=submit]').disable(false);
					});
				}));
			}
		});
	}
	initLoginForm() {
		var aes;
		var $form = $('#login-form');
		var processing = false;
		var $route = $form.data('route');

		$form.find('[type=submit]').on('click', function (f) {
			if ($form.parsley().validate() && ! processing) {
				processing = true;
				$('.page-preloader').show();
				aes = $.jCryption.encrypt(jKey.key1, jKey.key2);
				$form.find('[type=submit]').disable(true);

				$.jCryption.authenticate(aes, jKey.pub_key, jKey.handshake, (function () {
					$.post($route, {
						data: JSON.stringify($.jCryption.encrypt($form.serialize(), aes))
					}).done(function(e) {
						processing = false;
						$('.page-preloader').hide();
						$form.showMessage(e.message, e.type);
						$form.find('[type=submit]').disable(false);
						if (e.type === 'success') location.replace(e.redirect);
					}).fail(function (xhr, status, e) {
						processing = false;
						$('.page-preloader').hide();
						$form.showMessage(xhr.responseText, 'danger');
						$form.find('[type=submit]').disable(false);
					});
				}));
			}
		});
	}
	initForgotPasswordForm(){
		var $forgotForm = $('#forgotPasswordForm');
		$forgotForm.on('submit', function (e) {
			if ($forgotForm.parsley().validate() && ! processing) {
				processing = true;
				$forgotForm.find('[type=submit]').disable(true);
				$('.page-preloader').show();

				$.post(window.origin + '/forgot-password', {
					data: $forgotForm.serializeForm()
				}).done(function (e) {
					$forgotForm.showMessage(e.message, e.type);
					processing = false;
					$forgotForm.find('[type=submit]').disable(false);
					$('.page-preloader').hide();
				}).fail(function (xhr, status, e) {
					$forgotForm.showMessage(e.message, e.type);
					processing = false;
					$forgotForm.find('[type=submit]').disable(false);
					$('.page-preloader').hide();
				});
			}
		});
	}
}