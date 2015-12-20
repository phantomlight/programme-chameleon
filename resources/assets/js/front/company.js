import { Core } from "./core";
import { Plugins } from "./plugins";

var $form;
var processing = false;

// Post Job
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

			$.post(window.origin + '/job/submit-job', {
				data: $form.serializeForm()
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

// Edit Job
if ($('#companyEditJobForm')[0]) {
	var $sections = $('.form-section');
	var $form = $('#companyEditJobForm');
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

			$.post(window.origin + '/job/edit-job', {
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

// Edit Account
if ($('#companyEditAccountForm')[0]) {
	$form = $('#companyEditAccountForm');

	$form.find('[type=submit]').on('click', function (e) {
		e.preventDefault();
		if ($form.parsley().validate() && ! processing) {
			processing = true;
			$('.page-preloader').show();
			$form.find('[type=submit]').disable(true);

			$.post(window.origin + '/company/update-account', {
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

// Timesheet
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

if ($('#agencyAffiliateList')[0]) {
	var $list = $('#agencyAffiliateList');

	$list.on('click', '.btn-success', function (e) {
		var $button = $(this);
		if (confirm('Accept this agency as your affiliate?')) {
			if ( ! processing) {
				var id = $button.data('id');
				processing = true;
				$list.find('.btn').disable(true);
				$('.page-preloader').show();
				$.post(window.origin + '/company/add-affiliate', {id: id}).done(function (e) {
					processing = false;
					$list.find('.btn').disable(false);
					$('.page-preloader').hide();
					alert(e.message);
				}).fail(function (xhr, status, e) {
					processing = false;
					$list.find('.btn').disable(false);
					$('.page-preloader').hide();
					alert(xhr.responseText);
				});
			}
		}
	});

	$list.on('click', '.btn-danger', function (e) {
		var $button = $(this);
		if (confirm('Remove this agency from your affiliate list?')) {
			if ( ! processing) {
				var id = $button.data('id');
				processing = true;
				$list.find('.btn').disable(true);
				$('.page-preloader').show();
				$.post(window.origin + '/company/remove-affiliate', {id: id}).done(function (e) {
					processing = false;
					$list.find('.btn').disable(false);
					$('.page-preloader').hide();
					alert(e.message);
					if (e.type === 'success') {
						$list.find('li[data-id=" ' + id + '"]').remove();
					}
				}).fail(function (xhr, status, e) {
					processing = false;
					$list.find('.btn').disable(false);
					$('.page-preloader').hide();
					alert(xhr.responseText);
				});
			}
		}
	});
}

if ($('#removeVipBtn')[0]) {
	$('#removeVipBtn').on('click', function (e) {
		e.preventDefault();
		if (confirm('Really Remove VIP?')) {
			if ( ! processing ) {
				$('#removeVipBtn').disable(true);
				$('.page-preloader').show();
				processing = true;

				$.post(window.origin + '/company/remove-vip').done(function (e) {
					alert(e.message);
					$('#removeVipBtn').disable(false);
					$('.page-preloader').hide();
					processing = false;
					if (e.type === 'success') location.reload();
				}).fail(function (xhr, status, e) {
					alert(xhr.responseText);
					$('#removeVipBtn').disable(false);
					$('.page-preloader').hide();
					processing = false;
				});
			}
		}
	});
}

// Notifications
if ($('#listNotif')[0]) {
	var $list = $('#listBotif');
	$list.find('.btn-mark-notif').on('click', function (e) {
		e.preventDefault();

		if ( ! processing) {
			var $notifBtn = $(this);
			var id = $notifBtn.data('id');
			$list.find('.btn-mark-notif').disable(true);
			processing = true;

			$.post(window.origin + '/company/update-notif', {
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

			$.post(window.origin + '/company/remove-notif').done(function (e) {
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