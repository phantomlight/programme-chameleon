const jKey = { // jcryption aes key
	key1: 'VefT5WpnGT',
	key2: 'lRYj3IbU0e',
	pub_key: 	window.origin + '/gen',
	handshake: window.origin + '/handshake'
}

export class Forms {
	constructor() {
		if ($('#companyPostJobForm')[0]) {
			var $sections = $('.form-section');
			var $form = $('#companyPostJobForm');

			function curIndex() {
				return $sections.index($sections.filter('.current'));
			}

			function navigateTo(index) {
				$sections.removeClass('current').eq(index).addClass('current');
				$('.form-navigation .previous').toggle(index > 0);
				var atTheEnd = index >= $sections.length - 1;
				$('.form-navigation .next').toggle(!atTheEnd);
				$('.form-navigation [type=submit]').toggle(atTheEnd);

				$('html, body').animate({
					scrollTop: $("#companyPostJobForm").offset().top - 100
				}, 100);
			}

			$('.form-navigation .previous').click(function() {
				navigateTo(curIndex() - 1);
			});

			$('.form-navigation .next').click(function() {
				if ($form.parsley().validate('block-' + curIndex())) {
					navigateTo(curIndex() + 1);
				}
			});

			$sections.each(function (index, section) {
				$(section).find(':input').attr('data-parsley-group', 'block-' + index);
			});

			navigateTo(0);
		}

		if ($('#register-form')[0]) {
			this.initRegisterForm();
		}

		if ($('#login-form')[0]) {
			this.initLoginForm();
		}

		/*
			Contractor specific forms
			TODO: split into separate modules
		*/

		if ($('#contractorAccountForm')[0]) {
			this.initContractorAccountForm();
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
				aes = $.jCryption.encrypt(jKey.key1, jKey.key2);
				$form.find('[type=submit]').disable(true);

				$.jCryption.authenticate(aes, jKey.pub_key, jKey.handshake, (function () {
					$.post($route, {
						data: JSON.stringify($.jCryption.encrypt($form.serialize(), aes))
					}).done(function(e) {
						processing = false;
						$form.showMessage(e.message, e.type);
						$form.find('[type=submit]').disable(false);
					}).fail(function (xhr, status, e) {
						processing = false;
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
				aes = $.jCryption.encrypt(jKey.key1, jKey.key2);
				$form.find('[type=submit]').disable(true);

				$.jCryption.authenticate(aes, jKey.pub_key, jKey.handshake, (function () {
					$.post($route, {
						data: JSON.stringify($.jCryption.encrypt($form.serialize(), aes))
					}).done(function(e) {
						processing = false;
						$form.showMessage(e.message, e.type);
						$form.find('[type=submit]').disable(false);
						if (e.type === 'success') location.replace(e.redirect);
					}).fail(function (xhr, status, e) {
						processing = false;
						$form.showMessage(xhr.responseText, 'danger');
						$form.find('[type=submit]').disable(false);
					});
				}));
			}
		});
	}
	initContractorAccountForm() {
		var processing = false;
		var $form = $('#contractorAccountForm');
		var expRowHtml = '<div class="row element-top-10"><div class="col-md-3"><input type="text" name="exp_company" class="form-control" placeholder="Company" /></div><div class="col-md-3"><input type="text" name="exp_year" class="form-control" placeholder="Year" /></div><div class="col-md-3"><input type="text" name="exp_salary" class="form-control" placeholder="Salary" /></div><div class="col-md-3"><input type="text" name="exp_position" class="form-control" placeholder="Position" /></div><div class="element-top-10">&nbsp;</div><div class="col-sm-10"><textarea class="form-control" name="exp_desc">Explain a little about your job duties.</textarea></div><div class="col-sm-2"><button class="btn btn-danger btn-xs">Remove</button></div></div>';
		var eduRowHtml = '<div class="row element-top-10"><div class="col-md-3"><input type="text" name="edu_name" class="form-control" placeholder="Institution Name" /></div><div class="col-md-3"><input type="text" name="edu_type" class="form-control" placeholder="ex. Design/Engineering/Business" /></div><div class="col-md-3"><input type="text" name="edu_gpa" class="form-control" placeholder="GPA/Score" /></div><div class="col-md-3"><input type="text" name="edu_qualification" class="form-control" placeholder="ex. Ph.D" /></div><div class="col-sm-2 element-top-10"><button class="btn btn-danger btn-xs">Remove</button></div></div>';

		$('#expContainer').find('button#addExp').on('click', function (e) {
			e.preventDefault();
			$('#expContainer').append(expRowHtml);
		});

		$('#eduContainer').find('button#addEducation').on('click', function (e) {
			e.preventDefault();
			$('#eduContainer').append(eduRowHtml);
		});

		$('#expContainer').on('click', 'button.btn-danger', function (e) {
			if (confirm('Remove this experience data? Cannot be undo.')) {
				$(this).parent().parent().remove();
			}
		});

		$('#eduContainer').on('click', 'button.btn-danger', function (e) {
			if (confirm('Remove this education data? Cannot be undo.')) {
				$(this).parent().parent().remove();
			}
		});

		$form.find('[type=submit]').on('click', function (e) {
			e.preventDefault();
			if (! processing) {
				processing = true;
				$form.find('[type=submit]').disable(true);

				$.post(window.origin + '/contractor/update-account', {
					data: $form.serializeForm()
				}).done(function (e) {
					processing = false;
					$form.showMessage(e.message, e.type);
					$form.find('[type=submit]').disable(false);
				}).fail(function (xhr, status, e) {
					processing = false;
					$form.showMessage(xhr.responseText, 'danger');
					$form.find('[type=submit]').disable(false);
				});
			}
		});
	}
}