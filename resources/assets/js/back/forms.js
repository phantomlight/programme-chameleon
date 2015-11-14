const jKey = { // jcryption aes key
	key1: 'VefT5WpnGT',
	key2: 'lRYj3IbU0e',
	pub_key: 	window.origin + '/gen',
	handshake: window.origin + '/handshake'
}

const merchantRoutes = { // merchant routes
	login: window.origin + '/merchant/login'
}

const adminRoutes = { // admin routes
	login: window.origin + '/admin/login'
}

export class Forms {
	constructor() {
		if ($('#adminLoginForm')[0]) {
			this.initAdminLoginForm('#adminLoginForm');
		}

		if ($('.form-action-add')[0]) {
			this.initCommonAddForm();
		}

		if ($('.form-action-edit')[0]) {
			this.initCommonEditForm();
		}
	}
	initAdminLoginForm(form) {
		var processing = false;
		var $form = $(form);

		$form.find('[type=submit]').on('click', function (f) {
			f.preventDefault();
			var aes;

			if ($form.parsley().validate() && ! processing) {
				processing = true;
				aes = $.jCryption.encrypt(jKey.key1, jKey.key2);
				$.jCryption.authenticate(aes, jKey.pub_key, jKey.handshake, (function () {
					$form.find('[type=submit]').disable(true);
					$.post(adminRoutes.login, {
						data: JSON.stringify($.jCryption.encrypt($form.serialize(), aes))
					}).done(function (e) {
						processing = false;
						$form.showMessage(e.message, e.type);
						if (e.type === 'success') {
							window.location.replace(e.redirect);
						}
						else {
							$form.find('[type=submit]').disable(false);
						}
					}).fail(function (xhr, status, e) {
						processing = false;
						$form.showMessage(xhr.responseText, 'danger');
						$form.find('[type=submit]').disable(false);
					});
				}));
			}
			else {
				$form.showMessage('Logging you in', 'info');
				return;
			}
			return false;
		});
	}
	initCommonAddForm() { // RESTful add form action
		var processing = false;
		var data = {};
		var allowed_mime = [
			'image/gif',
			'image/jpeg',
			'image/pjpeg',
			'image/png'
		];
		var image = null;

		$('button[type=cancel]').on('click', function (f) {
			f.preventDefault();
			$('.form-action-add')[0].reset();
		});

		if ($('input[type=file]')[0]) {
			$('input[type=file]').on('change', function() {
				if (this.files[0].size > 3000000) {
					$(this).parent().showMessage('File tidak bisa lebih dari 3Mb !', 'danger');
					image = null;
				} else if ($.inArray(this.files[0].type, allowed_mime) === -1) {
					$(this).parent().showMessage('Tipe file ini tidak dapat dipuload !', 'danger');
					image = null;
				} else {
					$(this).parent().showMessage('<i class="fa fa-check"></i> File ini dapat diupload', 'success');
					image = this.files[0];
				}
			});
		}

		$('.form-action-add').find('[type=submit]').on('click', function (f) {
			f.preventDefault();
			var $form = $('.form-action-add');
			var $route = $form.find('input[data-route]').val();

			if ($form.parsley().validate() && ! processing) {
				processing = true;
				var fd = new FormData();
				fd.append('data', JSON.stringify($form.serializeForm()));

				if ($('input[type=file]')[0]) {
					fd.append('image', image);
				}

				if ($('.summernote')[0]) {
					var textarea = {};
					$('.summernote').each(function (e) {
						textarea[$(this).attr('data-id')] = $(this).code();
					});
					fd.append('longText', JSON.stringify(textarea));
				}

				$form.find('input, textarea, select, button').attr('disabled', 'disabled');
				$form.find('button, .btn, input').addClass('disabled').attr('disabled', 'disabled');
				$form.find('[type=submit]').disable(true);

				$.ajax({
					method: 'post',
					url: $route,
					data: fd,
					crossDomain: false,
					dataType: 'json',
					cache: true,
					processData: false,
					contentType: false,
					headers: {
						'X-CSRF-Token': $('meta[name="_t"]').attr('content')
					},
				}).done(function (e) {
					processing = false;
					$form.showMessage(e.message, e.type);
					$form.find('input, textarea, select, button').removeClass('disabled').removeAttr('disabled');
					$form.find('[type=submit]').disable(false);
					if (e.type === 'success') {
						$form[0].reset();
						if ($form.find('input[data-route]').attr('data-reload') === 'true') {
							setTimeout(function() { location.reload(); }, 3000);
						}
					}
				}).fail(function (xhr, status, e) {
					processing = false;
					$form.showMessage(xhr.responseText, 'danger');
					$form.find('input, textarea, select, button').removeClass('disabled').removeAttr('disabled');
					$form.find('[type=submit]').disable(false);
				});
			} else {
				$form.showMessage('Something wrong!', 'info');
				return;
			}
			return false;
		});
	}
	initCommonEditForm() { // RESTful edit form action
		var processing = false;
		var data = {};
		var allowed_mime = [
			'image/gif',
			'image/jpeg',
			'image/pjpeg',
			'image/png'
		];
		var image = null;

		$('button[type=cancel]').on('click', function (f) {
			f.preventDefault();
			$('.form-action-edit')[0].reset();
		});

		if ($('input[type=file]')[0]) {
			$('input[type=file]').on('change', function() {
				if (this.files[0].size > 3000000) {
					$(this).parent().showMessage('File tidak bisa lebih dari 3Mb !', 'danger');
					image = null;
				} else if ($.inArray(this.files[0].type, allowed_mime) === -1) {
					$(this).parent().showMessage('Tipe file ini tidak dapat dipuload !', 'danger');
					image = null;
				} else {
					$(this).parent().showMessage('<i class="fa fa-check"></i> File ini dapat diupload', 'success');
					image = this.files[0];
				}
			});
		}

		$('.form-action-edit').find('[type=submit]').on('click', function (f) {
			f.preventDefault();
			var $form = $('.form-action-edit');
			var $route = $form.find('input[data-route]').val();

			if ($form.parsley().validate() && ! processing) {
				processing = true;
				var fd = new FormData();
				fd.append('data', JSON.stringify($form.serializeForm()));

				if ($('input[type=file]')[0]) {
					fd.append('image', image);
				}

				if ($('.summernote')[0]) {
					var textarea = {};
					$('.summernote').each(function (e) {
						textarea[$(this).attr('data-id')] = $(this).code();
					});
					fd.append('longText', JSON.stringify(textarea));
				}

				$form.find('input, textarea, select, button').attr('disabled', 'disabled');
				$form.find('button, .btn, input').addClass('disabled').attr('disabled', 'disabled');
				$form.find('[type=submit]').disable(true);

				$.ajax({
					method: 'post',
					url: $route,
					data: fd,
					crossDomain: false,
					dataType: 'json',
					cache: true,
					processData: false,
					contentType: false,
					headers: {
						'X-CSRF-Token': $('meta[name="_t"]').attr('content')
					},
				}).done(function (e) {
					processing = false;
					$form.showMessage(e.message, e.type);
					$form.find('input, textarea, select, button').removeClass('disabled').removeAttr('disabled');
					$form.find('[type=submit]').disable(false);
					if (e.type === 'success') {
						$form[0].reset();
						if ($form.find('input[data-route]').attr('data-reload') === 'true') {
							setTimeout(function() { location.reload(); }, 3000);
						}
					}
				}).fail(function (xhr, status, e) {
					processing = false;
					$form.showMessage(xhr.responseText, 'danger');
					$form.find('input, textarea, select, button').removeClass('disabled').removeAttr('disabled');
					$form.find('[type=submit]').disable(false);
				});
			} else {
				$form.showMessage('Something wrong!', 'info');
				return;
			}
			return false;
		});
	}
}