import { Core } from "./core";
import { Plugins } from "./plugins";

var $form;
var processing = false;

if ($('#companyAffiliateList')[0]) {
	$('#companyAffiliateList').on('click', '.btn-danger', function (e) {
		e.preventDefault();
		var $button = $(this);
		var id = $button.data('id');

		if (confirm('Remove this company from your affiliate list?')) {
			if ( ! processing) {
				$('#companyAffiliateList .btn-danger').disable(true);
				processing = true;
				$('.page-preloader').show();

				$.post(window.origin + '/agency/remove-affiliate', {
					id: id
				}).done(function (e) {
					$('#companyAffiliateList .btn-danger').disable(false);
					processing = false;
					$('.page-preloader').hide();
					alert(e.message);
					if (e.type === 'success') {
						$('#companyAffiliateList li[data-id="' + id + '"]').remove();
					}
				}).fail(function (xhr, status, e) {
					$('#companyAffiliateList .btn-danger').disable(false);
					processing = false;
					$('.page-preloader').hide();
					alert(xhr.responseText);
				});
			}
		}
	});
}

if ($('#companyAffiliateSearchList')[0]) {
	$('#companyAffiliateSearchList').on('click', '.btn-success', function (e) {
		e.preventDefault();
		var $button = $(this);
		var id = $button.data('id');

		if (confirm('Add this company to your affiliate list?')) {
			if ( ! processing) {
				$('#companyAffiliateList .btn-success').disable(true);
				processing = true;
				$('.page-preloader').show();

				$.post(window.origin + '/agency/add-affiliate', {
					id: id
				}).done(function (e) {
					$('#companyAffiliateList .btn-success').disable(false);
					processing = false;
					$('.page-preloader').hide();
					alert(e.message);
					if (e.type === 'success') {
						$('#companyAffiliateList li#' + id).remove();
					}
				}).fail(function (xhr, status, e) {
					$('#companyAffiliateList .btn-success').disable(false);
					processing = false;
					$('.page-preloader').hide();
					alert(xhr.responseText);
				});
			}
		}
	});
}

if ($('#agencyAccountForm')[0]) {
	var $form = $('#agencyAccountForm');
	var allowed_avatar_mime = [
	'image/gif',
	'image/jpeg',
	'image/pjpeg',
	'image/png'
	];

	$('input[name=image]').on('change', function () {
		if (this.files[0].size > 5000000) {
			$(this).parent().showMessage('File cannot be more than 5Mb.', 'danger');
		} else if ($.inArray(this.files[0].type, allowed_avatar_mime) === -1) {
			$(this).parent().showMessage('Can only upload .jpg, .gif, or .png files.', 'danger');
		} else {
			if ( ! processing) {
				processing = true;
				$('.page-preloader').show();
				var fd = new FormData();
				fd.append('file', this.files[0]);

				$.ajax({
					method: 'post',
					url: window.origin + '/agency/update-avatar',
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
					alert(e.message);
					if (e.type === 'success') {
						$('img.tmp-img').attr('src', e.image);
					}
					$form.showMessage(e.message, e.type);
				}).fail(function (xhr, status, e) {
					processing = false;
					$('.page-preloader').hide();
					alert(xhr.responseText);
					$form.showMessage(xhr.responseText, 'danger');
				});
			}
			else {
				alert('Another upload process is running, please wait.');
			}
		}
	});

	$form.on('click', 'button[type=submit]', function (e) {
		e.preventDefault();
		if ($form.parsley().validate() && ! processing) {
			processing = true;
			$form.find('[type=submit]').disable(true);
			$('.page-preloader').show();

			$.post(window.origin + '/agency/update-account', {
				data: $form.serializeForm()
			}).done(function (e) {
				$form.showMessage(e.message, e.type);
				$form.find('[type=submit]').disable(false);
				processing = false;
				$('.page-preloader').hide();
			}).fail(function (xhr, status, e) {
				$form.showMessage(xhr.responseText, 'danger');
				$form.find('[type=submit]').disable(false);
				processing = false;
				$('.page-preloader').hide();
			});
		}
	});
}

// Post Job
if ($('#agencyPostJobForm')[0]) {
	var $sections = $('.form-section');
	var $form = $('#agencyPostJobForm');

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
			scrollTop: $form.offset().top - 100
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

	$form.find('[type=submit]').on('click', function (e) {
		e.preventDefault();

		if ($form.parsley().validate() && ! processing) {
			processing = true;
			$('.page-preloader').show();
			$form.find('[type=submit]').disable(true);

			$.post(window.origin + '/agency/submit-job', {
				data: $form.serializeForm()
			}).done(function (e) {
				processing = false;
				$('.page-preloader').hide();
				$form.showMessage(e.message, e.type);
				$form.find('[type=submit]').disable(false);
				if (e.type === 'success') {
					location.replace(window.origin + '/agency');
				}
			}).fail(function (xhr, status, e) {
				processing = false;
				$('.page-preloader').hide();
				$form.showMessage(xhr.responseText, 'danger');
				$form.find('[type=submit]').disable(false);
			});
		}
	});
}

