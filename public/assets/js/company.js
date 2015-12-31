(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/ford/web/www-job/resources/assets/js/front/company.js":[function(require,module,exports){
"use strict";

var _core = require("./core");

var _plugins = require("./plugins");

var $form;
var processing = false;

// Post Job
if ($('#companyPostJobForm')[0]) {
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
		$form = $('#companyPostJobForm');

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

				$.post(window.origin + '/job/submit-job', {
					data: $form.serializeForm()
				}).done(function (e) {
					processing = false;
					$('.page-preloader').hide();
					$form.showMessage(e.message, e.type);
					$form.find('[type=submit]').disable(false);
					if (e.type === 'success') {
						location.replace(window.origin + '/company');
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
if ($('#companyEditJobForm')[0]) {
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
		$form = $('#companyEditJobForm');
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
	})();
}

// Edit Account
if ($('#companyEditAccountForm')[0]) {
	$form = $('#companyEditAccountForm');

	$form.find('[type=submit]').on('click', function (e) {
		e.preventDefault();
		if ($form.parsley().validate() && !processing) {
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

if ($('#agencyAffiliateList')[0]) {
	var $list = $('#agencyAffiliateList');

	$list.on('click', '.btn-success', function (e) {
		var $button = $(this);
		if (confirm('Accept this agency as your affiliate?')) {
			if (!processing) {
				var id = $button.data('id');
				processing = true;
				$list.find('.btn').disable(true);
				$('.page-preloader').show();
				$.post(window.origin + '/company/add-affiliate', { id: id }).done(function (e) {
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
			if (!processing) {
				var id = $button.data('id');
				processing = true;
				$list.find('.btn').disable(true);
				$('.page-preloader').show();
				$.post(window.origin + '/company/remove-affiliate', { id: id }).done(function (e) {
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
			if (!processing) {
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
	var $list = $('#listNotif');
	$list.find('.btn-mark-notif').on('click', function (e) {
		e.preventDefault();

		if (!processing) {
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
		if (!processing) {
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

if ($('.btn-accept-ts')[0]) {
	$('.btn-accept-ts').on('click', function (e) {
		if (!processing) {
			if (confirm('Accept this timesheet?')) {
				var $button = $(this);
				var id = $button.data('id');

				processing = true;
				$('.btn-accept-ts').disable(true);
				$('.page-preloader').show();

				$.post(window.origin + '/company/accept-timesheet', {
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

				$.post(window.origin + '/company/remove-timesheet', {
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

				$.post(window.origin + '/company/accept-expense', {
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

				$.post(window.origin + '/company/remove-expense', {
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

},{}]},{},["/home/ford/web/www-job/resources/assets/js/front/company.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZXNvdXJjZXMvYXNzZXRzL2pzL2Zyb250L2NvbXBhbnkuanMiLCJyZXNvdXJjZXMvYXNzZXRzL2pzL2Zyb250L2NvcmUuanMiLCJyZXNvdXJjZXMvYXNzZXRzL2pzL2Zyb250L3BsdWdpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNHQSxJQUFJLEtBQUssQ0FBQztBQUNWLElBQUksVUFBVSxHQUFHLEtBQUs7OztBQUFDLEFBR3ZCLElBQUksQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7S0FDNUIsU0FBUztLQUNULEtBQUs7OztNQUVBLFFBQVEsR0FBakIsU0FBUyxRQUFRLEdBQUc7QUFDbkIsVUFBTyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztHQUNyRDs7TUFFUSxVQUFVLEdBQW5CLFNBQVMsVUFBVSxDQUFDLEtBQUssRUFBRTtBQUMxQixZQUFTLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0QsSUFBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNsRCxPQUFJLFFBQVEsR0FBRyxLQUFLLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDN0MsSUFBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUMsSUFBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVyRCxJQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDO0FB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TSxFQUFFLENBQUM7TUFDbEI7S0FDRDtJQUNELENBQUMsQ0FBQztHQUNIOzs7UUExTlcsT0FBTyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBDb3JlIH0gZnJvbSBcIi4vY29yZVwiO1xuaW1wb3J0IHsgUGx1Z2lucyB9IGZyb20gXCIuL3BsdWdpbnNcIjtcblxudmFyICRmb3JtO1xudmFyIHByb2Nlc3NpbmcgPSBmYWxzZTtcblxuLy8gUG9zdCBKb2JcbmlmICgkKCcjY29tcGFueVBvc3RKb2JGb3JtJylbMF0pIHtcblx0dmFyICRzZWN0aW9ucyA9ICQoJy5mb3JtLXNlY3Rpb24nKTtcblx0dmFyICRmb3JtID0gJCgnI2NvbXBhbnlQb3N0Sm9iRm9ybScpO1xuXG5cdGZ1bmN0aW9uIGN1ckluZGV4KCkge1xuXHRcdHJldHVybiAkc2VjdGlvbnMuaW5kZXgoJHNlY3Rpb25zLmZpbHRlcignLmN1cnJlbnQnKSk7XG5cdH1cblxuXHRmdW5jdGlvbiBuYXZpZ2F0ZVRvKGluZGV4KSB7XG5cdFx0JHNlY3Rpb25zLnJlbW92ZUNsYXNzKCdjdXJyZW50JykuZXEoaW5kZXgpLmFkZENsYXNzKCdjdXJyZW50Jyk7XG5cdFx0JCgnLmZvcm0tbmF2aWdhdGlvbiAucHJldmlvdXMnKS50b2dnbGUoaW5kZXggPiAwKTtcblx0XHR2YXIgYXRUaGVFbmQgPSBpbmRleCA+PSAkc2VjdGlvbnMubGVuZ3RoIC0gMTtcblx0XHQkKCcuZm9ybS1uYXZpZ2F0aW9uIC5uZXh0JykudG9nZ2xlKCFhdFRoZUVuZCk7XG5cdFx0JCgnLmZvcm0tbmF2aWdhdGlvbiBbdHlwZT1zdWJtaXRdJykudG9nZ2xlKGF0VGhlRW5kKTtcblxuXHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdHNjcm9sbFRvcDogJGZvcm0ub2Zmc2V0KCkudG9wIC0gMTAwXG5cdFx0fSwgMTAwKTtcblx0fVxuXG5cdCQoJy5mb3JtLW5hdmlnYXRpb24gLnByZXZpb3VzJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0bmF2aWdhdGVUbyhjdXJJbmRleCgpIC0gMSk7XG5cdH0pO1xuXG5cdCQoJy5mb3JtLW5hdmlnYXRpb24gLm5leHQnKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCdibG9jay0nICsgY3VySW5kZXgoKSkpIHtcblx0XHRcdG5hdmlnYXRlVG8oY3VySW5kZXgoKSArIDEpO1xuXHRcdH1cblx0fSk7XG5cblx0JHNlY3Rpb25zLmVhY2goZnVuY3Rpb24gKGluZGV4LCBzZWN0aW9uKSB7XG5cdFx0JChzZWN0aW9uKS5maW5kKCc6aW5wdXQnKS5hdHRyKCdkYXRhLXBhcnNsZXktZ3JvdXAnLCAnYmxvY2stJyArIGluZGV4KTtcblx0fSk7XG5cblx0bmF2aWdhdGVUbygwKTtcblxuXHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCkgJiYgISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXG5cdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvam9iL3N1Ym1pdC1qb2InLCB7XG5cdFx0XHRcdGRhdGE6ICRmb3JtLnNlcmlhbGl6ZUZvcm0oKVxuXHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoZS5tZXNzYWdlLCBlLnR5cGUpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdFx0XHRcdGxvY2F0aW9uLnJlcGxhY2Uod2luZG93Lm9yaWdpbiArICcvY29tcGFueScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCwgJ2RhbmdlcicpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufVxuXG4vLyBFZGl0IEpvYlxuaWYgKCQoJyNjb21wYW55RWRpdEpvYkZvcm0nKVswXSkge1xuXHR2YXIgJHNlY3Rpb25zID0gJCgnLmZvcm0tc2VjdGlvbicpO1xuXHR2YXIgJGZvcm0gPSAkKCcjY29tcGFueUVkaXRKb2JGb3JtJyk7XG5cdHZhciBqb2JJZCA9ICRmb3JtLmRhdGEoJ2pvYicpO1xuXG5cdGZ1bmN0aW9uIGN1ckluZGV4KCkge1xuXHRcdHJldHVybiAkc2VjdGlvbnMuaW5kZXgoJHNlY3Rpb25zLmZpbHRlcignLmN1cnJlbnQnKSk7XG5cdH1cblxuXHRmdW5jdGlvbiBuYXZpZ2F0ZVRvKGluZGV4KSB7XG5cdFx0JHNlY3Rpb25zLnJlbW92ZUNsYXNzKCdjdXJyZW50JykuZXEoaW5kZXgpLmFkZENsYXNzKCdjdXJyZW50Jyk7XG5cdFx0JCgnLmZvcm0tbmF2aWdhdGlvbiAucHJldmlvdXMnKS50b2dnbGUoaW5kZXggPiAwKTtcblx0XHR2YXIgYXRUaGVFbmQgPSBpbmRleCA+PSAkc2VjdGlvbnMubGVuZ3RoIC0gMTtcblx0XHQkKCcuZm9ybS1uYXZpZ2F0aW9uIC5uZXh0JykudG9nZ2xlKCFhdFRoZUVuZCk7XG5cdFx0JCgnLmZvcm0tbmF2aWdhdGlvbiBbdHlwZT1zdWJtaXRdJykudG9nZ2xlKGF0VGhlRW5kKTtcblxuXHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdHNjcm9sbFRvcDogJGZvcm0ub2Zmc2V0KCkudG9wIC0gMTAwXG5cdFx0fSwgMTAwKTtcblx0fVxuXG5cdCQoJy5mb3JtLW5hdmlnYXRpb24gLnByZXZpb3VzJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0bmF2aWdhdGVUbyhjdXJJbmRleCgpIC0gMSk7XG5cdH0pO1xuXG5cdCQoJy5mb3JtLW5hdmlnYXRpb24gLm5leHQnKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCdibG9jay0nICsgY3VySW5kZXgoKSkpIHtcblx0XHRcdG5hdmlnYXRlVG8oY3VySW5kZXgoKSArIDEpO1xuXHRcdH1cblx0fSk7XG5cblx0JHNlY3Rpb25zLmVhY2goZnVuY3Rpb24gKGluZGV4LCBzZWN0aW9uKSB7XG5cdFx0JChzZWN0aW9uKS5maW5kKCc6aW5wdXQnKS5hdHRyKCdkYXRhLXBhcnNsZXktZ3JvdXAnLCAnYmxvY2stJyArIGluZGV4KTtcblx0fSk7XG5cblx0bmF2aWdhdGVUbygwKTtcblxuXHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCkgJiYgISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXG5cdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvam9iL2VkaXQtam9iJywge1xuXHRcdFx0XHRkYXRhOiAkZm9ybS5zZXJpYWxpemVGb3JtKCksXG5cdFx0XHRcdGpvYjogam9iSWRcblx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKGUubWVzc2FnZSwgZS50eXBlKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKHhoci5yZXNwb25zZVRleHQsICdkYW5nZXInKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLy8gRWRpdCBBY2NvdW50XG5pZiAoJCgnI2NvbXBhbnlFZGl0QWNjb3VudEZvcm0nKVswXSkge1xuXHQkZm9ybSA9ICQoJyNjb21wYW55RWRpdEFjY291bnRGb3JtJyk7XG5cblx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoKSAmJiAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUodHJ1ZSk7XG5cblx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9jb21wYW55L3VwZGF0ZS1hY2NvdW50Jywge1xuXHRcdFx0XHRkYXRhOiAkZm9ybS5zZXJpYWxpemVGb3JtKClcblx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoZS5tZXNzYWdlLCBlLnR5cGUpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCwgJ2RhbmdlcicpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLy8gVGltZXNoZWV0XG5pZiAoJCgnI3RpbWVzaGVldExpc3QnKVswXSkge1xuXHR2YXIgJGxpc3QgPSAkKCcjdGltZXNoZWV0TGlzdCcpO1xuXG5cdCRsaXN0LmZpbmQoJy5idG4tZ2l2ZS1qb2InKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgJGJ0biA9ICQodGhpcyk7XG5cblx0XHRpZiAoY29uZmlybSgnR2l2ZSB0aGUgam9iIHRvIHRoaXMgY29udHJhY3Rvcj8nKSAmJiAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0JGxpc3QuZmluZCgnLmJ0bi1naXZlLWpvYicpLmRpc2FibGUodHJ1ZSk7XG5cblx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9qb2IvZ2l2ZS1qb2InLCB7XG5cdFx0XHRcdGpvYjogJGJ0bi5kYXRhKCdqb2InKSxcblx0XHRcdFx0Y29udHJhY3RvcjogJGJ0bi5kYXRhKCd2YWx1ZScpXG5cdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHQkbGlzdC5maW5kKCcuYnRuLWdpdmUtam9iJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdFx0XHRcdGlmIChjb25maXJtKGUubWVzc2FnZSkpIGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgYWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0JGxpc3QuZmluZCgnLmJ0bi1naXZlLWpvYicpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn1cblxuaWYgKCQoJyNqb2JDb250cmFjdG9yTGlzdCcpWzBdKSB7XG5cdCQoJy5idG4tcmVtb3ZlLWNvbnRyYWN0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dmFyICRidXR0b24gPSAkKHRoaXMpO1xuXHRcdHZhciAkam9iID0gJCgnI2pvYkNvbnRyYWN0b3JMaXN0JykuZGF0YSgnam9iJyk7XG5cdFx0dmFyICRjb250cmFjdG9yID0gJGJ1dHRvbi5kYXRhKCd2YWx1ZScpO1xuXG5cdFx0aWYgKGNvbmZpcm0oJ1JlbW92ZSB0aGlzIGNvbnRyYWN0b3IgZnJvbSB0aGlzIGpvYj8nKSkge1xuXHRcdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCQoJy5idG4tcmVtb3ZlLWNvbnRyYWN0JykuZGlzYWJsZSh0cnVlKTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXG5cdFx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9qb2IvY2FuY2VsLWNvbnRyYWN0b3InLCB7XG5cdFx0XHRcdFx0am9iOiAkam9iLFxuXHRcdFx0XHRcdGNvbnRyYWN0b3I6ICRjb250cmFjdG9yXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIHtcblx0XHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHQkYnV0dG9uLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5idG4tcmVtb3ZlLWNvbnRyYWN0JykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcuYnRuLXJlbW92ZS1jb250cmFjdCcpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0YWxlcnQoJ0Fub3RoZXIgcHJvY2VzcyBpcyBydW5uaW5nLCBwbGVhc2Ugd2FpdC4nKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuXG5pZiAoJCgnI2pvYlN0YXR1c0NoYW5nZXInKVswXSkge1xuXHR2YXIgJHNlbGVjdCA9ICQoJyNqb2JTdGF0dXNDaGFuZ2VyJyk7XG5cdHZhciAkam9iID0gJHNlbGVjdC5kYXRhKCdqb2InKTtcblxuXHQkc2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0JHNlbGVjdC5kaXNhYmxlKHRydWUpO1xuXHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXG5cdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvam9iL3N0YXR1cy1jaGFuZ2UnLCB7XG5cdFx0XHRcdGpvYjogJGpvYixcblx0XHRcdFx0dmFsdWU6ICRzZWxlY3QudmFsKClcblx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG5cdFx0XHRcdFx0aWYgKCRzZWxlY3QudmFsKCkgPT09ICdvcGVuJykge1xuXHRcdFx0XHRcdFx0JHNlbGVjdC5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygncGFuZWwtZGFuZ2VyJykuYWRkQ2xhc3MoJ3BhbmVsLXN1Y2Nlc3MnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHQkc2VsZWN0LnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdwYW5lbC1zdWNjZXNzJykuYWRkQ2xhc3MoJ3BhbmVsLWRhbmdlcicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGFsZXJ0KGUubWVzc2FnZSk7XG5cblx0XHRcdFx0JHNlbGVjdC5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkc2VsZWN0LmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRhbGVydChcIkFub3RoZXIgcHJvY2VzcyBpcyBydW5uaW5nLCBwbGVhc2Ugd2FpdFwiKTtcblx0XHR9XG5cdH0pO1xufVxuXG5pZiAoJCgnI3JlbW92ZUpvYkJ0bicpWzBdKSB7XG5cdCQoJyNyZW1vdmVKb2JCdG4nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciAkYnV0dG9uID0gJCgnI3JlbW92ZUpvYkJ0bicpO1xuXHRcdGlmIChjb25maXJtKCdSZW1vdmUgdGhpcyBqb2I/IENBTk5PVCBCRSBVTkRPLicpKSB7XG5cdFx0XHR2YXIgJGpvYiA9ICRidXR0b24uZGF0YSgnam9iJyk7XG5cblx0XHRcdGlmICggISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHQkYnV0dG9uLmRpc2FibGUodHJ1ZSk7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblxuXHRcdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvam9iL3JlbW92ZS1qb2InLCB7XG5cdFx0XHRcdFx0am9iOiAkam9iXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIHtcblx0XHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRsb2NhdGlvbi5yZXBsYWNlKGUucmVkaXJlY3QpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCRidXR0b24uZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkYnV0dG9uLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0YWxlcnQoJ0Fub3RoZXIgcHJvY2VzcyBpcyBydW5uaW5nLCBwbGVhc2Ugd2FpdC4nKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuXG5pZiAoJCgnI2FnZW5jeUFmZmlsaWF0ZUxpc3QnKVswXSkge1xuXHR2YXIgJGxpc3QgPSAkKCcjYWdlbmN5QWZmaWxpYXRlTGlzdCcpO1xuXG5cdCRsaXN0Lm9uKCdjbGljaycsICcuYnRuLXN1Y2Nlc3MnLCBmdW5jdGlvbiAoZSkge1xuXHRcdHZhciAkYnV0dG9uID0gJCh0aGlzKTtcblx0XHRpZiAoY29uZmlybSgnQWNjZXB0IHRoaXMgYWdlbmN5IGFzIHlvdXIgYWZmaWxpYXRlPycpKSB7XG5cdFx0XHRpZiAoICEgcHJvY2Vzc2luZykge1xuXHRcdFx0XHR2YXIgaWQgPSAkYnV0dG9uLmRhdGEoJ2lkJyk7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHQkbGlzdC5maW5kKCcuYnRuJykuZGlzYWJsZSh0cnVlKTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvY29tcGFueS9hZGQtYWZmaWxpYXRlJywge2lkOiBpZH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JGxpc3QuZmluZCgnLmJ0bicpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkbGlzdC5maW5kKCcuYnRuJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdCRsaXN0Lm9uKCdjbGljaycsICcuYnRuLWRhbmdlcicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0dmFyICRidXR0b24gPSAkKHRoaXMpO1xuXHRcdGlmIChjb25maXJtKCdSZW1vdmUgdGhpcyBhZ2VuY3kgZnJvbSB5b3VyIGFmZmlsaWF0ZSBsaXN0PycpKSB7XG5cdFx0XHRpZiAoICEgcHJvY2Vzc2luZykge1xuXHRcdFx0XHR2YXIgaWQgPSAkYnV0dG9uLmRhdGEoJ2lkJyk7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHQkbGlzdC5maW5kKCcuYnRuJykuZGlzYWJsZSh0cnVlKTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvY29tcGFueS9yZW1vdmUtYWZmaWxpYXRlJywge2lkOiBpZH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JGxpc3QuZmluZCgnLmJ0bicpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdFx0XHRcdFx0JGxpc3QuZmluZCgnbGlbZGF0YS1pZD1cIiAnICsgaWQgKyAnXCJdJykucmVtb3ZlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkbGlzdC5maW5kKCcuYnRuJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuXG5pZiAoJCgnI3JlbW92ZVZpcEJ0bicpWzBdKSB7XG5cdCQoJyNyZW1vdmVWaXBCdG4nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRpZiAoY29uZmlybSgnUmVhbGx5IFJlbW92ZSBWSVA/JykpIHtcblx0XHRcdGlmICggISBwcm9jZXNzaW5nICkge1xuXHRcdFx0XHQkKCcjcmVtb3ZlVmlwQnRuJykuZGlzYWJsZSh0cnVlKTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblxuXHRcdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvY29tcGFueS9yZW1vdmUtdmlwJykuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0JCgnI3JlbW92ZVZpcEJ0bicpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSBsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0XHQkKCcjcmVtb3ZlVmlwQnRuJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuLy8gTm90aWZpY2F0aW9uc1xuaWYgKCQoJyNsaXN0Tm90aWYnKVswXSkge1xuXHR2YXIgJGxpc3QgPSAkKCcjbGlzdE5vdGlmJyk7XG5cdCRsaXN0LmZpbmQoJy5idG4tbWFyay1ub3RpZicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdHZhciAkbm90aWZCdG4gPSAkKHRoaXMpO1xuXHRcdFx0dmFyIGlkID0gJG5vdGlmQnRuLmRhdGEoJ2lkJyk7XG5cdFx0XHQkbGlzdC5maW5kKCcuYnRuLW1hcmstbm90aWYnKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cblx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9jb21wYW55L3VwZGF0ZS1ub3RpZicsIHtcblx0XHRcdFx0aWQ6IGlkLFxuXHRcdFx0XHRyZWFkOiB0cnVlXG5cdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdCRsaXN0LmZpbmQoJy5idG4tbWFyay1ub3RpZicpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdFx0XHRcdCRsaXN0LmZpbmQoJ2xpW2RhdGEtaWQ9JyArIGlkICsgJ10nKS5yZW1vdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0JGxpc3QuZmluZCgnLmJ0bi1tYXJrLW5vdGlmJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG5cblx0JCgnI3JlbW92ZVJlYWROb3RpZkJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKCAhIHByb2Nlc3NpbmcgKSB7XG5cdFx0XHQkKCcjcmVtb3ZlUmVhZE5vdGlmQnRuJykuZGlzYWJsZSh0cnVlKTtcblx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXG5cdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvY29tcGFueS9yZW1vdmUtbm90aWYnKS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdCQoJyNyZW1vdmVSZWFkTm90aWZCdG4nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0JCgnI3JlbW92ZVJlYWROb3RpZkJ0bicpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufVxuXG5pZiAoJCgnLmJ0bi1hY2NlcHQtdHMnKVswXSkge1xuXHQkKCcuYnRuLWFjY2VwdC10cycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdGlmIChjb25maXJtKCdBY2NlcHQgdGhpcyB0aW1lc2hlZXQ/JykpIHtcblx0XHRcdFx0dmFyICRidXR0b24gPSAkKHRoaXMpO1xuXHRcdFx0XHR2YXIgaWQgPSAkYnV0dG9uLmRhdGEoJ2lkJyk7XG5cblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCQoJy5idG4tYWNjZXB0LXRzJykuZGlzYWJsZSh0cnVlKTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXG5cdFx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9jb21wYW55L2FjY2VwdC10aW1lc2hlZXQnLCB7XG5cdFx0XHRcdFx0aWQ6IGlkXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykgbG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5idG4tYWNjZXB0LXRzJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcuYnRuLWFjY2VwdC10cycpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0fSk7IFxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG5cbmlmICgkKCcuYnRuLXJlbW92ZS10cycpWzBdKSB7XG5cdCQoJy5idG4tcmVtb3ZlLXRzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAoICEgcHJvY2Vzc2luZykge1xuXHRcdFx0aWYgKGNvbmZpcm0oJ1JlbW92ZSBhY2NlcHRpb24gdGhpcyB0aW1lc2hlZXQ/JykpIHtcblx0XHRcdFx0dmFyICRidXR0b24gPSAkKHRoaXMpO1xuXHRcdFx0XHR2YXIgaWQgPSAkYnV0dG9uLmRhdGEoJ2lkJyk7XG5cblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCQoJy5idG4tcmVtb3ZlLXRzJykuZGlzYWJsZSh0cnVlKTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXG5cdFx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9jb21wYW55L3JlbW92ZS10aW1lc2hlZXQnLCB7XG5cdFx0XHRcdFx0aWQ6IGlkXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykgbG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5idG4tcmVtb3ZlLXRzJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcuYnRuLXJlbW92ZS10cycpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0fSk7IFxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG5cbmlmICgkKCcuYnRuLWFjY2VwdC1leCcpWzBdKSB7XG5cdCQoJy5idG4tYWNjZXB0LWV4Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAoICEgcHJvY2Vzc2luZykge1xuXHRcdFx0aWYgKGNvbmZpcm0oJ0FjY2VwdCB0aGlzIGV4cGVuc2U/JykpIHtcblx0XHRcdFx0dmFyICRidXR0b24gPSAkKHRoaXMpO1xuXHRcdFx0XHR2YXIgaWQgPSAkYnV0dG9uLmRhdGEoJ2lkJyk7XG5cblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCQoJy5idG4tYWNjZXB0LWV4JykuZGlzYWJsZSh0cnVlKTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXG5cdFx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9jb21wYW55L2FjY2VwdC1leHBlbnNlJywge1xuXHRcdFx0XHRcdGlkOiBpZFxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0YWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcuYnRuLWFjY2VwdC1leCcpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLmJ0bi1hY2NlcHQtZXgnKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdH0pOyBcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuXG5pZiAoJCgnLmJ0bi1yZW1vdmUtZXgnKVswXSkge1xuXHQkKCcuYnRuLXJlbW92ZS1leCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdGlmIChjb25maXJtKCdSZW1vdmUgYWNjZXB0aW9uIHRoaXMgZXhwZW5zZT8nKSkge1xuXHRcdFx0XHR2YXIgJGJ1dHRvbiA9ICQodGhpcyk7XG5cdFx0XHRcdHZhciBpZCA9ICRidXR0b24uZGF0YSgnaWQnKTtcblxuXHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0JCgnLmJ0bi1yZW1vdmUtZXgnKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cblx0XHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2NvbXBhbnkvcmVtb3ZlLWV4cGVuc2UnLCB7XG5cdFx0XHRcdFx0aWQ6IGlkXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykgbG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5idG4tcmVtb3ZlLWV4JykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcuYnRuLXJlbW92ZS1leCcpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0fSk7IFxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59IiwiZXhwb3J0IGNsYXNzIENvcmUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmRpc2FibGUoKTtcblx0XHR0aGlzLmZvcm1NZXNzYWdlKCk7XG5cdFx0dGhpcy5zZXJpYWxpemVGb3JtKCk7XG5cdFx0dGhpcy5zZXR1cEFqYXgoKTtcblxuXHRcdE51bWJlci5wcm90b3R5cGUuZm9ybWF0TW9uZXkgPSBmdW5jdGlvbihjLCBkLCB0KXtcblx0XHRcdHZhciBuID0gdGhpcywgXG5cdFx0XHRjID0gaXNOYU4oYyA9IE1hdGguYWJzKGMpKSA/IDIgOiBjLCBcblx0XHRcdGQgPSBkID09IHVuZGVmaW5lZCA/IFwiLlwiIDogZCwgXG5cdFx0XHR0ID0gdCA9PSB1bmRlZmluZWQgPyBcIixcIiA6IHQsIFxuXHRcdFx0cyA9IG4gPCAwID8gXCItXCIgOiBcIlwiLCBcblx0XHRcdGkgPSBwYXJzZUludChuID0gTWF0aC5hYnMoK24gfHwgMCkudG9GaXhlZChjKSkgKyBcIlwiLCBcblx0XHRcdGogPSAoaiA9IGkubGVuZ3RoKSA+IDMgPyBqICUgMyA6IDA7XG5cdFx0XHRyZXR1cm4gcyArIChqID8gaS5zdWJzdHIoMCwgaikgKyB0IDogXCJcIikgKyBpLnN1YnN0cihqKS5yZXBsYWNlKC8oXFxkezN9KSg/PVxcZCkvZywgXCIkMVwiICsgdCkgKyAoYyA/IGQgKyBNYXRoLmFicyhuIC0gaSkudG9GaXhlZChjKS5zbGljZSgyKSA6IFwiXCIpO1xuXHRcdH07XG5cdH1cblx0ZGlzYWJsZSgpIHtcblx0XHQkLmZuLmV4dGVuZCh7XG5cdFx0XHRkaXNhYmxlOiBmdW5jdGlvbihzdGF0ZSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmIChzdGF0ZSkge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5maW5kKCdzcGFuJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpLmZpbmQoJy5idG4tcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoJ3NwYW4nKS5zaG93KCk7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJykuZmluZCgnLmJ0bi1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRmb3JtTWVzc2FnZSgpIHtcblx0XHQkLmZuLnNob3dNZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSwgdHlwZSwgYWxlcnRDbGFzcykge1xuXHRcdFx0dmFyIGh0bWw7XG5cdFx0XHRodG1sID0gdm9pZCAwO1xuXHRcdFx0aWYgKGFsZXJ0Q2xhc3MgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRhbGVydENsYXNzID0gJyc7XG5cdFx0XHR9XG5cdFx0XHQkKCcuc3RhdHVzLW1lc3NhZ2UnKS5yZW1vdmUoKTtcblx0XHRcdGh0bWwgPSAnPGRpdiBjbGFzcz1cXCdzdGF0dXMtbWVzc2FnZSBlbGVtZW50LXRvcC0xMCAnICsgYWxlcnRDbGFzcyArICdcXCc+IDxkaXYgcm9sZT1cXCdhbGVydFxcJyBjbGFzcz1cXCdmYWRlLWluIGFsZXJ0IGFsZXJ0LWRpc21pc3NhYmxlIGFsZXJ0LScgKyB0eXBlICsgJ1xcJz4gPGJ1dHRvbiB0eXBlPVxcJ2J1dHRvblxcJyBjbGFzcz1cXCdjbG9zZVxcJyBkYXRhLWRpc21pc3M9XFwnYWxlcnRcXCc+IDxzcGFuIGFyaWEtaGlkZGVuPVxcJ3RydWVcXCc+PGkgY2xhc3M9XFwnZmEgZmEtdGltZXNcXCc+PC9pPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XFwnc3Itb25seVxcJz5DbG9zZTwvc3Bhbj4gPC9idXR0b24+JyArIG1lc3NhZ2UgKyAnPC9kaXY+PC9kaXY+Jztcblx0XHRcdHJldHVybiAkKGh0bWwpLmFwcGVuZFRvKHRoaXMpLmhpZGUoKS5mYWRlSW4oOTAwKTtcblx0XHR9O1xuXHR9XG5cdHNlcmlhbGl6ZUZvcm0oKSB7XG5cdFx0JC5mbi5zZXJpYWxpemVGb3JtID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZGF0YSwgbG9va3VwLCBwYXJzZSwgc2VsZWN0b3I7XG5cdFx0XHRkYXRhID0gdm9pZCAwO1xuXHRcdFx0bG9va3VwID0gdm9pZCAwO1xuXHRcdFx0cGFyc2UgPSB2b2lkIDA7XG5cdFx0XHRzZWxlY3RvciA9IHZvaWQgMDtcblx0XHRcdGlmICh0aGlzLmxlbmd0aCA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0ZGF0YSA9IHt9O1xuXHRcdFx0bG9va3VwID0gZGF0YTtcblx0XHRcdHNlbGVjdG9yID0gJzppbnB1dFt0eXBlIT1cImNoZWNrYm94XCJdW3R5cGUhPVwicmFkaW9cIl0sIGlucHV0OmNoZWNrZWQnO1xuXHRcdFx0cGFyc2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyICRlbCwgY2FwLCBpLCBuYW1lZDtcblx0XHRcdFx0JGVsID0gdm9pZCAwO1xuXHRcdFx0XHRjYXAgPSB2b2lkIDA7XG5cdFx0XHRcdGkgPSB2b2lkIDA7XG5cdFx0XHRcdG5hbWVkID0gdm9pZCAwO1xuXHRcdFx0XHRpZiAodGhpcy5kaXNhYmxlZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRuYW1lZCA9IHRoaXMubmFtZS5yZXBsYWNlKC9cXFsoW15cXF1dKyk/XFxdL2csICcsJDEnKS5zcGxpdCgnLCcpO1xuXHRcdFx0XHRjYXAgPSBuYW1lZC5sZW5ndGggLSAxO1xuXHRcdFx0XHQkZWwgPSAkKHRoaXMpO1xuXHRcdFx0XHRpZiAobmFtZWRbMF0pIHtcblx0XHRcdFx0XHRpID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoaSA8IGNhcCkge1xuXHRcdFx0XHRcdFx0bG9va3VwID0gbG9va3VwW25hbWVkW2ldXSA9IGxvb2t1cFtuYW1lZFtpXV0gfHwgKG5hbWVkW2kgKyAxXSA9PT0gJycgfHwgbmFtZWRbaSArIDFdID09PSAnMCcgPyBbXSA6IHt9KTtcblx0XHRcdFx0XHRcdGkrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGxvb2t1cC5sZW5ndGggIT09IHZvaWQgMCkge1xuXHRcdFx0XHRcdFx0bG9va3VwLnB1c2goJGVsLnZhbCgpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bG9va3VwW25hbWVkW2NhcF1dID0gJGVsLnZhbCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsb29rdXAgPSBkYXRhO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5maWx0ZXIoc2VsZWN0b3IpLmVhY2gocGFyc2UpO1xuXHRcdFx0dGhpcy5maW5kKHNlbGVjdG9yKS5lYWNoKHBhcnNlKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH07XG5cdH1cblx0c2V0dXBBamF4KCkge1xuXHRcdCQuYWpheFNldHVwKHtcblx0XHRcdHN0YXR1c0NvZGU6IHtcblx0XHRcdFx0NDAzOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdpbmRvdy5hbGVydCgnRm9yYmlkZGVuIGNvbnRlbnQhJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdDQwNDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJldHVybiB3aW5kb3cuYWxlcnQoJ1JlcXVlc3RlZCByb3V0ZSBub3QgZm91bmQhJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdDUwMDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJldHVybiB3aW5kb3cuYWxlcnQoJ0ludGVybmFsIHNlcnZlciBlcnJvciEnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNyb3NzRG9tYWluOiBmYWxzZSxcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRjYWNoZTogdHJ1ZSxcblx0XHRcdGFzeW5jOiBmYWxzZSxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J1gtQ1NSRi1Ub2tlbic6ICQoJ21ldGFbbmFtZT1cIl90XCJdJykuYXR0cignY29udGVudCcpXG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0iLCJleHBvcnQgY2xhc3MgUGx1Z2lucyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuaW5pdEJvb3RzdHJhcCgpO1xuXHRcdHZhciBzbGlkZXIgPSB7XCJpbml0XCI6XCIxXCIsXCJob21lX2luaXRcIjpcIjFcIn07XG5cblx0XHRpZiAoJCgnaW1nW2RhdGEtaW1hZ2UtcmVzaXplXScpWzBdKSB7XG5cdFx0XHQkLmVhY2goJCgnaW1nW2RhdGEtaW1hZ2UtcmVzaXplXScpLCBmdW5jdGlvbiAoaSwgZSkge1xuXHRcdFx0XHQkKGUpLnBhcmVudCgpLmltZ0xpcXVpZCh7XG5cdFx0XHRcdFx0ZmlsbDogdHJ1ZSxcblx0XHRcdFx0XHR2ZXJ0aWNhbEFsaWduOiAnY2VudGVyJyxcblx0XHRcdFx0XHRob3Jpem9udGFsQWxpZ246ICdjZW50ZXInXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gSm9iIHNlYXJjaDogQWR2YW5jZWQgU2VhcmNoIHRvZ2dsZVxuXHRcdGlmICggJCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbicpWzBdICkge1xuXHRcdFx0JCgnLmFkdmFuY2Utc2VhcmNoLXRvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGlmICgkKCcjYWR2YW5jZS1zZWFyY2gtb3B0aW9uOnZpc2libGUnKS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0JCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbicpLnNsaWRlVXAoKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0JCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbicpLnNsaWRlRG93bigpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHZhciBzY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXG5cdFx0aWYgKCBzY3JlZW5XaWR0aCA+IDc2NyApIHtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JCgnbGkubWVudS1pdGVtLWhhcy1jaGlsZHJlbiA+IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHQkKHRoaXMpLm5leHQoJy5zdWItbWVudScpLnNsaWRlVG9nZ2xlKCdmYXN0Jyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQkKCcjam9iLWNhdGVnb3J5LWRyb3Bkb3duJykubWluaW1hbGVjdCh7XG5cdFx0XHRwbGFjZWhvbGRlciA6ICdTZWxlY3QgSm9iIENhdGVnb3J5J1xuXHRcdH0pO1xuXG5cdFx0JCgnI2pvYi10eXBlLWRyb3Bkb3duJykubWluaW1hbGVjdCh7XG5cdFx0XHRwbGFjZWhvbGRlciA6ICdTZWxlY3QgSm9iIFR5cGUnXG5cdFx0fSk7XG5cdFx0XG5cdFx0aWYgKHNsaWRlci5pbml0KSB7XG5cdFx0XHRpZiAoJCgnc2VsZWN0I2V4cGVyaWVuY2VfbWluJylbMF0gJiYgJCgnc2VsZWN0I2V4cGVyaWVuY2VfbWF4JylbMF0pIHtcblx0XHRcdFx0JCgnc2VsZWN0I2V4cGVyaWVuY2VfbWluLCBzZWxlY3QjZXhwZXJpZW5jZV9tYXgnKS5zZWxlY3RUb1VJU2xpZGVyKHtcblx0XHRcdFx0XHRsYWJlbHM6IDEwLFxuXHRcdFx0XHRcdGxhYmVsU3JjOiAndGV4dCcsXG5cdFx0XHRcdFx0dG9vbHRpcDogdHJ1ZSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICgkKCdzZWxlY3Qjc2FsYXJ5X21pbicpWzBdICYmICQoJ3NlbGVjdCNzYWxhcnlfbWF4JylbMF0pIHtcblx0XHRcdFx0JCgnc2VsZWN0I3NhbGFyeV9taW4sIHNlbGVjdCNzYWxhcnlfbWF4Jykuc2VsZWN0VG9VSVNsaWRlcih7XG5cdFx0XHRcdFx0bGFiZWxzOjExLFxuXHRcdFx0XHRcdGxhYmVsU3JjOid0ZXh0Jyxcblx0XHRcdFx0XHR0b29sdGlwOnRydWUsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdCQoJyNqb2ItbGlzdGluZy10YWJzJykudGFicyh7IGhpZGU6IHsgZWZmZWN0OiBcImZhZGVcIiwgZHVyYXRpb246ICdmYXN0JyB9LCBzaG93OiB7IGVmZmVjdDogXCJmYWRlXCIsIGR1cmF0aW9uOiAnZmFzdCcgfSB9KTtcblxuXHRcdHZhciBzY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXG5cdFx0aWYgKCBzY3JlZW5XaWR0aCA8IDc2NyApIHtcblx0XHRcdCQoJ2xpLmhhcy1jaGlsZHJlbiA+IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSl7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0JCh0aGlzKS5uZXh0KCcuc3ViLW1lbnUnKS5zbGlkZVRvZ2dsZSgnZmFzdCcpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKCQoJyNjb3VudHJ5U2VsZWN0b3InKVswXSkge1xuXHRcdFx0dGhpcy5mb3JtQ291bnRyeVNlbGVjdG9ySW5pdCgpO1xuXHRcdH1cblxuXHRcdGlmICgkKCcuc3VtbWVybm90ZScpWzBdKSB7XG5cdFx0XHQkKCcuc3VtbWVybm90ZScpLnN1bW1lcm5vdGUoe2RpYWxvZ3NJbkJvZHk6IHRydWV9KTtcblx0XHR9XG5cblx0XHRpZiAoJCgnW2RhdGEtY2hlY2tvdXQtdHlwZV0nKVswXSkge1xuXHRcdFx0dmFyIHBheW1lbnRQcm9jZXNzaW5nID0gZmFsc2U7XG5cblx0XHRcdCQuZWFjaCgkKCdbZGF0YS1jaGVja291dC10eXBlXScpLCBmdW5jdGlvbiAoZSwgaSkge1xuXHRcdFx0XHQkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0aWYgKCAhIHBheW1lbnRQcm9jZXNzaW5nKSB7XG5cdFx0XHRcdFx0XHR2YXIgJGJ1dHRvbiA9ICQodGhpcyk7XG5cdFx0XHRcdFx0XHR2YXIgdXNlciA9ICRidXR0b24uZGF0YSgndXNlcicpO1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0cGF5bWVudFByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHRcdFx0JGJ1dHRvbi5kaXNhYmxlKHRydWUpO1xuXHRcdFx0XHRcdFx0dmFyIGNoZWNrb3V0X3R5cGUgPSAkYnV0dG9uLmRhdGEoJ2NoZWNrb3V0LXR5cGUnKTtcblx0XHRcdFx0XHRcdHZhciBwb3N0RGF0YSA9IHt9O1xuXG5cdFx0XHRcdFx0XHRpZiAoY2hlY2tvdXRfdHlwZSA9PSAxKSB7XG5cdFx0XHRcdFx0XHRcdHBvc3REYXRhID0ge1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6ICdwYXlwYWwnLFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBjaGVja291dF90eXBlLFxuXHRcdFx0XHRcdFx0XHRcdHVzZXI6IHVzZXJcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKGNoZWNrb3V0X3R5cGUgPT0gMikge1xuXHRcdFx0XHRcdFx0XHRwb3N0RGF0YSA9IHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiAncGF5cGFsJyxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogY2hlY2tvdXRfdHlwZSxcblx0XHRcdFx0XHRcdFx0XHRhbW91bnQ6ICRidXR0b24ucGFyZW50KCkuZmluZCgnaW5wdXRbbmFtZT1fY3JlZF9hbXRdJykudmFsKCksXG5cdFx0XHRcdFx0XHRcdFx0dXNlcjogdXNlclxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvYXBpL3BheW1lbnQvcHJvY2Vzcy1wYXltZW50JywgcG9zdERhdGEpLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSB3aW5kb3cub3BlbihlLnJlZGlyZWN0KTtcblx0XHRcdFx0XHRcdFx0ZWxzZSBhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHQkYnV0dG9uLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHRwYXltZW50UHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0XHRwYXltZW50UHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRcdCRidXR0b24uZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRhbGVydCgnQW5vdGhlciBwYXltZW50IGlzIHByb2Nlc3NpbmcsIHBsZWFzZSB3YWl0LicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblx0aW5pdEJvb3RzdHJhcCgpIHtcblx0XHQkKCcucGFuZWwtdG9vbHRpcCwgW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcblx0XHQkKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJykucG9wb3ZlcigpO1xuXG5cdFx0JCgnLmlucHV0LWRhdGVyYW5nZSBpbnB1dCcpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0JCh0aGlzKS5kYXRlcGlja2VyKHtcblx0XHRcdFx0Zm9ybWF0OiBcInl5eXktbW0tZGRcIixcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cdGZvcm1Db3VudHJ5U2VsZWN0b3JJbml0KCkge1xuXHRcdCQuYWpheCh7XG5cdFx0XHR0eXBlOiAnZ2V0Jyxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0dHlwZTogXCJhbGxcIlxuXHRcdFx0fSxcblx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdHVybDogd2luZG93Lm9yaWdpbiArICcvYXBpL2NvdW50cnknLFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGRhdGEpIHtcblx0XHRcdFx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHR2YXIgc2VsZWN0ZWQgPSAnJztcblx0XHRcdFx0XHRcdGlmICgkKCcjY291bnRyeVNlbGVjdG9yJykuZGF0YSgndmFsdWUnKSAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0dmFyIGNvdW50cnlWYWx1ZSA9ICQoJyNjb3VudHJ5U2VsZWN0b3InKS5kYXRhKCd2YWx1ZScpO1xuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZCA9IChkYXRhW2tleV0uTmFtZSA9PT0gY291bnRyeVZhbHVlKSA/ICdzZWxlY3RlZD1cInNlbGVjdGVkXCInIDogJyc7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQgPSAoZGF0YVtrZXldLkNvZGUgPT09ICdHQlInKSA/ICdzZWxlY3RlZD1cInNlbGVjdGVkXCInIDogJyc7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQkKCcjY291bnRyeVNlbGVjdG9yJykuYXBwZW5kKCc8b3B0aW9uIHZhbHVlPVwiJyArIGRhdGFba2V5XS5OYW1lICsgJ1wiIGRhdGEtY29kZT1cIicgKyBkYXRhW2tleV0uQ29kZSArICdcIiAnICsgc2VsZWN0ZWQgKyAnPicgKyBkYXRhW2tleV0uTmFtZSArJzwvb3B0aW9uPicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICgkKCcjY2l0eVNlbGVjdG9yJylbMF0pIHtcblx0XHRcdFx0XHR2YXIgcHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJyNjaXR5U2VsZWN0b3InKS5lbXB0eSgpO1xuXG5cdFx0XHRcdFx0dmFyIGNpdHlSZWxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRcdFx0dHlwZTogJ2dldCcsXG5cdFx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogJCgnI2NvdW50cnlTZWxlY3RvciA6c2VsZWN0ZWQnKS5kYXRhKCdjb2RlJylcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0XHRcdFx0XHR1cmw6IHdpbmRvdy5vcmlnaW4gKyAnL2FwaS9jaXR5Jyxcblx0XHRcdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGNpdHlEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdCQoJyNjaXR5U2VsZWN0b3InKS5lbXB0eSgpO1xuXHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBjaXR5RGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGNpdHlEYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIHNlbGVjdGVkID0gJyc7XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCQoJyNjaXR5U2VsZWN0b3InKS5kYXRhKCd2YWx1ZScpICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBjaXR5VmFsdWUgPSAkKCcjY2l0eVNlbGVjdG9yJykuZGF0YSgndmFsdWUnKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZCA9IChjaXR5RGF0YVtrZXldLk5hbWUgPT09IGNpdHlWYWx1ZSkgPyAnc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJyA6ICcnO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdFx0JCgnI2NpdHlTZWxlY3RvcicpLmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBjaXR5RGF0YVtrZXldLk5hbWUgKyAnXCIgJyArIHNlbGVjdGVkICsgJz4nICsgY2l0eURhdGFba2V5XS5OYW1lICsnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjb25maXJtKFwiQ2Fubm90IGxvYWQgXCIgKyBjb3VudHJ5ICsgXCIncyBjaXR5IGxpc3QsIHJlbG9hZD9cIikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGNpdHlSZWxvYWQoKTtcblxuXHRcdFx0XHRcdCQoJyNjb3VudHJ5U2VsZWN0b3InKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpZiAoICEgcHJvY2Vzc2luZykgY2l0eVJlbG9hZCgpO1xuXHRcdFx0XHRcdFx0ZWxzZSBhbGVydCgnUGxlYXNlIHdhaXQgd2hpbGUgcHJldmlvdXMgbGlzdCB3YXMgbG9hZGVkLicpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRpZiAoY29uZmlybSgnQ2Fubm90IGxvYWQgY291bnRyeSBsaXN0LCByZWxvYWQ/JykpIHtcblx0XHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59Il19
