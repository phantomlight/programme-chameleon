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
						e.preventDefault();
						paymentProcessing = true;
						$('.page-preloader').show();
						$button.disable(true);
						var checkout_type = $button.data('checkout-type');
						var postData = {};

						if (checkout_type == 1) {
							postData = {
								type: 'paypal',
								value: checkout_type
							};
						} else if (checkout_type == 2) {
							postData = {
								type: 'paypal',
								value: checkout_type,
								amount: $button.parent().find('input[name=_cred_amt]').val()
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
			$('.panel-tooltip').tooltip();
			$('[data-toggle="popover"]').popover();

			$('.input-daterange input').each(function () {
				$(this).datepicker({
					format: "yyyy-mm-dd",
					startDate: "+1d"
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

},{}]},{},["/home/ford/web/www-job/resources/assets/js/front/company.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9mb3JkL3dlYi93d3ctam9iL3Jlc291cmNlcy9hc3NldHMvanMvZnJvbnQvY29tcGFueS5qcyIsIi9ob21lL2ZvcmQvd2ViL3d3dy1qb2IvcmVzb3VyY2VzL2Fzc2V0cy9qcy9mcm9udC9jb3JlLmpzIiwiL2hvbWUvZm9yZC93ZWIvd3d3LWpvYi9yZXNvdXJjZXMvYXNzZXRzL2pzL2Zyb250L3BsdWdpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztvQkNBcUIsUUFBUTs7dUJBQ0wsV0FBVzs7QUFFbkMsSUFBSSxLQUFLLENBQUM7QUFDVixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7OztBQUd2QixJQUFJLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0tBQzVCLFNBQVM7S0FDVCxLQUFLOzs7TUFFQSxRQUFRLEdBQWpCLFNBQVMsUUFBUSxHQUFHO0FBQ25CLFVBQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7R0FDckQ7O01BRVEsVUFBVSxHQUFuQixTQUFTLFVBQVUsQ0FBQyxLQUFLLEVBQUU7QUFDMUIsWUFBUyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9ELElBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbEQsT0FBSSxRQUFRLEdBQUcsS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQzdDLElBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLElBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFckQsSUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN2QixhQUFTLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHO0lBQ25DLEVBQUUsR0FBRyxDQUFDLENBQUM7R0FDUjs7QUFqQkcsV0FBUyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUM7QUFDOUIsT0FBSyxHQUFHLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQzs7QUFrQnBDLEdBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFXO0FBQ2hELGFBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztHQUMzQixDQUFDLENBQUM7O0FBRUgsR0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVc7QUFDNUMsT0FBSSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFO0FBQ3BELGNBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzQjtHQUNELENBQUMsQ0FBQzs7QUFFSCxXQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFLE9BQU8sRUFBRTtBQUN4QyxJQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUM7R0FDdkUsQ0FBQyxDQUFDOztBQUVILFlBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFZCxPQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDcEQsSUFBQyxDQUFDLGNBQWMsRUFBRSxDQUFDOztBQUVuQixPQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFFLFVBQVUsRUFBRTtBQUMvQyxjQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLEtBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFNBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUUxQyxLQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLEVBQUU7QUFDekMsU0FBSSxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUU7S0FDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNwQixlQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLE1BQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFVBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckMsVUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0FBQ2pDLGVBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsTUFBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsVUFBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLFVBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzNDLENBQUMsQ0FBQztJQUNIO0dBQ0QsQ0FBQyxDQUFDOztDQUNIOzs7QUFHRCxJQUFJLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0tBQzVCLFNBQVM7S0FDVCxLQUFLO0tBQ0wsS0FBSzs7O01BRUEsUUFBUSxHQUFqQixTQUFTLFFBQVEsR0FBRztBQUNuQixVQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0dBQ3JEOztNQUVRLFVBQVUsR0FBbkIsU0FBUyxVQUFVLENBQUMsS0FBSyxFQUFFO0FBQzFCLFlBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvRCxJQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2xELE9BQUksUUFBUSxHQUFHLEtBQUssSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUM3QyxJQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QyxJQUFDLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRXJELElBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDdkIsYUFBUyxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRztJQUNuQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0dBQ1I7O0FBbEJHLFdBQVMsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDO0FBQzlCLE9BQUssR0FBRyxDQUFDLENBQUMscUJBQXFCLENBQUM7QUFDaEMsT0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOztBQWtCN0IsR0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVc7QUFDaEQsYUFBVSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0dBQzNCLENBQUMsQ0FBQzs7QUFFSCxHQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBVztBQUM1QyxPQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsRUFBRSxDQUFDLEVBQUU7QUFDcEQsY0FBVSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNCO0dBQ0QsQ0FBQyxDQUFDOztBQUVILFdBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUUsT0FBTyxFQUFFO0FBQ3hDLElBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQztHQUN2RSxDQUFDLENBQUM7O0FBRUgsWUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVkLE9BQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBRTtBQUNwRCxJQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O0FBRW5CLE9BQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUUsVUFBVSxFQUFFO0FBQy9DLGNBQVUsR0FBRyxJQUFJLENBQUM7QUFDbEIsS0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsU0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTFDLEtBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxlQUFlLEVBQUU7QUFDdkMsU0FBSSxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUU7QUFDM0IsUUFBRyxFQUFFLEtBQUs7S0FDVixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3BCLGVBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsTUFBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsVUFBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxVQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMzQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDakMsZUFBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixNQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixVQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDOUMsVUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0MsQ0FBQyxDQUFDO0lBQ0g7R0FDRCxDQUFDLENBQUM7O0NBQ0g7OztBQUdELElBQUksQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDcEMsTUFBSyxHQUFHLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOztBQUVyQyxNQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDcEQsR0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLE1BQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUUsVUFBVSxFQUFFO0FBQy9DLGFBQVUsR0FBRyxJQUFJLENBQUM7QUFDbEIsSUFBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsUUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTFDLElBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyx5QkFBeUIsRUFBRTtBQUNqRCxRQUFJLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRTtJQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3BCLFNBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckMsU0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0MsY0FBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixLQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDakMsU0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLFNBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNDLGNBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsS0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUIsQ0FBQyxDQUFDO0dBQ0g7RUFDRCxDQUFDLENBQUM7Q0FDSDs7O0FBR0QsSUFBSSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUMzQixLQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7QUFFaEMsTUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQ3BELEdBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixNQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRW5CLE1BQUksT0FBTyxDQUFDLGtDQUFrQyxDQUFDLElBQUksQ0FBRSxVQUFVLEVBQUU7QUFDaEUsYUFBVSxHQUFHLElBQUksQ0FBQztBQUNsQixJQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixRQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFMUMsSUFBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLGVBQWUsRUFBRTtBQUN2QyxPQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDckIsY0FBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDcEIsY0FBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixLQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixTQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQyxRQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQ3pCLFNBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDMUMsTUFDSSxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUNqQyxTQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3hCLGNBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsS0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsU0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFDO0dBQ0g7RUFDRCxDQUFDLENBQUM7Q0FDSDs7QUFFRCxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQy9CLEVBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDbEQsR0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLE1BQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixNQUFJLElBQUksR0FBRyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0MsTUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFeEMsTUFBSSxPQUFPLENBQUMsdUNBQXVDLENBQUMsRUFBRTtBQUNyRCxPQUFLLENBQUUsVUFBVSxFQUFFO0FBQ2xCLGNBQVUsR0FBRyxJQUFJLENBQUM7QUFDbEIsS0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hDLEtBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUU1QixLQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsd0JBQXdCLEVBQUU7QUFDaEQsUUFBRyxFQUFFLElBQUk7QUFDVCxlQUFVLEVBQUUsV0FBVztLQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3BCLFNBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7QUFDekIsV0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqQixhQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7TUFDckQsTUFDSSxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RCLGVBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsTUFBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pDLE1BQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUNqQyxVQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3hCLGVBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsTUFBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pDLE1BQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQzVCLENBQUMsQ0FBQztJQUNILE1BQ0k7QUFDSixTQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztJQUNsRDtHQUNEO0VBQ0QsQ0FBQyxDQUFDO0NBQ0g7O0FBRUQsSUFBSSxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUM5QixLQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNyQyxLQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUUvQixRQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZO0FBQ2hDLE1BQUssQ0FBRSxVQUFVLEVBQUU7QUFDbEIsYUFBVSxHQUFHLElBQUksQ0FBQztBQUNsQixVQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLElBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUU1QixJQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLEVBQUU7QUFDNUMsT0FBRyxFQUFFLElBQUk7QUFDVCxTQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtJQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3BCLFFBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7QUFDekIsU0FBSSxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssTUFBTSxFQUFFO0FBQzdCLGFBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO01BQ3pGLE1BQ0k7QUFDSixhQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztNQUN6RjtLQUNELE1BQ0ksS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFdEIsV0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QixjQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLEtBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUNqQyxTQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3hCLGNBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsV0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QixLQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QixDQUFDLENBQUM7R0FDSCxNQUNJO0FBQ0osUUFBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7R0FDakQ7RUFDRCxDQUFDLENBQUM7Q0FDSDs7QUFFRCxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUMxQixFQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBRTtBQUMzQyxNQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDakMsTUFBSSxPQUFPLENBQUMsa0NBQWtDLENBQUMsRUFBRTtBQUNoRCxPQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUUvQixPQUFLLENBQUUsVUFBVSxFQUFFO0FBQ2xCLGNBQVUsR0FBRyxJQUFJLENBQUM7QUFDbEIsV0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixLQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFNUIsS0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLGlCQUFpQixFQUFFO0FBQ3pDLFFBQUcsRUFBRSxJQUFJO0tBQ1QsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNwQixTQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQ3pCLFdBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakIsY0FBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7TUFDN0IsTUFDSSxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RCLGVBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsWUFBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QixNQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDakMsVUFBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN4QixlQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFlBQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkIsTUFBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDNUIsQ0FBQyxDQUFDO0lBQ0gsTUFDSTtBQUNKLFNBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0lBQ2xEO0dBQ0Q7RUFDRCxDQUFDLENBQUM7Q0FDSDs7QUFFRCxJQUFJLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2pDLEtBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDOztBQUV0QyxNQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDOUMsTUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLE1BQUksT0FBTyxDQUFDLHVDQUF1QyxDQUFDLEVBQUU7QUFDckQsT0FBSyxDQUFFLFVBQVUsRUFBRTtBQUNsQixRQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLGNBQVUsR0FBRyxJQUFJLENBQUM7QUFDbEIsU0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsS0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsS0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLHdCQUF3QixFQUFFLEVBQUMsRUFBRSxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQzVFLGVBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsVUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEMsTUFBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUIsVUFBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDakMsZUFBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixVQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsQyxNQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixVQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3hCLENBQUMsQ0FBQztJQUNIO0dBQ0Q7RUFDRCxDQUFDLENBQUM7O0FBRUgsTUFBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQzdDLE1BQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixNQUFJLE9BQU8sQ0FBQyw4Q0FBOEMsQ0FBQyxFQUFFO0FBQzVELE9BQUssQ0FBRSxVQUFVLEVBQUU7QUFDbEIsUUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1QixjQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFNBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLEtBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLEtBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRywyQkFBMkIsRUFBRSxFQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUMvRSxlQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFVBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xDLE1BQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFVBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakIsU0FBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUN6QixXQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7TUFDakQ7S0FDRCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDakMsZUFBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixVQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsQyxNQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixVQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3hCLENBQUMsQ0FBQztJQUNIO0dBQ0Q7RUFDRCxDQUFDLENBQUM7Q0FDSDs7Ozs7Ozs7Ozs7OztJQ3hXWSxJQUFJO0FBQ0wsVUFEQyxJQUFJLEdBQ0Y7d0JBREYsSUFBSTs7QUFFZixNQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDZixNQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkIsTUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ3JCLE1BQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7QUFFakIsUUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQztBQUMvQyxPQUFJLENBQUMsR0FBRyxJQUFJO09BQ1osQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO09BQ2xDLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDO09BQzVCLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDO09BQzVCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFO09BQ3BCLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtPQUNuRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQSxHQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuQyxVQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQSxBQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUEsQUFBQyxDQUFDO0dBQ2hKLENBQUM7RUFDRjs7Y0FqQlcsSUFBSTs7U0FrQlQsbUJBQUc7QUFDVCxJQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUNYLFdBQU8sRUFBRSxpQkFBUyxLQUFLLEVBQUU7QUFDeEIsWUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVc7QUFDM0IsVUFBSSxLQUFLLEVBQUU7QUFDVixRQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFFBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO09BQ25FLE1BQU07QUFDTixRQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFFBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7T0FDN0Q7TUFDRCxDQUFDLENBQUM7S0FDSDtJQUNELENBQUMsQ0FBQztHQUNIOzs7U0FDVSx1QkFBRztBQUNiLElBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxHQUFHLFVBQVMsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7QUFDdEQsUUFBSSxJQUFJLENBQUM7QUFDVCxRQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDZCxRQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7QUFDN0IsZUFBVSxHQUFHLEVBQUUsQ0FBQztLQUNoQjtBQUNELEtBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzlCLFFBQUksR0FBRyw2Q0FBNkMsR0FBRyxVQUFVLEdBQUcsd0VBQXdFLEdBQUcsSUFBSSxHQUFHLG9MQUFvTCxHQUFHLE9BQU8sR0FBRyxjQUFjLENBQUM7QUFDdFcsV0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDO0dBQ0Y7OztTQUNZLHlCQUFHO0FBQ2YsSUFBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEdBQUcsWUFBVztBQUMvQixRQUFJLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQztBQUNsQyxRQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDZCxVQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDaEIsU0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ2YsWUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ2xCLFFBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDcEIsWUFBTyxLQUFLLENBQUM7S0FDYjtBQUNELFFBQUksR0FBRyxFQUFFLENBQUM7QUFDVixVQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ2QsWUFBUSxHQUFHLHdEQUF3RCxDQUFDO0FBQ3BFLFNBQUssR0FBRyxZQUFXO0FBQ2xCLFNBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDO0FBQ3ZCLFFBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNiLFFBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNiLE1BQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNYLFVBQUssR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNmLFNBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNsQixhQUFPO01BQ1A7QUFDRCxVQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlELFFBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUN2QixRQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2QsU0FBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDYixPQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ04sYUFBTyxDQUFDLEdBQUcsR0FBRyxFQUFFO0FBQ2YsYUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQSxBQUFDLENBQUM7QUFDeEcsUUFBQyxFQUFFLENBQUM7T0FDSjtBQUNELFVBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsRUFBRTtBQUM3QixhQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO09BQ3ZCLE1BQU07QUFDTixhQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO09BQy9CO0FBQ0QsWUFBTSxHQUFHLElBQUksQ0FBQztNQUNkO0tBQ0QsQ0FBQztBQUNGLFFBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xDLFFBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hDLFdBQU8sSUFBSSxDQUFDO0lBQ1osQ0FBQztHQUNGOzs7U0FDUSxxQkFBRztBQUNYLElBQUMsQ0FBQyxTQUFTLENBQUM7QUFDWCxjQUFVLEVBQUU7QUFDWCxRQUFHLEVBQUUsV0FBUyxDQUFDLEVBQUU7QUFDaEIsYUFBTyxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7TUFDMUM7QUFDRCxRQUFHLEVBQUUsV0FBUyxDQUFDLEVBQUU7QUFDaEIsYUFBTyxNQUFNLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7TUFDbEQ7QUFDRCxRQUFHLEVBQUUsV0FBUyxDQUFDLEVBQUU7QUFDaEIsYUFBTyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7TUFDOUM7S0FDRDtBQUNELGVBQVcsRUFBRSxLQUFLO0FBQ2xCLFlBQVEsRUFBRSxNQUFNO0FBQ2hCLFNBQUssRUFBRSxJQUFJO0FBQ1gsU0FBSyxFQUFFLEtBQUs7QUFDWixXQUFPLEVBQUU7QUFDUixtQkFBYyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDcEQ7SUFDRCxDQUFDLENBQUM7R0FDSDs7O1FBOUdXLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7SUNBSixPQUFPO0FBQ1IsVUFEQyxPQUFPLEdBQ0w7d0JBREYsT0FBTzs7QUFFbEIsTUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ3JCLE1BQUksTUFBTSxHQUFHLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxXQUFXLEVBQUMsR0FBRyxFQUFDLENBQUM7O0FBRTFDLE1BQUksQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDbkMsSUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkQsS0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztBQUN2QixTQUFJLEVBQUUsSUFBSTtBQUNWLGtCQUFhLEVBQUUsUUFBUTtBQUN2QixvQkFBZSxFQUFFLFFBQVE7S0FDekIsQ0FBQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0dBQ0g7OztBQUdELE1BQUssQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUc7QUFDckMsSUFBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQzlDLFFBQUksQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsTUFBTSxFQUFHO0FBQ2hELE1BQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ3RDLE1BQUk7QUFDSixNQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUN4QztBQUNELFdBQU8sS0FBSyxDQUFDO0lBQ2IsQ0FBQyxDQUFDO0dBQ0g7O0FBRUQsTUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUVwQyxNQUFLLFdBQVcsR0FBRyxHQUFHLEVBQUcsRUFDeEIsTUFBTTtBQUNOLElBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBUyxDQUFDLEVBQUM7QUFDekQsS0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLEtBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlDLENBQUMsQ0FBQztHQUNIOztBQUVELEdBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUN0QyxjQUFXLEVBQUcscUJBQXFCO0dBQ25DLENBQUMsQ0FBQzs7QUFFSCxHQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxVQUFVLENBQUM7QUFDbEMsY0FBVyxFQUFHLGlCQUFpQjtHQUMvQixDQUFDLENBQUM7O0FBRUgsTUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO0FBQ2hCLE9BQUksQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDbkUsS0FBQyxDQUFDLDhDQUE4QyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7QUFDbEUsV0FBTSxFQUFFLEVBQUU7QUFDVixhQUFRLEVBQUUsTUFBTTtBQUNoQixZQUFPLEVBQUUsSUFBSTtLQUNiLENBQUMsQ0FBQztJQUNIOztBQUVELE9BQUksQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDM0QsS0FBQyxDQUFDLHNDQUFzQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7QUFDMUQsV0FBTSxFQUFDLEVBQUU7QUFDVCxhQUFRLEVBQUMsTUFBTTtBQUNmLFlBQU8sRUFBQyxJQUFJO0tBQ1osQ0FBQyxDQUFDO0lBQ0g7R0FDRDs7QUFFRCxHQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7O0FBRXhILE1BQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFFcEMsTUFBSyxXQUFXLEdBQUcsR0FBRyxFQUFHO0FBQ3hCLElBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUM7QUFDaEQsS0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLEtBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlDLENBQUMsQ0FBQztHQUNIOztBQUVELE1BQUksQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDN0IsT0FBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7R0FDL0I7O0FBRUQsTUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDeEIsSUFBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0dBQ25EOztBQUVELE1BQUksQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDakMsT0FBSSxpQkFBaUIsR0FBRyxLQUFLLENBQUM7O0FBRTlCLElBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2pELEtBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQ2hDLFNBQUssQ0FBRSxpQkFBaUIsRUFBRTtBQUN6QixVQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsT0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLHVCQUFpQixHQUFHLElBQUksQ0FBQztBQUN6QixPQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixhQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLFVBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDbEQsVUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDOztBQUVsQixVQUFJLGFBQWEsSUFBSSxDQUFDLEVBQUU7QUFDdkIsZUFBUSxHQUFHO0FBQ1YsWUFBSSxFQUFFLFFBQVE7QUFDZCxhQUFLLEVBQUUsYUFBYTtRQUNwQixDQUFDO09BQ0YsTUFDSSxJQUFJLGFBQWEsSUFBSSxDQUFDLEVBQUU7QUFDNUIsZUFBUSxHQUFHO0FBQ1YsWUFBSSxFQUFFLFFBQVE7QUFDZCxhQUFLLEVBQUUsYUFBYTtBQUNwQixjQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEdBQUcsRUFBRTtRQUM1RCxDQUFDO09BQ0Y7O0FBRUQsT0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLDhCQUE4QixFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNsRixXQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQzdDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEIsY0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2Qix3QkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDMUIsUUFBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7T0FDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0FBQ2pDLHdCQUFpQixHQUFHLEtBQUssQ0FBQztBQUMxQixRQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixZQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pCLGNBQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDdkIsQ0FBQyxDQUFDO01BQ0gsTUFDSTtBQUNKLFdBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO01BQ3JEO0tBQ0QsQ0FBQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0dBQ0g7RUFDRDs7Y0FqSVcsT0FBTzs7U0FrSU4seUJBQUc7QUFDZixJQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM5QixJQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFdkMsSUFBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVk7QUFDNUMsS0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUNsQixXQUFNLEVBQUUsWUFBWTtBQUNwQixjQUFTLEVBQUUsS0FBSztLQUNoQixDQUFDLENBQUM7SUFDSCxDQUFDLENBQUM7R0FDSDs7O1NBQ3NCLG1DQUFHO0FBQ3pCLElBQUMsQ0FBQyxJQUFJLENBQUM7QUFDTixRQUFJLEVBQUUsS0FBSztBQUNYLFFBQUksRUFBRTtBQUNMLFNBQUksRUFBRSxLQUFLO0tBQ1g7QUFDRCxZQUFRLEVBQUUsTUFBTTtBQUNoQixPQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxjQUFjO0FBQ25DLFdBQU8sRUFBRSxpQkFBVSxJQUFJLEVBQUU7QUFDeEIsVUFBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7QUFDckIsVUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzdCLFdBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixXQUFJLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUU7QUFDL0MsWUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZELGdCQUFRLEdBQUcsQUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLFlBQVksR0FBSSxxQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFDMUUsTUFDSTtBQUNKLGdCQUFRLEdBQUcsQUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssR0FBSSxxQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFDbkU7QUFDRCxRQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsUUFBUSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFFLFdBQVcsQ0FBQyxDQUFDO09BQzFKO01BQ0Q7O0FBRUQsU0FBSSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDMUIsVUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ3ZCLE9BQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFFM0IsVUFBSSxVQUFVLEdBQUcsU0FBYixVQUFVLEdBQWM7QUFDM0IsaUJBQVUsR0FBRyxJQUFJLENBQUM7QUFDbEIsUUFBQyxDQUFDLElBQUksQ0FBQztBQUNOLFlBQUksRUFBRSxLQUFLO0FBQ1gsWUFBSSxFQUFFO0FBQ0wsY0FBSyxFQUFFLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDbkQ7QUFDRCxnQkFBUSxFQUFFLE1BQU07QUFDaEIsV0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsV0FBVztBQUNoQyxlQUFPLEVBQUUsaUJBQVUsUUFBUSxFQUFFO0FBQzVCLG1CQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFVBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUMzQixjQUFLLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRTtBQUN6QixjQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDakMsZUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDOztBQUVsQixlQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFO0FBQzVDLGdCQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELG9CQUFRLEdBQUcsQUFBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsR0FBSSxxQkFBcUIsR0FBRyxFQUFFLENBQUM7WUFDM0U7O0FBRUQsWUFBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUUsV0FBVyxDQUFDLENBQUM7V0FDNUg7VUFDRDtTQUNEO0FBQ0QsYUFBSyxFQUFFLGVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDaEMsbUJBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsYUFBSSxPQUFPLENBQUMsY0FBYyxHQUFHLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQyxFQUFFO0FBQ2hFLGtCQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7VUFDbEI7U0FDRDtRQUNELENBQUMsQ0FBQztPQUNILENBQUM7O0FBRUYsZ0JBQVUsRUFBRSxDQUFDOztBQUViLE9BQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsWUFBVztBQUM3QyxXQUFLLENBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxDQUFDLEtBQzNCLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO09BQzFELENBQUMsQ0FBQztNQUNIO0tBQ0Q7QUFDRCxTQUFLLEVBQUUsZUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUNoQyxTQUFJLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxFQUFFO0FBQ2pELGNBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztNQUNsQjtLQUNEO0lBQ0QsQ0FBQyxDQUFDO0dBQ0g7OztRQXhOVyxPQUFPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IENvcmUgfSBmcm9tIFwiLi9jb3JlXCI7XG5pbXBvcnQgeyBQbHVnaW5zIH0gZnJvbSBcIi4vcGx1Z2luc1wiO1xuXG52YXIgJGZvcm07XG52YXIgcHJvY2Vzc2luZyA9IGZhbHNlO1xuXG4vLyBQb3N0IEpvYlxuaWYgKCQoJyNjb21wYW55UG9zdEpvYkZvcm0nKVswXSkge1xuXHR2YXIgJHNlY3Rpb25zID0gJCgnLmZvcm0tc2VjdGlvbicpO1xuXHR2YXIgJGZvcm0gPSAkKCcjY29tcGFueVBvc3RKb2JGb3JtJyk7XG5cblx0ZnVuY3Rpb24gY3VySW5kZXgoKSB7XG5cdFx0cmV0dXJuICRzZWN0aW9ucy5pbmRleCgkc2VjdGlvbnMuZmlsdGVyKCcuY3VycmVudCcpKTtcblx0fVxuXG5cdGZ1bmN0aW9uIG5hdmlnYXRlVG8oaW5kZXgpIHtcblx0XHQkc2VjdGlvbnMucmVtb3ZlQ2xhc3MoJ2N1cnJlbnQnKS5lcShpbmRleCkuYWRkQ2xhc3MoJ2N1cnJlbnQnKTtcblx0XHQkKCcuZm9ybS1uYXZpZ2F0aW9uIC5wcmV2aW91cycpLnRvZ2dsZShpbmRleCA+IDApO1xuXHRcdHZhciBhdFRoZUVuZCA9IGluZGV4ID49ICRzZWN0aW9ucy5sZW5ndGggLSAxO1xuXHRcdCQoJy5mb3JtLW5hdmlnYXRpb24gLm5leHQnKS50b2dnbGUoIWF0VGhlRW5kKTtcblx0XHQkKCcuZm9ybS1uYXZpZ2F0aW9uIFt0eXBlPXN1Ym1pdF0nKS50b2dnbGUoYXRUaGVFbmQpO1xuXG5cdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdFx0c2Nyb2xsVG9wOiAkZm9ybS5vZmZzZXQoKS50b3AgLSAxMDBcblx0XHR9LCAxMDApO1xuXHR9XG5cblx0JCgnLmZvcm0tbmF2aWdhdGlvbiAucHJldmlvdXMnKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHRuYXZpZ2F0ZVRvKGN1ckluZGV4KCkgLSAxKTtcblx0fSk7XG5cblx0JCgnLmZvcm0tbmF2aWdhdGlvbiAubmV4dCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoJ2Jsb2NrLScgKyBjdXJJbmRleCgpKSkge1xuXHRcdFx0bmF2aWdhdGVUbyhjdXJJbmRleCgpICsgMSk7XG5cdFx0fVxuXHR9KTtcblxuXHQkc2VjdGlvbnMuZWFjaChmdW5jdGlvbiAoaW5kZXgsIHNlY3Rpb24pIHtcblx0XHQkKHNlY3Rpb24pLmZpbmQoJzppbnB1dCcpLmF0dHIoJ2RhdGEtcGFyc2xleS1ncm91cCcsICdibG9jay0nICsgaW5kZXgpO1xuXHR9KTtcblxuXHRuYXZpZ2F0ZVRvKDApO1xuXG5cdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoKSAmJiAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUodHJ1ZSk7XG5cblx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9qb2Ivc3VibWl0LWpvYicsIHtcblx0XHRcdFx0ZGF0YTogJGZvcm0uc2VyaWFsaXplRm9ybSgpXG5cdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSh4aHIucmVzcG9uc2VUZXh0LCAnZGFuZ2VyJyk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG59XG5cbi8vIEVkaXQgSm9iXG5pZiAoJCgnI2NvbXBhbnlFZGl0Sm9iRm9ybScpWzBdKSB7XG5cdHZhciAkc2VjdGlvbnMgPSAkKCcuZm9ybS1zZWN0aW9uJyk7XG5cdHZhciAkZm9ybSA9ICQoJyNjb21wYW55RWRpdEpvYkZvcm0nKTtcblx0dmFyIGpvYklkID0gJGZvcm0uZGF0YSgnam9iJyk7XG5cblx0ZnVuY3Rpb24gY3VySW5kZXgoKSB7XG5cdFx0cmV0dXJuICRzZWN0aW9ucy5pbmRleCgkc2VjdGlvbnMuZmlsdGVyKCcuY3VycmVudCcpKTtcblx0fVxuXG5cdGZ1bmN0aW9uIG5hdmlnYXRlVG8oaW5kZXgpIHtcblx0XHQkc2VjdGlvbnMucmVtb3ZlQ2xhc3MoJ2N1cnJlbnQnKS5lcShpbmRleCkuYWRkQ2xhc3MoJ2N1cnJlbnQnKTtcblx0XHQkKCcuZm9ybS1uYXZpZ2F0aW9uIC5wcmV2aW91cycpLnRvZ2dsZShpbmRleCA+IDApO1xuXHRcdHZhciBhdFRoZUVuZCA9IGluZGV4ID49ICRzZWN0aW9ucy5sZW5ndGggLSAxO1xuXHRcdCQoJy5mb3JtLW5hdmlnYXRpb24gLm5leHQnKS50b2dnbGUoIWF0VGhlRW5kKTtcblx0XHQkKCcuZm9ybS1uYXZpZ2F0aW9uIFt0eXBlPXN1Ym1pdF0nKS50b2dnbGUoYXRUaGVFbmQpO1xuXG5cdFx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdFx0c2Nyb2xsVG9wOiAkZm9ybS5vZmZzZXQoKS50b3AgLSAxMDBcblx0XHR9LCAxMDApO1xuXHR9XG5cblx0JCgnLmZvcm0tbmF2aWdhdGlvbiAucHJldmlvdXMnKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHRuYXZpZ2F0ZVRvKGN1ckluZGV4KCkgLSAxKTtcblx0fSk7XG5cblx0JCgnLmZvcm0tbmF2aWdhdGlvbiAubmV4dCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoJ2Jsb2NrLScgKyBjdXJJbmRleCgpKSkge1xuXHRcdFx0bmF2aWdhdGVUbyhjdXJJbmRleCgpICsgMSk7XG5cdFx0fVxuXHR9KTtcblxuXHQkc2VjdGlvbnMuZWFjaChmdW5jdGlvbiAoaW5kZXgsIHNlY3Rpb24pIHtcblx0XHQkKHNlY3Rpb24pLmZpbmQoJzppbnB1dCcpLmF0dHIoJ2RhdGEtcGFyc2xleS1ncm91cCcsICdibG9jay0nICsgaW5kZXgpO1xuXHR9KTtcblxuXHRuYXZpZ2F0ZVRvKDApO1xuXG5cdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoKSAmJiAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUodHJ1ZSk7XG5cblx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9qb2IvZWRpdC1qb2InLCB7XG5cdFx0XHRcdGRhdGE6ICRmb3JtLnNlcmlhbGl6ZUZvcm0oKSxcblx0XHRcdFx0am9iOiBqb2JJZFxuXHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoZS5tZXNzYWdlLCBlLnR5cGUpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCwgJ2RhbmdlcicpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufVxuXG4vLyBFZGl0IEFjY291bnRcbmlmICgkKCcjY29tcGFueUVkaXRBY2NvdW50Rm9ybScpWzBdKSB7XG5cdCRmb3JtID0gJCgnI2NvbXBhbnlFZGl0QWNjb3VudEZvcm0nKTtcblxuXHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0aWYgKCRmb3JtLnBhcnNsZXkoKS52YWxpZGF0ZSgpICYmICEgcHJvY2Vzc2luZykge1xuXHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZSh0cnVlKTtcblxuXHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2NvbXBhbnkvdXBkYXRlLWFjY291bnQnLCB7XG5cdFx0XHRcdGRhdGE6ICRmb3JtLnNlcmlhbGl6ZUZvcm0oKVxuXHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSh4aHIucmVzcG9uc2VUZXh0LCAnZGFuZ2VyJyk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufVxuXG4vLyBUaW1lc2hlZXRcbmlmICgkKCcjdGltZXNoZWV0TGlzdCcpWzBdKSB7XG5cdHZhciAkbGlzdCA9ICQoJyN0aW1lc2hlZXRMaXN0Jyk7XG5cblx0JGxpc3QuZmluZCgnLmJ0bi1naXZlLWpvYicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHZhciAkYnRuID0gJCh0aGlzKTtcblxuXHRcdGlmIChjb25maXJtKCdHaXZlIHRoZSBqb2IgdG8gdGhpcyBjb250cmFjdG9yPycpICYmICEgcHJvY2Vzc2luZykge1xuXHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHQkbGlzdC5maW5kKCcuYnRuLWdpdmUtam9iJykuZGlzYWJsZSh0cnVlKTtcblxuXHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2pvYi9naXZlLWpvYicsIHtcblx0XHRcdFx0am9iOiAkYnRuLmRhdGEoJ2pvYicpLFxuXHRcdFx0XHRjb250cmFjdG9yOiAkYnRuLmRhdGEoJ3ZhbHVlJylcblx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdCRsaXN0LmZpbmQoJy5idG4tZ2l2ZS1qb2InKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG5cdFx0XHRcdFx0aWYgKGNvbmZpcm0oZS5tZXNzYWdlKSkgbG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHQkbGlzdC5maW5kKCcuYnRuLWdpdmUtam9iJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufVxuXG5pZiAoJCgnI2pvYkNvbnRyYWN0b3JMaXN0JylbMF0pIHtcblx0JCgnLmJ0bi1yZW1vdmUtY29udHJhY3QnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR2YXIgJGJ1dHRvbiA9ICQodGhpcyk7XG5cdFx0dmFyICRqb2IgPSAkKCcjam9iQ29udHJhY3Rvckxpc3QnKS5kYXRhKCdqb2InKTtcblx0XHR2YXIgJGNvbnRyYWN0b3IgPSAkYnV0dG9uLmRhdGEoJ3ZhbHVlJyk7XG5cblx0XHRpZiAoY29uZmlybSgnUmVtb3ZlIHRoaXMgY29udHJhY3RvciBmcm9tIHRoaXMgam9iPycpKSB7XG5cdFx0XHRpZiAoICEgcHJvY2Vzc2luZykge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0JCgnLmJ0bi1yZW1vdmUtY29udHJhY3QnKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cblx0XHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2pvYi9jYW5jZWwtY29udHJhY3RvcicsIHtcblx0XHRcdFx0XHRqb2I6ICRqb2IsXG5cdFx0XHRcdFx0Y29udHJhY3RvcjogJGNvbnRyYWN0b3Jcblx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdFx0XHRcdFx0YWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdCRidXR0b24ucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkucmVtb3ZlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgYWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLmJ0bi1yZW1vdmUtY29udHJhY3QnKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5idG4tcmVtb3ZlLWNvbnRyYWN0JykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRhbGVydCgnQW5vdGhlciBwcm9jZXNzIGlzIHJ1bm5pbmcsIHBsZWFzZSB3YWl0LicpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG5cbmlmICgkKCcjam9iU3RhdHVzQ2hhbmdlcicpWzBdKSB7XG5cdHZhciAkc2VsZWN0ID0gJCgnI2pvYlN0YXR1c0NoYW5nZXInKTtcblx0dmFyICRqb2IgPSAkc2VsZWN0LmRhdGEoJ2pvYicpO1xuXG5cdCRzZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoICEgcHJvY2Vzc2luZykge1xuXHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHQkc2VsZWN0LmRpc2FibGUodHJ1ZSk7XG5cdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cblx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9qb2Ivc3RhdHVzLWNoYW5nZScsIHtcblx0XHRcdFx0am9iOiAkam9iLFxuXHRcdFx0XHR2YWx1ZTogJHNlbGVjdC52YWwoKVxuXHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIHtcblx0XHRcdFx0XHRpZiAoJHNlbGVjdC52YWwoKSA9PT0gJ29wZW4nKSB7XG5cdFx0XHRcdFx0XHQkc2VsZWN0LnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdwYW5lbC1kYW5nZXInKS5hZGRDbGFzcygncGFuZWwtc3VjY2VzcycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdCRzZWxlY3QucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3BhbmVsLXN1Y2Nlc3MnKS5hZGRDbGFzcygncGFuZWwtZGFuZ2VyJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgYWxlcnQoZS5tZXNzYWdlKTtcblxuXHRcdFx0XHQkc2VsZWN0LmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdCRzZWxlY3QuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGFsZXJ0KFwiQW5vdGhlciBwcm9jZXNzIGlzIHJ1bm5pbmcsIHBsZWFzZSB3YWl0XCIpO1xuXHRcdH1cblx0fSk7XG59XG5cbmlmICgkKCcjcmVtb3ZlSm9iQnRuJylbMF0pIHtcblx0JCgnI3JlbW92ZUpvYkJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0dmFyICRidXR0b24gPSAkKCcjcmVtb3ZlSm9iQnRuJyk7XG5cdFx0aWYgKGNvbmZpcm0oJ1JlbW92ZSB0aGlzIGpvYj8gQ0FOTk9UIEJFIFVORE8uJykpIHtcblx0XHRcdHZhciAkam9iID0gJGJ1dHRvbi5kYXRhKCdqb2InKTtcblxuXHRcdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCRidXR0b24uZGlzYWJsZSh0cnVlKTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXG5cdFx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9qb2IvcmVtb3ZlLWpvYicsIHtcblx0XHRcdFx0XHRqb2I6ICRqb2Jcblx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdFx0XHRcdFx0YWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdGxvY2F0aW9uLnJlcGxhY2UoZS5yZWRpcmVjdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgYWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JGJ1dHRvbi5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCRidXR0b24uZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRhbGVydCgnQW5vdGhlciBwcm9jZXNzIGlzIHJ1bm5pbmcsIHBsZWFzZSB3YWl0LicpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG5cbmlmICgkKCcjYWdlbmN5QWZmaWxpYXRlTGlzdCcpWzBdKSB7XG5cdHZhciAkbGlzdCA9ICQoJyNhZ2VuY3lBZmZpbGlhdGVMaXN0Jyk7XG5cblx0JGxpc3Qub24oJ2NsaWNrJywgJy5idG4tc3VjY2VzcycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0dmFyICRidXR0b24gPSAkKHRoaXMpO1xuXHRcdGlmIChjb25maXJtKCdBY2NlcHQgdGhpcyBhZ2VuY3kgYXMgeW91ciBhZmZpbGlhdGU/JykpIHtcblx0XHRcdGlmICggISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRcdHZhciBpZCA9ICRidXR0b24uZGF0YSgnaWQnKTtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCRsaXN0LmZpbmQoJy5idG4nKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9jb21wYW55L2FkZC1hZmZpbGlhdGUnLCB7aWQ6IGlkfSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkbGlzdC5maW5kKCcuYnRuJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCRsaXN0LmZpbmQoJy5idG4nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0JGxpc3Qub24oJ2NsaWNrJywgJy5idG4tZGFuZ2VyJywgZnVuY3Rpb24gKGUpIHtcblx0XHR2YXIgJGJ1dHRvbiA9ICQodGhpcyk7XG5cdFx0aWYgKGNvbmZpcm0oJ1JlbW92ZSB0aGlzIGFnZW5jeSBmcm9tIHlvdXIgYWZmaWxpYXRlIGxpc3Q/JykpIHtcblx0XHRcdGlmICggISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRcdHZhciBpZCA9ICRidXR0b24uZGF0YSgnaWQnKTtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCRsaXN0LmZpbmQoJy5idG4nKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9jb21wYW55L3JlbW92ZS1hZmZpbGlhdGUnLCB7aWQ6IGlkfSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkbGlzdC5maW5kKCcuYnRuJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG5cdFx0XHRcdFx0XHQkbGlzdC5maW5kKCdsaVtkYXRhLWlkPVwiICcgKyBpZCArICdcIl0nKS5yZW1vdmUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCRsaXN0LmZpbmQoJy5idG4nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59IiwiZXhwb3J0IGNsYXNzIENvcmUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmRpc2FibGUoKTtcblx0XHR0aGlzLmZvcm1NZXNzYWdlKCk7XG5cdFx0dGhpcy5zZXJpYWxpemVGb3JtKCk7XG5cdFx0dGhpcy5zZXR1cEFqYXgoKTtcblxuXHRcdE51bWJlci5wcm90b3R5cGUuZm9ybWF0TW9uZXkgPSBmdW5jdGlvbihjLCBkLCB0KXtcblx0XHRcdHZhciBuID0gdGhpcywgXG5cdFx0XHRjID0gaXNOYU4oYyA9IE1hdGguYWJzKGMpKSA/IDIgOiBjLCBcblx0XHRcdGQgPSBkID09IHVuZGVmaW5lZCA/IFwiLlwiIDogZCwgXG5cdFx0XHR0ID0gdCA9PSB1bmRlZmluZWQgPyBcIixcIiA6IHQsIFxuXHRcdFx0cyA9IG4gPCAwID8gXCItXCIgOiBcIlwiLCBcblx0XHRcdGkgPSBwYXJzZUludChuID0gTWF0aC5hYnMoK24gfHwgMCkudG9GaXhlZChjKSkgKyBcIlwiLCBcblx0XHRcdGogPSAoaiA9IGkubGVuZ3RoKSA+IDMgPyBqICUgMyA6IDA7XG5cdFx0XHRyZXR1cm4gcyArIChqID8gaS5zdWJzdHIoMCwgaikgKyB0IDogXCJcIikgKyBpLnN1YnN0cihqKS5yZXBsYWNlKC8oXFxkezN9KSg/PVxcZCkvZywgXCIkMVwiICsgdCkgKyAoYyA/IGQgKyBNYXRoLmFicyhuIC0gaSkudG9GaXhlZChjKS5zbGljZSgyKSA6IFwiXCIpO1xuXHRcdH07XG5cdH1cblx0ZGlzYWJsZSgpIHtcblx0XHQkLmZuLmV4dGVuZCh7XG5cdFx0XHRkaXNhYmxlOiBmdW5jdGlvbihzdGF0ZSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmIChzdGF0ZSkge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5maW5kKCdzcGFuJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpLmZpbmQoJy5idG4tcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoJ3NwYW4nKS5zaG93KCk7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJykuZmluZCgnLmJ0bi1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRmb3JtTWVzc2FnZSgpIHtcblx0XHQkLmZuLnNob3dNZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSwgdHlwZSwgYWxlcnRDbGFzcykge1xuXHRcdFx0dmFyIGh0bWw7XG5cdFx0XHRodG1sID0gdm9pZCAwO1xuXHRcdFx0aWYgKGFsZXJ0Q2xhc3MgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRhbGVydENsYXNzID0gJyc7XG5cdFx0XHR9XG5cdFx0XHQkKCcuc3RhdHVzLW1lc3NhZ2UnKS5yZW1vdmUoKTtcblx0XHRcdGh0bWwgPSAnPGRpdiBjbGFzcz1cXCdzdGF0dXMtbWVzc2FnZSBlbGVtZW50LXRvcC0xMCAnICsgYWxlcnRDbGFzcyArICdcXCc+IDxkaXYgcm9sZT1cXCdhbGVydFxcJyBjbGFzcz1cXCdmYWRlLWluIGFsZXJ0IGFsZXJ0LWRpc21pc3NhYmxlIGFsZXJ0LScgKyB0eXBlICsgJ1xcJz4gPGJ1dHRvbiB0eXBlPVxcJ2J1dHRvblxcJyBjbGFzcz1cXCdjbG9zZVxcJyBkYXRhLWRpc21pc3M9XFwnYWxlcnRcXCc+IDxzcGFuIGFyaWEtaGlkZGVuPVxcJ3RydWVcXCc+PGkgY2xhc3M9XFwnZmEgZmEtdGltZXNcXCc+PC9pPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XFwnc3Itb25seVxcJz5DbG9zZTwvc3Bhbj4gPC9idXR0b24+JyArIG1lc3NhZ2UgKyAnPC9kaXY+PC9kaXY+Jztcblx0XHRcdHJldHVybiAkKGh0bWwpLmFwcGVuZFRvKHRoaXMpLmhpZGUoKS5mYWRlSW4oOTAwKTtcblx0XHR9O1xuXHR9XG5cdHNlcmlhbGl6ZUZvcm0oKSB7XG5cdFx0JC5mbi5zZXJpYWxpemVGb3JtID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZGF0YSwgbG9va3VwLCBwYXJzZSwgc2VsZWN0b3I7XG5cdFx0XHRkYXRhID0gdm9pZCAwO1xuXHRcdFx0bG9va3VwID0gdm9pZCAwO1xuXHRcdFx0cGFyc2UgPSB2b2lkIDA7XG5cdFx0XHRzZWxlY3RvciA9IHZvaWQgMDtcblx0XHRcdGlmICh0aGlzLmxlbmd0aCA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0ZGF0YSA9IHt9O1xuXHRcdFx0bG9va3VwID0gZGF0YTtcblx0XHRcdHNlbGVjdG9yID0gJzppbnB1dFt0eXBlIT1cImNoZWNrYm94XCJdW3R5cGUhPVwicmFkaW9cIl0sIGlucHV0OmNoZWNrZWQnO1xuXHRcdFx0cGFyc2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyICRlbCwgY2FwLCBpLCBuYW1lZDtcblx0XHRcdFx0JGVsID0gdm9pZCAwO1xuXHRcdFx0XHRjYXAgPSB2b2lkIDA7XG5cdFx0XHRcdGkgPSB2b2lkIDA7XG5cdFx0XHRcdG5hbWVkID0gdm9pZCAwO1xuXHRcdFx0XHRpZiAodGhpcy5kaXNhYmxlZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRuYW1lZCA9IHRoaXMubmFtZS5yZXBsYWNlKC9cXFsoW15cXF1dKyk/XFxdL2csICcsJDEnKS5zcGxpdCgnLCcpO1xuXHRcdFx0XHRjYXAgPSBuYW1lZC5sZW5ndGggLSAxO1xuXHRcdFx0XHQkZWwgPSAkKHRoaXMpO1xuXHRcdFx0XHRpZiAobmFtZWRbMF0pIHtcblx0XHRcdFx0XHRpID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoaSA8IGNhcCkge1xuXHRcdFx0XHRcdFx0bG9va3VwID0gbG9va3VwW25hbWVkW2ldXSA9IGxvb2t1cFtuYW1lZFtpXV0gfHwgKG5hbWVkW2kgKyAxXSA9PT0gJycgfHwgbmFtZWRbaSArIDFdID09PSAnMCcgPyBbXSA6IHt9KTtcblx0XHRcdFx0XHRcdGkrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGxvb2t1cC5sZW5ndGggIT09IHZvaWQgMCkge1xuXHRcdFx0XHRcdFx0bG9va3VwLnB1c2goJGVsLnZhbCgpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bG9va3VwW25hbWVkW2NhcF1dID0gJGVsLnZhbCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsb29rdXAgPSBkYXRhO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5maWx0ZXIoc2VsZWN0b3IpLmVhY2gocGFyc2UpO1xuXHRcdFx0dGhpcy5maW5kKHNlbGVjdG9yKS5lYWNoKHBhcnNlKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH07XG5cdH1cblx0c2V0dXBBamF4KCkge1xuXHRcdCQuYWpheFNldHVwKHtcblx0XHRcdHN0YXR1c0NvZGU6IHtcblx0XHRcdFx0NDAzOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdpbmRvdy5hbGVydCgnRm9yYmlkZGVuIGNvbnRlbnQhJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdDQwNDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJldHVybiB3aW5kb3cuYWxlcnQoJ1JlcXVlc3RlZCByb3V0ZSBub3QgZm91bmQhJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdDUwMDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJldHVybiB3aW5kb3cuYWxlcnQoJ0ludGVybmFsIHNlcnZlciBlcnJvciEnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNyb3NzRG9tYWluOiBmYWxzZSxcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRjYWNoZTogdHJ1ZSxcblx0XHRcdGFzeW5jOiBmYWxzZSxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J1gtQ1NSRi1Ub2tlbic6ICQoJ21ldGFbbmFtZT1cIl90XCJdJykuYXR0cignY29udGVudCcpXG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0iLCJleHBvcnQgY2xhc3MgUGx1Z2lucyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuaW5pdEJvb3RzdHJhcCgpO1xuXHRcdHZhciBzbGlkZXIgPSB7XCJpbml0XCI6XCIxXCIsXCJob21lX2luaXRcIjpcIjFcIn07XG5cblx0XHRpZiAoJCgnaW1nW2RhdGEtaW1hZ2UtcmVzaXplXScpWzBdKSB7XG5cdFx0XHQkLmVhY2goJCgnaW1nW2RhdGEtaW1hZ2UtcmVzaXplXScpLCBmdW5jdGlvbiAoaSwgZSkge1xuXHRcdFx0XHQkKGUpLnBhcmVudCgpLmltZ0xpcXVpZCh7XG5cdFx0XHRcdFx0ZmlsbDogdHJ1ZSxcblx0XHRcdFx0XHR2ZXJ0aWNhbEFsaWduOiAnY2VudGVyJyxcblx0XHRcdFx0XHRob3Jpem9udGFsQWxpZ246ICdjZW50ZXInXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gSm9iIHNlYXJjaDogQWR2YW5jZWQgU2VhcmNoIHRvZ2dsZVxuXHRcdGlmICggJCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbicpWzBdICkge1xuXHRcdFx0JCgnLmFkdmFuY2Utc2VhcmNoLXRvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGlmICgkKCcjYWR2YW5jZS1zZWFyY2gtb3B0aW9uOnZpc2libGUnKS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0JCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbicpLnNsaWRlVXAoKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0JCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbicpLnNsaWRlRG93bigpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHZhciBzY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXG5cdFx0aWYgKCBzY3JlZW5XaWR0aCA+IDc2NyApIHtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JCgnbGkubWVudS1pdGVtLWhhcy1jaGlsZHJlbiA+IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHQkKHRoaXMpLm5leHQoJy5zdWItbWVudScpLnNsaWRlVG9nZ2xlKCdmYXN0Jyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQkKCcjam9iLWNhdGVnb3J5LWRyb3Bkb3duJykubWluaW1hbGVjdCh7XG5cdFx0XHRwbGFjZWhvbGRlciA6ICdTZWxlY3QgSm9iIENhdGVnb3J5J1xuXHRcdH0pO1xuXG5cdFx0JCgnI2pvYi10eXBlLWRyb3Bkb3duJykubWluaW1hbGVjdCh7XG5cdFx0XHRwbGFjZWhvbGRlciA6ICdTZWxlY3QgSm9iIFR5cGUnXG5cdFx0fSk7XG5cdFx0XG5cdFx0aWYgKHNsaWRlci5pbml0KSB7XG5cdFx0XHRpZiAoJCgnc2VsZWN0I2V4cGVyaWVuY2VfbWluJylbMF0gJiYgJCgnc2VsZWN0I2V4cGVyaWVuY2VfbWF4JylbMF0pIHtcblx0XHRcdFx0JCgnc2VsZWN0I2V4cGVyaWVuY2VfbWluLCBzZWxlY3QjZXhwZXJpZW5jZV9tYXgnKS5zZWxlY3RUb1VJU2xpZGVyKHtcblx0XHRcdFx0XHRsYWJlbHM6IDEwLFxuXHRcdFx0XHRcdGxhYmVsU3JjOiAndGV4dCcsXG5cdFx0XHRcdFx0dG9vbHRpcDogdHJ1ZSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICgkKCdzZWxlY3Qjc2FsYXJ5X21pbicpWzBdICYmICQoJ3NlbGVjdCNzYWxhcnlfbWF4JylbMF0pIHtcblx0XHRcdFx0JCgnc2VsZWN0I3NhbGFyeV9taW4sIHNlbGVjdCNzYWxhcnlfbWF4Jykuc2VsZWN0VG9VSVNsaWRlcih7XG5cdFx0XHRcdFx0bGFiZWxzOjExLFxuXHRcdFx0XHRcdGxhYmVsU3JjOid0ZXh0Jyxcblx0XHRcdFx0XHR0b29sdGlwOnRydWUsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdCQoJyNqb2ItbGlzdGluZy10YWJzJykudGFicyh7IGhpZGU6IHsgZWZmZWN0OiBcImZhZGVcIiwgZHVyYXRpb246ICdmYXN0JyB9LCBzaG93OiB7IGVmZmVjdDogXCJmYWRlXCIsIGR1cmF0aW9uOiAnZmFzdCcgfSB9KTtcblxuXHRcdHZhciBzY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXG5cdFx0aWYgKCBzY3JlZW5XaWR0aCA8IDc2NyApIHtcblx0XHRcdCQoJ2xpLmhhcy1jaGlsZHJlbiA+IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSl7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0JCh0aGlzKS5uZXh0KCcuc3ViLW1lbnUnKS5zbGlkZVRvZ2dsZSgnZmFzdCcpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKCQoJyNjb3VudHJ5U2VsZWN0b3InKVswXSkge1xuXHRcdFx0dGhpcy5mb3JtQ291bnRyeVNlbGVjdG9ySW5pdCgpO1xuXHRcdH1cblxuXHRcdGlmICgkKCcuc3VtbWVybm90ZScpWzBdKSB7XG5cdFx0XHQkKCcuc3VtbWVybm90ZScpLnN1bW1lcm5vdGUoe2RpYWxvZ3NJbkJvZHk6IHRydWV9KTtcblx0XHR9XG5cblx0XHRpZiAoJCgnW2RhdGEtY2hlY2tvdXQtdHlwZV0nKVswXSkge1xuXHRcdFx0dmFyIHBheW1lbnRQcm9jZXNzaW5nID0gZmFsc2U7XG5cblx0XHRcdCQuZWFjaCgkKCdbZGF0YS1jaGVja291dC10eXBlXScpLCBmdW5jdGlvbiAoZSwgaSkge1xuXHRcdFx0XHQkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0aWYgKCAhIHBheW1lbnRQcm9jZXNzaW5nKSB7XG5cdFx0XHRcdFx0XHR2YXIgJGJ1dHRvbiA9ICQodGhpcyk7XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRwYXltZW50UHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHRcdFx0XHQkYnV0dG9uLmRpc2FibGUodHJ1ZSk7XG5cdFx0XHRcdFx0XHR2YXIgY2hlY2tvdXRfdHlwZSA9ICRidXR0b24uZGF0YSgnY2hlY2tvdXQtdHlwZScpO1xuXHRcdFx0XHRcdFx0dmFyIHBvc3REYXRhID0ge307XG5cblx0XHRcdFx0XHRcdGlmIChjaGVja291dF90eXBlID09IDEpIHtcblx0XHRcdFx0XHRcdFx0cG9zdERhdGEgPSB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogJ3BheXBhbCcsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IGNoZWNrb3V0X3R5cGVcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKGNoZWNrb3V0X3R5cGUgPT0gMikge1xuXHRcdFx0XHRcdFx0XHRwb3N0RGF0YSA9IHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiAncGF5cGFsJyxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogY2hlY2tvdXRfdHlwZSxcblx0XHRcdFx0XHRcdFx0XHRhbW91bnQ6ICRidXR0b24ucGFyZW50KCkuZmluZCgnaW5wdXRbbmFtZT1fY3JlZF9hbXRdJykudmFsKClcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2FwaS9wYXltZW50L3Byb2Nlc3MtcGF5bWVudCcsIHBvc3REYXRhKS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykgd2luZG93Lm9wZW4oZS5yZWRpcmVjdCk7XG5cdFx0XHRcdFx0XHRcdGVsc2UgYWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0JGJ1dHRvbi5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0cGF5bWVudFByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRcdFx0cGF5bWVudFByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHQkYnV0dG9uLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQoJ0Fub3RoZXIgcGF5bWVudCBpcyBwcm9jZXNzaW5nLCBwbGVhc2Ugd2FpdC4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdGluaXRCb290c3RyYXAoKSB7XG5cdFx0JCgnLnBhbmVsLXRvb2x0aXAnKS50b29sdGlwKCk7XG5cdFx0JCgnW2RhdGEtdG9nZ2xlPVwicG9wb3ZlclwiXScpLnBvcG92ZXIoKTtcblxuXHRcdCQoJy5pbnB1dC1kYXRlcmFuZ2UgaW5wdXQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdCQodGhpcykuZGF0ZXBpY2tlcih7XG5cdFx0XHRcdGZvcm1hdDogXCJ5eXl5LW1tLWRkXCIsXG5cdFx0XHRcdHN0YXJ0RGF0ZTogXCIrMWRcIlxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblx0Zm9ybUNvdW50cnlTZWxlY3RvckluaXQoKSB7XG5cdFx0JC5hamF4KHtcblx0XHRcdHR5cGU6ICdnZXQnLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHR0eXBlOiBcImFsbFwiXG5cdFx0XHR9LFxuXHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0dXJsOiB3aW5kb3cub3JpZ2luICsgJy9hcGkvY291bnRyeScsXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuXHRcdFx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZCA9ICcnO1xuXHRcdFx0XHRcdFx0aWYgKCQoJyNjb3VudHJ5U2VsZWN0b3InKS5kYXRhKCd2YWx1ZScpICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHR2YXIgY291bnRyeVZhbHVlID0gJCgnI2NvdW50cnlTZWxlY3RvcicpLmRhdGEoJ3ZhbHVlJyk7XG5cdFx0XHRcdFx0XHRcdHNlbGVjdGVkID0gKGRhdGFba2V5XS5OYW1lID09PSBjb3VudHJ5VmFsdWUpID8gJ3NlbGVjdGVkPVwic2VsZWN0ZWRcIicgOiAnJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZCA9IChkYXRhW2tleV0uQ29kZSA9PT0gJ0dCUicpID8gJ3NlbGVjdGVkPVwic2VsZWN0ZWRcIicgOiAnJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdCQoJyNjb3VudHJ5U2VsZWN0b3InKS5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCInICsgZGF0YVtrZXldLk5hbWUgKyAnXCIgZGF0YS1jb2RlPVwiJyArIGRhdGFba2V5XS5Db2RlICsgJ1wiICcgKyBzZWxlY3RlZCArICc+JyArIGRhdGFba2V5XS5OYW1lICsnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCQoJyNjaXR5U2VsZWN0b3InKVswXSkge1xuXHRcdFx0XHRcdHZhciBwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnI2NpdHlTZWxlY3RvcicpLmVtcHR5KCk7XG5cblx0XHRcdFx0XHR2YXIgY2l0eVJlbG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0XHR0eXBlOiAnZ2V0Jyxcblx0XHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiAkKCcjY291bnRyeVNlbGVjdG9yIDpzZWxlY3RlZCcpLmRhdGEoJ2NvZGUnKVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdFx0XHRcdHVybDogd2luZG93Lm9yaWdpbiArICcvYXBpL2NpdHknLFxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoY2l0eURhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0JCgnI2NpdHlTZWxlY3RvcicpLmVtcHR5KCk7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGNpdHlEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoY2l0eURhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgc2VsZWN0ZWQgPSAnJztcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoJCgnI2NpdHlTZWxlY3RvcicpLmRhdGEoJ3ZhbHVlJykgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIGNpdHlWYWx1ZSA9ICQoJyNjaXR5U2VsZWN0b3InKS5kYXRhKCd2YWx1ZScpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkID0gKGNpdHlEYXRhW2tleV0uTmFtZSA9PT0gY2l0eVZhbHVlKSA/ICdzZWxlY3RlZD1cInNlbGVjdGVkXCInIDogJyc7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQkKCcjY2l0eVNlbGVjdG9yJykuYXBwZW5kKCc8b3B0aW9uIHZhbHVlPVwiJyArIGNpdHlEYXRhW2tleV0uTmFtZSArICdcIiAnICsgc2VsZWN0ZWQgKyAnPicgKyBjaXR5RGF0YVtrZXldLk5hbWUgKyc8L29wdGlvbj4nKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpcm0oXCJDYW5ub3QgbG9hZCBcIiArIGNvdW50cnkgKyBcIidzIGNpdHkgbGlzdCwgcmVsb2FkP1wiKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y2l0eVJlbG9hZCgpO1xuXG5cdFx0XHRcdFx0JCgnI2NvdW50cnlTZWxlY3RvcicpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmICggISBwcm9jZXNzaW5nKSBjaXR5UmVsb2FkKCk7XG5cdFx0XHRcdFx0XHRlbHNlIGFsZXJ0KCdQbGVhc2Ugd2FpdCB3aGlsZSBwcmV2aW91cyBsaXN0IHdhcyBsb2FkZWQuJyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdGlmIChjb25maXJtKCdDYW5ub3QgbG9hZCBjb3VudHJ5IGxpc3QsIHJlbG9hZD8nKSkge1xuXHRcdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0iXX0=
