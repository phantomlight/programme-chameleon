const jKey = { // jcryption aes key
	key1: 'VefT5WpnGT',
	key2: 'lRYj3IbU0e',
	pub_key: 	window.origin + '/gen',
	handshake: window.origin + '/handshake'
}

const adminRoutes = {
	login: window.origin + '/admin/login'
}

export class Forms {
	constructor() {
		if ($('#adminLoginForm')[0]) {
			this.initAdminLoginForm('#adminLoginForm');
		}

		if ($('#adminSettingsForm')[0]) {
			this.initSettingsForm();
		}

		if ($('.form-action-add')[0]) {
			this.initCommonAddForm();
		}

		if ($('.form-action-edit')[0]) {
			this.initCommonEditForm();
		}

		if ($('#listServices')[0]) {
			this.initServices();
		}

		if ($('#addResourceForm')[0]) {
			this.initResourceForm();
		}

		if ($('#listResources')[0]) {
			this.initResources();
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
				$('.page-preloader').show();
				aes = $.jCryption.encrypt(jKey.key1, jKey.key2);
				$.jCryption.authenticate(aes, jKey.pub_key, jKey.handshake, (function () {
					$form.find('[type=submit]').disable(true);
					$.post(adminRoutes.login, {
						data: JSON.stringify($.jCryption.encrypt($form.serialize(), aes))
					}).done(function (e) {
						processing = false;
						$('.page-preloader').hide();
						$form.showMessage(e.message, e.type);
						if (e.type === 'success') {
							window.location.replace(e.redirect);
						}
						else {
							$form.find('[type=submit]').disable(false);
						}
					}).fail(function (xhr, status, e) {
						processing = false;
						$('.page-preloader').hide();
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
	initSettingsForm() {
		var $form = $('#adminSettingsForm');
		var processing = false;
		
		$form.find('[type=submit]').on('click', function (e) {
			if ( ! processing) {
				processing = true;
				$('.page-preloader').show();
				$form.find('[type=submit]').disable(true);

				$.post(window.origin + '/admin/account', {
					data: $form.serializeForm()
				}).done(function (e) {
					processing = false;
					$('.page-preloader').hide();
					$form.find('[type=submit]').disable(false);
					$form.showMessage(e.message, e.type);
				}).fail(function (xhr, status, e) {
					processing = false;
					$('.page-preloader').hide();
					$form.find('[type=submit]').disable(false);
					$form.showMessage(xhr.responseText, 'danger');
				});
			}
			else {
				alert('Another process is running, please wait.');
			}
		});
	}
	initCommonAddForm() {
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
				if (this.files[0].size > 5000000) {
					$(this).parent().showMessage('File cannot be larger than 5mb !', 'danger');
					image = null;
				} else if ($.inArray(this.files[0].type, allowed_mime) === -1) {
					$(this).parent().showMessage('File cannot be uploaded !', 'danger');
					image = null;
				} else {
					$(this).parent().showMessage('<i class="fa fa-check"></i> File can be uploaded', 'success');
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
				$('.page-preloader').show();
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
					$('.page-preloader').hide();
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
					$('.page-preloader').hide();
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
	initCommonEditForm() {
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
				if (this.files[0].size > 5000000) {
					$(this).parent().showMessage('File cannot be larger than 3Mb !', 'danger');
					image = null;
				} else if ($.inArray(this.files[0].type, allowed_mime) === -1) {
					$(this).parent().showMessage('File cannot be uplaoded !', 'danger');
					image = null;
				} else {
					$(this).parent().showMessage('<i class="fa fa-check"></i> File allowed', 'success');
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
				$('.page-preloader').show();
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
					$('.page-preloader').hide();
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
					$('.page-preloader').hide();
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
	initServices() {
		var allowed_images = [
			'image/gif',
			'image/jpeg',
			'image/pjpeg',
			'image/png'
		];
		var $list = $('#listServices');
		var processing = false;

		$('.service-image').on('change', function (e) {
			var $input = $(this);
			var id = $input.data('id');

			if (this.files[0].size > 2000000) {
				$(this).parent().showMessage('File cannot be more than 2Mb.', 'danger');
			}
			else if ($.inArray(this.files[0].type, allowed_images) === -1) {
				$(this).parent().showMessage('Can only upload image files.', 'danger');
			} else {
				if ( ! processing) {
					var fd = new FormData();
					fd.append('file', this.files[0]);
					fd.append('key', 'service');
					fd.append('id', id);
					processing = true;
					$('.page-preloader').show();
					$list.find('.btn').disable(true);

					$.ajax({
						method: 'post',
						url: window.origin + '/admin/update-service-image',
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
						$('.page-preloader').hide();
						$list.find('.btn').disable(false);
						alert(e.message);
						if (e.type === 'success') {
							$input.parent().find('img.img-thumbnail').attr('src', e.image);
						}
					}).fail(function (xhr, status, e) {
						processing = false;
						$('.page-preloader').hide();
						$list.find('.btn').disable(false);
						alert(xhr.responseText);
					});
				}
				else {
					alert('Another process is still running, please wait.');
				}
			}
		});
		
		$('#listServices').find('[type=submit]').on('click', function (e) {
			if ( ! processing ) {
				var $form = $(this).parent().parent();
				var list = $form.parent();
				processing = true;
				$('.page-preloader').show();
				$list.find('.btn').disable(true);

				$.post(window.origin + '/admin/update-service', {
					data: $form.serializeForm(),
					description: $form.find('.summernote').code(),
					id: list.data('id')
				}).done(function (e) {
					processing = false;
					$('.page-preloader').hide();
					$list.find('.btn').disable(false);
					alert(e.message);
				}).fail(function (xhr, status, e) {
					processing = false;
					$('.page-preloader').hide();
					$list.find('.btn').disable(false);
					alert(xhr.responseText);
				});
			}
			else {
				alert('Another process is still running, please wait.');
			}
		});
	}
	initResources() {
		var allowed_documents = [
			'application/msword',
			'application/msexcel',
			'application/vnd.ms-excel',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		];
		var $resList = $('#listResources');
		var processing = false;

		$resList.find('input[type=file]').on('change', function (e) {
			var $input = $(this);
			var id = $input.data('id');

			if (this.files[0].size > 5000000) {
				$(this).parent().showMessage('File cannot be more than 5Mb.', 'danger');
				addResourceFile = null;
			} else if ($.inArray(this.files[0].type, allowed_documents) === -1) {
				$(this).parent().showMessage('Can only upload document files.', 'danger');
				addResourceFile = null;
			} else {
				if ( ! processing) {
					var fd = new FormData();
					fd.append('file', this.files[0]);
					fd.append('id', id);
					processing = true;
					$('.page-preloader').show();
					$resList.find('.btn').disable(true);

					$.ajax({
						method: 'post',
						url: window.origin + '/admin/edit-resource-file',
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
						$('.page-preloader').hide();
						$resList.find('.btn').disable(false);
						alert(e.message);
					}).fail(function (xhr, status, e) {
						processing = false;
						$('.page-preloader').hide();
						$resList.find('.btn').disable(false);
						alert(xhr.responseText);
					});
				}
				else {
					alert('Another process is still running, please wait.');
				}
			}
		});

		$resList.find('.btn-edit').on('click', function (e) {
			if ( ! processing ) {
				var $form = $(this).parent().parent();
				processing = true;
				$('.page-preloader').show();
				$resList.find('.btn').disable(true);
				$.post(window.origin + '/admin/edit-resource', {
					id: $(this).data('id'),
					data: $form.serializeForm(),
					description: $form.find('.summernote').code()
				}).done(function (e) {
					processing = false;
					$('.page-preloader').hide();
					$resList.find('.btn').disable(false);
					alert(e.message);
				}).fail(function (xhr, status, e) {
					processing = false;
					$('.page-preloader').hide();
					$resList.find('.btn').disable(false);
					alert(xhr.responseText);
				});
			}
			else {
				alert('Another process is still running, please wait.');
			}
		});

		$resList.find('.btn-remove').on('click', function (e) {
			if (confirm('Really remove this resource?')) {
				if ( ! processing ) {
					var id = $(this).data('id');
					processing = true;
					$('.page-preloader').show();
					$resList.find('.btn').disable(true);
					$.post(window.origin + '/admin/remove-resource', {
						id: $(this).data('id'),
					}).done(function (e) {
						processing = false;
						$('.page-preloader').hide();
						$resList.find('.btn').disable(false);
						alert(e.message);
					}).fail(function (xhr, status, e) {
						processing = false;
						$('.page-preloader').hide();
						$resList.find('.btn').disable(false);
						alert(xhr.responseText);
					});
				}
				else {
					alert('Another process is still running, please wait.');
				}
			}
		});
	}
	initResourceForm() {
		var $form = $('#addResourceForm');
		var addResourceFile = null;
		var allowed_documents = [
			'application/msword',
			'application/msexcel',
			'application/vnd.ms-excel',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		];
		var processing = false;

		$form.find('input[type=file]').on('change', function (e) {
			var $input = $(this);
			var id = $input.data('id');

			if (this.files[0].size > 5000000) {
				$(this).parent().showMessage('File cannot be more than 5Mb.', 'danger');
				addResourceFile = null;
			} else if ($.inArray(this.files[0].type, allowed_documents) === -1) {
				console.log(this.files[0].type);
				$(this).parent().showMessage('Can only upload document files.', 'danger');
				addResourceFile = null;
			} else {
				$(this).parent().showMessage('Can upload this file.', 'success');
				addResourceFile = this.files[0];
			}
		});

		$form.find('[type=submit]').on('click', function (e) {
			if (addResourceFile == null) {
				$form.showMessage('No file is set yet', 'danger');
				return;
			}

			if ( ! processing) {
				processing = true;
				$('.page-preloader').show();
				$form.find('[type=submit]').disable(true);
				var fd = new FormData();
				fd.append('file', addResourceFile);
				fd.append('data', JSON.stringify($form.serializeForm()));
				fd.append('description', $form.find('.summernote').code());
				$.ajax({
					method: 'post',
					url: window.origin + '/admin/add-resource',
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
					$('.page-preloader').hide();
					$form.find('[type=submit]').disable(false);
					alert(e.message);
				}).fail(function (xhr, status, e) {
					processing = false;
					$('.page-preloader').hide();
					$list.find('[type=submit]').disable(false);
					alert(xhr.responseText);
				});
			}
			else {
				alert('Another process is still running, please wait.');
			}
		});
	}
}