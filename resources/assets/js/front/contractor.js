import { Core } from "./core";
import { Plugins } from "./plugins";

var $form;
var processing = false;

// Account settings - upload cv, avatar, change password and personal information
if ($('#contractorAccountForm')[0]) {
	$form = $('#contractorAccountForm');
	var expRowHtml = '<div class="row element-top-10"><div class="col-md-3"><input type="text" name="exp_company" class="form-control" placeholder="Company" /></div><div class="col-md-3"><input type="text" name="exp_year" class="form-control" placeholder="Year" /></div><div class="col-md-3"><input type="text" name="exp_salary" class="form-control" placeholder="Salary" /></div><div class="col-md-3"><input type="text" name="exp_position" class="form-control" placeholder="Position" /></div><div class="element-top-10">&nbsp;</div><div class="col-sm-10"><textarea class="form-control" name="exp_desc" maxlength="2000">Explain a little about your job duties.</textarea></div><div class="col-sm-2"><button class="btn btn-danger btn-xs">Remove</button></div></div>';
	var eduRowHtml = '<div class="row element-top-10"><div class="col-md-3"><input type="text" name="edu_name" class="form-control" placeholder="Institution Name" /></div><div class="col-md-3"><input type="text" name="edu_type" class="form-control" placeholder="ex. Design/Engineering/Business" /></div><div class="col-md-3"><input type="text" name="edu_gpa" class="form-control" placeholder="GPA/Score" /></div><div class="col-md-3"><input type="text" name="edu_qualification" class="form-control" placeholder="ex. Ph.D" /></div><div class="col-sm-2 element-top-10"><button class="btn btn-danger btn-xs">Remove</button></div></div>';
	var urlRowHtml = '<div class="row element-top-10"><div class="col-md-5"><input type="text" name="web_name" class="form-control" placeholder="Name of the web" /></div><div class="col-md-5"><input type="text" name="web_adress" class="form-control" placeholder="http://www.programmechameleon.com" /></div><div class="col-sm-2 element-top-10"><button class="btn btn-danger btn-xs">Remove</button></div></div>';

	var allowed_avatar_mime = [
	'image/gif',
	'image/jpeg',
	'image/pjpeg',
	'image/png'
	];

	var allowed_resume_mime = [
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	];

	$('input[name=file_cv]').on('change', function () {
		if (this.files[0].size > 5000000) {
			$(this).parent().showMessage('File cannot be more than 5Mb.', 'danger');
		} else if ($.inArray(this.files[0].type, allowed_resume_mime) === -1) {
			$(this).parent().showMessage('Can only upload .doc or .docx files.', 'danger');
		} else {
			if ( ! processing) {
				processing = true;
				var fd = new FormData();
				fd.append('file', this.files[0]);
				$('.page-preloader').show();

				$.ajax({
					method: 'post',
					url: window.origin + '/contractor/update-resume',
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
					url: window.origin + '/contractor/update-avatar',
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

	$('#expContainer').find('button#addExp').on('click', function (e) {
		e.preventDefault();
		$('#expContainer').append(expRowHtml);
	});

	$('#eduContainer').find('button#addEducation').on('click', function (e) {
		e.preventDefault();
		$('#eduContainer').append(eduRowHtml);
	});

	$('#urlContainer').find('button#addWebsite').on('click', function (e) {
		e.preventDefault();
		$('#urlContainer').append(urlRowHtml);
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

	$('#urlContainer').on('click', 'button.btn-danger', function (e) {
		if (confirm('Remove this website data? Cannot be undo.')) {
			$(this).parent().parent().remove();
		}
	});

	$form.find('[type=submit]').on('click', function (e) {
		e.preventDefault();
		if (! processing) {
			processing = true;
			$('.page-preloader').show();
			$form.find('[type=submit]').disable(true);

			var eduDataCollection = [];
			var expDataCollection = [];
			var urlDataCollection = [];

			$('#eduContainer .row').each(function (i) {
				var eduData = {
					'name':	$(this).find('input[name=edu_name]').val(),
					'type':	$(this).find('input[name=edu_type]').val(),
					'gpa':	$(this).find('input[name=edu_gpa]').val(),
					'qualification':	$(this).find('input[name=edu_qualification]').val()
				}
				eduDataCollection.push(eduData);
			});

			$('#expContainer .row').each(function (i) {
				var expData = {
					'company':	$(this).find('input[name=exp_company]').val(),
					'year':	$(this).find('input[name=exp_year]').val(),
					'position':	$(this).find('input[name=exp_position]').val(),
					'salary':	$(this).find('input[name=exp_salary]').val(),
					'description':	$(this).find('textarea[name=exp_desc]').val()
				}
				expDataCollection.push(expData);
			});

			$('#urlContainer .row').each(function (i) {
				var urlData = {
					'name':	$(this).find('input[name=web_name]').val(),
					'address':	$(this).find('input[name=web_adress]').val()
				}
				urlDataCollection.push(urlData);
			});

			$.post(window.origin + '/contractor/update-account', {
				data: $form.serializeForm(),
				description: $('.summernote').code(),
				eduData: JSON.stringify(eduDataCollection),
				expData: JSON.stringify(expDataCollection),
				urlData: JSON.stringify(urlDataCollection)
			}).done(function (e) {
				processing = false;
				$('.page-preloader').hide();
				$form.showMessage(e.message, e.type);
				alert(e.message);
				$form.find('[type=submit]').disable(false);
			}).fail(function (xhr, status, e) {
				processing = false;
				$('.page-preloader').hide();
				alert(xhr.responseText);
				$form.showMessage(xhr.responseText, 'danger');
				$form.find('[type=submit]').disable(false);
			});
		}
		else {
			alert('Another upload process is running, please wait.');
		}
	});
}

// Account settings - salary range
if ($('#contractorSalaryRangeForm')[0]) {
	var $salaryForm = $('#contractorSalaryRangeForm');
	$salaryForm.find('[type=button]').on('click', function (e) {
		e.preventDefault();

		if ( ! processing) {
			processing = true;
			$('.page-preloader').show();
			$salaryForm.find('[type=button]').disable(true);

			$.post(window.origin + '/contractor/update-salary', {
				data: $salaryForm.serializeForm()
			}).done(function (e) {
				processing = false;
				$('.page-preloader').hide();
				$salaryForm.showMessage(e.message, e.type);
				$salaryForm.find('[type=button]').disable(false);
			}).fail(function (xhr, status, e) {
				processing = false;
				$('.page-preloader').hide();
				alert(xhr.responseText);
				$salaryForm.showMessage(xhr.responseText, 'danger');
				$salaryForm.find('[type=button]').disable(false);
			});
		}
		else {
			alert('Another upload process is running, please wait');
		}
	});
}

// Job alert
if ($('#contractorJobAlertForm')[0]) {
	$form = $('#contractorJobAlertForm');

	$form.find('[type=submit]').on('click', function (e) {
		e.preventDefault();

		if ($form.parsley().validate() && ! processing) {
			$form.find('[type=submit]').disable(true);
			processing = true;
			$('.page-preloader').show();

			$.post(window.origin + '/contractor/create-job-alert', {
				data: $form.serializeForm()
			})
			.done(function (e) {
				processing = false;
				$('.page-preloader').hide();
				$form.showMessage(e.message, e.type);
				$form.find('[type=submit]').disable(false);
				if (e.type === 'success') location.reload();
			})
			.fail(function (xhr, status, e) {
				processing = false;
				$('.page-preloader').hide();
				$form.showMessage(xhr.responseText, 'danger');
				$form.find('[type=submit]').disable(false);
			});
		}
		else {
			$form.showMessage('Another process is running.', 'info');
		}
	});
}

if ($('#removeAlertBtn')[0]) {
	$('#removeAlertBtn').on('click', function (e) {
		e.preventDefault();
		var $button = $('#removeAlertBtn');
		if (confirm('Remove this alert?')) {
			if ( ! processing) {
				processing = true;
				$('.page-preloader').show();
				$button.disable(true);

				$.post(window.origin + '/contractor/remove-job-alert').done(function (e) {
					processing = false;
					$('.page-preloader').hide();
					$button.disable(false);
					alert(e.message);
					if (e.type === 'success') location.reload();
				}).fail(function (xhr, status, e) {
					processing = false;
					$('.page-preloader').hide();
					alert(xhr.responseText);
					$button.disable(false);
				});
			}
			else {
				alert('Another process is running, please wait');
			}
		}
	});
}

// Apply for Job
if ($('button[data-init-apply]')[0]) {
	$.each($('button[data-init-apply]'), function (i, e) {
		var $button = $(e);

		$button.on('click',  function (e) {
			e.preventDefault();
			if (confirm('Apply for this job?') && ! processing) {
				processing = true;
				$('button[data-init-apply]').disable(true);
				$('.page-preloader').show();

				$.post(window.origin + '/job/apply', {
					job: $button.data('job')
				}).done(function (e) {
					processing = false;
					$('button[data-init-apply]').disable(false);
					$('.page-preloader').hide();
					alert(e.message);
				}).fail(function (xhr, status, e) {
					processing = false;
					$('button[data-init-apply]').disable(false);
					$('.page-preloader').hide();
					alert(xhr.responseText);
				});
			}
			else alert('A process is running, please wait.');
		});
	});
}

if ($('#resumeList')[0]) {
	$('#resumeList .btn-remove').on('click', function (e) {
		var $button = $(this);
		if (confirm('Remove resume file?')) {
			processing = true;
			$('#resumeList .btn-remove').disable(true);
			$('.page-preloader').show();

			$.post(window.origin + '/contractor/remove-resume', {
				file: $button.data('resume')
			}).done(function (e) {
				processing = false;
				$('#resumeList .btn-remove').disable(false);
				$('.page-preloader').hide();
				alert(e.message);
				if (e.type === 'success') $button.parent().parent().remove();
			}).fail(function (xhr, status, e) {
				processing = false;
				$('#resumeList .btn-remove').disable(false);
				$('.page-preloader').hide();
				alert(xhr.responseText);
			});
		}
	});
}

if ($('#dataFileList')[0]) {
	var $list = $('#dataFileList');

	$list.on('click', '[data-remove]', function (e) {
		e.preventDefault();
		if (confirm('Remove data?')) {
			if ( ! processing) {
				var $button = $(this);
				var $route = $button.data('remove');
				var $id = $button.data('id');

				processing = true;
				$('.page-preloader').show();
				$('[btn-remove]').disable(true);

				$.post($route, {i: $id}).done(function (e) {
					processing = false;
					$('.page-preloader').hide();
					$('[btn-remove]').disable(false);
					alert(e.message);
					if (e.type === 'success') {
						$list.find('li[data-id=' + $id + ']').remove();
					}
				}).fail(function (xhr, status, e) {
					processing = false;
					$('.page-preloader').hide();
					$('[btn-remove]').disable(false);
					alert(xhr.responseText);
				});
			}
		}
	});
}

// Submit timesheet
if ($('#submitTimesheetForm')[0]) {
	$form = $('#submitTimesheetForm');
	var $job = $form.data('value');
	var file = null;
	var allowed_timesheet_mime = [
		'application/msword',
		'application/msexcel',
		'application/vnd.ms-excel',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	];

	$('select[name=report_time]').on('change', function (e) {
		console.log($(this).val());
		if ($(this).val() === 'daily') {
			$('span.hour-text').text('hour');
		}
		else {
			$('span.hour-text').text('day');
		}
	});

	$form.find('input[type=file]').on('change', function () {
		if (this.files[0].size > 5000000) {
			$(this).parent().showMessage('File cannot be more than 5Mb.', 'danger');
			file = null;
		} else if ($.inArray(this.files[0].type, allowed_timesheet_mime) === -1) {
			$(this).parent().showMessage('Can only upload word or excel files.', 'danger');
			file = null;
		} else {
			$(this).parent().showMessage('This file can be uploaded.', 'success');
			file = this.files[0];
		}
	});

	$form.find('[type=submit]').on('click', function (e) {
		e.preventDefault();

		if ($form.parsley().validate() && ! processing) {
			processing = true;
			$('.page-preloader').show();
			$form.find('[type=submit]').disable(true);

			var fd = new FormData();
			fd.append('file', file);
			fd.append('data', JSON.stringify($form.serializeForm()));
			fd.append('job', $job);

			$.ajax({
				method: 'post',
				url: window.origin + '/job/submit-timesheet',
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
				$form.find('[type=submit]').disable(false);
			}).fail(function (xhr, status, e) {
				processing = false;
				$('.page-preloader').hide();
				$form.showMessage(xhr.responseText, 'danger');
				$form.find('[type=submit]').disable(false);
			});
		}
		else {
			alert('A process is still on going, please wait');
		}
	});
}

// Submit expense
if ($('#submitExpenseForm')[0]) {
	$form = $('#submitExpenseForm');
	var $job = $form.data('value');
	var file = null;
	var allowed_expense_mime = [
		'application/msword',
		'application/msexcel',
		'application/vnd.ms-excel',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/pdf',
		'image/jpeg',
		'image/pjpeg',
		'image/png'
	];

	$form.find('input[type=file]').on('change', function () {
		if (this.files[0].size > 5000000) {
			$(this).parent().showMessage('File cannot be more than 5Mb.', 'danger');
			file = null;
		} else if ($.inArray(this.files[0].type, allowed_expense_mime) === -1) {
			$(this).parent().showMessage('Can only upload image, office docs, and jpeg or png.', 'danger');
			file = null;
		} else {
			$(this).parent().showMessage('This file can be uploaded.', 'success');
			file = this.files[0];
		}
	});

	$form.find('[type=submit]').on('click', function (e) {
		e.preventDefault();

		if ($form.parsley().validate() && ! processing) {
			processing = true;
			$('.page-preloader').show();
			$form.find('[type=submit]').disable(true);

			var fd = new FormData();
			fd.append('file', file);
			fd.append('data', JSON.stringify($form.serializeForm()));
			fd.append('job', $job);

			$.ajax({
				method: 'post',
				url: window.origin + '/job/submit-expense',
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
				$form.find('[type=submit]').disable(false);
			}).fail(function (xhr, status, e) {
				processing = false;
				$('.page-preloader').hide();
				$form.showMessage(xhr.responseText, 'danger');
				$form.find('[type=submit]').disable(false);
			});
		}
		else {
			alert('A process is still on going, please wait');
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
			console.log(id);
			$list.find('.btn-mark-notif').disable(true);
			processing = true;

			$.post(window.origin + '/contractor/update-notif', {
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

			$.post(window.origin + '/contractor/remove-notif').done(function (e) {
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