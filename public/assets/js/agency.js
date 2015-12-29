(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/ford/web/www-job/resources/assets/js/front/agency.js":[function(require,module,exports){
"use strict";

var _core = require("./core");

var _plugins = require("./plugins");

var $form;
var processing = false;

if ($('#companyAffiliateList')[0]) {
	$('#companyAffiliateList').on('click', '.btn-danger', function (e) {
		e.preventDefault();
		var $button = $(this);
		var id = $button.data('id');

		if (confirm('Remove this company from your affiliate list?')) {
			if (!processing) {
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
			if (!processing) {
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
	var allowed_avatar_mime = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/png'];

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
					url: window.origin + '/agency/update-avatar',
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

	$form.on('click', 'button[type=submit]', function (e) {
		e.preventDefault();
		if ($form.parsley().validate() && !processing) {
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
	var $sections;
	var $form;

	(function () {
		var curIndex = function curIndex() {
			return $sections.index($sections.filter('.current'));
		};

		var navigateTo = function navigateTo(index) {
			$sections.removeClass('current').eq(index).addClass('current');
			$('.form-navigation .previous').toggle(index > 0);
			var atTheEnd = index >= $sections.length - 1;
			$('.form-navigation .next').toggle(!atTheEnd);
			$('.form-navigation [type=submit]').toggle(atTheEnd);

			$('html, body').animate({
				scrollTop: $form.offset().top - 100
			}, 100);
		};

		$sections = $('.form-section');
		$form = $('#agencyPostJobForm');

		$('.form-navigation .previous').click(function () {
			navigateTo(curIndex() - 1);
		});

		$('.form-navigation .next').click(function () {
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

			if ($form.parsley().validate() && !processing) {
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
	})();
}

// Edit Job
if ($('#agencyEditJobForm')[0]) {
	var $sections;
	var $form;
	var jobId;

	(function () {
		var curIndex = function curIndex() {
			return $sections.index($sections.filter('.current'));
		};

		var navigateTo = function navigateTo(index) {
			$sections.removeClass('current').eq(index).addClass('current');
			$('.form-navigation .previous').toggle(index > 0);
			var atTheEnd = index >= $sections.length - 1;
			$('.form-navigation .next').toggle(!atTheEnd);
			$('.form-navigation [type=submit]').toggle(atTheEnd);

			$('html, body').animate({
				scrollTop: $form.offset().top - 100
			}, 100);
		};

		$sections = $('.form-section');
		$form = $('#agencyEditJobForm');
		jobId = $form.data('job');

		$('.form-navigation .previous').click(function () {
			navigateTo(curIndex() - 1);
		});

		$('.form-navigation .next').click(function () {
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

			if ($form.parsley().validate() && !processing) {
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
	})();
}

// Notifications
if ($('#listNotif')[0]) {
	var $list = $('#listNotif');
	$list.find('.btn-mark-notif').on('click', function (e) {
		e.preventDefault();

		if (!processing) {
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
		if (!processing) {
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

		if (confirm('Give the job to this contractor?') && !processing) {
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
				} else alert(e.message);
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
			if (!processing) {
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
					} else alert(e.message);
					processing = false;
					$('.btn-remove-contract').disable(false);
					$('.page-preloader').hide();
				}).fail(function (xhr, status, e) {
					alert(xhr.responseText);
					processing = false;
					$('.btn-remove-contract').disable(false);
					$('.page-preloader').hide();
				});
			} else {
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

			if (!processing) {
				processing = true;
				$button.disable(true);
				$('.page-preloader').show();

				$.post(window.origin + '/job/remove-job', {
					job: $job
				}).done(function (e) {
					if (e.type === 'success') {
						alert(e.message);
						location.replace(e.redirect);
					} else alert(e.message);
					processing = false;
					$button.disable(false);
					$('.page-preloader').hide();
				}).fail(function (xhr, status, e) {
					alert(xhr.responseText);
					processing = false;
					$button.disable(false);
					$('.page-preloader').hide();
				});
			} else {
				alert('Another process is running, please wait.');
			}
		}
	});
}

if ($('#jobStatusChanger')[0]) {
	var $select = $('#jobStatusChanger');
	var $job = $select.data('job');

	$select.on('change', function () {
		if (!processing) {
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
					} else {
						$select.parent().parent().parent().removeClass('panel-success').addClass('panel-danger');
					}
				} else alert(e.message);

				$select.disable(false);
				processing = false;
				$('.page-preloader').hide();
			}).fail(function (xhr, status, e) {
				alert(xhr.responseText);
				processing = false;
				$select.disable(false);
				$('.page-preloader').hide();
			});
		} else {
			alert("Another process is running, please wait");
		}
	});
}

if ($('.btn-accept-ts')[0]) {
	$('.btn-accept-ts').on('click', function (e) {
		if (!processing) {
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
		if (!processing) {
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
		if (!processing) {
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
		if (!processing) {
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

},{"./core":"/home/ford/web/www-job/resources/assets/js/front/core.js","./plugins":"/home/ford/web/www-job/resources/assets/js/front/plugins.js"}],"/home/ford/web/www-job/resources/assets/js/front/core.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Core = exports.Core = (function () {
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

},{}],"/home/ford/web/www-job/resources/assets/js/front/plugins.js":[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plugins = exports.Plugins = (function () {
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

},{}]},{},["/home/ford/web/www-job/resources/assets/js/front/agency.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZXNvdXJjZXMvYXNzZXRzL2pzL2Zyb250L2FnZW5jeS5qcyIsInJlc291cmNlcy9hc3NldHMvanMvZnJvbnQvY29yZS5qcyIsInJlc291cmNlcy9hc3NldHMvanMvZnJvbnQvcGx1Z2lucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0dBLElBQUksS0FBSyxDQUFDO0FBQ1YsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDOztBQUV2QixJQUFJLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2xDLEVBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQ2xFLEdBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixNQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsTUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFNUIsTUFBSSxPQUFPLENBQUMsK0NBQStDLENBQUMsRUFBRTtBQUM3RCxPQUFLLENBQUUsVUFBVSxFQUFFO0FBQ2xCLEtBQUMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyRCxjQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLEtBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUU1QixLQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsMEJBQTBCLEVBQUU7QUFDbEQsT0FBRSxFQUFFLEVBQUU7S0FDTixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3BCLE1BQUMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFD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Q0FBQyxDQUFDO0dBQ0g7OztRQTFOVyxPQUFPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IENvcmUgfSBmcm9tIFwiLi9jb3JlXCI7XG5pbXBvcnQgeyBQbHVnaW5zIH0gZnJvbSBcIi4vcGx1Z2luc1wiO1xuXG52YXIgJGZvcm07XG52YXIgcHJvY2Vzc2luZyA9IGZhbHNlO1xuXG5pZiAoJCgnI2NvbXBhbnlBZmZpbGlhdGVMaXN0JylbMF0pIHtcblx0JCgnI2NvbXBhbnlBZmZpbGlhdGVMaXN0Jykub24oJ2NsaWNrJywgJy5idG4tZGFuZ2VyJywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyICRidXR0b24gPSAkKHRoaXMpO1xuXHRcdHZhciBpZCA9ICRidXR0b24uZGF0YSgnaWQnKTtcblxuXHRcdGlmIChjb25maXJtKCdSZW1vdmUgdGhpcyBjb21wYW55IGZyb20geW91ciBhZmZpbGlhdGUgbGlzdD8nKSkge1xuXHRcdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0JCgnI2NvbXBhbnlBZmZpbGlhdGVMaXN0IC5idG4tZGFuZ2VyJykuZGlzYWJsZSh0cnVlKTtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblxuXHRcdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvYWdlbmN5L3JlbW92ZS1hZmZpbGlhdGUnLCB7XG5cdFx0XHRcdFx0aWQ6IGlkXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHQkKCcjY29tcGFueUFmZmlsaWF0ZUxpc3QgLmJ0bi1kYW5nZXInKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG5cdFx0XHRcdFx0XHQkKCcjY29tcGFueUFmZmlsaWF0ZUxpc3QgbGlbZGF0YS1pZD1cIicgKyBpZCArICdcIl0nKS5yZW1vdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0JCgnI2NvbXBhbnlBZmZpbGlhdGVMaXN0IC5idG4tZGFuZ2VyJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuaWYgKCQoJyNjb21wYW55QWZmaWxpYXRlU2VhcmNoTGlzdCcpWzBdKSB7XG5cdCQoJyNjb21wYW55QWZmaWxpYXRlU2VhcmNoTGlzdCcpLm9uKCdjbGljaycsICcuYnRuLXN1Y2Nlc3MnLCBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgJGJ1dHRvbiA9ICQodGhpcyk7XG5cdFx0dmFyIGlkID0gJGJ1dHRvbi5kYXRhKCdpZCcpO1xuXG5cdFx0aWYgKGNvbmZpcm0oJ0FkZCB0aGlzIGNvbXBhbnkgdG8geW91ciBhZmZpbGlhdGUgbGlzdD8nKSkge1xuXHRcdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0JCgnI2NvbXBhbnlBZmZpbGlhdGVMaXN0IC5idG4tc3VjY2VzcycpLmRpc2FibGUodHJ1ZSk7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cblx0XHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2FnZW5jeS9hZGQtYWZmaWxpYXRlJywge1xuXHRcdFx0XHRcdGlkOiBpZFxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0JCgnI2NvbXBhbnlBZmZpbGlhdGVMaXN0IC5idG4tc3VjY2VzcycpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0YWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIHtcblx0XHRcdFx0XHRcdCQoJyNjb21wYW55QWZmaWxpYXRlTGlzdCBsaSMnICsgaWQpLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHQkKCcjY29tcGFueUFmZmlsaWF0ZUxpc3QgLmJ0bi1zdWNjZXNzJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuaWYgKCQoJyNhZ2VuY3lBY2NvdW50Rm9ybScpWzBdKSB7XG5cdHZhciAkZm9ybSA9ICQoJyNhZ2VuY3lBY2NvdW50Rm9ybScpO1xuXHR2YXIgYWxsb3dlZF9hdmF0YXJfbWltZSA9IFtcblx0J2ltYWdlL2dpZicsXG5cdCdpbWFnZS9qcGVnJyxcblx0J2ltYWdlL3BqcGVnJyxcblx0J2ltYWdlL3BuZydcblx0XTtcblxuXHQkKCdpbnB1dFtuYW1lPWltYWdlXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuZmlsZXNbMF0uc2l6ZSA+IDUwMDAwMDApIHtcblx0XHRcdCQodGhpcykucGFyZW50KCkuc2hvd01lc3NhZ2UoJ0ZpbGUgY2Fubm90IGJlIG1vcmUgdGhhbiA1TWIuJywgJ2RhbmdlcicpO1xuXHRcdH0gZWxzZSBpZiAoJC5pbkFycmF5KHRoaXMuZmlsZXNbMF0udHlwZSwgYWxsb3dlZF9hdmF0YXJfbWltZSkgPT09IC0xKSB7XG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdDYW4gb25seSB1cGxvYWQgLmpwZywgLmdpZiwgb3IgLnBuZyBmaWxlcy4nLCAnZGFuZ2VyJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICggISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHRcdHZhciBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdFx0XHRmZC5hcHBlbmQoJ2ZpbGUnLCB0aGlzLmZpbGVzWzBdKTtcblxuXHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdG1ldGhvZDogJ3Bvc3QnLFxuXHRcdFx0XHRcdHVybDogd2luZG93Lm9yaWdpbiArICcvYWdlbmN5L3VwZGF0ZS1hdmF0YXInLFxuXHRcdFx0XHRcdGRhdGE6IGZkLFxuXHRcdFx0XHRcdGNyb3NzRG9tYWluOiBmYWxzZSxcblx0XHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRcdGNhY2hlOiB0cnVlLFxuXHRcdFx0XHRcdHByb2Nlc3NEYXRhOiBmYWxzZSxcblx0XHRcdFx0XHRjb250ZW50VHlwZTogZmFsc2UsXG5cdFx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFx0J1gtQ1NSRi1Ub2tlbic6ICQoJ21ldGFbbmFtZT1cIl90XCJdJykuYXR0cignY29udGVudCcpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0YWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIHtcblx0XHRcdFx0XHRcdCQoJ2ltZy50bXAtaW1nJykuYXR0cignc3JjJywgZS5pbWFnZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKGUubWVzc2FnZSwgZS50eXBlKTtcblx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKHhoci5yZXNwb25zZVRleHQsICdkYW5nZXInKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0YWxlcnQoJ0Fub3RoZXIgdXBsb2FkIHByb2Nlc3MgaXMgcnVubmluZywgcGxlYXNlIHdhaXQuJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQkZm9ybS5vbignY2xpY2snLCAnYnV0dG9uW3R5cGU9c3VibWl0XScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoKSAmJiAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUodHJ1ZSk7XG5cdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cblx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9hZ2VuY3kvdXBkYXRlLWFjY291bnQnLCB7XG5cdFx0XHRcdGRhdGE6ICRmb3JtLnNlcmlhbGl6ZUZvcm0oKVxuXHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSh4aHIucmVzcG9uc2VUZXh0LCAnZGFuZ2VyJyk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufVxuXG4vLyBQb3N0IEpvYlxuaWYgKCQoJyNhZ2VuY3lQb3N0Sm9iRm9ybScpWzBdKSB7XG5cdHZhciAkc2VjdGlvbnMgPSAkKCcuZm9ybS1zZWN0aW9uJyk7XG5cdHZhciAkZm9ybSA9ICQoJyNhZ2VuY3lQb3N0Sm9iRm9ybScpO1xuXG5cdGZ1bmN0aW9uIGN1ckluZGV4KCkge1xuXHRcdHJldHVybiAkc2VjdGlvbnMuaW5kZXgoJHNlY3Rpb25zLmZpbHRlcignLmN1cnJlbnQnKSk7XG5cdH1cblxuXHRmdW5jdGlvbiBuYXZpZ2F0ZVRvKGluZGV4KSB7XG5cdFx0JHNlY3Rpb25zLnJlbW92ZUNsYXNzKCdjdXJyZW50JykuZXEoaW5kZXgpLmFkZENsYXNzKCdjdXJyZW50Jyk7XG5cdFx0JCgnLmZvcm0tbmF2aWdhdGlvbiAucHJldmlvdXMnKS50b2dnbGUoaW5kZXggPiAwKTtcblx0XHR2YXIgYXRUaGVFbmQgPSBpbmRleCA+PSAkc2VjdGlvbnMubGVuZ3RoIC0gMTtcblx0XHQkKCcuZm9ybS1uYXZpZ2F0aW9uIC5uZXh0JykudG9nZ2xlKCFhdFRoZUVuZCk7XG5cdFx0JCgnLmZvcm0tbmF2aWdhdGlvbiBbdHlwZT1zdWJtaXRdJykudG9nZ2xlKGF0VGhlRW5kKTtcblxuXHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdHNjcm9sbFRvcDogJGZvcm0ub2Zmc2V0KCkudG9wIC0gMTAwXG5cdFx0fSwgMTAwKTtcblx0fVxuXG5cdCQoJy5mb3JtLW5hdmlnYXRpb24gLnByZXZpb3VzJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0bmF2aWdhdGVUbyhjdXJJbmRleCgpIC0gMSk7XG5cdH0pO1xuXG5cdCQoJy5mb3JtLW5hdmlnYXRpb24gLm5leHQnKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCdibG9jay0nICsgY3VySW5kZXgoKSkpIHtcblx0XHRcdG5hdmlnYXRlVG8oY3VySW5kZXgoKSArIDEpO1xuXHRcdH1cblx0fSk7XG5cblx0JHNlY3Rpb25zLmVhY2goZnVuY3Rpb24gKGluZGV4LCBzZWN0aW9uKSB7XG5cdFx0JChzZWN0aW9uKS5maW5kKCc6aW5wdXQnKS5hdHRyKCdkYXRhLXBhcnNsZXktZ3JvdXAnLCAnYmxvY2stJyArIGluZGV4KTtcblx0fSk7XG5cblx0bmF2aWdhdGVUbygwKTtcblxuXHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCkgJiYgISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXG5cdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvYWdlbmN5L3N1Ym1pdC1qb2InLCB7XG5cdFx0XHRcdGRhdGE6ICRmb3JtLnNlcmlhbGl6ZUZvcm0oKVxuXHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoZS5tZXNzYWdlLCBlLnR5cGUpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdFx0XHRcdGxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArICcvYWdlbmN5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSh4aHIucmVzcG9uc2VUZXh0LCAnZGFuZ2VyJyk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG59XG5cbi8vIEVkaXQgSm9iXG5pZiAoJCgnI2FnZW5jeUVkaXRKb2JGb3JtJylbMF0pIHtcblx0dmFyICRzZWN0aW9ucyA9ICQoJy5mb3JtLXNlY3Rpb24nKTtcblx0dmFyICRmb3JtID0gJCgnI2FnZW5jeUVkaXRKb2JGb3JtJyk7XG5cdHZhciBqb2JJZCA9ICRmb3JtLmRhdGEoJ2pvYicpO1xuXG5cdGZ1bmN0aW9uIGN1ckluZGV4KCkge1xuXHRcdHJldHVybiAkc2VjdGlvbnMuaW5kZXgoJHNlY3Rpb25zLmZpbHRlcignLmN1cnJlbnQnKSk7XG5cdH1cblxuXHRmdW5jdGlvbiBuYXZpZ2F0ZVRvKGluZGV4KSB7XG5cdFx0JHNlY3Rpb25zLnJlbW92ZUNsYXNzKCdjdXJyZW50JykuZXEoaW5kZXgpLmFkZENsYXNzKCdjdXJyZW50Jyk7XG5cdFx0JCgnLmZvcm0tbmF2aWdhdGlvbiAucHJldmlvdXMnKS50b2dnbGUoaW5kZXggPiAwKTtcblx0XHR2YXIgYXRUaGVFbmQgPSBpbmRleCA+PSAkc2VjdGlvbnMubGVuZ3RoIC0gMTtcblx0XHQkKCcuZm9ybS1uYXZpZ2F0aW9uIC5uZXh0JykudG9nZ2xlKCFhdFRoZUVuZCk7XG5cdFx0JCgnLmZvcm0tbmF2aWdhdGlvbiBbdHlwZT1zdWJtaXRdJykudG9nZ2xlKGF0VGhlRW5kKTtcblxuXHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdHNjcm9sbFRvcDogJGZvcm0ub2Zmc2V0KCkudG9wIC0gMTAwXG5cdFx0fSwgMTAwKTtcblx0fVxuXG5cdCQoJy5mb3JtLW5hdmlnYXRpb24gLnByZXZpb3VzJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0bmF2aWdhdGVUbyhjdXJJbmRleCgpIC0gMSk7XG5cdH0pO1xuXG5cdCQoJy5mb3JtLW5hdmlnYXRpb24gLm5leHQnKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCdibG9jay0nICsgY3VySW5kZXgoKSkpIHtcblx0XHRcdG5hdmlnYXRlVG8oY3VySW5kZXgoKSArIDEpO1xuXHRcdH1cblx0fSk7XG5cblx0JHNlY3Rpb25zLmVhY2goZnVuY3Rpb24gKGluZGV4LCBzZWN0aW9uKSB7XG5cdFx0JChzZWN0aW9uKS5maW5kKCc6aW5wdXQnKS5hdHRyKCdkYXRhLXBhcnNsZXktZ3JvdXAnLCAnYmxvY2stJyArIGluZGV4KTtcblx0fSk7XG5cblx0bmF2aWdhdGVUbygwKTtcblxuXHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCkgJiYgISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXG5cdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvYWdlbmN5L2VkaXQtam9iJywge1xuXHRcdFx0XHRkYXRhOiAkZm9ybS5zZXJpYWxpemVGb3JtKCksXG5cdFx0XHRcdGpvYjogam9iSWRcblx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKGUubWVzc2FnZSwgZS50eXBlKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKHhoci5yZXNwb25zZVRleHQsICdkYW5nZXInKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLy8gTm90aWZpY2F0aW9uc1xuaWYgKCQoJyNsaXN0Tm90aWYnKVswXSkge1xuXHR2YXIgJGxpc3QgPSAkKCcjbGlzdE5vdGlmJyk7XG5cdCRsaXN0LmZpbmQoJy5idG4tbWFyay1ub3RpZicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdHZhciAkbm90aWZCdG4gPSAkKHRoaXMpO1xuXHRcdFx0dmFyIGlkID0gJG5vdGlmQnRuLmRhdGEoJ2lkJyk7XG5cdFx0XHQkbGlzdC5maW5kKCcuYnRuLW1hcmstbm90aWYnKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cblx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9hZ2VuY3kvdXBkYXRlLW5vdGlmJywge1xuXHRcdFx0XHRpZDogaWQsXG5cdFx0XHRcdHJlYWQ6IHRydWVcblx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0JGxpc3QuZmluZCgnLmJ0bi1tYXJrLW5vdGlmJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG5cdFx0XHRcdFx0JGxpc3QuZmluZCgnbGlbZGF0YS1pZD0nICsgaWQgKyAnXScpLnJlbW92ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHQkbGlzdC5maW5kKCcuYnRuLW1hcmstbm90aWYnKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcjcmVtb3ZlUmVhZE5vdGlmQnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAoICEgcHJvY2Vzc2luZyApIHtcblx0XHRcdCQoJyNyZW1vdmVSZWFkTm90aWZCdG4nKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cblx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9hZ2VuY3kvcmVtb3ZlLW5vdGlmJykuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQkKCcjcmVtb3ZlUmVhZE5vdGlmQnRuJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0YWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdCQoJyNyZW1vdmVSZWFkTm90aWZCdG4nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn1cblxuaWYgKCQoJyN0aW1lc2hlZXRMaXN0JylbMF0pIHtcblx0dmFyICRsaXN0ID0gJCgnI3RpbWVzaGVldExpc3QnKTtcblxuXHQkbGlzdC5maW5kKCcuYnRuLWdpdmUtam9iJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyICRidG4gPSAkKHRoaXMpO1xuXG5cdFx0aWYgKGNvbmZpcm0oJ0dpdmUgdGhlIGpvYiB0byB0aGlzIGNvbnRyYWN0b3I/JykgJiYgISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdCRsaXN0LmZpbmQoJy5idG4tZ2l2ZS1qb2InKS5kaXNhYmxlKHRydWUpO1xuXG5cdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvam9iL2dpdmUtam9iJywge1xuXHRcdFx0XHRqb2I6ICRidG4uZGF0YSgnam9iJyksXG5cdFx0XHRcdGNvbnRyYWN0b3I6ICRidG4uZGF0YSgndmFsdWUnKVxuXHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0JGxpc3QuZmluZCgnLmJ0bi1naXZlLWpvYicpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIHtcblx0XHRcdFx0XHRpZiAoY29uZmlybShlLm1lc3NhZ2UpKSBsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdCRsaXN0LmZpbmQoJy5idG4tZ2l2ZS1qb2InKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG59XG5cbmlmICgkKCcjam9iQ29udHJhY3Rvckxpc3QnKVswXSkge1xuXHQkKCcuYnRuLXJlbW92ZS1jb250cmFjdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciAkYnV0dG9uID0gJCh0aGlzKTtcblx0XHR2YXIgJGpvYiA9ICQoJyNqb2JDb250cmFjdG9yTGlzdCcpLmRhdGEoJ2pvYicpO1xuXHRcdHZhciAkY29udHJhY3RvciA9ICRidXR0b24uZGF0YSgndmFsdWUnKTtcblxuXHRcdGlmIChjb25maXJtKCdSZW1vdmUgdGhpcyBjb250cmFjdG9yIGZyb20gdGhpcyBqb2I/JykpIHtcblx0XHRcdGlmICggISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHQkKCcuYnRuLXJlbW92ZS1jb250cmFjdCcpLmRpc2FibGUodHJ1ZSk7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblxuXHRcdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvam9iL2NhbmNlbC1jb250cmFjdG9yJywge1xuXHRcdFx0XHRcdGpvYjogJGpvYixcblx0XHRcdFx0XHRjb250cmFjdG9yOiAkY29udHJhY3RvclxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG5cdFx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0JGJ1dHRvbi5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcuYnRuLXJlbW92ZS1jb250cmFjdCcpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLmJ0bi1yZW1vdmUtY29udHJhY3QnKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGFsZXJ0KCdBbm90aGVyIHByb2Nlc3MgaXMgcnVubmluZywgcGxlYXNlIHdhaXQuJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuaWYgKCQoJyNyZW1vdmVKb2JCdG4nKVswXSkge1xuXHQkKCcjcmVtb3ZlSm9iQnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHR2YXIgJGJ1dHRvbiA9ICQoJyNyZW1vdmVKb2JCdG4nKTtcblx0XHRpZiAoY29uZmlybSgnUmVtb3ZlIHRoaXMgam9iPyBDQU5OT1QgQkUgVU5ETy4nKSkge1xuXHRcdFx0dmFyICRqb2IgPSAkYnV0dG9uLmRhdGEoJ2pvYicpO1xuXG5cdFx0XHRpZiAoICEgcHJvY2Vzc2luZykge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0JGJ1dHRvbi5kaXNhYmxlKHRydWUpO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cblx0XHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2pvYi9yZW1vdmUtam9iJywge1xuXHRcdFx0XHRcdGpvYjogJGpvYlxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG5cdFx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0bG9jYXRpb24ucmVwbGFjZShlLnJlZGlyZWN0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkYnV0dG9uLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JGJ1dHRvbi5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGFsZXJ0KCdBbm90aGVyIHByb2Nlc3MgaXMgcnVubmluZywgcGxlYXNlIHdhaXQuJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuaWYgKCQoJyNqb2JTdGF0dXNDaGFuZ2VyJylbMF0pIHtcblx0dmFyICRzZWxlY3QgPSAkKCcjam9iU3RhdHVzQ2hhbmdlcicpO1xuXHR2YXIgJGpvYiA9ICRzZWxlY3QuZGF0YSgnam9iJyk7XG5cblx0JHNlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuXHRcdGlmICggISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdCRzZWxlY3QuZGlzYWJsZSh0cnVlKTtcblx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblxuXHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2pvYi9zdGF0dXMtY2hhbmdlJywge1xuXHRcdFx0XHRqb2I6ICRqb2IsXG5cdFx0XHRcdHZhbHVlOiAkc2VsZWN0LnZhbCgpXG5cdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdFx0XHRcdGlmICgkc2VsZWN0LnZhbCgpID09PSAnb3BlbicpIHtcblx0XHRcdFx0XHRcdCRzZWxlY3QucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3BhbmVsLWRhbmdlcicpLmFkZENsYXNzKCdwYW5lbC1zdWNjZXNzJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0JHNlbGVjdC5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygncGFuZWwtc3VjY2VzcycpLmFkZENsYXNzKCdwYW5lbC1kYW5nZXInKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBhbGVydChlLm1lc3NhZ2UpO1xuXG5cdFx0XHRcdCRzZWxlY3QuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JHNlbGVjdC5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0YWxlcnQoXCJBbm90aGVyIHByb2Nlc3MgaXMgcnVubmluZywgcGxlYXNlIHdhaXRcIik7XG5cdFx0fVxuXHR9KTtcbn1cblxuaWYgKCQoJy5idG4tYWNjZXB0LXRzJylbMF0pIHtcblx0JCgnLmJ0bi1hY2NlcHQtdHMnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICggISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRpZiAoY29uZmlybSgnQWNjZXB0IHRoaXMgdGltZXNoZWV0PycpKSB7XG5cdFx0XHRcdHZhciAkYnV0dG9uID0gJCh0aGlzKTtcblx0XHRcdFx0dmFyIGlkID0gJGJ1dHRvbi5kYXRhKCdpZCcpO1xuXG5cdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHQkKCcuYnRuLWFjY2VwdC10cycpLmRpc2FibGUodHJ1ZSk7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblxuXHRcdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvYWdlbmN5L2FjY2VwdC10aW1lc2hlZXQnLCB7XG5cdFx0XHRcdFx0aWQ6IGlkXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykgbG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5idG4tYWNjZXB0LXRzJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcuYnRuLWFjY2VwdC10cycpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0fSk7IFxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG5cbmlmICgkKCcuYnRuLXJlbW92ZS10cycpWzBdKSB7XG5cdCQoJy5idG4tcmVtb3ZlLXRzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAoICEgcHJvY2Vzc2luZykge1xuXHRcdFx0aWYgKGNvbmZpcm0oJ1JlbW92ZSBhY2NlcHRpb24gdGhpcyB0aW1lc2hlZXQ/JykpIHtcblx0XHRcdFx0dmFyICRidXR0b24gPSAkKHRoaXMpO1xuXHRcdFx0XHR2YXIgaWQgPSAkYnV0dG9uLmRhdGEoJ2lkJyk7XG5cblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCQoJy5idG4tcmVtb3ZlLXRzJykuZGlzYWJsZSh0cnVlKTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXG5cdFx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9hZ2VuY3kvcmVtb3ZlLXRpbWVzaGVldCcsIHtcblx0XHRcdFx0XHRpZDogaWRcblx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSBsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLmJ0bi1yZW1vdmUtdHMnKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5idG4tcmVtb3ZlLXRzJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHR9KTsgXG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuaWYgKCQoJy5idG4tYWNjZXB0LWV4JylbMF0pIHtcblx0JCgnLmJ0bi1hY2NlcHQtZXgnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICggISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRpZiAoY29uZmlybSgnQWNjZXB0IHRoaXMgZXhwZW5zZT8nKSkge1xuXHRcdFx0XHR2YXIgJGJ1dHRvbiA9ICQodGhpcyk7XG5cdFx0XHRcdHZhciBpZCA9ICRidXR0b24uZGF0YSgnaWQnKTtcblxuXHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0JCgnLmJ0bi1hY2NlcHQtZXgnKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cblx0XHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2FnZW5jeS9hY2NlcHQtZXhwZW5zZScsIHtcblx0XHRcdFx0XHRpZDogaWRcblx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSBsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLmJ0bi1hY2NlcHQtZXgnKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5idG4tYWNjZXB0LWV4JykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHR9KTsgXG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuaWYgKCQoJy5idG4tcmVtb3ZlLWV4JylbMF0pIHtcblx0JCgnLmJ0bi1yZW1vdmUtZXgnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdGlmICggISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRpZiAoY29uZmlybSgnUmVtb3ZlIGFjY2VwdGlvbiB0aGlzIGV4cGVuc2U/JykpIHtcblx0XHRcdFx0dmFyICRidXR0b24gPSAkKHRoaXMpO1xuXHRcdFx0XHR2YXIgaWQgPSAkYnV0dG9uLmRhdGEoJ2lkJyk7XG5cblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCQoJy5idG4tcmVtb3ZlLWV4JykuZGlzYWJsZSh0cnVlKTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXG5cdFx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9hZ2VuY3kvcmVtb3ZlLWV4cGVuc2UnLCB7XG5cdFx0XHRcdFx0aWQ6IGlkXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykgbG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5idG4tcmVtb3ZlLWV4JykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcuYnRuLXJlbW92ZS1leCcpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0fSk7IFxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59IiwiZXhwb3J0IGNsYXNzIENvcmUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmRpc2FibGUoKTtcblx0XHR0aGlzLmZvcm1NZXNzYWdlKCk7XG5cdFx0dGhpcy5zZXJpYWxpemVGb3JtKCk7XG5cdFx0dGhpcy5zZXR1cEFqYXgoKTtcblxuXHRcdE51bWJlci5wcm90b3R5cGUuZm9ybWF0TW9uZXkgPSBmdW5jdGlvbihjLCBkLCB0KXtcblx0XHRcdHZhciBuID0gdGhpcywgXG5cdFx0XHRjID0gaXNOYU4oYyA9IE1hdGguYWJzKGMpKSA/IDIgOiBjLCBcblx0XHRcdGQgPSBkID09IHVuZGVmaW5lZCA/IFwiLlwiIDogZCwgXG5cdFx0XHR0ID0gdCA9PSB1bmRlZmluZWQgPyBcIixcIiA6IHQsIFxuXHRcdFx0cyA9IG4gPCAwID8gXCItXCIgOiBcIlwiLCBcblx0XHRcdGkgPSBwYXJzZUludChuID0gTWF0aC5hYnMoK24gfHwgMCkudG9GaXhlZChjKSkgKyBcIlwiLCBcblx0XHRcdGogPSAoaiA9IGkubGVuZ3RoKSA+IDMgPyBqICUgMyA6IDA7XG5cdFx0XHRyZXR1cm4gcyArIChqID8gaS5zdWJzdHIoMCwgaikgKyB0IDogXCJcIikgKyBpLnN1YnN0cihqKS5yZXBsYWNlKC8oXFxkezN9KSg/PVxcZCkvZywgXCIkMVwiICsgdCkgKyAoYyA/IGQgKyBNYXRoLmFicyhuIC0gaSkudG9GaXhlZChjKS5zbGljZSgyKSA6IFwiXCIpO1xuXHRcdH07XG5cdH1cblx0ZGlzYWJsZSgpIHtcblx0XHQkLmZuLmV4dGVuZCh7XG5cdFx0XHRkaXNhYmxlOiBmdW5jdGlvbihzdGF0ZSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmIChzdGF0ZSkge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5maW5kKCdzcGFuJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpLmZpbmQoJy5idG4tcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoJ3NwYW4nKS5zaG93KCk7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJykuZmluZCgnLmJ0bi1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRmb3JtTWVzc2FnZSgpIHtcblx0XHQkLmZuLnNob3dNZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSwgdHlwZSwgYWxlcnRDbGFzcykge1xuXHRcdFx0dmFyIGh0bWw7XG5cdFx0XHRodG1sID0gdm9pZCAwO1xuXHRcdFx0aWYgKGFsZXJ0Q2xhc3MgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRhbGVydENsYXNzID0gJyc7XG5cdFx0XHR9XG5cdFx0XHQkKCcuc3RhdHVzLW1lc3NhZ2UnKS5yZW1vdmUoKTtcblx0XHRcdGh0bWwgPSAnPGRpdiBjbGFzcz1cXCdzdGF0dXMtbWVzc2FnZSBlbGVtZW50LXRvcC0xMCAnICsgYWxlcnRDbGFzcyArICdcXCc+IDxkaXYgcm9sZT1cXCdhbGVydFxcJyBjbGFzcz1cXCdmYWRlLWluIGFsZXJ0IGFsZXJ0LWRpc21pc3NhYmxlIGFsZXJ0LScgKyB0eXBlICsgJ1xcJz4gPGJ1dHRvbiB0eXBlPVxcJ2J1dHRvblxcJyBjbGFzcz1cXCdjbG9zZVxcJyBkYXRhLWRpc21pc3M9XFwnYWxlcnRcXCc+IDxzcGFuIGFyaWEtaGlkZGVuPVxcJ3RydWVcXCc+PGkgY2xhc3M9XFwnZmEgZmEtdGltZXNcXCc+PC9pPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XFwnc3Itb25seVxcJz5DbG9zZTwvc3Bhbj4gPC9idXR0b24+JyArIG1lc3NhZ2UgKyAnPC9kaXY+PC9kaXY+Jztcblx0XHRcdHJldHVybiAkKGh0bWwpLmFwcGVuZFRvKHRoaXMpLmhpZGUoKS5mYWRlSW4oOTAwKTtcblx0XHR9O1xuXHR9XG5cdHNlcmlhbGl6ZUZvcm0oKSB7XG5cdFx0JC5mbi5zZXJpYWxpemVGb3JtID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZGF0YSwgbG9va3VwLCBwYXJzZSwgc2VsZWN0b3I7XG5cdFx0XHRkYXRhID0gdm9pZCAwO1xuXHRcdFx0bG9va3VwID0gdm9pZCAwO1xuXHRcdFx0cGFyc2UgPSB2b2lkIDA7XG5cdFx0XHRzZWxlY3RvciA9IHZvaWQgMDtcblx0XHRcdGlmICh0aGlzLmxlbmd0aCA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0ZGF0YSA9IHt9O1xuXHRcdFx0bG9va3VwID0gZGF0YTtcblx0XHRcdHNlbGVjdG9yID0gJzppbnB1dFt0eXBlIT1cImNoZWNrYm94XCJdW3R5cGUhPVwicmFkaW9cIl0sIGlucHV0OmNoZWNrZWQnO1xuXHRcdFx0cGFyc2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyICRlbCwgY2FwLCBpLCBuYW1lZDtcblx0XHRcdFx0JGVsID0gdm9pZCAwO1xuXHRcdFx0XHRjYXAgPSB2b2lkIDA7XG5cdFx0XHRcdGkgPSB2b2lkIDA7XG5cdFx0XHRcdG5hbWVkID0gdm9pZCAwO1xuXHRcdFx0XHRpZiAodGhpcy5kaXNhYmxlZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRuYW1lZCA9IHRoaXMubmFtZS5yZXBsYWNlKC9cXFsoW15cXF1dKyk/XFxdL2csICcsJDEnKS5zcGxpdCgnLCcpO1xuXHRcdFx0XHRjYXAgPSBuYW1lZC5sZW5ndGggLSAxO1xuXHRcdFx0XHQkZWwgPSAkKHRoaXMpO1xuXHRcdFx0XHRpZiAobmFtZWRbMF0pIHtcblx0XHRcdFx0XHRpID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoaSA8IGNhcCkge1xuXHRcdFx0XHRcdFx0bG9va3VwID0gbG9va3VwW25hbWVkW2ldXSA9IGxvb2t1cFtuYW1lZFtpXV0gfHwgKG5hbWVkW2kgKyAxXSA9PT0gJycgfHwgbmFtZWRbaSArIDFdID09PSAnMCcgPyBbXSA6IHt9KTtcblx0XHRcdFx0XHRcdGkrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGxvb2t1cC5sZW5ndGggIT09IHZvaWQgMCkge1xuXHRcdFx0XHRcdFx0bG9va3VwLnB1c2goJGVsLnZhbCgpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bG9va3VwW25hbWVkW2NhcF1dID0gJGVsLnZhbCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsb29rdXAgPSBkYXRhO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5maWx0ZXIoc2VsZWN0b3IpLmVhY2gocGFyc2UpO1xuXHRcdFx0dGhpcy5maW5kKHNlbGVjdG9yKS5lYWNoKHBhcnNlKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH07XG5cdH1cblx0c2V0dXBBamF4KCkge1xuXHRcdCQuYWpheFNldHVwKHtcblx0XHRcdHN0YXR1c0NvZGU6IHtcblx0XHRcdFx0NDAzOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdpbmRvdy5hbGVydCgnRm9yYmlkZGVuIGNvbnRlbnQhJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdDQwNDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJldHVybiB3aW5kb3cuYWxlcnQoJ1JlcXVlc3RlZCByb3V0ZSBub3QgZm91bmQhJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdDUwMDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJldHVybiB3aW5kb3cuYWxlcnQoJ0ludGVybmFsIHNlcnZlciBlcnJvciEnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNyb3NzRG9tYWluOiBmYWxzZSxcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRjYWNoZTogdHJ1ZSxcblx0XHRcdGFzeW5jOiBmYWxzZSxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J1gtQ1NSRi1Ub2tlbic6ICQoJ21ldGFbbmFtZT1cIl90XCJdJykuYXR0cignY29udGVudCcpXG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0iLCJleHBvcnQgY2xhc3MgUGx1Z2lucyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuaW5pdEJvb3RzdHJhcCgpO1xuXHRcdHZhciBzbGlkZXIgPSB7XCJpbml0XCI6XCIxXCIsXCJob21lX2luaXRcIjpcIjFcIn07XG5cblx0XHRpZiAoJCgnaW1nW2RhdGEtaW1hZ2UtcmVzaXplXScpWzBdKSB7XG5cdFx0XHQkLmVhY2goJCgnaW1nW2RhdGEtaW1hZ2UtcmVzaXplXScpLCBmdW5jdGlvbiAoaSwgZSkge1xuXHRcdFx0XHQkKGUpLnBhcmVudCgpLmltZ0xpcXVpZCh7XG5cdFx0XHRcdFx0ZmlsbDogdHJ1ZSxcblx0XHRcdFx0XHR2ZXJ0aWNhbEFsaWduOiAnY2VudGVyJyxcblx0XHRcdFx0XHRob3Jpem9udGFsQWxpZ246ICdjZW50ZXInXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gSm9iIHNlYXJjaDogQWR2YW5jZWQgU2VhcmNoIHRvZ2dsZVxuXHRcdGlmICggJCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbicpWzBdICkge1xuXHRcdFx0JCgnLmFkdmFuY2Utc2VhcmNoLXRvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGlmICgkKCcjYWR2YW5jZS1zZWFyY2gtb3B0aW9uOnZpc2libGUnKS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0JCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbicpLnNsaWRlVXAoKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0JCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbicpLnNsaWRlRG93bigpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHZhciBzY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXG5cdFx0aWYgKCBzY3JlZW5XaWR0aCA+IDc2NyApIHtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JCgnbGkubWVudS1pdGVtLWhhcy1jaGlsZHJlbiA+IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHQkKHRoaXMpLm5leHQoJy5zdWItbWVudScpLnNsaWRlVG9nZ2xlKCdmYXN0Jyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQkKCcjam9iLWNhdGVnb3J5LWRyb3Bkb3duJykubWluaW1hbGVjdCh7XG5cdFx0XHRwbGFjZWhvbGRlciA6ICdTZWxlY3QgSm9iIENhdGVnb3J5J1xuXHRcdH0pO1xuXG5cdFx0JCgnI2pvYi10eXBlLWRyb3Bkb3duJykubWluaW1hbGVjdCh7XG5cdFx0XHRwbGFjZWhvbGRlciA6ICdTZWxlY3QgSm9iIFR5cGUnXG5cdFx0fSk7XG5cdFx0XG5cdFx0aWYgKHNsaWRlci5pbml0KSB7XG5cdFx0XHRpZiAoJCgnc2VsZWN0I2V4cGVyaWVuY2VfbWluJylbMF0gJiYgJCgnc2VsZWN0I2V4cGVyaWVuY2VfbWF4JylbMF0pIHtcblx0XHRcdFx0JCgnc2VsZWN0I2V4cGVyaWVuY2VfbWluLCBzZWxlY3QjZXhwZXJpZW5jZV9tYXgnKS5zZWxlY3RUb1VJU2xpZGVyKHtcblx0XHRcdFx0XHRsYWJlbHM6IDEwLFxuXHRcdFx0XHRcdGxhYmVsU3JjOiAndGV4dCcsXG5cdFx0XHRcdFx0dG9vbHRpcDogdHJ1ZSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICgkKCdzZWxlY3Qjc2FsYXJ5X21pbicpWzBdICYmICQoJ3NlbGVjdCNzYWxhcnlfbWF4JylbMF0pIHtcblx0XHRcdFx0JCgnc2VsZWN0I3NhbGFyeV9taW4sIHNlbGVjdCNzYWxhcnlfbWF4Jykuc2VsZWN0VG9VSVNsaWRlcih7XG5cdFx0XHRcdFx0bGFiZWxzOjExLFxuXHRcdFx0XHRcdGxhYmVsU3JjOid0ZXh0Jyxcblx0XHRcdFx0XHR0b29sdGlwOnRydWUsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdCQoJyNqb2ItbGlzdGluZy10YWJzJykudGFicyh7IGhpZGU6IHsgZWZmZWN0OiBcImZhZGVcIiwgZHVyYXRpb246ICdmYXN0JyB9LCBzaG93OiB7IGVmZmVjdDogXCJmYWRlXCIsIGR1cmF0aW9uOiAnZmFzdCcgfSB9KTtcblxuXHRcdHZhciBzY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXG5cdFx0aWYgKCBzY3JlZW5XaWR0aCA8IDc2NyApIHtcblx0XHRcdCQoJ2xpLmhhcy1jaGlsZHJlbiA+IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSl7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0JCh0aGlzKS5uZXh0KCcuc3ViLW1lbnUnKS5zbGlkZVRvZ2dsZSgnZmFzdCcpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKCQoJyNjb3VudHJ5U2VsZWN0b3InKVswXSkge1xuXHRcdFx0dGhpcy5mb3JtQ291bnRyeVNlbGVjdG9ySW5pdCgpO1xuXHRcdH1cblxuXHRcdGlmICgkKCcuc3VtbWVybm90ZScpWzBdKSB7XG5cdFx0XHQkKCcuc3VtbWVybm90ZScpLnN1bW1lcm5vdGUoe2RpYWxvZ3NJbkJvZHk6IHRydWV9KTtcblx0XHR9XG5cblx0XHRpZiAoJCgnW2RhdGEtY2hlY2tvdXQtdHlwZV0nKVswXSkge1xuXHRcdFx0dmFyIHBheW1lbnRQcm9jZXNzaW5nID0gZmFsc2U7XG5cblx0XHRcdCQuZWFjaCgkKCdbZGF0YS1jaGVja291dC10eXBlXScpLCBmdW5jdGlvbiAoZSwgaSkge1xuXHRcdFx0XHQkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0aWYgKCAhIHBheW1lbnRQcm9jZXNzaW5nKSB7XG5cdFx0XHRcdFx0XHR2YXIgJGJ1dHRvbiA9ICQodGhpcyk7XG5cdFx0XHRcdFx0XHR2YXIgdXNlciA9ICRidXR0b24uZGF0YSgndXNlcicpO1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0cGF5bWVudFByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHRcdFx0JGJ1dHRvbi5kaXNhYmxlKHRydWUpO1xuXHRcdFx0XHRcdFx0dmFyIGNoZWNrb3V0X3R5cGUgPSAkYnV0dG9uLmRhdGEoJ2NoZWNrb3V0LXR5cGUnKTtcblx0XHRcdFx0XHRcdHZhciBwb3N0RGF0YSA9IHt9O1xuXG5cdFx0XHRcdFx0XHRpZiAoY2hlY2tvdXRfdHlwZSA9PSAxKSB7XG5cdFx0XHRcdFx0XHRcdHBvc3REYXRhID0ge1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6ICdwYXlwYWwnLFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBjaGVja291dF90eXBlLFxuXHRcdFx0XHRcdFx0XHRcdHVzZXI6IHVzZXJcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKGNoZWNrb3V0X3R5cGUgPT0gMikge1xuXHRcdFx0XHRcdFx0XHRwb3N0RGF0YSA9IHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiAncGF5cGFsJyxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogY2hlY2tvdXRfdHlwZSxcblx0XHRcdFx0XHRcdFx0XHRhbW91bnQ6ICRidXR0b24ucGFyZW50KCkuZmluZCgnaW5wdXRbbmFtZT1fY3JlZF9hbXRdJykudmFsKCksXG5cdFx0XHRcdFx0XHRcdFx0dXNlcjogdXNlclxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvYXBpL3BheW1lbnQvcHJvY2Vzcy1wYXltZW50JywgcG9zdERhdGEpLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSB3aW5kb3cub3BlbihlLnJlZGlyZWN0KTtcblx0XHRcdFx0XHRcdFx0ZWxzZSBhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHQkYnV0dG9uLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHRwYXltZW50UHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0XHRwYXltZW50UHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRcdCRidXR0b24uZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRhbGVydCgnQW5vdGhlciBwYXltZW50IGlzIHByb2Nlc3NpbmcsIHBsZWFzZSB3YWl0LicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblx0aW5pdEJvb3RzdHJhcCgpIHtcblx0XHQkKCcucGFuZWwtdG9vbHRpcCwgW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcblx0XHQkKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJykucG9wb3ZlcigpO1xuXG5cdFx0JCgnLmlucHV0LWRhdGVyYW5nZSBpbnB1dCcpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0JCh0aGlzKS5kYXRlcGlja2VyKHtcblx0XHRcdFx0Zm9ybWF0OiBcInl5eXktbW0tZGRcIixcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cdGZvcm1Db3VudHJ5U2VsZWN0b3JJbml0KCkge1xuXHRcdCQuYWpheCh7XG5cdFx0XHR0eXBlOiAnZ2V0Jyxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0dHlwZTogXCJhbGxcIlxuXHRcdFx0fSxcblx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdHVybDogd2luZG93Lm9yaWdpbiArICcvYXBpL2NvdW50cnknLFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGRhdGEpIHtcblx0XHRcdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHR2YXIgc2VsZWN0ZWQgPSAnJztcblx0XHRcdFx0XHRcdGlmICgkKCcjY291bnRyeVNlbGVjdG9yJykuZGF0YSgndmFsdWUnKSAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0dmFyIGNvdW50cnlWYWx1ZSA9ICQoJyNjb3VudHJ5U2VsZWN0b3InKS5kYXRhKCd2YWx1ZScpO1xuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZCA9IChkYXRhW2tleV0uTmFtZSA9PT0gY291bnRyeVZhbHVlKSA/ICdzZWxlY3RlZD1cInNlbGVjdGVkXCInIDogJyc7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQgPSAoZGF0YVtrZXldLkNvZGUgPT09ICdHQlInKSA/ICdzZWxlY3RlZD1cInNlbGVjdGVkXCInIDogJyc7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQkKCcjY291bnRyeVNlbGVjdG9yJykuYXBwZW5kKCc8b3B0aW9uIHZhbHVlPVwiJyArIGRhdGFba2V5XS5OYW1lICsgJ1wiIGRhdGEtY29kZT1cIicgKyBkYXRhW2tleV0uQ29kZSArICdcIiAnICsgc2VsZWN0ZWQgKyAnPicgKyBkYXRhW2tleV0uTmFtZSArJzwvb3B0aW9uPicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICgkKCcjY2l0eVNlbGVjdG9yJylbMF0pIHtcblx0XHRcdFx0XHR2YXIgcHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJyNjaXR5U2VsZWN0b3InKS5lbXB0eSgpO1xuXG5cdFx0XHRcdFx0dmFyIGNpdHlSZWxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRcdFx0dHlwZTogJ2dldCcsXG5cdFx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogJCgnI2NvdW50cnlTZWxlY3RvciA6c2VsZWN0ZWQnKS5kYXRhKCdjb2RlJylcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRcdFx0XHR1cmw6IHdpbmRvdy5vcmlnaW4gKyAnL2FwaS9jaXR5Jyxcblx0XHRcdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGNpdHlEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdCQoJyNjaXR5U2VsZWN0b3InKS5lbXB0eSgpO1xuXHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBjaXR5RGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGNpdHlEYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIHNlbGVjdGVkID0gJyc7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCQoJyNjaXR5U2VsZWN0b3InKS5kYXRhKCd2YWx1ZScpICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBjaXR5VmFsdWUgPSAkKCcjY2l0eVNlbGVjdG9yJykuZGF0YSgndmFsdWUnKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZCA9IChjaXR5RGF0YVtrZXldLk5hbWUgPT09IGNpdHlWYWx1ZSkgPyAnc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJyA6ICcnO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0JCgnI2NpdHlTZWxlY3RvcicpLmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBjaXR5RGF0YVtrZXldLk5hbWUgKyAnXCIgJyArIHNlbGVjdGVkICsgJz4nICsgY2l0eURhdGFba2V5XS5OYW1lICsnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjb25maXJtKFwiQ2Fubm90IGxvYWQgXCIgKyBjb3VudHJ5ICsgXCIncyBjaXR5IGxpc3QsIHJlbG9hZD9cIikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGNpdHlSZWxvYWQoKTtcblxuXHRcdFx0XHRcdCQoJyNjb3VudHJ5U2VsZWN0b3InKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpZiAoICEgcHJvY2Vzc2luZykgY2l0eVJlbG9hZCgpO1xuXHRcdFx0XHRcdFx0ZWxzZSBhbGVydCgnUGxlYXNlIHdhaXQgd2hpbGUgcHJldmlvdXMgbGlzdCB3YXMgbG9hZGVkLicpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRpZiAoY29uZmlybSgnQ2Fubm90IGxvYWQgY291bnRyeSBsaXN0LCByZWxvYWQ/JykpIHtcblx0XHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59Il19
