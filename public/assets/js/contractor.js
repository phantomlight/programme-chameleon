(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/ford/web/www-job/resources/assets/js/front/contractor.js":[function(require,module,exports){
"use strict";

var _core = require("./core");

var _plugins = require("./plugins");

var $form;
var processing = false;

// Account settings - upload cv, avatar, change password and personal information
if ($('#contractorAccountForm')[0]) {
	$form = $('#contractorAccountForm');
	var expRowHtml = '<div class="row element-top-10"><div class="col-md-3"><input type="text" name="exp_company" class="form-control" placeholder="Company" /></div><div class="col-md-3"><input type="text" name="exp_year" class="form-control" placeholder="Year" /></div><div class="col-md-3"><input type="text" name="exp_salary" class="form-control" placeholder="Salary" /></div><div class="col-md-3"><input type="text" name="exp_position" class="form-control" placeholder="Position" /></div><div class="element-top-10">&nbsp;</div><div class="col-sm-10"><textarea class="form-control" name="exp_desc" maxlength="2000">Explain a little about your job duties.</textarea></div><div class="col-sm-2"><button class="btn btn-danger btn-xs">Remove</button></div></div>';
	var eduRowHtml = '<div class="row element-top-10"><div class="col-md-3"><input type="text" name="edu_name" class="form-control" placeholder="Institution Name" /></div><div class="col-md-3"><input type="text" name="edu_type" class="form-control" placeholder="ex. Design/Engineering/Business" /></div><div class="col-md-3"><input type="text" name="edu_gpa" class="form-control" placeholder="GPA/Score" /></div><div class="col-md-3"><input type="text" name="edu_qualification" class="form-control" placeholder="ex. Ph.D" /></div><div class="col-sm-2 element-top-10"><button class="btn btn-danger btn-xs">Remove</button></div></div>';
	var urlRowHtml = '<div class="row element-top-10"><div class="col-md-5"><input type="text" name="web_name" class="form-control" placeholder="Name of the web" /></div><div class="col-md-5"><input type="text" name="web_adress" class="form-control" placeholder="http://www.programmechameleon.com" /></div><div class="col-sm-2 element-top-10"><button class="btn btn-danger btn-xs">Remove</button></div></div>';

	var allowed_avatar_mime = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/png'];

	var allowed_resume_mime = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

	$('input[name=file_cv]').on('change', function () {
		if (this.files[0].size > 5000000) {
			$(this).parent().showMessage('File cannot be more than 5Mb.', 'danger');
		} else if ($.inArray(this.files[0].type, allowed_resume_mime) === -1) {
			$(this).parent().showMessage('Can only upload .doc or .docx files.', 'danger');
		} else {
			if (!processing) {
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
					}
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
			} else {
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
			if (!processing) {
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
					}
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
			} else {
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
		if (!processing) {
			processing = true;
			$('.page-preloader').show();
			$form.find('[type=submit]').disable(true);

			var eduDataCollection = [];
			var expDataCollection = [];
			var urlDataCollection = [];

			$('#eduContainer .row').each(function (i) {
				var eduData = {
					'name': $(this).find('input[name=edu_name]').val(),
					'type': $(this).find('input[name=edu_type]').val(),
					'gpa': $(this).find('input[name=edu_gpa]').val(),
					'qualification': $(this).find('input[name=edu_qualification]').val()
				};
				eduDataCollection.push(eduData);
			});

			$('#expContainer .row').each(function (i) {
				var expData = {
					'company': $(this).find('input[name=exp_company]').val(),
					'year': $(this).find('input[name=exp_year]').val(),
					'position': $(this).find('input[name=exp_position]').val(),
					'salary': $(this).find('input[name=exp_salary]').val(),
					'description': $(this).find('textarea[name=exp_desc]').val()
				};
				expDataCollection.push(expData);
			});

			$('#urlContainer .row').each(function (i) {
				var urlData = {
					'name': $(this).find('input[name=web_name]').val(),
					'address': $(this).find('input[name=web_adress]').val()
				};
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
		} else {
			alert('Another upload process is running, please wait.');
		}
	});
}

// Account settings - salary range
if ($('#contractorSalaryRangeForm')[0]) {
	var $salaryForm = $('#contractorSalaryRangeForm');
	$salaryForm.find('[type=button]').on('click', function (e) {
		e.preventDefault();

		if (!processing) {
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
		} else {
			alert('Another upload process is running, please wait');
		}
	});
}

// Job alert
if ($('#contractorJobAlertForm')[0]) {
	$form = $('#contractorJobAlertForm');

	$form.find('[type=submit]').on('click', function (e) {
		e.preventDefault();

		if ($form.parsley().validate() && !processing) {
			$form.find('[type=submit]').disable(true);
			processing = true;
			$('.page-preloader').show();

			$.post(window.origin + '/contractor/create-job-alert', {
				data: $form.serializeForm()
			}).done(function (e) {
				processing = false;
				$('.page-preloader').hide();
				$form.showMessage(e.message, e.type);
				$form.find('[type=submit]').disable(false);
				if (e.type === 'success') location.reload();
			}).fail(function (xhr, status, e) {
				processing = false;
				$('.page-preloader').hide();
				$form.showMessage(xhr.responseText, 'danger');
				$form.find('[type=submit]').disable(false);
			});
		} else {
			$form.showMessage('Another process is running.', 'info');
		}
	});
}

if ($('#removeAlertBtn')[0]) {
	$('#removeAlertBtn').on('click', function (e) {
		e.preventDefault();
		var $button = $('#removeAlertBtn');
		if (confirm('Remove this alert?')) {
			if (!processing) {
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
			} else {
				alert('Another process is running, please wait');
			}
		}
	});
}

// Apply for Job
if ($('button[data-init-apply]')[0]) {
	$.each($('button[data-init-apply]'), function (i, e) {
		var $button = $(e);

		$button.on('click', function (e) {
			e.preventDefault();
			if (confirm('Apply for this job?') && !processing) {
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
			} else alert('A process is running, please wait.');
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
			if (!processing) {
				var $button = $(this);
				var $route = $button.data('remove');
				var $id = $button.data('id');

				processing = true;
				$('.page-preloader').show();
				$('[btn-remove]').disable(true);

				$.post($route, { i: $id }).done(function (e) {
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
	var allowed_timesheet_mime = ['application/msword', 'application/msexcel', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

	$('select[name=report_time]').on('change', function (e) {
		console.log($(this).val());
		if ($(this).val() === 'daily') {
			$('span.hour-text').text('hour');
		} else {
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

		if ($form.parsley().validate() && !processing) {
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
				}
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
		} else {
			alert('A process is still on going, please wait');
		}
	});
}

// Submit expense
if ($('#submitExpenseForm')[0]) {
	$form = $('#submitExpenseForm');
	var $job = $form.data('value');
	var file = null;
	var allowed_expense_mime = ['application/msword', 'application/msexcel', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'image/jpeg', 'image/pjpeg', 'image/png'];

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

		if ($form.parsley().validate() && !processing) {
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
				}
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
		} else {
			alert('A process is still on going, please wait');
		}
	});
}

// Notifications
if ($('#listNotif')[0]) {
	var $list = $('#listNotif');
	$list.find('.btn-mark-notif').on('click', function (e) {
		e.preventDefault();

		if (!processing) {
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
		if (!processing) {
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

},{"./core":"/home/ford/web/www-job/resources/assets/js/front/core.js","./plugins":"/home/ford/web/www-job/resources/assets/js/front/plugins.js"}],"/home/ford/web/www-job/resources/assets/js/front/core.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Core = (function () {
	function Core() {
		_classCallCheck(this, Core);

		this.disable();
		this.formMessage();
		this.serializeForm();
		this.setupAjax();

		Number.prototype.formatMoney = function (c, d, t) {
			var n = this,
			    c = isNaN(c = Math.abs(c)) ? 2 : c,
			    d = d == undefined ? "." : d,
			    t = t == undefined ? "," : t,
			    s = n < 0 ? "-" : "",
			    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
			    j = (j = i.length) > 3 ? j % 3 : 0;
			return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
		};
	}

	_createClass(Core, [{
		key: "disable",
		value: function disable() {
			$.fn.extend({
				disable: function disable(state) {
					return this.each(function () {
						if (state) {
							$(this).find('span').hide();
							$(this).attr('disabled', 'disabled').find('.btn-preloader').show();
						} else {
							$(this).find('span').show();
							$(this).removeAttr('disabled').find('.btn-preloader').hide();
						}
					});
				}
			});
		}
	}, {
		key: "formMessage",
		value: function formMessage() {
			$.fn.showMessage = function (message, type, alertClass) {
				var html;
				html = void 0;
				if (alertClass === undefined) {
					alertClass = '';
				}
				$('.status-message').remove();
				html = '<div class=\'status-message element-top-10 ' + alertClass + '\'> <div role=\'alert\' class=\'fade-in alert alert-dismissable alert-' + type + '\'> <button type=\'button\' class=\'close\' data-dismiss=\'alert\'> <span aria-hidden=\'true\'><i class=\'fa fa-times\'></i></span> <span class=\'sr-only\'>Close</span> </button>' + message + '</div></div>';
				return $(html).appendTo(this).hide().fadeIn(900);
			};
		}
	}, {
		key: "serializeForm",
		value: function serializeForm() {
			$.fn.serializeForm = function () {
				var data, lookup, parse, selector;
				data = void 0;
				lookup = void 0;
				parse = void 0;
				selector = void 0;
				if (this.length < 1) {
					return false;
				}
				data = {};
				lookup = data;
				selector = ':input[type!="checkbox"][type!="radio"], input:checked';
				parse = function () {
					var $el, cap, i, named;
					$el = void 0;
					cap = void 0;
					i = void 0;
					named = void 0;
					if (this.disabled) {
						return;
					}
					named = this.name.replace(/\[([^\]]+)?\]/g, ',$1').split(',');
					cap = named.length - 1;
					$el = $(this);
					if (named[0]) {
						i = 0;
						while (i < cap) {
							lookup = lookup[named[i]] = lookup[named[i]] || (named[i + 1] === '' || named[i + 1] === '0' ? [] : {});
							i++;
						}
						if (lookup.length !== void 0) {
							lookup.push($el.val());
						} else {
							lookup[named[cap]] = $el.val();
						}
						lookup = data;
					}
				};
				this.filter(selector).each(parse);
				this.find(selector).each(parse);
				return data;
			};
		}
	}, {
		key: "setupAjax",
		value: function setupAjax() {
			$.ajaxSetup({
				statusCode: {
					403: function _(e) {
						return window.alert('Forbidden content!');
					},
					404: function _(e) {
						return window.alert('Requested route not found!');
					},
					500: function _(e) {
						return window.alert('Internal server error!');
					}
				},
				crossDomain: false,
				dataType: 'json',
				cache: true,
				async: false,
				headers: {
					'X-CSRF-Token': $('meta[name="_t"]').attr('content')
				}
			});
		}
	}]);

	return Core;
})();

exports.Core = Core;

},{}],"/home/ford/web/www-job/resources/assets/js/front/plugins.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plugins = (function () {
	function Plugins() {
		_classCallCheck(this, Plugins);

		this.initBootstrap();
		var slider = { "init": "1", "home_init": "1" };

		if ($('img[data-image-resize]')[0]) {
			$.each($('img[data-image-resize]'), function (i, e) {
				$(e).parent().imgLiquid({
					fill: true,
					verticalAlign: 'center',
					horizontalAlign: 'center'
				});
			});
		}

		// Job search: Advanced Search toggle
		if ($('#advance-search-option')[0]) {
			$('.advance-search-toggle').click(function (e) {
				if ($('#advance-search-option:visible').length) {
					$('#advance-search-option').slideUp();
				} else {
					$('#advance-search-option').slideDown();
				}
				return false;
			});
		}

		var screenWidth = $(window).width();

		if (screenWidth > 767) {} else {
			$('li.menu-item-has-children > a').on('click', function (e) {
				e.preventDefault();
				$(this).next('.sub-menu').slideToggle('fast');
			});
		}

		$('#job-category-dropdown').minimalect({
			placeholder: 'Select Job Category'
		});

		$('#job-type-dropdown').minimalect({
			placeholder: 'Select Job Type'
		});

		if (slider.init) {
			if ($('select#experience_min')[0] && $('select#experience_max')[0]) {
				$('select#experience_min, select#experience_max').selectToUISlider({
					labels: 10,
					labelSrc: 'text',
					tooltip: true
				});
			}

			if ($('select#salary_min')[0] && $('select#salary_max')[0]) {
				$('select#salary_min, select#salary_max').selectToUISlider({
					labels: 11,
					labelSrc: 'text',
					tooltip: true
				});
			}
		}

		$('#job-listing-tabs').tabs({ hide: { effect: "fade", duration: 'fast' }, show: { effect: "fade", duration: 'fast' } });

		var screenWidth = $(window).width();

		if (screenWidth < 767) {
			$('li.has-children > a').on('click', function (e) {
				e.preventDefault();
				$(this).next('.sub-menu').slideToggle('fast');
			});
		}

		if ($('#countrySelector')[0]) {
			this.formCountrySelectorInit();
		}

		if ($('.summernote')[0]) {
			$('.summernote').summernote({ dialogsInBody: true });
		}

		if ($('[data-checkout-type]')[0]) {
			var paymentProcessing = false;

			$.each($('[data-checkout-type]'), function (e, i) {
				$(this).on('click', function (e) {
					if (!paymentProcessing) {
						var $button = $(this);
						var user = $button.data('user');
						e.preventDefault();
						paymentProcessing = true;
						$('.page-preloader').show();
						$button.disable(true);
						var checkout_type = $button.data('checkout-type');
						var postData = {};

						if (checkout_type == 1) {
							postData = {
								type: 'paypal',
								value: checkout_type,
								user: user
							};
						} else if (checkout_type == 2) {
							postData = {
								type: 'paypal',
								value: checkout_type,
								amount: $button.parent().find('input[name=_cred_amt]').val(),
								user: user
							};
						}

						$.post(window.origin + '/api/payment/process-payment', postData).done(function (e) {
							if (e.type === 'success') window.open(e.redirect);else alert(e.message);
							$button.disable(false);
							paymentProcessing = false;
							$('.page-preloader').hide();
						}).fail(function (xhr, status, e) {
							paymentProcessing = false;
							$('.page-preloader').hide();
							alert(e.message);
							$button.disable(false);
						});
					} else {
						alert('Another payment is processing, please wait.');
					}
				});
			});
		}
	}

	_createClass(Plugins, [{
		key: "initBootstrap",
		value: function initBootstrap() {
			$('.panel-tooltip, [data-toggle="tooltip"]').tooltip();
			$('[data-toggle="popover"]').popover();

			$('.input-daterange input').each(function () {
				$(this).datepicker({
					format: "yyyy-mm-dd"
				});
			});
		}
	}, {
		key: "formCountrySelectorInit",
		value: function formCountrySelectorInit() {
			$.ajax({
				type: 'get',
				data: {
					type: "all"
				},
				dataType: "json",
				url: window.origin + '/api/country',
				success: function success(data) {
					for (var key in data) {
						if (data.hasOwnProperty(key)) {
							var selected = '';
							if ($('#countrySelector').data('value') !== '') {
								var countryValue = $('#countrySelector').data('value');
								selected = data[key].Name === countryValue ? 'selected="selected"' : '';
							} else {
								selected = data[key].Code === 'GBR' ? 'selected="selected"' : '';
							}
							$('#countrySelector').append('<option value="' + data[key].Name + '" data-code="' + data[key].Code + '" ' + selected + '>' + data[key].Name + '</option>');
						}
					}

					if ($('#citySelector')[0]) {
						var processing = false;
						$('#citySelector').empty();

						var cityReload = function cityReload() {
							processing = true;
							$.ajax({
								type: 'get',
								data: {
									value: $('#countrySelector :selected').data('code')
								},
								dataType: "json",
								url: window.origin + '/api/city',
								success: function success(cityData) {
									processing = false;
									$('#citySelector').empty();
									for (var key in cityData) {
										if (cityData.hasOwnProperty(key)) {
											var selected = '';

											if ($('#citySelector').data('value') !== '') {
												var cityValue = $('#citySelector').data('value');
												selected = cityData[key].Name === cityValue ? 'selected="selected"' : '';
											}

											$('#citySelector').append('<option value="' + cityData[key].Name + '" ' + selected + '>' + cityData[key].Name + '</option>');
										}
									}
								},
								error: function error(xhr, status, e) {
									processing = false;
									if (confirm("Cannot load " + country + "'s city list, reload?")) {
										location.reload();
									}
								}
							});
						};

						cityReload();

						$('#countrySelector').on('change', function () {
							if (!processing) cityReload();else alert('Please wait while previous list was loaded.');
						});
					}
				},
				error: function error(xhr, status, e) {
					if (confirm('Cannot load country list, reload?')) {
						location.reload();
					}
				}
			});
		}
	}]);

	return Plugins;
})();

exports.Plugins = Plugins;

},{}]},{},["/home/ford/web/www-job/resources/assets/js/front/contractor.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9mb3JkL3dlYi93d3ctam9iL3Jlc291cmNlcy9hc3NldHMvanMvZnJvbnQvY29udHJhY3Rvci5qcyIsIi9ob21lL2ZvcmQvd2ViL3d3dy1qb2IvcmVzb3VyY2VzL2Fzc2V0cy9qcy9mcm9udC9jb3JlLmpzIiwiL2hvbWUvZm9yZC93ZWIvd3d3LWpvYi9yZXNvdXJjZXMvYXNzZXRzL2pzL2Zyb250L3BsdWdpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztvQkNBcUIsUUFBUTs7dUJBQ0wsV0FBVzs7QUFFbkMsSUFBSSxLQUFLLENBQUM7QUFDVixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7OztBQUd2QixJQUFJLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ25DLE1BQUssR0FBRyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUNwQyxLQUFJLFVBQVUsR0FBRyxzdUJBQXN1QixDQUFDO0FBQ3h2QixLQUFJLFVBQVUsR0FBRyxvbUJBQW9tQixDQUFDO0FBQ3RuQixLQUFJLFVBQVUsR0FBRyxvWUFBb1ksQ0FBQzs7QUFFdFosS0FBSSxtQkFBbUIsR0FBRyxDQUMxQixXQUFXLEVBQ1gsWUFBWSxFQUNaLGFBQWEsRUFDYixXQUFXLENBQ1YsQ0FBQzs7QUFFRixLQUFJLG1CQUFtQixHQUFHLENBQzFCLG9CQUFvQixFQUNwQix5RUFBeUUsQ0FDeEUsQ0FBQzs7QUFFRixFQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVk7QUFDakQsTUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLEVBQUU7QUFDakMsSUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsRUFBRSxRQUFRLENBQUMsQ0FBQztHQUN4RSxNQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ3JFLElBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsc0NBQXNDLEVBQUUsUUFBUSxDQUFDLENBQUM7R0FDL0UsTUFBTTtBQUNOLE9BQUssQ0FBRSxVQUFVLEVBQUU7QUFDbEIsY0FBVSxHQUFHLElBQUksQ0FBQztBQUNsQixRQUFJLEVBQUUsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0FBQ3hCLE1BQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQyxLQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFNUIsS0FBQyxDQUFDLElBQUksQ0FBQztBQUNOLFdBQU0sRUFBRSxNQUFNO0FBQ2QsUUFBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsMkJBQTJCO0FBQ2hELFNBQUksRUFBRSxFQUFFO0FBQ1IsZ0JBQVcsRUFBRSxLQUFLO0FBQ2xCLGFBQVEsRUFBRSxNQUFNO0FBQ2hCLFVBQUssRUFBRSxJQUFJO0FBQ1gsZ0JBQVcsRUFBRSxLQUFLO0FBQ2xCLGdCQUFXLEVBQUUsS0FBSztBQUNsQixZQUFPLEVBQUU7QUFDUixvQkFBYyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7TUFDcEQ7S0FDRCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3BCLGVBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsTUFBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsVUFBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqQixVQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUNqQyxlQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLE1BQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFVBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDeEIsVUFBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzlDLENBQUMsQ0FBQztJQUNILE1BQ0k7QUFDSixTQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztJQUN6RDtHQUNEO0VBQ0QsQ0FBQyxDQUFDOztBQUVILEVBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsWUFBWTtBQUMvQyxNQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLE9BQU8sRUFBRTtBQUNqQyxJQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLCtCQUErQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0dBQ3hFLE1BQU0sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDckUsSUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyw0Q0FBNEMsRUFBRSxRQUFRLENBQUMsQ0FBQztHQUNyRixNQUFNO0FBQ04sT0FBSyxDQUFFLFVBQVUsRUFBRTtBQUNsQixjQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLEtBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFFBQUksRUFBRSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7QUFDeEIsTUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVqQyxLQUFDLENBQUMsSUFBSSxDQUFDO0FBQ04sV0FBTSxFQUFFLE1BQU07QUFDZCxRQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRywyQkFBMkI7QUFDaEQsU0FBSSxFQUFFLEVBQUU7QUFDUixnQkFBVyxFQUFFLEtBQUs7QUFDbEIsYUFBUSxFQUFFLE1BQU07QUFDaEIsVUFBSyxFQUFFLElBQUk7QUFDWCxnQkFBVyxFQUFFLEtBQUs7QUFDbEIsZ0JBQVcsRUFBRSxLQUFLO0FBQ2xCLFlBQU8sRUFBRTtBQUNSLG9CQUFjLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztNQUNwRDtLQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDcEIsZUFBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixNQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixVQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pCLFNBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7QUFDekIsT0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQ3RDO0FBQ0QsVUFBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDakMsZUFBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixNQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixVQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3hCLFVBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztLQUM5QyxDQUFDLENBQUM7SUFDSCxNQUNJO0FBQ0osU0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7SUFDekQ7R0FDRDtFQUNELENBQUMsQ0FBQzs7QUFFSCxFQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDakUsR0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLEdBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7RUFDdEMsQ0FBQyxDQUFDOztBQUVILEVBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQ3ZFLEdBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixHQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0VBQ3RDLENBQUMsQ0FBQzs7QUFFSCxFQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBRTtBQUNyRSxHQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsR0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztFQUN0QyxDQUFDLENBQUM7O0FBRUgsRUFBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDaEUsTUFBSSxPQUFPLENBQUMsOENBQThDLENBQUMsRUFBRTtBQUM1RCxJQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7R0FDbkM7RUFDRCxDQUFDLENBQUM7O0FBRUgsRUFBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDaEUsTUFBSSxPQUFPLENBQUMsNkNBQTZDLENBQUMsRUFBRTtBQUMzRCxJQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7R0FDbkM7RUFDRCxDQUFDLENBQUM7O0FBRUgsRUFBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDaEUsTUFBSSxPQUFPLENBQUMsMkNBQTJDLENBQUMsRUFBRTtBQUN6RCxJQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7R0FDbkM7RUFDRCxDQUFDLENBQUM7O0FBRUgsTUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQ3BELEdBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixNQUFJLENBQUUsVUFBVSxFQUFFO0FBQ2pCLGFBQVUsR0FBRyxJQUFJLENBQUM7QUFDbEIsSUFBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsUUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTFDLE9BQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQzNCLE9BQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQzNCLE9BQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDOztBQUUzQixJQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDekMsUUFBSSxPQUFPLEdBQUc7QUFDYixXQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEdBQUcsRUFBRTtBQUNsRCxXQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEdBQUcsRUFBRTtBQUNsRCxVQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEdBQUcsRUFBRTtBQUNoRCxvQkFBZSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQyxHQUFHLEVBQUU7S0FDcEUsQ0FBQTtBQUNELHFCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7O0FBRUgsSUFBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3pDLFFBQUksT0FBTyxHQUFHO0FBQ2IsY0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxHQUFHLEVBQUU7QUFDeEQsV0FBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxHQUFHLEVBQUU7QUFDbEQsZUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxHQUFHLEVBQUU7QUFDMUQsYUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxHQUFHLEVBQUU7QUFDdEQsa0JBQWEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsR0FBRyxFQUFFO0tBQzVELENBQUE7QUFDRCxxQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDOztBQUVILElBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUN6QyxRQUFJLE9BQU8sR0FBRztBQUNiLFdBQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsR0FBRyxFQUFFO0FBQ2xELGNBQVMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsR0FBRyxFQUFFO0tBQ3ZELENBQUE7QUFDRCxxQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDOztBQUVILElBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyw0QkFBNEIsRUFBRTtBQUNwRCxRQUFJLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRTtBQUMzQixlQUFXLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRTtBQUNwQyxXQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQztBQUMxQyxXQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQztBQUMxQyxXQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQztJQUMxQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3BCLGNBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsS0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsU0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxTQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pCLFNBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUNqQyxjQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLEtBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFNBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDeEIsU0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLFNBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQztHQUNILE1BQ0k7QUFDSixRQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztHQUN6RDtFQUNELENBQUMsQ0FBQztDQUNIOzs7QUFHRCxJQUFJLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3ZDLEtBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBQ2xELFlBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBRTtBQUMxRCxHQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O0FBRW5CLE1BQUssQ0FBRSxVQUFVLEVBQUU7QUFDbEIsYUFBVSxHQUFHLElBQUksQ0FBQztBQUNsQixJQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixjQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFaEQsSUFBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLDJCQUEyQixFQUFFO0FBQ25ELFFBQUksRUFBRSxXQUFXLENBQUMsYUFBYSxFQUFFO0lBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDcEIsY0FBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixLQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixlQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNDLGVBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUNqQyxjQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLEtBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFNBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDeEIsZUFBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3BELGVBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQztHQUNILE1BQ0k7QUFDSixRQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztHQUN4RDtFQUNELENBQUMsQ0FBQztDQUNIOzs7QUFHRCxJQUFJLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3BDLE1BQUssR0FBRyxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQzs7QUFFckMsTUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQ3BELEdBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7QUFFbkIsTUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBRSxVQUFVLEVBQUU7QUFDL0MsUUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUMsYUFBVSxHQUFHLElBQUksQ0FBQztBQUNsQixJQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFNUIsSUFBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLDhCQUE4QixFQUFFO0FBQ3RELFFBQUksRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFO0lBQzNCLENBQUMsQ0FDRCxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDbEIsY0FBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixLQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixTQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLFNBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNDLFFBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVDLENBQUMsQ0FDRCxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUMvQixjQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLEtBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFNBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM5QyxTQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUM7R0FDSCxNQUNJO0FBQ0osUUFBSyxDQUFDLFdBQVcsQ0FBQyw2QkFBNkIsRUFBRSxNQUFNLENBQUMsQ0FBQztHQUN6RDtFQUNELENBQUMsQ0FBQztDQUNIOztBQUVELElBQUksQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDNUIsRUFBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBRTtBQUM3QyxHQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsTUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDbkMsTUFBSSxPQUFPLENBQUMsb0JBQW9CLENBQUMsRUFBRTtBQUNsQyxPQUFLLENBQUUsVUFBVSxFQUFFO0FBQ2xCLGNBQVUsR0FBRyxJQUFJLENBQUM7QUFDbEIsS0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsV0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFdEIsS0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLDhCQUE4QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3hFLGVBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsTUFBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsWUFBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QixVQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pCLFNBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQzVDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUNqQyxlQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLE1BQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFVBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDeEIsWUFBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN2QixDQUFDLENBQUM7SUFDSCxNQUNJO0FBQ0osU0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7SUFDakQ7R0FDRDtFQUNELENBQUMsQ0FBQztDQUNIOzs7QUFHRCxJQUFJLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3BDLEVBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3BELE1BQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFbkIsU0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUcsVUFBVSxDQUFDLEVBQUU7QUFDakMsSUFBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLE9BQUksT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBRSxVQUFVLEVBQUU7QUFDbkQsY0FBVSxHQUFHLElBQUksQ0FBQztBQUNsQixLQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0MsS0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRTVCLEtBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFZLEVBQUU7QUFDcEMsUUFBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDcEIsZUFBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixNQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUMsTUFBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsVUFBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDakMsZUFBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixNQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUMsTUFBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsVUFBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN4QixDQUFDLENBQUM7SUFDSCxNQUNJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0dBQ2pELENBQUMsQ0FBQztFQUNILENBQUMsQ0FBQztDQUNIOztBQUVELElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3hCLEVBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDckQsTUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLE1BQUksT0FBTyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7QUFDbkMsYUFBVSxHQUFHLElBQUksQ0FBQztBQUNsQixJQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0MsSUFBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRTVCLElBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRywyQkFBMkIsRUFBRTtBQUNuRCxRQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNwQixjQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLEtBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QyxLQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixTQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUNqQyxjQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLEtBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QyxLQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixTQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hCLENBQUMsQ0FBQztHQUNIO0VBQ0QsQ0FBQyxDQUFDO0NBQ0g7O0FBRUQsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDMUIsS0FBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDOztBQUUvQixNQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDL0MsR0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLE1BQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFO0FBQzVCLE9BQUssQ0FBRSxVQUFVLEVBQUU7QUFDbEIsUUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLFFBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEMsUUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFN0IsY0FBVSxHQUFHLElBQUksQ0FBQztBQUNsQixLQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixLQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVoQyxLQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDLENBQUMsRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUMxQyxlQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLE1BQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLE1BQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMsVUFBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqQixTQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQ3pCLFdBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztNQUMvQztLQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUNqQyxlQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLE1BQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLE1BQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMsVUFBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN4QixDQUFDLENBQUM7SUFDSDtHQUNEO0VBQ0QsQ0FBQyxDQUFDO0NBQ0g7OztBQUdELElBQUksQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDakMsTUFBSyxHQUFHLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ2xDLEtBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsS0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLEtBQUksc0JBQXNCLEdBQUcsQ0FDNUIsb0JBQW9CLEVBQ3BCLHFCQUFxQixFQUNyQiwwQkFBMEIsRUFDMUIsbUVBQW1FLEVBQ25FLHlFQUF5RSxDQUN6RSxDQUFDOztBQUVGLEVBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDdkQsU0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUMzQixNQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxPQUFPLEVBQUU7QUFDOUIsSUFBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQ2pDLE1BQ0k7QUFDSixJQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDaEM7RUFDRCxDQUFDLENBQUM7O0FBRUgsTUFBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsWUFBWTtBQUN2RCxNQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLE9BQU8sRUFBRTtBQUNqQyxJQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLCtCQUErQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3hFLE9BQUksR0FBRyxJQUFJLENBQUM7R0FDWixNQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ3hFLElBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsc0NBQXNDLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0UsT0FBSSxHQUFHLElBQUksQ0FBQztHQUNaLE1BQU07QUFDTixJQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLDRCQUE0QixFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3RFLE9BQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ3JCO0VBQ0QsQ0FBQyxDQUFDOztBQUVILE1BQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBRTtBQUNwRCxHQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O0FBRW5CLE1BQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUUsVUFBVSxFQUFFO0FBQy9DLGFBQVUsR0FBRyxJQUFJLENBQUM7QUFDbEIsSUFBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsUUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTFDLE9BQUksRUFBRSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7QUFDeEIsS0FBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEIsS0FBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pELEtBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUV2QixJQUFDLENBQUMsSUFBSSxDQUFDO0FBQ04sVUFBTSxFQUFFLE1BQU07QUFDZCxPQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyx1QkFBdUI7QUFDNUMsUUFBSSxFQUFFLEVBQUU7QUFDUixlQUFXLEVBQUUsS0FBSztBQUNsQixZQUFRLEVBQUUsTUFBTTtBQUNoQixTQUFLLEVBQUUsSUFBSTtBQUNYLGVBQVcsRUFBRSxLQUFLO0FBQ2xCLGVBQVcsRUFBRSxLQUFLO0FBQ2xCLFdBQU8sRUFBRTtBQUNSLG1CQUFjLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUNwRDtJQUNELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDcEIsY0FBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixLQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixTQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLFNBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUNqQyxjQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLEtBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFNBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM5QyxTQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUM7R0FDSCxNQUNJO0FBQ0osUUFBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7R0FDbEQ7RUFDRCxDQUFDLENBQUM7Q0FDSDs7O0FBR0QsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUMvQixNQUFLLEdBQUcsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDaEMsS0FBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixLQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsS0FBSSxvQkFBb0IsR0FBRyxDQUMxQixvQkFBb0IsRUFDcEIscUJBQXFCLEVBQ3JCLDBCQUEwQixFQUMxQixtRUFBbUUsRUFDbkUseUVBQXlFLEVBQ3pFLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osYUFBYSxFQUNiLFdBQVcsQ0FDWCxDQUFDOztBQUVGLE1BQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVk7QUFDdkQsTUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLEVBQUU7QUFDakMsSUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN4RSxPQUFJLEdBQUcsSUFBSSxDQUFDO0dBQ1osTUFBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUN0RSxJQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLHNEQUFzRCxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQy9GLE9BQUksR0FBRyxJQUFJLENBQUM7R0FDWixNQUFNO0FBQ04sSUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyw0QkFBNEIsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN0RSxPQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUNyQjtFQUNELENBQUMsQ0FBQzs7QUFFSCxNQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDcEQsR0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDOztBQUVuQixNQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFFLFVBQVUsRUFBRTtBQUMvQyxhQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLElBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFFBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUUxQyxPQUFJLEVBQUUsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0FBQ3hCLEtBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3hCLEtBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6RCxLQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFdkIsSUFBQyxDQUFDLElBQUksQ0FBQztBQUNOLFVBQU0sRUFBRSxNQUFNO0FBQ2QsT0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcscUJBQXFCO0FBQzFDLFFBQUksRUFBRSxFQUFFO0FBQ1IsZUFBVyxFQUFFLEtBQUs7QUFDbEIsWUFBUSxFQUFFLE1BQU07QUFDaEIsU0FBSyxFQUFFLElBQUk7QUFDWCxlQUFXLEVBQUUsS0FBSztBQUNsQixlQUFXLEVBQUUsS0FBSztBQUNsQixXQUFPLEVBQUU7QUFDUixtQkFBYyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDcEQ7SUFDRCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3BCLGNBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsS0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsU0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxTQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDakMsY0FBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixLQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixTQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDOUMsU0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFDO0dBQ0gsTUFDSTtBQUNKLFFBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0dBQ2xEO0VBQ0QsQ0FBQyxDQUFDO0NBQ0g7OztBQUdELElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3ZCLEtBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUM1QixNQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBRTtBQUN0RCxHQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O0FBRW5CLE1BQUssQ0FBRSxVQUFVLEVBQUU7QUFDbEIsT0FBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLE9BQUksRUFBRSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsVUFBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQixRQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVDLGFBQVUsR0FBRyxJQUFJLENBQUM7O0FBRWxCLElBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRywwQkFBMEIsRUFBRTtBQUNsRCxNQUFFLEVBQUUsRUFBRTtBQUNOLFFBQUksRUFBRSxJQUFJO0lBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNwQixTQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdDLGNBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsUUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUN6QixVQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDOUM7SUFDRCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDakMsU0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QyxjQUFVLEdBQUcsS0FBSyxDQUFDO0lBQ25CLENBQUMsQ0FBQztHQUNIO0VBQ0QsQ0FBQyxDQUFDOztBQUVILEVBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDakQsTUFBSyxDQUFFLFVBQVUsRUFBRztBQUNuQixJQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkMsYUFBVSxHQUFHLElBQUksQ0FBQzs7QUFFbEIsSUFBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLDBCQUEwQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3BFLEtBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxjQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFNBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0FBQ2pDLEtBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxjQUFVLEdBQUcsS0FBSyxDQUFDO0lBQ25CLENBQUMsQ0FBQztHQUNIO0VBQ0QsQ0FBQyxDQUFDO0NBQ0g7Ozs7Ozs7Ozs7Ozs7SUNubEJZLElBQUk7QUFDTCxVQURDLElBQUksR0FDRjt3QkFERixJQUFJOztBQUVmLE1BQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNmLE1BQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuQixNQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDckIsTUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztBQUVqQixRQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDO0FBQy9DLE9BQUksQ0FBQyxHQUFHLElBQUk7T0FDWixDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7T0FDbEMsQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUM7T0FDNUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUM7T0FDNUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUU7T0FDcEIsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO09BQ25ELENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFBLEdBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25DLFVBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBLEFBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQSxBQUFDLENBQUM7R0FDaEosQ0FBQztFQUNGOztjQWpCVyxJQUFJOztTQWtCVCxtQkFBRztBQUNULElBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO0FBQ1gsV0FBTyxFQUFFLGlCQUFTLEtBQUssRUFBRTtBQUN4QixZQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBVztBQUMzQixVQUFJLEtBQUssRUFBRTtBQUNWLFFBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsUUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7T0FDbkUsTUFBTTtBQUNOLFFBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsUUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztPQUM3RDtNQUNELENBQUMsQ0FBQztLQUNIO0lBQ0QsQ0FBQyxDQUFDO0dBQ0g7OztTQUNVLHVCQUFHO0FBQ2IsSUFBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEdBQUcsVUFBUyxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtBQUN0RCxRQUFJLElBQUksQ0FBQztBQUNULFFBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNkLFFBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtBQUM3QixlQUFVLEdBQUcsRUFBRSxDQUFDO0tBQ2hCO0FBQ0QsS0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDOUIsUUFBSSxHQUFHLDZDQUE2QyxHQUFHLFVBQVUsR0FBRyx3RUFBd0UsR0FBRyxJQUFJLEdBQUcsb0xBQW9MLEdBQUcsT0FBTyxHQUFHLGNBQWMsQ0FBQztBQUN0VyxXQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7R0FDRjs7O1NBQ1kseUJBQUc7QUFDZixJQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsR0FBRyxZQUFXO0FBQy9CLFFBQUksSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO0FBQ2xDLFFBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNkLFVBQU0sR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNoQixTQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDZixZQUFRLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDbEIsUUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNwQixZQUFPLEtBQUssQ0FBQztLQUNiO0FBQ0QsUUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNWLFVBQU0sR0FBRyxJQUFJLENBQUM7QUFDZCxZQUFRLEdBQUcsd0RBQXdELENBQUM7QUFDcEUsU0FBSyxHQUFHLFlBQVc7QUFDbEIsU0FBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUM7QUFDdkIsUUFBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ2IsUUFBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ2IsTUFBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ1gsVUFBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ2YsU0FBSSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2xCLGFBQU87TUFDUDtBQUNELFVBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUQsUUFBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLFFBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDZCxTQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNiLE9BQUMsR0FBRyxDQUFDLENBQUM7QUFDTixhQUFPLENBQUMsR0FBRyxHQUFHLEVBQUU7QUFDZixhQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFBLEFBQUMsQ0FBQztBQUN4RyxRQUFDLEVBQUUsQ0FBQztPQUNKO0FBQ0QsVUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQzdCLGFBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7T0FDdkIsTUFBTTtBQUNOLGFBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7T0FDL0I7QUFDRCxZQUFNLEdBQUcsSUFBSSxDQUFDO01BQ2Q7S0FDRCxDQUFDO0FBQ0YsUUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEMsUUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEMsV0FBTyxJQUFJLENBQUM7SUFDWixDQUFDO0dBQ0Y7OztTQUNRLHFCQUFHO0FBQ1gsSUFBQyxDQUFDLFNBQVMsQ0FBQztBQUNYLGNBQVUsRUFBRTtBQUNYLFFBQUcsRUFBRSxXQUFTLENBQUMsRUFBRTtBQUNoQixhQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztNQUMxQztBQUNELFFBQUcsRUFBRSxXQUFTLENBQUMsRUFBRTtBQUNoQixhQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztNQUNsRDtBQUNELFFBQUcsRUFBRSxXQUFTLENBQUMsRUFBRTtBQUNoQixhQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztNQUM5QztLQUNEO0FBQ0QsZUFBVyxFQUFFLEtBQUs7QUFDbEIsWUFBUSxFQUFFLE1BQU07QUFDaEIsU0FBSyxFQUFFLElBQUk7QUFDWCxTQUFLLEVBQUUsS0FBSztBQUNaLFdBQU8sRUFBRTtBQUNSLG1CQUFjLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUNwRDtJQUNELENBQUMsQ0FBQztHQUNIOzs7UUE5R1csSUFBSTs7Ozs7Ozs7Ozs7Ozs7OztJQ0FKLE9BQU87QUFDUixVQURDLE9BQU8sR0FDTDt3QkFERixPQUFPOztBQUVsQixNQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDckIsTUFBSSxNQUFNLEdBQUcsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxHQUFHLEVBQUMsQ0FBQzs7QUFFMUMsTUFBSSxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNuQyxJQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuRCxLQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO0FBQ3ZCLFNBQUksRUFBRSxJQUFJO0FBQ1Ysa0JBQWEsRUFBRSxRQUFRO0FBQ3ZCLG9CQUFlLEVBQUUsUUFBUTtLQUN6QixDQUFDLENBQUM7SUFDSCxDQUFDLENBQUM7R0FDSDs7O0FBR0QsTUFBSyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRztBQUNyQyxJQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDOUMsUUFBSSxDQUFDLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxNQUFNLEVBQUc7QUFDaEQsTUFBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDdEMsTUFBSTtBQUNKLE1BQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0tBQ3hDO0FBQ0QsV0FBTyxLQUFLLENBQUM7SUFDYixDQUFDLENBQUM7R0FDSDs7QUFFRCxNQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBRXBDLE1BQUssV0FBVyxHQUFHLEdBQUcsRUFBRyxFQUN4QixNQUFNO0FBQ04sSUFBQyxDQUFDLCtCQUErQixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFTLENBQUMsRUFBQztBQUN6RCxLQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsS0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDO0dBQ0g7O0FBRUQsR0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsVUFBVSxDQUFDO0FBQ3RDLGNBQVcsRUFBRyxxQkFBcUI7R0FDbkMsQ0FBQyxDQUFDOztBQUVILEdBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUNsQyxjQUFXLEVBQUcsaUJBQWlCO0dBQy9CLENBQUMsQ0FBQzs7QUFFSCxNQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDaEIsT0FBSSxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNuRSxLQUFDLENBQUMsOENBQThDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztBQUNsRSxXQUFNLEVBQUUsRUFBRTtBQUNWLGFBQVEsRUFBRSxNQUFNO0FBQ2hCLFlBQU8sRUFBRSxJQUFJO0tBQ2IsQ0FBQyxDQUFDO0lBQ0g7O0FBRUQsT0FBSSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUMzRCxLQUFDLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztBQUMxRCxXQUFNLEVBQUMsRUFBRTtBQUNULGFBQVEsRUFBQyxNQUFNO0FBQ2YsWUFBTyxFQUFDLElBQUk7S0FDWixDQUFDLENBQUM7SUFDSDtHQUNEOztBQUVELEdBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFeEgsTUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUVwQyxNQUFLLFdBQVcsR0FBRyxHQUFHLEVBQUc7QUFDeEIsSUFBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBQztBQUNoRCxLQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsS0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDO0dBQ0g7O0FBRUQsTUFBSSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUM3QixPQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztHQUMvQjs7QUFFRCxNQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUN4QixJQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUMsYUFBYSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7R0FDbkQ7O0FBRUQsTUFBSSxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNqQyxPQUFJLGlCQUFpQixHQUFHLEtBQUssQ0FBQzs7QUFFOUIsSUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDakQsS0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDaEMsU0FBSyxDQUFFLGlCQUFpQixFQUFFO0FBQ3pCLFVBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixVQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDLE9BQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQix1QkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDekIsT0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsYUFBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixVQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ2xELFVBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFbEIsVUFBSSxhQUFhLElBQUksQ0FBQyxFQUFFO0FBQ3ZCLGVBQVEsR0FBRztBQUNWLFlBQUksRUFBRSxRQUFRO0FBQ2QsYUFBSyxFQUFFLGFBQWE7QUFDcEIsWUFBSSxFQUFFLElBQUk7UUFDVixDQUFDO09BQ0YsTUFDSSxJQUFJLGFBQWEsSUFBSSxDQUFDLEVBQUU7QUFDNUIsZUFBUSxHQUFHO0FBQ1YsWUFBSSxFQUFFLFFBQVE7QUFDZCxhQUFLLEVBQUUsYUFBYTtBQUNwQixjQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEdBQUcsRUFBRTtBQUM1RCxZQUFJLEVBQUUsSUFBSTtRQUNWLENBQUM7T0FDRjs7QUFFRCxPQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsOEJBQThCLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ2xGLFdBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FDN0MsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0QixjQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZCLHdCQUFpQixHQUFHLEtBQUssQ0FBQztBQUMxQixRQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztPQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDakMsd0JBQWlCLEdBQUcsS0FBSyxDQUFDO0FBQzFCLFFBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFlBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakIsY0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUN2QixDQUFDLENBQUM7TUFDSCxNQUNJO0FBQ0osV0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7TUFDckQ7S0FDRCxDQUFDLENBQUM7SUFDSCxDQUFDLENBQUM7R0FDSDtFQUNEOztjQXBJVyxPQUFPOztTQXFJTix5QkFBRztBQUNmLElBQUMsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3ZELElBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDOztBQUV2QyxJQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWTtBQUM1QyxLQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDO0FBQ2xCLFdBQU0sRUFBRSxZQUFZO0tBQ3BCLENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQztHQUNIOzs7U0FDc0IsbUNBQUc7QUFDekIsSUFBQyxDQUFDLElBQUksQ0FBQztBQUNOLFFBQUksRUFBRSxLQUFLO0FBQ1gsUUFBSSxFQUFFO0FBQ0wsU0FBSSxFQUFFLEtBQUs7S0FDWDtBQUNELFlBQVEsRUFBRSxNQUFNO0FBQ2hCLE9BQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLGNBQWM7QUFDbkMsV0FBTyxFQUFFLGlCQUFVLElBQUksRUFBRTtBQUN4QixVQUFLLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtBQUNyQixVQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDN0IsV0FBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLFdBQUksQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRTtBQUMvQyxZQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkQsZ0JBQVEsR0FBRyxBQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssWUFBWSxHQUFJLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztRQUMxRSxNQUNJO0FBQ0osZ0JBQVEsR0FBRyxBQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxHQUFJLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztRQUNuRTtBQUNELFFBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUUsV0FBVyxDQUFDLENBQUM7T0FDMUo7TUFDRDs7QUFFRCxTQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUMxQixVQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDdkIsT0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUUzQixVQUFJLFVBQVUsR0FBRyxTQUFiLFVBQVUsR0FBYztBQUMzQixpQkFBVSxHQUFHLElBQUksQ0FBQztBQUNsQixRQUFDLENBQUMsSUFBSSxDQUFDO0FBQ04sWUFBSSxFQUFFLEtBQUs7QUFDWCxZQUFJLEVBQUU7QUFDTCxjQUFLLEVBQUUsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNuRDtBQUNELGdCQUFRLEVBQUUsTUFBTTtBQUNoQixXQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxXQUFXO0FBQ2hDLGVBQU8sRUFBRSxpQkFBVSxRQUFRLEVBQUU7QUFDNUIsbUJBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsVUFBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzNCLGNBQUssSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFO0FBQ3pCLGNBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNqQyxlQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBRWxCLGVBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUU7QUFDNUMsZ0JBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakQsb0JBQVEsR0FBRyxBQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxHQUFJLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztZQUMzRTs7QUFFRCxZQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRSxXQUFXLENBQUMsQ0FBQztXQUM1SDtVQUNEO1NBQ0Q7QUFDRCxhQUFLLEVBQUUsZUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUNoQyxtQkFBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixhQUFJLE9BQU8sQ0FBQyxjQUFjLEdBQUcsT0FBTyxHQUFHLHVCQUF1QixDQUFDLEVBQUU7QUFDaEUsa0JBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztVQUNsQjtTQUNEO1FBQ0QsQ0FBQyxDQUFDO09BQ0gsQ0FBQzs7QUFFRixnQkFBVSxFQUFFLENBQUM7O0FBRWIsT0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFXO0FBQzdDLFdBQUssQ0FBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLENBQUMsS0FDM0IsS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7T0FDMUQsQ0FBQyxDQUFDO01BQ0g7S0FDRDtBQUNELFNBQUssRUFBRSxlQUFVLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLFNBQUksT0FBTyxDQUFDLG1DQUFtQyxDQUFDLEVBQUU7QUFDakQsY0FBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO01BQ2xCO0tBQ0Q7SUFDRCxDQUFDLENBQUM7R0FDSDs7O1FBMU5XLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgQ29yZSB9IGZyb20gXCIuL2NvcmVcIjtcbmltcG9ydCB7IFBsdWdpbnMgfSBmcm9tIFwiLi9wbHVnaW5zXCI7XG5cbnZhciAkZm9ybTtcbnZhciBwcm9jZXNzaW5nID0gZmFsc2U7XG5cbi8vIEFjY291bnQgc2V0dGluZ3MgLSB1cGxvYWQgY3YsIGF2YXRhciwgY2hhbmdlIHBhc3N3b3JkIGFuZCBwZXJzb25hbCBpbmZvcm1hdGlvblxuaWYgKCQoJyNjb250cmFjdG9yQWNjb3VudEZvcm0nKVswXSkge1xuXHQkZm9ybSA9ICQoJyNjb250cmFjdG9yQWNjb3VudEZvcm0nKTtcblx0dmFyIGV4cFJvd0h0bWwgPSAnPGRpdiBjbGFzcz1cInJvdyBlbGVtZW50LXRvcC0xMFwiPjxkaXYgY2xhc3M9XCJjb2wtbWQtM1wiPjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJleHBfY29tcGFueVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJDb21wYW55XCIgLz48L2Rpdj48ZGl2IGNsYXNzPVwiY29sLW1kLTNcIj48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZXhwX3llYXJcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiWWVhclwiIC8+PC9kaXY+PGRpdiBjbGFzcz1cImNvbC1tZC0zXCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImV4cF9zYWxhcnlcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiU2FsYXJ5XCIgLz48L2Rpdj48ZGl2IGNsYXNzPVwiY29sLW1kLTNcIj48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZXhwX3Bvc2l0aW9uXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlBvc2l0aW9uXCIgLz48L2Rpdj48ZGl2IGNsYXNzPVwiZWxlbWVudC10b3AtMTBcIj4mbmJzcDs8L2Rpdj48ZGl2IGNsYXNzPVwiY29sLXNtLTEwXCI+PHRleHRhcmVhIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbmFtZT1cImV4cF9kZXNjXCIgbWF4bGVuZ3RoPVwiMjAwMFwiPkV4cGxhaW4gYSBsaXR0bGUgYWJvdXQgeW91ciBqb2IgZHV0aWVzLjwvdGV4dGFyZWE+PC9kaXY+PGRpdiBjbGFzcz1cImNvbC1zbS0yXCI+PGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0bi14c1wiPlJlbW92ZTwvYnV0dG9uPjwvZGl2PjwvZGl2Pic7XG5cdHZhciBlZHVSb3dIdG1sID0gJzxkaXYgY2xhc3M9XCJyb3cgZWxlbWVudC10b3AtMTBcIj48ZGl2IGNsYXNzPVwiY29sLW1kLTNcIj48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZWR1X25hbWVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiSW5zdGl0dXRpb24gTmFtZVwiIC8+PC9kaXY+PGRpdiBjbGFzcz1cImNvbC1tZC0zXCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImVkdV90eXBlXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cImV4LiBEZXNpZ24vRW5naW5lZXJpbmcvQnVzaW5lc3NcIiAvPjwvZGl2PjxkaXYgY2xhc3M9XCJjb2wtbWQtM1wiPjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJlZHVfZ3BhXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIkdQQS9TY29yZVwiIC8+PC9kaXY+PGRpdiBjbGFzcz1cImNvbC1tZC0zXCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImVkdV9xdWFsaWZpY2F0aW9uXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cImV4LiBQaC5EXCIgLz48L2Rpdj48ZGl2IGNsYXNzPVwiY29sLXNtLTIgZWxlbWVudC10b3AtMTBcIj48YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuLXhzXCI+UmVtb3ZlPC9idXR0b24+PC9kaXY+PC9kaXY+Jztcblx0dmFyIHVybFJvd0h0bWwgPSAnPGRpdiBjbGFzcz1cInJvdyBlbGVtZW50LXRvcC0xMFwiPjxkaXYgY2xhc3M9XCJjb2wtbWQtNVwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ3ZWJfbmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJOYW1lIG9mIHRoZSB3ZWJcIiAvPjwvZGl2PjxkaXYgY2xhc3M9XCJjb2wtbWQtNVwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJ3ZWJfYWRyZXNzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cImh0dHA6Ly93d3cucHJvZ3JhbW1lY2hhbWVsZW9uLmNvbVwiIC8+PC9kaXY+PGRpdiBjbGFzcz1cImNvbC1zbS0yIGVsZW1lbnQtdG9wLTEwXCI+PGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0bi14c1wiPlJlbW92ZTwvYnV0dG9uPjwvZGl2PjwvZGl2Pic7XG5cblx0dmFyIGFsbG93ZWRfYXZhdGFyX21pbWUgPSBbXG5cdCdpbWFnZS9naWYnLFxuXHQnaW1hZ2UvanBlZycsXG5cdCdpbWFnZS9wanBlZycsXG5cdCdpbWFnZS9wbmcnXG5cdF07XG5cblx0dmFyIGFsbG93ZWRfcmVzdW1lX21pbWUgPSBbXG5cdCdhcHBsaWNhdGlvbi9tc3dvcmQnLFxuXHQnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnQnLFxuXHRdO1xuXG5cdCQoJ2lucHV0W25hbWU9ZmlsZV9jdl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLmZpbGVzWzBdLnNpemUgPiA1MDAwMDAwKSB7XG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdGaWxlIGNhbm5vdCBiZSBtb3JlIHRoYW4gNU1iLicsICdkYW5nZXInKTtcblx0XHR9IGVsc2UgaWYgKCQuaW5BcnJheSh0aGlzLmZpbGVzWzBdLnR5cGUsIGFsbG93ZWRfcmVzdW1lX21pbWUpID09PSAtMSkge1xuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5zaG93TWVzc2FnZSgnQ2FuIG9ubHkgdXBsb2FkIC5kb2Mgb3IgLmRvY3ggZmlsZXMuJywgJ2RhbmdlcicpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoICEgcHJvY2Vzc2luZykge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0dmFyIGZkID0gbmV3IEZvcm1EYXRhKCk7XG5cdFx0XHRcdGZkLmFwcGVuZCgnZmlsZScsIHRoaXMuZmlsZXNbMF0pO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cblx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRtZXRob2Q6ICdwb3N0Jyxcblx0XHRcdFx0XHR1cmw6IHdpbmRvdy5vcmlnaW4gKyAnL2NvbnRyYWN0b3IvdXBkYXRlLXJlc3VtZScsXG5cdFx0XHRcdFx0ZGF0YTogZmQsXG5cdFx0XHRcdFx0Y3Jvc3NEb21haW46IGZhbHNlLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdFx0Y2FjaGU6IHRydWUsXG5cdFx0XHRcdFx0cHJvY2Vzc0RhdGE6IGZhbHNlLFxuXHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBmYWxzZSxcblx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHQnWC1DU1JGLVRva2VuJzogJCgnbWV0YVtuYW1lPVwiX3RcIl0nKS5hdHRyKCdjb250ZW50Jylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKGUubWVzc2FnZSwgZS50eXBlKTtcblx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKHhoci5yZXNwb25zZVRleHQsICdkYW5nZXInKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0YWxlcnQoJ0Fub3RoZXIgdXBsb2FkIHByb2Nlc3MgaXMgcnVubmluZywgcGxlYXNlIHdhaXQuJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQkKCdpbnB1dFtuYW1lPWltYWdlXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuZmlsZXNbMF0uc2l6ZSA+IDUwMDAwMDApIHtcblx0XHRcdCQodGhpcykucGFyZW50KCkuc2hvd01lc3NhZ2UoJ0ZpbGUgY2Fubm90IGJlIG1vcmUgdGhhbiA1TWIuJywgJ2RhbmdlcicpO1xuXHRcdH0gZWxzZSBpZiAoJC5pbkFycmF5KHRoaXMuZmlsZXNbMF0udHlwZSwgYWxsb3dlZF9hdmF0YXJfbWltZSkgPT09IC0xKSB7XG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdDYW4gb25seSB1cGxvYWQgLmpwZywgLmdpZiwgb3IgLnBuZyBmaWxlcy4nLCAnZGFuZ2VyJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICggISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHRcdHZhciBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdFx0XHRmZC5hcHBlbmQoJ2ZpbGUnLCB0aGlzLmZpbGVzWzBdKTtcblxuXHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdG1ldGhvZDogJ3Bvc3QnLFxuXHRcdFx0XHRcdHVybDogd2luZG93Lm9yaWdpbiArICcvY29udHJhY3Rvci91cGRhdGUtYXZhdGFyJyxcblx0XHRcdFx0XHRkYXRhOiBmZCxcblx0XHRcdFx0XHRjcm9zc0RvbWFpbjogZmFsc2UsXG5cdFx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0XHRjYWNoZTogdHJ1ZSxcblx0XHRcdFx0XHRwcm9jZXNzRGF0YTogZmFsc2UsXG5cdFx0XHRcdFx0Y29udGVudFR5cGU6IGZhbHNlLFxuXHRcdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHRcdCdYLUNTUkYtVG9rZW4nOiAkKCdtZXRhW25hbWU9XCJfdFwiXScpLmF0dHIoJ2NvbnRlbnQnKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG5cdFx0XHRcdFx0XHQkKCdpbWcudG1wLWltZycpLmF0dHIoJ3NyYycsIGUuaW1hZ2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSh4aHIucmVzcG9uc2VUZXh0LCAnZGFuZ2VyJyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGFsZXJ0KCdBbm90aGVyIHVwbG9hZCBwcm9jZXNzIGlzIHJ1bm5pbmcsIHBsZWFzZSB3YWl0LicpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0JCgnI2V4cENvbnRhaW5lcicpLmZpbmQoJ2J1dHRvbiNhZGRFeHAnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHQkKCcjZXhwQ29udGFpbmVyJykuYXBwZW5kKGV4cFJvd0h0bWwpO1xuXHR9KTtcblxuXHQkKCcjZWR1Q29udGFpbmVyJykuZmluZCgnYnV0dG9uI2FkZEVkdWNhdGlvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdCQoJyNlZHVDb250YWluZXInKS5hcHBlbmQoZWR1Um93SHRtbCk7XG5cdH0pO1xuXG5cdCQoJyN1cmxDb250YWluZXInKS5maW5kKCdidXR0b24jYWRkV2Vic2l0ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdCQoJyN1cmxDb250YWluZXInKS5hcHBlbmQodXJsUm93SHRtbCk7XG5cdH0pO1xuXG5cdCQoJyNleHBDb250YWluZXInKS5vbignY2xpY2snLCAnYnV0dG9uLmJ0bi1kYW5nZXInLCBmdW5jdGlvbiAoZSkge1xuXHRcdGlmIChjb25maXJtKCdSZW1vdmUgdGhpcyBleHBlcmllbmNlIGRhdGE/IENhbm5vdCBiZSB1bmRvLicpKSB7XG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZSgpO1xuXHRcdH1cblx0fSk7XG5cblx0JCgnI2VkdUNvbnRhaW5lcicpLm9uKCdjbGljaycsICdidXR0b24uYnRuLWRhbmdlcicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKGNvbmZpcm0oJ1JlbW92ZSB0aGlzIGVkdWNhdGlvbiBkYXRhPyBDYW5ub3QgYmUgdW5kby4nKSkge1xuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmUoKTtcblx0XHR9XG5cdH0pO1xuXG5cdCQoJyN1cmxDb250YWluZXInKS5vbignY2xpY2snLCAnYnV0dG9uLmJ0bi1kYW5nZXInLCBmdW5jdGlvbiAoZSkge1xuXHRcdGlmIChjb25maXJtKCdSZW1vdmUgdGhpcyB3ZWJzaXRlIGRhdGE/IENhbm5vdCBiZSB1bmRvLicpKSB7XG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZSgpO1xuXHRcdH1cblx0fSk7XG5cblx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGlmICghIHByb2Nlc3NpbmcpIHtcblx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUodHJ1ZSk7XG5cblx0XHRcdHZhciBlZHVEYXRhQ29sbGVjdGlvbiA9IFtdO1xuXHRcdFx0dmFyIGV4cERhdGFDb2xsZWN0aW9uID0gW107XG5cdFx0XHR2YXIgdXJsRGF0YUNvbGxlY3Rpb24gPSBbXTtcblxuXHRcdFx0JCgnI2VkdUNvbnRhaW5lciAucm93JykuZWFjaChmdW5jdGlvbiAoaSkge1xuXHRcdFx0XHR2YXIgZWR1RGF0YSA9IHtcblx0XHRcdFx0XHQnbmFtZSc6XHQkKHRoaXMpLmZpbmQoJ2lucHV0W25hbWU9ZWR1X25hbWVdJykudmFsKCksXG5cdFx0XHRcdFx0J3R5cGUnOlx0JCh0aGlzKS5maW5kKCdpbnB1dFtuYW1lPWVkdV90eXBlXScpLnZhbCgpLFxuXHRcdFx0XHRcdCdncGEnOlx0JCh0aGlzKS5maW5kKCdpbnB1dFtuYW1lPWVkdV9ncGFdJykudmFsKCksXG5cdFx0XHRcdFx0J3F1YWxpZmljYXRpb24nOlx0JCh0aGlzKS5maW5kKCdpbnB1dFtuYW1lPWVkdV9xdWFsaWZpY2F0aW9uXScpLnZhbCgpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWR1RGF0YUNvbGxlY3Rpb24ucHVzaChlZHVEYXRhKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKCcjZXhwQ29udGFpbmVyIC5yb3cnKS5lYWNoKGZ1bmN0aW9uIChpKSB7XG5cdFx0XHRcdHZhciBleHBEYXRhID0ge1xuXHRcdFx0XHRcdCdjb21wYW55JzpcdCQodGhpcykuZmluZCgnaW5wdXRbbmFtZT1leHBfY29tcGFueV0nKS52YWwoKSxcblx0XHRcdFx0XHQneWVhcic6XHQkKHRoaXMpLmZpbmQoJ2lucHV0W25hbWU9ZXhwX3llYXJdJykudmFsKCksXG5cdFx0XHRcdFx0J3Bvc2l0aW9uJzpcdCQodGhpcykuZmluZCgnaW5wdXRbbmFtZT1leHBfcG9zaXRpb25dJykudmFsKCksXG5cdFx0XHRcdFx0J3NhbGFyeSc6XHQkKHRoaXMpLmZpbmQoJ2lucHV0W25hbWU9ZXhwX3NhbGFyeV0nKS52YWwoKSxcblx0XHRcdFx0XHQnZGVzY3JpcHRpb24nOlx0JCh0aGlzKS5maW5kKCd0ZXh0YXJlYVtuYW1lPWV4cF9kZXNjXScpLnZhbCgpXG5cdFx0XHRcdH1cblx0XHRcdFx0ZXhwRGF0YUNvbGxlY3Rpb24ucHVzaChleHBEYXRhKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkKCcjdXJsQ29udGFpbmVyIC5yb3cnKS5lYWNoKGZ1bmN0aW9uIChpKSB7XG5cdFx0XHRcdHZhciB1cmxEYXRhID0ge1xuXHRcdFx0XHRcdCduYW1lJzpcdCQodGhpcykuZmluZCgnaW5wdXRbbmFtZT13ZWJfbmFtZV0nKS52YWwoKSxcblx0XHRcdFx0XHQnYWRkcmVzcyc6XHQkKHRoaXMpLmZpbmQoJ2lucHV0W25hbWU9d2ViX2FkcmVzc10nKS52YWwoKVxuXHRcdFx0XHR9XG5cdFx0XHRcdHVybERhdGFDb2xsZWN0aW9uLnB1c2godXJsRGF0YSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2NvbnRyYWN0b3IvdXBkYXRlLWFjY291bnQnLCB7XG5cdFx0XHRcdGRhdGE6ICRmb3JtLnNlcmlhbGl6ZUZvcm0oKSxcblx0XHRcdFx0ZGVzY3JpcHRpb246ICQoJy5zdW1tZXJub3RlJykuY29kZSgpLFxuXHRcdFx0XHRlZHVEYXRhOiBKU09OLnN0cmluZ2lmeShlZHVEYXRhQ29sbGVjdGlvbiksXG5cdFx0XHRcdGV4cERhdGE6IEpTT04uc3RyaW5naWZ5KGV4cERhdGFDb2xsZWN0aW9uKSxcblx0XHRcdFx0dXJsRGF0YTogSlNPTi5zdHJpbmdpZnkodXJsRGF0YUNvbGxlY3Rpb24pXG5cdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCwgJ2RhbmdlcicpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRhbGVydCgnQW5vdGhlciB1cGxvYWQgcHJvY2VzcyBpcyBydW5uaW5nLCBwbGVhc2Ugd2FpdC4nKTtcblx0XHR9XG5cdH0pO1xufVxuXG4vLyBBY2NvdW50IHNldHRpbmdzIC0gc2FsYXJ5IHJhbmdlXG5pZiAoJCgnI2NvbnRyYWN0b3JTYWxhcnlSYW5nZUZvcm0nKVswXSkge1xuXHR2YXIgJHNhbGFyeUZvcm0gPSAkKCcjY29udHJhY3RvclNhbGFyeVJhbmdlRm9ybScpO1xuXHQkc2FsYXJ5Rm9ybS5maW5kKCdbdHlwZT1idXR0b25dJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZiAoICEgcHJvY2Vzc2luZykge1xuXHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHQkc2FsYXJ5Rm9ybS5maW5kKCdbdHlwZT1idXR0b25dJykuZGlzYWJsZSh0cnVlKTtcblxuXHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2NvbnRyYWN0b3IvdXBkYXRlLXNhbGFyeScsIHtcblx0XHRcdFx0ZGF0YTogJHNhbGFyeUZvcm0uc2VyaWFsaXplRm9ybSgpXG5cdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHQkc2FsYXJ5Rm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdCRzYWxhcnlGb3JtLmZpbmQoJ1t0eXBlPWJ1dHRvbl0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0JHNhbGFyeUZvcm0uc2hvd01lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCwgJ2RhbmdlcicpO1xuXHRcdFx0XHQkc2FsYXJ5Rm9ybS5maW5kKCdbdHlwZT1idXR0b25dJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRhbGVydCgnQW5vdGhlciB1cGxvYWQgcHJvY2VzcyBpcyBydW5uaW5nLCBwbGVhc2Ugd2FpdCcpO1xuXHRcdH1cblx0fSk7XG59XG5cbi8vIEpvYiBhbGVydFxuaWYgKCQoJyNjb250cmFjdG9ySm9iQWxlcnRGb3JtJylbMF0pIHtcblx0JGZvcm0gPSAkKCcjY29udHJhY3RvckpvYkFsZXJ0Rm9ybScpO1xuXG5cdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoKSAmJiAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cblx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9jb250cmFjdG9yL2NyZWF0ZS1qb2ItYWxlcnQnLCB7XG5cdFx0XHRcdGRhdGE6ICRmb3JtLnNlcmlhbGl6ZUZvcm0oKVxuXHRcdFx0fSlcblx0XHRcdC5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSBsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdH0pXG5cdFx0XHQuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKHhoci5yZXNwb25zZVRleHQsICdkYW5nZXInKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoJ0Fub3RoZXIgcHJvY2VzcyBpcyBydW5uaW5nLicsICdpbmZvJyk7XG5cdFx0fVxuXHR9KTtcbn1cblxuaWYgKCQoJyNyZW1vdmVBbGVydEJ0bicpWzBdKSB7XG5cdCQoJyNyZW1vdmVBbGVydEJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciAkYnV0dG9uID0gJCgnI3JlbW92ZUFsZXJ0QnRuJyk7XG5cdFx0aWYgKGNvbmZpcm0oJ1JlbW92ZSB0aGlzIGFsZXJ0PycpKSB7XG5cdFx0XHRpZiAoICEgcHJvY2Vzc2luZykge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHQkYnV0dG9uLmRpc2FibGUodHJ1ZSk7XG5cblx0XHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2NvbnRyYWN0b3IvcmVtb3ZlLWpvYi1hbGVydCcpLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdCRidXR0b24uZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0YWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdFx0JGJ1dHRvbi5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0YWxlcnQoJ0Fub3RoZXIgcHJvY2VzcyBpcyBydW5uaW5nLCBwbGVhc2Ugd2FpdCcpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG5cbi8vIEFwcGx5IGZvciBKb2JcbmlmICgkKCdidXR0b25bZGF0YS1pbml0LWFwcGx5XScpWzBdKSB7XG5cdCQuZWFjaCgkKCdidXR0b25bZGF0YS1pbml0LWFwcGx5XScpLCBmdW5jdGlvbiAoaSwgZSkge1xuXHRcdHZhciAkYnV0dG9uID0gJChlKTtcblxuXHRcdCRidXR0b24ub24oJ2NsaWNrJywgIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoY29uZmlybSgnQXBwbHkgZm9yIHRoaXMgam9iPycpICYmICEgcHJvY2Vzc2luZykge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0JCgnYnV0dG9uW2RhdGEtaW5pdC1hcHBseV0nKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cblx0XHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2pvYi9hcHBseScsIHtcblx0XHRcdFx0XHRqb2I6ICRidXR0b24uZGF0YSgnam9iJylcblx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCdidXR0b25bZGF0YS1pbml0LWFwcGx5XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCdidXR0b25bZGF0YS1pbml0LWFwcGx5XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGFsZXJ0KCdBIHByb2Nlc3MgaXMgcnVubmluZywgcGxlYXNlIHdhaXQuJyk7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5pZiAoJCgnI3Jlc3VtZUxpc3QnKVswXSkge1xuXHQkKCcjcmVzdW1lTGlzdCAuYnRuLXJlbW92ZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0dmFyICRidXR0b24gPSAkKHRoaXMpO1xuXHRcdGlmIChjb25maXJtKCdSZW1vdmUgcmVzdW1lIGZpbGU/JykpIHtcblx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0JCgnI3Jlc3VtZUxpc3QgLmJ0bi1yZW1vdmUnKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXG5cdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvY29udHJhY3Rvci9yZW1vdmUtcmVzdW1lJywge1xuXHRcdFx0XHRmaWxlOiAkYnV0dG9uLmRhdGEoJ3Jlc3VtZScpXG5cdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnI3Jlc3VtZUxpc3QgLmJ0bi1yZW1vdmUnKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpICRidXR0b24ucGFyZW50KCkucGFyZW50KCkucmVtb3ZlKCk7XG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdCQoJyNyZXN1bWVMaXN0IC5idG4tcmVtb3ZlJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufVxuXG5pZiAoJCgnI2RhdGFGaWxlTGlzdCcpWzBdKSB7XG5cdHZhciAkbGlzdCA9ICQoJyNkYXRhRmlsZUxpc3QnKTtcblxuXHQkbGlzdC5vbignY2xpY2snLCAnW2RhdGEtcmVtb3ZlXScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGlmIChjb25maXJtKCdSZW1vdmUgZGF0YT8nKSkge1xuXHRcdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0dmFyICRidXR0b24gPSAkKHRoaXMpO1xuXHRcdFx0XHR2YXIgJHJvdXRlID0gJGJ1dHRvbi5kYXRhKCdyZW1vdmUnKTtcblx0XHRcdFx0dmFyICRpZCA9ICRidXR0b24uZGF0YSgnaWQnKTtcblxuXHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHQkKCdbYnRuLXJlbW92ZV0nKS5kaXNhYmxlKHRydWUpO1xuXG5cdFx0XHRcdCQucG9zdCgkcm91dGUsIHtpOiAkaWR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHQkKCdbYnRuLXJlbW92ZV0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdFx0XHRcdFx0JGxpc3QuZmluZCgnbGlbZGF0YS1pZD0nICsgJGlkICsgJ10nKS5yZW1vdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHQkKCdbYnRuLXJlbW92ZV0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuLy8gU3VibWl0IHRpbWVzaGVldFxuaWYgKCQoJyNzdWJtaXRUaW1lc2hlZXRGb3JtJylbMF0pIHtcblx0JGZvcm0gPSAkKCcjc3VibWl0VGltZXNoZWV0Rm9ybScpO1xuXHR2YXIgJGpvYiA9ICRmb3JtLmRhdGEoJ3ZhbHVlJyk7XG5cdHZhciBmaWxlID0gbnVsbDtcblx0dmFyIGFsbG93ZWRfdGltZXNoZWV0X21pbWUgPSBbXG5cdFx0J2FwcGxpY2F0aW9uL21zd29yZCcsXG5cdFx0J2FwcGxpY2F0aW9uL21zZXhjZWwnLFxuXHRcdCdhcHBsaWNhdGlvbi92bmQubXMtZXhjZWwnLFxuXHRcdCdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC5zaGVldCcsXG5cdFx0J2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50Jyxcblx0XTtcblxuXHQkKCdzZWxlY3RbbmFtZT1yZXBvcnRfdGltZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRjb25zb2xlLmxvZygkKHRoaXMpLnZhbCgpKTtcblx0XHRpZiAoJCh0aGlzKS52YWwoKSA9PT0gJ2RhaWx5Jykge1xuXHRcdFx0JCgnc3Bhbi5ob3VyLXRleHQnKS50ZXh0KCdob3VyJyk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0JCgnc3Bhbi5ob3VyLXRleHQnKS50ZXh0KCdkYXknKTtcblx0XHR9XG5cdH0pO1xuXG5cdCRmb3JtLmZpbmQoJ2lucHV0W3R5cGU9ZmlsZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0aGlzLmZpbGVzWzBdLnNpemUgPiA1MDAwMDAwKSB7XG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdGaWxlIGNhbm5vdCBiZSBtb3JlIHRoYW4gNU1iLicsICdkYW5nZXInKTtcblx0XHRcdGZpbGUgPSBudWxsO1xuXHRcdH0gZWxzZSBpZiAoJC5pbkFycmF5KHRoaXMuZmlsZXNbMF0udHlwZSwgYWxsb3dlZF90aW1lc2hlZXRfbWltZSkgPT09IC0xKSB7XG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdDYW4gb25seSB1cGxvYWQgd29yZCBvciBleGNlbCBmaWxlcy4nLCAnZGFuZ2VyJyk7XG5cdFx0XHRmaWxlID0gbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5zaG93TWVzc2FnZSgnVGhpcyBmaWxlIGNhbiBiZSB1cGxvYWRlZC4nLCAnc3VjY2VzcycpO1xuXHRcdFx0ZmlsZSA9IHRoaXMuZmlsZXNbMF07XG5cdFx0fVxuXHR9KTtcblxuXHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCkgJiYgISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXG5cdFx0XHR2YXIgZmQgPSBuZXcgRm9ybURhdGEoKTtcblx0XHRcdGZkLmFwcGVuZCgnZmlsZScsIGZpbGUpO1xuXHRcdFx0ZmQuYXBwZW5kKCdkYXRhJywgSlNPTi5zdHJpbmdpZnkoJGZvcm0uc2VyaWFsaXplRm9ybSgpKSk7XG5cdFx0XHRmZC5hcHBlbmQoJ2pvYicsICRqb2IpO1xuXG5cdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRtZXRob2Q6ICdwb3N0Jyxcblx0XHRcdFx0dXJsOiB3aW5kb3cub3JpZ2luICsgJy9qb2Ivc3VibWl0LXRpbWVzaGVldCcsXG5cdFx0XHRcdGRhdGE6IGZkLFxuXHRcdFx0XHRjcm9zc0RvbWFpbjogZmFsc2UsXG5cdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdGNhY2hlOiB0cnVlLFxuXHRcdFx0XHRwcm9jZXNzRGF0YTogZmFsc2UsXG5cdFx0XHRcdGNvbnRlbnRUeXBlOiBmYWxzZSxcblx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdCdYLUNTUkYtVG9rZW4nOiAkKCdtZXRhW25hbWU9XCJfdFwiXScpLmF0dHIoJ2NvbnRlbnQnKVxuXHRcdFx0XHR9LFxuXHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoZS5tZXNzYWdlLCBlLnR5cGUpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCwgJ2RhbmdlcicpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRhbGVydCgnQSBwcm9jZXNzIGlzIHN0aWxsIG9uIGdvaW5nLCBwbGVhc2Ugd2FpdCcpO1xuXHRcdH1cblx0fSk7XG59XG5cbi8vIFN1Ym1pdCBleHBlbnNlXG5pZiAoJCgnI3N1Ym1pdEV4cGVuc2VGb3JtJylbMF0pIHtcblx0JGZvcm0gPSAkKCcjc3VibWl0RXhwZW5zZUZvcm0nKTtcblx0dmFyICRqb2IgPSAkZm9ybS5kYXRhKCd2YWx1ZScpO1xuXHR2YXIgZmlsZSA9IG51bGw7XG5cdHZhciBhbGxvd2VkX2V4cGVuc2VfbWltZSA9IFtcblx0XHQnYXBwbGljYXRpb24vbXN3b3JkJyxcblx0XHQnYXBwbGljYXRpb24vbXNleGNlbCcsXG5cdFx0J2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCcsXG5cdFx0J2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnNoZWV0Jyxcblx0XHQnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnQnLFxuXHRcdCdhcHBsaWNhdGlvbi9wZGYnLFxuXHRcdCdpbWFnZS9qcGVnJyxcblx0XHQnaW1hZ2UvcGpwZWcnLFxuXHRcdCdpbWFnZS9wbmcnXG5cdF07XG5cblx0JGZvcm0uZmluZCgnaW5wdXRbdHlwZT1maWxlXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuZmlsZXNbMF0uc2l6ZSA+IDUwMDAwMDApIHtcblx0XHRcdCQodGhpcykucGFyZW50KCkuc2hvd01lc3NhZ2UoJ0ZpbGUgY2Fubm90IGJlIG1vcmUgdGhhbiA1TWIuJywgJ2RhbmdlcicpO1xuXHRcdFx0ZmlsZSA9IG51bGw7XG5cdFx0fSBlbHNlIGlmICgkLmluQXJyYXkodGhpcy5maWxlc1swXS50eXBlLCBhbGxvd2VkX2V4cGVuc2VfbWltZSkgPT09IC0xKSB7XG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdDYW4gb25seSB1cGxvYWQgaW1hZ2UsIG9mZmljZSBkb2NzLCBhbmQganBlZyBvciBwbmcuJywgJ2RhbmdlcicpO1xuXHRcdFx0ZmlsZSA9IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQodGhpcykucGFyZW50KCkuc2hvd01lc3NhZ2UoJ1RoaXMgZmlsZSBjYW4gYmUgdXBsb2FkZWQuJywgJ3N1Y2Nlc3MnKTtcblx0XHRcdGZpbGUgPSB0aGlzLmZpbGVzWzBdO1xuXHRcdH1cblx0fSk7XG5cblx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYgKCRmb3JtLnBhcnNsZXkoKS52YWxpZGF0ZSgpICYmICEgcHJvY2Vzc2luZykge1xuXHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZSh0cnVlKTtcblxuXHRcdFx0dmFyIGZkID0gbmV3IEZvcm1EYXRhKCk7XG5cdFx0XHRmZC5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcblx0XHRcdGZkLmFwcGVuZCgnZGF0YScsIEpTT04uc3RyaW5naWZ5KCRmb3JtLnNlcmlhbGl6ZUZvcm0oKSkpO1xuXHRcdFx0ZmQuYXBwZW5kKCdqb2InLCAkam9iKTtcblxuXHRcdFx0JC5hamF4KHtcblx0XHRcdFx0bWV0aG9kOiAncG9zdCcsXG5cdFx0XHRcdHVybDogd2luZG93Lm9yaWdpbiArICcvam9iL3N1Ym1pdC1leHBlbnNlJyxcblx0XHRcdFx0ZGF0YTogZmQsXG5cdFx0XHRcdGNyb3NzRG9tYWluOiBmYWxzZSxcblx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0Y2FjaGU6IHRydWUsXG5cdFx0XHRcdHByb2Nlc3NEYXRhOiBmYWxzZSxcblx0XHRcdFx0Y29udGVudFR5cGU6IGZhbHNlLFxuXHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0J1gtQ1NSRi1Ub2tlbic6ICQoJ21ldGFbbmFtZT1cIl90XCJdJykuYXR0cignY29udGVudCcpXG5cdFx0XHRcdH0sXG5cdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSh4aHIucmVzcG9uc2VUZXh0LCAnZGFuZ2VyJyk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGFsZXJ0KCdBIHByb2Nlc3MgaXMgc3RpbGwgb24gZ29pbmcsIHBsZWFzZSB3YWl0Jyk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLy8gTm90aWZpY2F0aW9uc1xuaWYgKCQoJyNsaXN0Tm90aWYnKVswXSkge1xuXHR2YXIgJGxpc3QgPSAkKCcjbGlzdE5vdGlmJyk7XG5cdCRsaXN0LmZpbmQoJy5idG4tbWFyay1ub3RpZicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdHZhciAkbm90aWZCdG4gPSAkKHRoaXMpO1xuXHRcdFx0dmFyIGlkID0gJG5vdGlmQnRuLmRhdGEoJ2lkJyk7XG5cdFx0XHRjb25zb2xlLmxvZyhpZCk7XG5cdFx0XHQkbGlzdC5maW5kKCcuYnRuLW1hcmstbm90aWYnKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cblx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9jb250cmFjdG9yL3VwZGF0ZS1ub3RpZicsIHtcblx0XHRcdFx0aWQ6IGlkLFxuXHRcdFx0XHRyZWFkOiB0cnVlXG5cdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdCRsaXN0LmZpbmQoJy5idG4tbWFyay1ub3RpZicpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdFx0XHRcdCRsaXN0LmZpbmQoJ2xpW2RhdGEtaWQ9JyArIGlkICsgJ10nKS5yZW1vdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0JGxpc3QuZmluZCgnLmJ0bi1tYXJrLW5vdGlmJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG5cblx0JCgnI3JlbW92ZVJlYWROb3RpZkJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKCAhIHByb2Nlc3NpbmcgKSB7XG5cdFx0XHQkKCcjcmVtb3ZlUmVhZE5vdGlmQnRuJykuZGlzYWJsZSh0cnVlKTtcblx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXG5cdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvY29udHJhY3Rvci9yZW1vdmUtbm90aWYnKS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdCQoJyNyZW1vdmVSZWFkTm90aWZCdG4nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0JCgnI3JlbW92ZVJlYWROb3RpZkJ0bicpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufSIsImV4cG9ydCBjbGFzcyBDb3JlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5kaXNhYmxlKCk7XG5cdFx0dGhpcy5mb3JtTWVzc2FnZSgpO1xuXHRcdHRoaXMuc2VyaWFsaXplRm9ybSgpO1xuXHRcdHRoaXMuc2V0dXBBamF4KCk7XG5cblx0XHROdW1iZXIucHJvdG90eXBlLmZvcm1hdE1vbmV5ID0gZnVuY3Rpb24oYywgZCwgdCl7XG5cdFx0XHR2YXIgbiA9IHRoaXMsIFxuXHRcdFx0YyA9IGlzTmFOKGMgPSBNYXRoLmFicyhjKSkgPyAyIDogYywgXG5cdFx0XHRkID0gZCA9PSB1bmRlZmluZWQgPyBcIi5cIiA6IGQsIFxuXHRcdFx0dCA9IHQgPT0gdW5kZWZpbmVkID8gXCIsXCIgOiB0LCBcblx0XHRcdHMgPSBuIDwgMCA/IFwiLVwiIDogXCJcIiwgXG5cdFx0XHRpID0gcGFyc2VJbnQobiA9IE1hdGguYWJzKCtuIHx8IDApLnRvRml4ZWQoYykpICsgXCJcIiwgXG5cdFx0XHRqID0gKGogPSBpLmxlbmd0aCkgPiAzID8gaiAlIDMgOiAwO1xuXHRcdFx0cmV0dXJuIHMgKyAoaiA/IGkuc3Vic3RyKDAsIGopICsgdCA6IFwiXCIpICsgaS5zdWJzdHIoaikucmVwbGFjZSgvKFxcZHszfSkoPz1cXGQpL2csIFwiJDFcIiArIHQpICsgKGMgPyBkICsgTWF0aC5hYnMobiAtIGkpLnRvRml4ZWQoYykuc2xpY2UoMikgOiBcIlwiKTtcblx0XHR9O1xuXHR9XG5cdGRpc2FibGUoKSB7XG5cdFx0JC5mbi5leHRlbmQoe1xuXHRcdFx0ZGlzYWJsZTogZnVuY3Rpb24oc3RhdGUpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoc3RhdGUpIHtcblx0XHRcdFx0XHRcdCQodGhpcykuZmluZCgnc3BhbicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKS5maW5kKCcuYnRuLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5maW5kKCdzcGFuJykuc2hvdygpO1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpLmZpbmQoJy5idG4tcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0Zm9ybU1lc3NhZ2UoKSB7XG5cdFx0JC5mbi5zaG93TWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHR5cGUsIGFsZXJ0Q2xhc3MpIHtcblx0XHRcdHZhciBodG1sO1xuXHRcdFx0aHRtbCA9IHZvaWQgMDtcblx0XHRcdGlmIChhbGVydENsYXNzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0YWxlcnRDbGFzcyA9ICcnO1xuXHRcdFx0fVxuXHRcdFx0JCgnLnN0YXR1cy1tZXNzYWdlJykucmVtb3ZlKCk7XG5cdFx0XHRodG1sID0gJzxkaXYgY2xhc3M9XFwnc3RhdHVzLW1lc3NhZ2UgZWxlbWVudC10b3AtMTAgJyArIGFsZXJ0Q2xhc3MgKyAnXFwnPiA8ZGl2IHJvbGU9XFwnYWxlcnRcXCcgY2xhc3M9XFwnZmFkZS1pbiBhbGVydCBhbGVydC1kaXNtaXNzYWJsZSBhbGVydC0nICsgdHlwZSArICdcXCc+IDxidXR0b24gdHlwZT1cXCdidXR0b25cXCcgY2xhc3M9XFwnY2xvc2VcXCcgZGF0YS1kaXNtaXNzPVxcJ2FsZXJ0XFwnPiA8c3BhbiBhcmlhLWhpZGRlbj1cXCd0cnVlXFwnPjxpIGNsYXNzPVxcJ2ZhIGZhLXRpbWVzXFwnPjwvaT48L3NwYW4+IDxzcGFuIGNsYXNzPVxcJ3NyLW9ubHlcXCc+Q2xvc2U8L3NwYW4+IDwvYnV0dG9uPicgKyBtZXNzYWdlICsgJzwvZGl2PjwvZGl2Pic7XG5cdFx0XHRyZXR1cm4gJChodG1sKS5hcHBlbmRUbyh0aGlzKS5oaWRlKCkuZmFkZUluKDkwMCk7XG5cdFx0fTtcblx0fVxuXHRzZXJpYWxpemVGb3JtKCkge1xuXHRcdCQuZm4uc2VyaWFsaXplRm9ybSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGRhdGEsIGxvb2t1cCwgcGFyc2UsIHNlbGVjdG9yO1xuXHRcdFx0ZGF0YSA9IHZvaWQgMDtcblx0XHRcdGxvb2t1cCA9IHZvaWQgMDtcblx0XHRcdHBhcnNlID0gdm9pZCAwO1xuXHRcdFx0c2VsZWN0b3IgPSB2b2lkIDA7XG5cdFx0XHRpZiAodGhpcy5sZW5ndGggPCAxKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGRhdGEgPSB7fTtcblx0XHRcdGxvb2t1cCA9IGRhdGE7XG5cdFx0XHRzZWxlY3RvciA9ICc6aW5wdXRbdHlwZSE9XCJjaGVja2JveFwiXVt0eXBlIT1cInJhZGlvXCJdLCBpbnB1dDpjaGVja2VkJztcblx0XHRcdHBhcnNlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciAkZWwsIGNhcCwgaSwgbmFtZWQ7XG5cdFx0XHRcdCRlbCA9IHZvaWQgMDtcblx0XHRcdFx0Y2FwID0gdm9pZCAwO1xuXHRcdFx0XHRpID0gdm9pZCAwO1xuXHRcdFx0XHRuYW1lZCA9IHZvaWQgMDtcblx0XHRcdFx0aWYgKHRoaXMuZGlzYWJsZWQpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0bmFtZWQgPSB0aGlzLm5hbWUucmVwbGFjZSgvXFxbKFteXFxdXSspP1xcXS9nLCAnLCQxJykuc3BsaXQoJywnKTtcblx0XHRcdFx0Y2FwID0gbmFtZWQubGVuZ3RoIC0gMTtcblx0XHRcdFx0JGVsID0gJCh0aGlzKTtcblx0XHRcdFx0aWYgKG5hbWVkWzBdKSB7XG5cdFx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKGkgPCBjYXApIHtcblx0XHRcdFx0XHRcdGxvb2t1cCA9IGxvb2t1cFtuYW1lZFtpXV0gPSBsb29rdXBbbmFtZWRbaV1dIHx8IChuYW1lZFtpICsgMV0gPT09ICcnIHx8IG5hbWVkW2kgKyAxXSA9PT0gJzAnID8gW10gOiB7fSk7XG5cdFx0XHRcdFx0XHRpKys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChsb29rdXAubGVuZ3RoICE9PSB2b2lkIDApIHtcblx0XHRcdFx0XHRcdGxvb2t1cC5wdXNoKCRlbC52YWwoKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGxvb2t1cFtuYW1lZFtjYXBdXSA9ICRlbC52YWwoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bG9va3VwID0gZGF0YTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHRoaXMuZmlsdGVyKHNlbGVjdG9yKS5lYWNoKHBhcnNlKTtcblx0XHRcdHRoaXMuZmluZChzZWxlY3RvcikuZWFjaChwYXJzZSk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9O1xuXHR9XG5cdHNldHVwQWpheCgpIHtcblx0XHQkLmFqYXhTZXR1cCh7XG5cdFx0XHRzdGF0dXNDb2RlOiB7XG5cdFx0XHRcdDQwMzogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJldHVybiB3aW5kb3cuYWxlcnQoJ0ZvcmJpZGRlbiBjb250ZW50IScpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQ0MDQ6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRyZXR1cm4gd2luZG93LmFsZXJ0KCdSZXF1ZXN0ZWQgcm91dGUgbm90IGZvdW5kIScpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQ1MDA6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRyZXR1cm4gd2luZG93LmFsZXJ0KCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3IhJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjcm9zc0RvbWFpbjogZmFsc2UsXG5cdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0Y2FjaGU6IHRydWUsXG5cdFx0XHRhc3luYzogZmFsc2UsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdYLUNTUkYtVG9rZW4nOiAkKCdtZXRhW25hbWU9XCJfdFwiXScpLmF0dHIoJ2NvbnRlbnQnKVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59IiwiZXhwb3J0IGNsYXNzIFBsdWdpbnMge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmluaXRCb290c3RyYXAoKTtcblx0XHR2YXIgc2xpZGVyID0ge1wiaW5pdFwiOlwiMVwiLFwiaG9tZV9pbml0XCI6XCIxXCJ9O1xuXG5cdFx0aWYgKCQoJ2ltZ1tkYXRhLWltYWdlLXJlc2l6ZV0nKVswXSkge1xuXHRcdFx0JC5lYWNoKCQoJ2ltZ1tkYXRhLWltYWdlLXJlc2l6ZV0nKSwgZnVuY3Rpb24gKGksIGUpIHtcblx0XHRcdFx0JChlKS5wYXJlbnQoKS5pbWdMaXF1aWQoe1xuXHRcdFx0XHRcdGZpbGw6IHRydWUsXG5cdFx0XHRcdFx0dmVydGljYWxBbGlnbjogJ2NlbnRlcicsXG5cdFx0XHRcdFx0aG9yaXpvbnRhbEFsaWduOiAnY2VudGVyJ1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIEpvYiBzZWFyY2g6IEFkdmFuY2VkIFNlYXJjaCB0b2dnbGVcblx0XHRpZiAoICQoJyNhZHZhbmNlLXNlYXJjaC1vcHRpb24nKVswXSApIHtcblx0XHRcdCQoJy5hZHZhbmNlLXNlYXJjaC10b2dnbGUnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRpZiAoJCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbjp2aXNpYmxlJykubGVuZ3RoICkge1xuXHRcdFx0XHRcdCQoJyNhZHZhbmNlLXNlYXJjaC1vcHRpb24nKS5zbGlkZVVwKCk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdCQoJyNhZHZhbmNlLXNlYXJjaC1vcHRpb24nKS5zbGlkZURvd24oKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHR2YXIgc2NyZWVuV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcblxuXHRcdGlmICggc2NyZWVuV2lkdGggPiA3NjcgKSB7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQoJ2xpLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4gPiBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0JCh0aGlzKS5uZXh0KCcuc3ViLW1lbnUnKS5zbGlkZVRvZ2dsZSgnZmFzdCcpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0JCgnI2pvYi1jYXRlZ29yeS1kcm9wZG93bicpLm1pbmltYWxlY3Qoe1xuXHRcdFx0cGxhY2Vob2xkZXIgOiAnU2VsZWN0IEpvYiBDYXRlZ29yeSdcblx0XHR9KTtcblxuXHRcdCQoJyNqb2ItdHlwZS1kcm9wZG93bicpLm1pbmltYWxlY3Qoe1xuXHRcdFx0cGxhY2Vob2xkZXIgOiAnU2VsZWN0IEpvYiBUeXBlJ1xuXHRcdH0pO1xuXHRcdFxuXHRcdGlmIChzbGlkZXIuaW5pdCkge1xuXHRcdFx0aWYgKCQoJ3NlbGVjdCNleHBlcmllbmNlX21pbicpWzBdICYmICQoJ3NlbGVjdCNleHBlcmllbmNlX21heCcpWzBdKSB7XG5cdFx0XHRcdCQoJ3NlbGVjdCNleHBlcmllbmNlX21pbiwgc2VsZWN0I2V4cGVyaWVuY2VfbWF4Jykuc2VsZWN0VG9VSVNsaWRlcih7XG5cdFx0XHRcdFx0bGFiZWxzOiAxMCxcblx0XHRcdFx0XHRsYWJlbFNyYzogJ3RleHQnLFxuXHRcdFx0XHRcdHRvb2x0aXA6IHRydWUsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoJCgnc2VsZWN0I3NhbGFyeV9taW4nKVswXSAmJiAkKCdzZWxlY3Qjc2FsYXJ5X21heCcpWzBdKSB7XG5cdFx0XHRcdCQoJ3NlbGVjdCNzYWxhcnlfbWluLCBzZWxlY3Qjc2FsYXJ5X21heCcpLnNlbGVjdFRvVUlTbGlkZXIoe1xuXHRcdFx0XHRcdGxhYmVsczoxMSxcblx0XHRcdFx0XHRsYWJlbFNyYzondGV4dCcsXG5cdFx0XHRcdFx0dG9vbHRpcDp0cnVlLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQkKCcjam9iLWxpc3RpbmctdGFicycpLnRhYnMoeyBoaWRlOiB7IGVmZmVjdDogXCJmYWRlXCIsIGR1cmF0aW9uOiAnZmFzdCcgfSwgc2hvdzogeyBlZmZlY3Q6IFwiZmFkZVwiLCBkdXJhdGlvbjogJ2Zhc3QnIH0gfSk7XG5cblx0XHR2YXIgc2NyZWVuV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcblxuXHRcdGlmICggc2NyZWVuV2lkdGggPCA3NjcgKSB7XG5cdFx0XHQkKCdsaS5oYXMtY2hpbGRyZW4gPiBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpe1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdCQodGhpcykubmV4dCgnLnN1Yi1tZW51Jykuc2xpZGVUb2dnbGUoJ2Zhc3QnKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICgkKCcjY291bnRyeVNlbGVjdG9yJylbMF0pIHtcblx0XHRcdHRoaXMuZm9ybUNvdW50cnlTZWxlY3RvckluaXQoKTtcblx0XHR9XG5cblx0XHRpZiAoJCgnLnN1bW1lcm5vdGUnKVswXSkge1xuXHRcdFx0JCgnLnN1bW1lcm5vdGUnKS5zdW1tZXJub3RlKHtkaWFsb2dzSW5Cb2R5OiB0cnVlfSk7XG5cdFx0fVxuXG5cdFx0aWYgKCQoJ1tkYXRhLWNoZWNrb3V0LXR5cGVdJylbMF0pIHtcblx0XHRcdHZhciBwYXltZW50UHJvY2Vzc2luZyA9IGZhbHNlO1xuXG5cdFx0XHQkLmVhY2goJCgnW2RhdGEtY2hlY2tvdXQtdHlwZV0nKSwgZnVuY3Rpb24gKGUsIGkpIHtcblx0XHRcdFx0JCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGlmICggISBwYXltZW50UHJvY2Vzc2luZykge1xuXHRcdFx0XHRcdFx0dmFyICRidXR0b24gPSAkKHRoaXMpO1xuXHRcdFx0XHRcdFx0dmFyIHVzZXIgPSAkYnV0dG9uLmRhdGEoJ3VzZXInKTtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdHBheW1lbnRQcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0XHRcdCRidXR0b24uZGlzYWJsZSh0cnVlKTtcblx0XHRcdFx0XHRcdHZhciBjaGVja291dF90eXBlID0gJGJ1dHRvbi5kYXRhKCdjaGVja291dC10eXBlJyk7XG5cdFx0XHRcdFx0XHR2YXIgcG9zdERhdGEgPSB7fTtcblxuXHRcdFx0XHRcdFx0aWYgKGNoZWNrb3V0X3R5cGUgPT0gMSkge1xuXHRcdFx0XHRcdFx0XHRwb3N0RGF0YSA9IHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiAncGF5cGFsJyxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogY2hlY2tvdXRfdHlwZSxcblx0XHRcdFx0XHRcdFx0XHR1c2VyOiB1c2VyXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGlmIChjaGVja291dF90eXBlID09IDIpIHtcblx0XHRcdFx0XHRcdFx0cG9zdERhdGEgPSB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogJ3BheXBhbCcsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IGNoZWNrb3V0X3R5cGUsXG5cdFx0XHRcdFx0XHRcdFx0YW1vdW50OiAkYnV0dG9uLnBhcmVudCgpLmZpbmQoJ2lucHV0W25hbWU9X2NyZWRfYW10XScpLnZhbCgpLFxuXHRcdFx0XHRcdFx0XHRcdHVzZXI6IHVzZXJcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2FwaS9wYXltZW50L3Byb2Nlc3MtcGF5bWVudCcsIHBvc3REYXRhKS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykgd2luZG93Lm9wZW4oZS5yZWRpcmVjdCk7XG5cdFx0XHRcdFx0XHRcdGVsc2UgYWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0JGJ1dHRvbi5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0cGF5bWVudFByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRcdFx0cGF5bWVudFByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHQkYnV0dG9uLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQoJ0Fub3RoZXIgcGF5bWVudCBpcyBwcm9jZXNzaW5nLCBwbGVhc2Ugd2FpdC4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdGluaXRCb290c3RyYXAoKSB7XG5cdFx0JCgnLnBhbmVsLXRvb2x0aXAsIFtkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG5cdFx0JCgnW2RhdGEtdG9nZ2xlPVwicG9wb3ZlclwiXScpLnBvcG92ZXIoKTtcblxuXHRcdCQoJy5pbnB1dC1kYXRlcmFuZ2UgaW5wdXQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdCQodGhpcykuZGF0ZXBpY2tlcih7XG5cdFx0XHRcdGZvcm1hdDogXCJ5eXl5LW1tLWRkXCIsXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXHRmb3JtQ291bnRyeVNlbGVjdG9ySW5pdCgpIHtcblx0XHQkLmFqYXgoe1xuXHRcdFx0dHlwZTogJ2dldCcsXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdHR5cGU6IFwiYWxsXCJcblx0XHRcdH0sXG5cdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHR1cmw6IHdpbmRvdy5vcmlnaW4gKyAnL2FwaS9jb3VudHJ5Jyxcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG5cdFx0XHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0dmFyIHNlbGVjdGVkID0gJyc7XG5cdFx0XHRcdFx0XHRpZiAoJCgnI2NvdW50cnlTZWxlY3RvcicpLmRhdGEoJ3ZhbHVlJykgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBjb3VudHJ5VmFsdWUgPSAkKCcjY291bnRyeVNlbGVjdG9yJykuZGF0YSgndmFsdWUnKTtcblx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQgPSAoZGF0YVtrZXldLk5hbWUgPT09IGNvdW50cnlWYWx1ZSkgPyAnc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJyA6ICcnO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHNlbGVjdGVkID0gKGRhdGFba2V5XS5Db2RlID09PSAnR0JSJykgPyAnc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJyA6ICcnO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0JCgnI2NvdW50cnlTZWxlY3RvcicpLmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBkYXRhW2tleV0uTmFtZSArICdcIiBkYXRhLWNvZGU9XCInICsgZGF0YVtrZXldLkNvZGUgKyAnXCIgJyArIHNlbGVjdGVkICsgJz4nICsgZGF0YVtrZXldLk5hbWUgKyc8L29wdGlvbj4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoJCgnI2NpdHlTZWxlY3RvcicpWzBdKSB7XG5cdFx0XHRcdFx0dmFyIHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcjY2l0eVNlbGVjdG9yJykuZW1wdHkoKTtcblxuXHRcdFx0XHRcdHZhciBjaXR5UmVsb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHRcdHR5cGU6ICdnZXQnLFxuXHRcdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6ICQoJyNjb3VudHJ5U2VsZWN0b3IgOnNlbGVjdGVkJykuZGF0YSgnY29kZScpXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0XHRcdFx0dXJsOiB3aW5kb3cub3JpZ2luICsgJy9hcGkvY2l0eScsXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChjaXR5RGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHQkKCcjY2l0eVNlbGVjdG9yJykuZW1wdHkoKTtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gY2l0eURhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChjaXR5RGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZCA9ICcnO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICgkKCcjY2l0eVNlbGVjdG9yJykuZGF0YSgndmFsdWUnKSAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgY2l0eVZhbHVlID0gJCgnI2NpdHlTZWxlY3RvcicpLmRhdGEoJ3ZhbHVlJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQgPSAoY2l0eURhdGFba2V5XS5OYW1lID09PSBjaXR5VmFsdWUpID8gJ3NlbGVjdGVkPVwic2VsZWN0ZWRcIicgOiAnJztcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQoJyNjaXR5U2VsZWN0b3InKS5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCInICsgY2l0eURhdGFba2V5XS5OYW1lICsgJ1wiICcgKyBzZWxlY3RlZCArICc+JyArIGNpdHlEYXRhW2tleV0uTmFtZSArJzwvb3B0aW9uPicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY29uZmlybShcIkNhbm5vdCBsb2FkIFwiICsgY291bnRyeSArIFwiJ3MgY2l0eSBsaXN0LCByZWxvYWQ/XCIpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRjaXR5UmVsb2FkKCk7XG5cblx0XHRcdFx0XHQkKCcjY291bnRyeVNlbGVjdG9yJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aWYgKCAhIHByb2Nlc3NpbmcpIGNpdHlSZWxvYWQoKTtcblx0XHRcdFx0XHRcdGVsc2UgYWxlcnQoJ1BsZWFzZSB3YWl0IHdoaWxlIHByZXZpb3VzIGxpc3Qgd2FzIGxvYWRlZC4nKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0aWYgKGNvbmZpcm0oJ0Nhbm5vdCBsb2FkIGNvdW50cnkgbGlzdCwgcmVsb2FkPycpKSB7XG5cdFx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSJdfQ==