// Edit Job
if ($('#agencyEditJobForm')[0]) {
	var $sections = $('.form-section');
	var $form = $('#agencyEditJobForm');
	var jobId = $form.data('job');

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
			scrollTop: $form.offset().top - 100
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

	$form.find('[type=submit]').on('click', function (e) {
		e.preventDefault();

		if ($form.parsley().validate() && ! processing) {
			processing = true;
			$('.page-preloader').show();
			$form.find('[type=submit]').disable(true);

			$.post(window.origin + '/agency/edit-job', {
				data: $form.serializeForm(),
				job: jobId
			}).done(function (e) {
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
		}
	});
}

// Notifications
if ($('#listNotif')[0]) {
	var $list = $('#listNotif');
	$list.find('.btn-mark-notif').on('click', function (e) {
		e.preventDefault();

		if ( ! processing) {
			var $notifBtn = $(this);
			var id = $notifBtn.data('id');
			$list.find('.btn-mark-notif').disable(true);
			processing = true;

			$.post(window.origin + '/agency/update-notif', {
				id: id,
				read: true
			}).done(function (e) {
				$list.find('.btn-mark-notif').disable(false);
				processing = false;
				if (e.type === 'success') {
					$list.find('li[data-id=' + id + ']').remove();
				}
			}).fail(function (xhr, status, e) {
				$list.find('.btn-mark-notif').disable(false);
				processing = false;
			});
		}
	});

	$('#removeReadNotifBtn').on('click', function (e) {
		if ( ! processing ) {
			$('#removeReadNotifBtn').disable(true);
			processing = true;

			$.post(window.origin + '/agency/remove-notif').done(function (e) {
				$('#removeReadNotifBtn').disable(false);
				processing = false;
				alert(e.message);
			}).fail(function (xhr, status, e) {
				$('#removeReadNotifBtn').disable(false);
				processing = false;
			});
		}
	});
}

if ($('#timesheetList')[0]) {
	var $list = $('#timesheetList');

	$list.find('.btn-give-job').on('click', function (e) {
		e.preventDefault();
		var $btn = $(this);

		if (confirm('Give the job to this contractor?') && ! processing) {
			processing = true;
			$('.page-preloader').show();
			$list.find('.btn-give-job').disable(true);

			$.post(window.origin + '/job/give-job', {
				job: $btn.data('job'),
				contractor: $btn.data('value')
			}).done(function (e) {
				processing = false;
				$('.page-preloader').hide();
				$list.find('.btn-give-job').disable(false);
				if (e.type === 'success') {
					if (confirm(e.message)) location.reload();
				}
				else alert(e.message);
			}).fail(function (xhr, status, e) {
				alert(xhr.responseText);
				processing = false;
				$('.page-preloader').hide();
				$list.find('.btn-give-job').disable(false);
			});
		}
	});
}

if ($('#jobContractorList')[0]) {
	$('.btn-remove-contract').on('click', function (e) {
		e.preventDefault();
		var $button = $(this);
		var $job = $('#jobContractorList').data('job');
		var $contractor = $button.data('value');

		if (confirm('Remove this contractor from this job?')) {
			if ( ! processing) {
				processing = true;
				$('.btn-remove-contract').disable(true);
				$('.page-preloader').show();

				$.post(window.origin + '/job/cancel-contractor', {
					job: $job,
					contractor: $contractor
				}).done(function (e) {
					if (e.type === 'success') {
						alert(e.message);
						$button.parent().parent().parent().parent().remove();
					}
					else alert(e.message);
					processing = false;
					$('.btn-remove-contract').disable(false);
					$('.page-preloader').hide();
				}).fail(function (xhr, status, e) {
					alert(xhr.responseText);
					processing = false;
					$('.btn-remove-contract').disable(false);
					$('.page-preloader').hide();
				});
			}
			else {
				alert('Another process is running, please wait.');
			}
		}
	});
}

if ($('#removeJobBtn')[0]) {
	$('#removeJobBtn').on('click', function (e) {
		var $button = $('#removeJobBtn');
		if (confirm('Remove this job? CANNOT BE UNDO.')) {
			var $job = $button.data('job');

			if ( ! processing) {
				processing = true;
				$button.disable(true);
				$('.page-preloader').show();

				$.post(window.origin + '/job/remove-job', {
					job: $job
				}).done(function (e) {
					if (e.type === 'success') {
						alert(e.message);
						location.replace(e.redirect);
					}
					else alert(e.message);
					processing = false;
					$button.disable(false);
					$('.page-preloader').hide();
				}).fail(function (xhr, status, e) {
					alert(xhr.responseText);
					processing = false;
					$button.disable(false);
					$('.page-preloader').hide();
				});
			}
			else {
				alert('Another process is running, please wait.');
			}
		}
	});
}

if ($('#jobStatusChanger')[0]) {
	var $select = $('#jobStatusChanger');
	var $job = $select.data('job');

	$select.on('change', function () {
		if ( ! processing) {
			processing = true;
			$select.disable(true);
			$('.page-preloader').show();

			$.post(window.origin + '/job/status-change', {
				job: $job,
				value: $select.val()
			}).done(function (e) {
				if (e.type === 'success') {
					if ($select.val() === 'open') {
						$select.parent().parent().parent().removeClass('panel-danger').addClass('panel-success');
					}
					else {
						$select.parent().parent().parent().removeClass('panel-success').addClass('panel-danger');
					}
				}
				else alert(e.message);

				$select.disable(false);
				processing = false;
				$('.page-preloader').hide();
			}).fail(function (xhr, status, e) {
				alert(xhr.responseText);
				processing = false;
				$select.disable(false);
				$('.page-preloader').hide();
			});
		}
		else {
			alert("Another process is running, please wait");
		}
	});
}

if ($('.btn-accept-ts')[0]) {
	$('.btn-accept-ts').on('click', function (e) {
		if ( ! processing) {
			if (confirm('Accept this timesheet?')) {
				var $button = $(this);
				var id = $button.data('id');

				processing = true;
				$('.btn-accept-ts').disable(true);
				$('.page-preloader').show();

				$.post(window.origin + '/agency/accept-timesheet', {
					id: id
				}).done(function (e) {
					alert(e.message);
					if (e.type === 'success') location.reload();
					processing = false;
					$('.btn-accept-ts').disable(false);
					$('.page-preloader').hide();
				}).fail(function (xhr, status, e) {
					alert(xhr.responseText);
					processing = false;
					$('.btn-accept-ts').disable(false);
					$('.page-preloader').hide();
				}); 
			}
		}
	});
}

if ($('.btn-remove-ts')[0]) {
	$('.btn-remove-ts').on('click', function (e) {
		if ( ! processing) {
			if (confirm('Remove acception this timesheet?')) {
				var $button = $(this);
				var id = $button.data('id');

				processing = true;
				$('.btn-remove-ts').disable(true);
				$('.page-preloader').show();

				$.post(window.origin + '/agency/remove-timesheet', {
					id: id
				}).done(function (e) {
					alert(e.message);
					if (e.type === 'success') location.reload();
					processing = false;
					$('.btn-remove-ts').disable(false);
					$('.page-preloader').hide();
				}).fail(function (xhr, status, e) {
					alert(xhr.responseText);
					processing = false;
					$('.btn-remove-ts').disable(false);
					$('.page-preloader').hide();
				}); 
			}
		}
	});
}

if ($('.btn-accept-ex')[0]) {
	$('.btn-accept-ex').on('click', function (e) {
		if ( ! processing) {
			if (confirm('Accept this expense?')) {
				var $button = $(this);
				var id = $button.data('id');

				processing = true;
				$('.btn-accept-ex').disable(true);
				$('.page-preloader').show();

				$.post(window.origin + '/agency/accept-expense', {
					id: id
				}).done(function (e) {
					alert(e.message);
					if (e.type === 'success') location.reload();
					processing = false;
					$('.btn-accept-ex').disable(false);
					$('.page-preloader').hide();
				}).fail(function (xhr, status, e) {
					alert(xhr.responseText);
					processing = false;
					$('.btn-accept-ex').disable(false);
					$('.page-preloader').hide();
				}); 
			}
		}
	});
}

if ($('.btn-remove-ex')[0]) {
	$('.btn-remove-ex').on('click', function (e) {
		if ( ! processing) {
			if (confirm('Remove acception this expense?')) {
				var $button = $(this);
				var id = $button.data('id');

				processing = true;
				$('.btn-remove-ex').disable(true);
				$('.page-preloader').show();

				$.post(window.origin + '/agency/remove-expense', {
					id: id
				}).done(function (e) {
					alert(e.message);
					if (e.type === 'success') location.reload();
					processing = false;
					$('.btn-remove-ex').disable(false);
					$('.page-preloader').hide();
				}).fail(function (xhr, status, e) {
					alert(xhr.responseText);
					processing = false;
					$('.btn-remove-ex').disable(false);
					$('.page-preloader').hide();
				}); 
			}
		}
	});
}