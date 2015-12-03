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
				$form.find('[type=submit]').disable(true);
				$.post(window.origin + '/job/submit-job', {
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
				$form.find('[type=submit]').disable(true);
				$.post(window.origin + '/job/edit-job', {
					data: $form.serializeForm(),
					job: jobId
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
	})();
}

// Edit Account
if ($('#companyEditAccountForm')[0]) {
	$form = $('#companyEditAccountForm');

	$form.find('[type=submit]').on('click', function (e) {
		e.preventDefault();
		if ($form.parsley().validate() && !processing) {
			$form.find('[type=submit]').disable(true);
			$.post(window.origin + '/company/update-account', {
				data: $form.serializeForm()
			}).done(function (e) {
				$form.showMessage(e.message, e.type);
				$form.find('[type=submit]').disable(false);
				processing = false;
			}).fail(function (xhr, status, e) {
				$form.showMessage(xhr.responseText, 'danger');
				$form.find('[type=submit]').disable(false);
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

			if ($('select#sallary_min')[0] && $('select#sallary_max')[0]) {
				$('select#sallary_min, select#sallary_max').selectToUISlider({
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
						}).fail(function (xhr, status, e) {
							paymentProcessing = false;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9mb3JkL3dlYi93d3ctam9iL3Jlc291cmNlcy9hc3NldHMvanMvZnJvbnQvY29tcGFueS5qcyIsIi9ob21lL2ZvcmQvd2ViL3d3dy1qb2IvcmVzb3VyY2VzL2Fzc2V0cy9qcy9mcm9udC9jb3JlLmpzIiwiL2hvbWUvZm9yZC93ZWIvd3d3LWpvYi9yZXNvdXJjZXMvYXNzZXRzL2pzL2Zyb250L3BsdWdpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztvQkNBcUIsUUFBUTs7dUJBQ0wsV0FBVzs7QUFFbkMsSUFBSSxLQUFLLENBQUM7QUFDVixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7OztBQUd2QixJQUFJLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0tBQzVCLFNBQVM7S0FDVCxLQUFLOzs7TUFFQSxRQUFRLEdBQWpCLFNBQVMsUUFBUSxHQUFHO0FBQ25CLFVBQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7R0FDckQ7O01BRVEsVUFBVSxHQUFuQixTQUFTLFVBQVUsQ0FBQyxLQUFLLEVBQUU7QUFDMUIsWUFBUyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9ELElBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbEQsT0FBSSxRQUFRLEdBQUcsS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQzdDLElBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLElBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFckQsSUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN2QixhQUFTLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHO0lBQ25DLEVBQUUsR0FBRyxDQUFDLENBQUM7R0FDUjs7QUFqQkcsV0FBUyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUM7QUFDOUIsT0FBSyxHQUFHLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQzs7QUFrQnBDLEdBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFXO0FBQ2hELGFBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztHQUMzQixDQUFDLENBQUM7O0FBRUgsR0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVc7QUFDNUMsT0FBSSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFO0FBQ3BELGNBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzQjtHQUNELENBQUMsQ0FBQzs7QUFFSCxXQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFLE9BQU8sRUFBRTtBQUN4QyxJQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUM7R0FDdkUsQ0FBQyxDQUFDOztBQUVILFlBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFZCxPQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDcEQsSUFBQyxDQUFDLGNBQWMsRUFBRSxDQUFDOztBQUVuQixPQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFFLFVBQVUsRUFBRTtBQUMvQyxjQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFNBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFDLEtBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsRUFBRTtBQUN6QyxTQUFJLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRTtLQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3BCLGVBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsVUFBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxVQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMzQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDakMsZUFBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixVQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDOUMsVUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0MsQ0FBQyxDQUFDO0lBQ0g7R0FDRCxDQUFDLENBQUM7O0NBQ0g7OztBQUdELElBQUksQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7S0FDNUIsU0FBUztLQUNULEtBQUs7S0FDTCxLQUFLOzs7TUFFQSxRQUFRLEdBQWpCLFNBQVMsUUFBUSxHQUFHO0FBQ25CLFVBQU8sU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7R0FDckQ7O01BRVEsVUFBVSxHQUFuQixTQUFTLFVBQVUsQ0FBQyxLQUFLLEVBQUU7QUFDMUIsWUFBUyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9ELElBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbEQsT0FBSSxRQUFRLEdBQUcsS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQzdDLElBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLElBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFckQsSUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN2QixhQUFTLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHO0lBQ25DLEVBQUUsR0FBRyxDQUFDLENBQUM7R0FDUjs7QUFsQkcsV0FBUyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUM7QUFDOUIsT0FBSyxHQUFHLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztBQUNoQyxPQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7O0FBa0I3QixHQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBVztBQUNoRCxhQUFVLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7R0FDM0IsQ0FBQyxDQUFDOztBQUVILEdBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFXO0FBQzVDLE9BQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxFQUFFLENBQUMsRUFBRTtBQUNwRCxjQUFVLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0I7R0FDRCxDQUFDLENBQUM7O0FBRUgsV0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssRUFBRSxPQUFPLEVBQUU7QUFDeEMsSUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDO0dBQ3ZFLENBQUMsQ0FBQzs7QUFFSCxZQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRWQsT0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQ3BELElBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7QUFFbkIsT0FBSSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBRSxVQUFVLEVBQUU7QUFDL0MsY0FBVSxHQUFHLElBQUksQ0FBQztBQUNsQixTQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQyxLQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsZUFBZSxFQUFFO0FBQ3ZDLFNBQUksRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFO0FBQzNCLFFBQUcsRUFBRSxLQUFLO0tBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNwQixlQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFVBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckMsVUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0FBQ2pDLGVBQVUsR0FBRyxLQUFLLENBQUM7QUFDbkIsVUFBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLFVBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzNDLENBQUMsQ0FBQztJQUNIO0dBQ0QsQ0FBQyxDQUFDOztDQUNIOzs7QUFHRCxJQUFJLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3BDLE1BQUssR0FBRyxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQzs7QUFFckMsTUFBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQ3BELEdBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixNQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFFLFVBQVUsRUFBRTtBQUMvQyxRQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQyxJQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcseUJBQXlCLEVBQUU7QUFDakQsUUFBSSxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUU7SUFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNwQixTQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLFNBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNDLGNBQVUsR0FBRyxLQUFLLENBQUM7SUFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0FBQ2pDLFNBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM5QyxTQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQyxjQUFVLEdBQUcsS0FBSyxDQUFDO0lBQ25CLENBQUMsQ0FBQztHQUNIO0VBQ0QsQ0FBQyxDQUFDO0NBQ0g7Ozs7Ozs7Ozs7Ozs7SUNqSlksSUFBSTtBQUNMLFVBREMsSUFBSSxHQUNGO3dCQURGLElBQUk7O0FBRWYsTUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2YsTUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ25CLE1BQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUNyQixNQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7O0FBRWpCLFFBQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFVBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUM7QUFDL0MsT0FBSSxDQUFDLEdBQUcsSUFBSTtPQUNaLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztPQUNsQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsR0FBRyxHQUFHLEdBQUcsQ0FBQztPQUM1QixDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsR0FBRyxHQUFHLEdBQUcsQ0FBQztPQUM1QixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRTtPQUNwQixDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUU7T0FDbkQsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUEsR0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkMsVUFBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUEsQUFBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBLEFBQUMsQ0FBQztHQUNoSixDQUFDO0VBQ0Y7O2NBakJXLElBQUk7O1NBa0JULG1CQUFHO0FBQ1QsSUFBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDWCxXQUFPLEVBQUUsaUJBQVMsS0FBSyxFQUFFO0FBQ3hCLFlBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFXO0FBQzNCLFVBQUksS0FBSyxFQUFFO0FBQ1YsUUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixRQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztPQUNuRSxNQUFNO0FBQ04sUUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixRQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO09BQzdEO01BQ0QsQ0FBQyxDQUFDO0tBQ0g7SUFDRCxDQUFDLENBQUM7R0FDSDs7O1NBQ1UsdUJBQUc7QUFDYixJQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsR0FBRyxVQUFTLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO0FBQ3RELFFBQUksSUFBSSxDQUFDO0FBQ1QsUUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ2QsUUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO0FBQzdCLGVBQVUsR0FBRyxFQUFFLENBQUM7S0FDaEI7QUFDRCxLQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM5QixRQUFJLEdBQUcsNkNBQTZDLEdBQUcsVUFBVSxHQUFHLHdFQUF3RSxHQUFHLElBQUksR0FBRyxvTEFBb0wsR0FBRyxPQUFPLEdBQUcsY0FBYyxDQUFDO0FBQ3RXLFdBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakQsQ0FBQztHQUNGOzs7U0FDWSx5QkFBRztBQUNmLElBQUMsQ0FBQyxFQUFFLENBQUMsYUFBYSxHQUFHLFlBQVc7QUFDL0IsUUFBSSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUM7QUFDbEMsUUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ2QsVUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ2hCLFNBQUssR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNmLFlBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNsQixRQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3BCLFlBQU8sS0FBSyxDQUFDO0tBQ2I7QUFDRCxRQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ1YsVUFBTSxHQUFHLElBQUksQ0FBQztBQUNkLFlBQVEsR0FBRyx3REFBd0QsQ0FBQztBQUNwRSxTQUFLLEdBQUcsWUFBVztBQUNsQixTQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztBQUN2QixRQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDYixRQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDYixNQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDWCxVQUFLLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDZixTQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDbEIsYUFBTztNQUNQO0FBQ0QsVUFBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM5RCxRQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDdkIsUUFBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNkLFNBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2IsT0FBQyxHQUFHLENBQUMsQ0FBQztBQUNOLGFBQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRTtBQUNmLGFBQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUEsQUFBQyxDQUFDO0FBQ3hHLFFBQUMsRUFBRSxDQUFDO09BQ0o7QUFDRCxVQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLEVBQUU7QUFDN0IsYUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztPQUN2QixNQUFNO0FBQ04sYUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztPQUMvQjtBQUNELFlBQU0sR0FBRyxJQUFJLENBQUM7TUFDZDtLQUNELENBQUM7QUFDRixRQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsQyxRQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxXQUFPLElBQUksQ0FBQztJQUNaLENBQUM7R0FDRjs7O1NBQ1EscUJBQUc7QUFDWCxJQUFDLENBQUMsU0FBUyxDQUFDO0FBQ1gsY0FBVSxFQUFFO0FBQ1gsUUFBRyxFQUFFLFdBQVMsQ0FBQyxFQUFFO0FBQ2hCLGFBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO01BQzFDO0FBQ0QsUUFBRyxFQUFFLFdBQVMsQ0FBQyxFQUFFO0FBQ2hCLGFBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO01BQ2xEO0FBQ0QsUUFBRyxFQUFFLFdBQVMsQ0FBQyxFQUFFO0FBQ2hCLGFBQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO01BQzlDO0tBQ0Q7QUFDRCxlQUFXLEVBQUUsS0FBSztBQUNsQixZQUFRLEVBQUUsTUFBTTtBQUNoQixTQUFLLEVBQUUsSUFBSTtBQUNYLFNBQUssRUFBRSxLQUFLO0FBQ1osV0FBTyxFQUFFO0FBQ1IsbUJBQWMsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3BEO0lBQ0QsQ0FBQyxDQUFDO0dBQ0g7OztRQTlHVyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7O0lDQUosT0FBTztBQUNSLFVBREMsT0FBTyxHQUNMO3dCQURGLE9BQU87O0FBRWxCLE1BQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUNyQixNQUFJLE1BQU0sR0FBRyxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsV0FBVyxFQUFDLEdBQUcsRUFBQyxDQUFDOztBQUUxQyxNQUFJLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ25DLElBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ25ELEtBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7QUFDdkIsU0FBSSxFQUFFLElBQUk7QUFDVixrQkFBYSxFQUFFLFFBQVE7QUFDdkIsb0JBQWUsRUFBRSxRQUFRO0tBQ3pCLENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQztHQUNIOzs7QUFHRCxNQUFLLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFHO0FBQ3JDLElBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUM5QyxRQUFJLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLE1BQU0sRUFBRztBQUNoRCxNQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN0QyxNQUFJO0FBQ0osTUFBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDeEM7QUFDRCxXQUFPLEtBQUssQ0FBQztJQUNiLENBQUMsQ0FBQztHQUNIOztBQUVELE1BQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFFcEMsTUFBSyxXQUFXLEdBQUcsR0FBRyxFQUFHLEVBQ3hCLE1BQU07QUFDTixJQUFDLENBQUMsK0JBQStCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVMsQ0FBQyxFQUFDO0FBQ3pELEtBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixLQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUM7R0FDSDs7QUFFRCxHQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxVQUFVLENBQUM7QUFDdEMsY0FBVyxFQUFHLHFCQUFxQjtHQUNuQyxDQUFDLENBQUM7O0FBRUgsR0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsVUFBVSxDQUFDO0FBQ2xDLGNBQVcsRUFBRyxpQkFBaUI7R0FDL0IsQ0FBQyxDQUFDOztBQUVILE1BQUksTUFBTSxDQUFDLElBQUksRUFBRTtBQUNoQixPQUFJLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ25FLEtBQUMsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO0FBQ2xFLFdBQU0sRUFBRSxFQUFFO0FBQ1YsYUFBUSxFQUFFLE1BQU07QUFDaEIsWUFBTyxFQUFFLElBQUk7S0FDYixDQUFDLENBQUM7SUFDSDs7QUFFRCxPQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzdELEtBQUMsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO0FBQzVELFdBQU0sRUFBQyxFQUFFO0FBQ1QsYUFBUSxFQUFDLE1BQU07QUFDZixZQUFPLEVBQUMsSUFBSTtLQUNaLENBQUMsQ0FBQztJQUNIO0dBQ0Q7O0FBRUQsR0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUV4SCxNQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBRXBDLE1BQUssV0FBVyxHQUFHLEdBQUcsRUFBRztBQUN4QixJQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFDO0FBQ2hELEtBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixLQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUM7R0FDSDs7QUFFRCxNQUFJLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzdCLE9BQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0dBQy9COztBQUVELE1BQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3hCLElBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBQyxhQUFhLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztHQUNuRDs7QUFFRCxNQUFJLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2pDLE9BQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDOztBQUU5QixJQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNqRCxLQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBRTtBQUNoQyxTQUFLLENBQUUsaUJBQWlCLEVBQUU7QUFDekIsVUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLE9BQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQix1QkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDekIsYUFBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixVQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ2xELFVBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFbEIsVUFBSSxhQUFhLElBQUksQ0FBQyxFQUFFO0FBQ3ZCLGVBQVEsR0FBRztBQUNWLFlBQUksRUFBRSxRQUFRO0FBQ2QsYUFBSyxFQUFFLGFBQWE7UUFDcEIsQ0FBQztPQUNGLE1BQ0ksSUFBSSxhQUFhLElBQUksQ0FBQyxFQUFFO0FBQzVCLGVBQVEsR0FBRztBQUNWLFlBQUksRUFBRSxRQUFRO0FBQ2QsYUFBSyxFQUFFLGFBQWE7QUFDcEIsY0FBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxHQUFHLEVBQUU7UUFDNUQsQ0FBQztPQUNGOztBQUVELE9BQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyw4QkFBOEIsRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7QUFDbEYsV0FBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUM3QyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RCLGNBQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkIsd0JBQWlCLEdBQUcsS0FBSyxDQUFDO09BQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUNqQyx3QkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDMUIsWUFBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqQixjQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ3ZCLENBQUMsQ0FBQztNQUNILE1BQ0k7QUFDSixXQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztNQUNyRDtLQUNELENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQztHQUNIO0VBQ0Q7O2NBOUhXLE9BQU87O1NBK0hOLHlCQUFHO0FBQ2YsSUFBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDOUIsSUFBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7O0FBRXZDLElBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZO0FBQzVDLEtBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUM7QUFDbEIsV0FBTSxFQUFFLFlBQVk7QUFDcEIsY0FBUyxFQUFFLEtBQUs7S0FDaEIsQ0FBQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0dBQ0g7OztTQUNzQixtQ0FBRztBQUN6QixJQUFDLENBQUMsSUFBSSxDQUFDO0FBQ04sUUFBSSxFQUFFLEtBQUs7QUFDWCxRQUFJLEVBQUU7QUFDTCxTQUFJLEVBQUUsS0FBSztLQUNYO0FBQ0QsWUFBUSxFQUFFLE1BQU07QUFDaEIsT0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsY0FBYztBQUNuQyxXQUFPLEVBQUUsaUJBQVUsSUFBSSxFQUFFO0FBQ3hCLFVBQUssSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO0FBQ3JCLFVBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUM3QixXQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDbEIsV0FBSSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFO0FBQy9DLFlBQUksWUFBWSxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2RCxnQkFBUSxHQUFHLEFBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxZQUFZLEdBQUkscUJBQXFCLEdBQUcsRUFBRSxDQUFDO1FBQzFFLE1BQ0k7QUFDSixnQkFBUSxHQUFHLEFBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLEdBQUkscUJBQXFCLEdBQUcsRUFBRSxDQUFDO1FBQ25FO0FBQ0QsUUFBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRSxXQUFXLENBQUMsQ0FBQztPQUMxSjtNQUNEOztBQUVELFNBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzFCLFVBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztBQUN2QixPQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBRTNCLFVBQUksVUFBVSxHQUFHLFNBQWIsVUFBVSxHQUFjO0FBQzNCLGlCQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFFBQUMsQ0FBQyxJQUFJLENBQUM7QUFDTixZQUFJLEVBQUUsS0FBSztBQUNYLFlBQUksRUFBRTtBQUNMLGNBQUssRUFBRSxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ25EO0FBQ0QsZ0JBQVEsRUFBRSxNQUFNO0FBQ2hCLFdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLFdBQVc7QUFDaEMsZUFBTyxFQUFFLGlCQUFVLFFBQVEsRUFBRTtBQUM1QixtQkFBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixVQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDM0IsY0FBSyxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUU7QUFDekIsY0FBSSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ2pDLGVBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFbEIsZUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRTtBQUM1QyxnQkFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqRCxvQkFBUSxHQUFHLEFBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLEdBQUkscUJBQXFCLEdBQUcsRUFBRSxDQUFDO1lBQzNFOztBQUVELFlBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsUUFBUSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFFLFdBQVcsQ0FBQyxDQUFDO1dBQzVIO1VBQ0Q7U0FDRDtBQUNELGFBQUssRUFBRSxlQUFVLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLG1CQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLGFBQUksT0FBTyxDQUFDLGNBQWMsR0FBRyxPQUFPLEdBQUcsdUJBQXVCLENBQUMsRUFBRTtBQUNoRSxrQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1VBQ2xCO1NBQ0Q7UUFDRCxDQUFDLENBQUM7T0FDSCxDQUFDOztBQUVGLGdCQUFVLEVBQUUsQ0FBQzs7QUFFYixPQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVc7QUFDN0MsV0FBSyxDQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxLQUMzQixLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztPQUMxRCxDQUFDLENBQUM7TUFDSDtLQUNEO0FBQ0QsU0FBSyxFQUFFLGVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDaEMsU0FBSSxPQUFPLENBQUMsbUNBQW1DLENBQUMsRUFBRTtBQUNqRCxjQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7TUFDbEI7S0FDRDtJQUNELENBQUMsQ0FBQztHQUNIOzs7UUFyTlcsT0FBTyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBDb3JlIH0gZnJvbSBcIi4vY29yZVwiO1xuaW1wb3J0IHsgUGx1Z2lucyB9IGZyb20gXCIuL3BsdWdpbnNcIjtcblxudmFyICRmb3JtO1xudmFyIHByb2Nlc3NpbmcgPSBmYWxzZTtcblxuLy8gUG9zdCBKb2JcbmlmICgkKCcjY29tcGFueVBvc3RKb2JGb3JtJylbMF0pIHtcblx0dmFyICRzZWN0aW9ucyA9ICQoJy5mb3JtLXNlY3Rpb24nKTtcblx0dmFyICRmb3JtID0gJCgnI2NvbXBhbnlQb3N0Sm9iRm9ybScpO1xuXG5cdGZ1bmN0aW9uIGN1ckluZGV4KCkge1xuXHRcdHJldHVybiAkc2VjdGlvbnMuaW5kZXgoJHNlY3Rpb25zLmZpbHRlcignLmN1cnJlbnQnKSk7XG5cdH1cblxuXHRmdW5jdGlvbiBuYXZpZ2F0ZVRvKGluZGV4KSB7XG5cdFx0JHNlY3Rpb25zLnJlbW92ZUNsYXNzKCdjdXJyZW50JykuZXEoaW5kZXgpLmFkZENsYXNzKCdjdXJyZW50Jyk7XG5cdFx0JCgnLmZvcm0tbmF2aWdhdGlvbiAucHJldmlvdXMnKS50b2dnbGUoaW5kZXggPiAwKTtcblx0XHR2YXIgYXRUaGVFbmQgPSBpbmRleCA+PSAkc2VjdGlvbnMubGVuZ3RoIC0gMTtcblx0XHQkKCcuZm9ybS1uYXZpZ2F0aW9uIC5uZXh0JykudG9nZ2xlKCFhdFRoZUVuZCk7XG5cdFx0JCgnLmZvcm0tbmF2aWdhdGlvbiBbdHlwZT1zdWJtaXRdJykudG9nZ2xlKGF0VGhlRW5kKTtcblxuXHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdHNjcm9sbFRvcDogJGZvcm0ub2Zmc2V0KCkudG9wIC0gMTAwXG5cdFx0fSwgMTAwKTtcblx0fVxuXG5cdCQoJy5mb3JtLW5hdmlnYXRpb24gLnByZXZpb3VzJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0bmF2aWdhdGVUbyhjdXJJbmRleCgpIC0gMSk7XG5cdH0pO1xuXG5cdCQoJy5mb3JtLW5hdmlnYXRpb24gLm5leHQnKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCdibG9jay0nICsgY3VySW5kZXgoKSkpIHtcblx0XHRcdG5hdmlnYXRlVG8oY3VySW5kZXgoKSArIDEpO1xuXHRcdH1cblx0fSk7XG5cblx0JHNlY3Rpb25zLmVhY2goZnVuY3Rpb24gKGluZGV4LCBzZWN0aW9uKSB7XG5cdFx0JChzZWN0aW9uKS5maW5kKCc6aW5wdXQnKS5hdHRyKCdkYXRhLXBhcnNsZXktZ3JvdXAnLCAnYmxvY2stJyArIGluZGV4KTtcblx0fSk7XG5cblx0bmF2aWdhdGVUbygwKTtcblxuXHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCkgJiYgISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2pvYi9zdWJtaXQtam9iJywge1xuXHRcdFx0XHRkYXRhOiAkZm9ybS5zZXJpYWxpemVGb3JtKClcblx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCwgJ2RhbmdlcicpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufVxuXG4vLyBFZGl0IEpvYlxuaWYgKCQoJyNjb21wYW55RWRpdEpvYkZvcm0nKVswXSkge1xuXHR2YXIgJHNlY3Rpb25zID0gJCgnLmZvcm0tc2VjdGlvbicpO1xuXHR2YXIgJGZvcm0gPSAkKCcjY29tcGFueUVkaXRKb2JGb3JtJyk7XG5cdHZhciBqb2JJZCA9ICRmb3JtLmRhdGEoJ2pvYicpO1xuXG5cdGZ1bmN0aW9uIGN1ckluZGV4KCkge1xuXHRcdHJldHVybiAkc2VjdGlvbnMuaW5kZXgoJHNlY3Rpb25zLmZpbHRlcignLmN1cnJlbnQnKSk7XG5cdH1cblxuXHRmdW5jdGlvbiBuYXZpZ2F0ZVRvKGluZGV4KSB7XG5cdFx0JHNlY3Rpb25zLnJlbW92ZUNsYXNzKCdjdXJyZW50JykuZXEoaW5kZXgpLmFkZENsYXNzKCdjdXJyZW50Jyk7XG5cdFx0JCgnLmZvcm0tbmF2aWdhdGlvbiAucHJldmlvdXMnKS50b2dnbGUoaW5kZXggPiAwKTtcblx0XHR2YXIgYXRUaGVFbmQgPSBpbmRleCA+PSAkc2VjdGlvbnMubGVuZ3RoIC0gMTtcblx0XHQkKCcuZm9ybS1uYXZpZ2F0aW9uIC5uZXh0JykudG9nZ2xlKCFhdFRoZUVuZCk7XG5cdFx0JCgnLmZvcm0tbmF2aWdhdGlvbiBbdHlwZT1zdWJtaXRdJykudG9nZ2xlKGF0VGhlRW5kKTtcblxuXHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdHNjcm9sbFRvcDogJGZvcm0ub2Zmc2V0KCkudG9wIC0gMTAwXG5cdFx0fSwgMTAwKTtcblx0fVxuXG5cdCQoJy5mb3JtLW5hdmlnYXRpb24gLnByZXZpb3VzJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0bmF2aWdhdGVUbyhjdXJJbmRleCgpIC0gMSk7XG5cdH0pO1xuXG5cdCQoJy5mb3JtLW5hdmlnYXRpb24gLm5leHQnKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCdibG9jay0nICsgY3VySW5kZXgoKSkpIHtcblx0XHRcdG5hdmlnYXRlVG8oY3VySW5kZXgoKSArIDEpO1xuXHRcdH1cblx0fSk7XG5cblx0JHNlY3Rpb25zLmVhY2goZnVuY3Rpb24gKGluZGV4LCBzZWN0aW9uKSB7XG5cdFx0JChzZWN0aW9uKS5maW5kKCc6aW5wdXQnKS5hdHRyKCdkYXRhLXBhcnNsZXktZ3JvdXAnLCAnYmxvY2stJyArIGluZGV4KTtcblx0fSk7XG5cblx0bmF2aWdhdGVUbygwKTtcblxuXHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCkgJiYgISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2pvYi9lZGl0LWpvYicsIHtcblx0XHRcdFx0ZGF0YTogJGZvcm0uc2VyaWFsaXplRm9ybSgpLFxuXHRcdFx0XHRqb2I6IGpvYklkXG5cdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoZS5tZXNzYWdlLCBlLnR5cGUpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKHhoci5yZXNwb25zZVRleHQsICdkYW5nZXInKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLy8gRWRpdCBBY2NvdW50XG5pZiAoJCgnI2NvbXBhbnlFZGl0QWNjb3VudEZvcm0nKVswXSkge1xuXHQkZm9ybSA9ICQoJyNjb21wYW55RWRpdEFjY291bnRGb3JtJyk7XG5cblx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoKSAmJiAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2NvbXBhbnkvdXBkYXRlLWFjY291bnQnLCB7XG5cdFx0XHRcdGRhdGE6ICRmb3JtLnNlcmlhbGl6ZUZvcm0oKVxuXHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCwgJ2RhbmdlcicpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG59IiwiZXhwb3J0IGNsYXNzIENvcmUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmRpc2FibGUoKTtcblx0XHR0aGlzLmZvcm1NZXNzYWdlKCk7XG5cdFx0dGhpcy5zZXJpYWxpemVGb3JtKCk7XG5cdFx0dGhpcy5zZXR1cEFqYXgoKTtcblxuXHRcdE51bWJlci5wcm90b3R5cGUuZm9ybWF0TW9uZXkgPSBmdW5jdGlvbihjLCBkLCB0KXtcblx0XHRcdHZhciBuID0gdGhpcywgXG5cdFx0XHRjID0gaXNOYU4oYyA9IE1hdGguYWJzKGMpKSA/IDIgOiBjLCBcblx0XHRcdGQgPSBkID09IHVuZGVmaW5lZCA/IFwiLlwiIDogZCwgXG5cdFx0XHR0ID0gdCA9PSB1bmRlZmluZWQgPyBcIixcIiA6IHQsIFxuXHRcdFx0cyA9IG4gPCAwID8gXCItXCIgOiBcIlwiLCBcblx0XHRcdGkgPSBwYXJzZUludChuID0gTWF0aC5hYnMoK24gfHwgMCkudG9GaXhlZChjKSkgKyBcIlwiLCBcblx0XHRcdGogPSAoaiA9IGkubGVuZ3RoKSA+IDMgPyBqICUgMyA6IDA7XG5cdFx0XHRyZXR1cm4gcyArIChqID8gaS5zdWJzdHIoMCwgaikgKyB0IDogXCJcIikgKyBpLnN1YnN0cihqKS5yZXBsYWNlKC8oXFxkezN9KSg/PVxcZCkvZywgXCIkMVwiICsgdCkgKyAoYyA/IGQgKyBNYXRoLmFicyhuIC0gaSkudG9GaXhlZChjKS5zbGljZSgyKSA6IFwiXCIpO1xuXHRcdH07XG5cdH1cblx0ZGlzYWJsZSgpIHtcblx0XHQkLmZuLmV4dGVuZCh7XG5cdFx0XHRkaXNhYmxlOiBmdW5jdGlvbihzdGF0ZSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmIChzdGF0ZSkge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5maW5kKCdzcGFuJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpLmZpbmQoJy5idG4tcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoJ3NwYW4nKS5zaG93KCk7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJykuZmluZCgnLmJ0bi1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRmb3JtTWVzc2FnZSgpIHtcblx0XHQkLmZuLnNob3dNZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSwgdHlwZSwgYWxlcnRDbGFzcykge1xuXHRcdFx0dmFyIGh0bWw7XG5cdFx0XHRodG1sID0gdm9pZCAwO1xuXHRcdFx0aWYgKGFsZXJ0Q2xhc3MgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRhbGVydENsYXNzID0gJyc7XG5cdFx0XHR9XG5cdFx0XHQkKCcuc3RhdHVzLW1lc3NhZ2UnKS5yZW1vdmUoKTtcblx0XHRcdGh0bWwgPSAnPGRpdiBjbGFzcz1cXCdzdGF0dXMtbWVzc2FnZSBlbGVtZW50LXRvcC0xMCAnICsgYWxlcnRDbGFzcyArICdcXCc+IDxkaXYgcm9sZT1cXCdhbGVydFxcJyBjbGFzcz1cXCdmYWRlLWluIGFsZXJ0IGFsZXJ0LWRpc21pc3NhYmxlIGFsZXJ0LScgKyB0eXBlICsgJ1xcJz4gPGJ1dHRvbiB0eXBlPVxcJ2J1dHRvblxcJyBjbGFzcz1cXCdjbG9zZVxcJyBkYXRhLWRpc21pc3M9XFwnYWxlcnRcXCc+IDxzcGFuIGFyaWEtaGlkZGVuPVxcJ3RydWVcXCc+PGkgY2xhc3M9XFwnZmEgZmEtdGltZXNcXCc+PC9pPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XFwnc3Itb25seVxcJz5DbG9zZTwvc3Bhbj4gPC9idXR0b24+JyArIG1lc3NhZ2UgKyAnPC9kaXY+PC9kaXY+Jztcblx0XHRcdHJldHVybiAkKGh0bWwpLmFwcGVuZFRvKHRoaXMpLmhpZGUoKS5mYWRlSW4oOTAwKTtcblx0XHR9O1xuXHR9XG5cdHNlcmlhbGl6ZUZvcm0oKSB7XG5cdFx0JC5mbi5zZXJpYWxpemVGb3JtID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZGF0YSwgbG9va3VwLCBwYXJzZSwgc2VsZWN0b3I7XG5cdFx0XHRkYXRhID0gdm9pZCAwO1xuXHRcdFx0bG9va3VwID0gdm9pZCAwO1xuXHRcdFx0cGFyc2UgPSB2b2lkIDA7XG5cdFx0XHRzZWxlY3RvciA9IHZvaWQgMDtcblx0XHRcdGlmICh0aGlzLmxlbmd0aCA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0ZGF0YSA9IHt9O1xuXHRcdFx0bG9va3VwID0gZGF0YTtcblx0XHRcdHNlbGVjdG9yID0gJzppbnB1dFt0eXBlIT1cImNoZWNrYm94XCJdW3R5cGUhPVwicmFkaW9cIl0sIGlucHV0OmNoZWNrZWQnO1xuXHRcdFx0cGFyc2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyICRlbCwgY2FwLCBpLCBuYW1lZDtcblx0XHRcdFx0JGVsID0gdm9pZCAwO1xuXHRcdFx0XHRjYXAgPSB2b2lkIDA7XG5cdFx0XHRcdGkgPSB2b2lkIDA7XG5cdFx0XHRcdG5hbWVkID0gdm9pZCAwO1xuXHRcdFx0XHRpZiAodGhpcy5kaXNhYmxlZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRuYW1lZCA9IHRoaXMubmFtZS5yZXBsYWNlKC9cXFsoW15cXF1dKyk/XFxdL2csICcsJDEnKS5zcGxpdCgnLCcpO1xuXHRcdFx0XHRjYXAgPSBuYW1lZC5sZW5ndGggLSAxO1xuXHRcdFx0XHQkZWwgPSAkKHRoaXMpO1xuXHRcdFx0XHRpZiAobmFtZWRbMF0pIHtcblx0XHRcdFx0XHRpID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoaSA8IGNhcCkge1xuXHRcdFx0XHRcdFx0bG9va3VwID0gbG9va3VwW25hbWVkW2ldXSA9IGxvb2t1cFtuYW1lZFtpXV0gfHwgKG5hbWVkW2kgKyAxXSA9PT0gJycgfHwgbmFtZWRbaSArIDFdID09PSAnMCcgPyBbXSA6IHt9KTtcblx0XHRcdFx0XHRcdGkrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGxvb2t1cC5sZW5ndGggIT09IHZvaWQgMCkge1xuXHRcdFx0XHRcdFx0bG9va3VwLnB1c2goJGVsLnZhbCgpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bG9va3VwW25hbWVkW2NhcF1dID0gJGVsLnZhbCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsb29rdXAgPSBkYXRhO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5maWx0ZXIoc2VsZWN0b3IpLmVhY2gocGFyc2UpO1xuXHRcdFx0dGhpcy5maW5kKHNlbGVjdG9yKS5lYWNoKHBhcnNlKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH07XG5cdH1cblx0c2V0dXBBamF4KCkge1xuXHRcdCQuYWpheFNldHVwKHtcblx0XHRcdHN0YXR1c0NvZGU6IHtcblx0XHRcdFx0NDAzOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdpbmRvdy5hbGVydCgnRm9yYmlkZGVuIGNvbnRlbnQhJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdDQwNDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJldHVybiB3aW5kb3cuYWxlcnQoJ1JlcXVlc3RlZCByb3V0ZSBub3QgZm91bmQhJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdDUwMDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJldHVybiB3aW5kb3cuYWxlcnQoJ0ludGVybmFsIHNlcnZlciBlcnJvciEnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNyb3NzRG9tYWluOiBmYWxzZSxcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRjYWNoZTogdHJ1ZSxcblx0XHRcdGFzeW5jOiBmYWxzZSxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J1gtQ1NSRi1Ub2tlbic6ICQoJ21ldGFbbmFtZT1cIl90XCJdJykuYXR0cignY29udGVudCcpXG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0iLCJleHBvcnQgY2xhc3MgUGx1Z2lucyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuaW5pdEJvb3RzdHJhcCgpO1xuXHRcdHZhciBzbGlkZXIgPSB7XCJpbml0XCI6XCIxXCIsXCJob21lX2luaXRcIjpcIjFcIn07XG5cblx0XHRpZiAoJCgnaW1nW2RhdGEtaW1hZ2UtcmVzaXplXScpWzBdKSB7XG5cdFx0XHQkLmVhY2goJCgnaW1nW2RhdGEtaW1hZ2UtcmVzaXplXScpLCBmdW5jdGlvbiAoaSwgZSkge1xuXHRcdFx0XHQkKGUpLnBhcmVudCgpLmltZ0xpcXVpZCh7XG5cdFx0XHRcdFx0ZmlsbDogdHJ1ZSxcblx0XHRcdFx0XHR2ZXJ0aWNhbEFsaWduOiAnY2VudGVyJyxcblx0XHRcdFx0XHRob3Jpem9udGFsQWxpZ246ICdjZW50ZXInXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gSm9iIHNlYXJjaDogQWR2YW5jZWQgU2VhcmNoIHRvZ2dsZVxuXHRcdGlmICggJCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbicpWzBdICkge1xuXHRcdFx0JCgnLmFkdmFuY2Utc2VhcmNoLXRvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGlmICgkKCcjYWR2YW5jZS1zZWFyY2gtb3B0aW9uOnZpc2libGUnKS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0JCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbicpLnNsaWRlVXAoKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0JCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbicpLnNsaWRlRG93bigpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHZhciBzY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXG5cdFx0aWYgKCBzY3JlZW5XaWR0aCA+IDc2NyApIHtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JCgnbGkubWVudS1pdGVtLWhhcy1jaGlsZHJlbiA+IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHQkKHRoaXMpLm5leHQoJy5zdWItbWVudScpLnNsaWRlVG9nZ2xlKCdmYXN0Jyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQkKCcjam9iLWNhdGVnb3J5LWRyb3Bkb3duJykubWluaW1hbGVjdCh7XG5cdFx0XHRwbGFjZWhvbGRlciA6ICdTZWxlY3QgSm9iIENhdGVnb3J5J1xuXHRcdH0pO1xuXG5cdFx0JCgnI2pvYi10eXBlLWRyb3Bkb3duJykubWluaW1hbGVjdCh7XG5cdFx0XHRwbGFjZWhvbGRlciA6ICdTZWxlY3QgSm9iIFR5cGUnXG5cdFx0fSk7XG5cdFx0XG5cdFx0aWYgKHNsaWRlci5pbml0KSB7XG5cdFx0XHRpZiAoJCgnc2VsZWN0I2V4cGVyaWVuY2VfbWluJylbMF0gJiYgJCgnc2VsZWN0I2V4cGVyaWVuY2VfbWF4JylbMF0pIHtcblx0XHRcdFx0JCgnc2VsZWN0I2V4cGVyaWVuY2VfbWluLCBzZWxlY3QjZXhwZXJpZW5jZV9tYXgnKS5zZWxlY3RUb1VJU2xpZGVyKHtcblx0XHRcdFx0XHRsYWJlbHM6IDEwLFxuXHRcdFx0XHRcdGxhYmVsU3JjOiAndGV4dCcsXG5cdFx0XHRcdFx0dG9vbHRpcDogdHJ1ZSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICgkKCdzZWxlY3Qjc2FsbGFyeV9taW4nKVswXSAmJiAkKCdzZWxlY3Qjc2FsbGFyeV9tYXgnKVswXSkge1xuXHRcdFx0XHQkKCdzZWxlY3Qjc2FsbGFyeV9taW4sIHNlbGVjdCNzYWxsYXJ5X21heCcpLnNlbGVjdFRvVUlTbGlkZXIoe1xuXHRcdFx0XHRcdGxhYmVsczoxMSxcblx0XHRcdFx0XHRsYWJlbFNyYzondGV4dCcsXG5cdFx0XHRcdFx0dG9vbHRpcDp0cnVlLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQkKCcjam9iLWxpc3RpbmctdGFicycpLnRhYnMoeyBoaWRlOiB7IGVmZmVjdDogXCJmYWRlXCIsIGR1cmF0aW9uOiAnZmFzdCcgfSwgc2hvdzogeyBlZmZlY3Q6IFwiZmFkZVwiLCBkdXJhdGlvbjogJ2Zhc3QnIH0gfSk7XG5cblx0XHR2YXIgc2NyZWVuV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcblxuXHRcdGlmICggc2NyZWVuV2lkdGggPCA3NjcgKSB7XG5cdFx0XHQkKCdsaS5oYXMtY2hpbGRyZW4gPiBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpe1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdCQodGhpcykubmV4dCgnLnN1Yi1tZW51Jykuc2xpZGVUb2dnbGUoJ2Zhc3QnKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICgkKCcjY291bnRyeVNlbGVjdG9yJylbMF0pIHtcblx0XHRcdHRoaXMuZm9ybUNvdW50cnlTZWxlY3RvckluaXQoKTtcblx0XHR9XG5cblx0XHRpZiAoJCgnLnN1bW1lcm5vdGUnKVswXSkge1xuXHRcdFx0JCgnLnN1bW1lcm5vdGUnKS5zdW1tZXJub3RlKHtkaWFsb2dzSW5Cb2R5OiB0cnVlfSk7XG5cdFx0fVxuXG5cdFx0aWYgKCQoJ1tkYXRhLWNoZWNrb3V0LXR5cGVdJylbMF0pIHtcblx0XHRcdHZhciBwYXltZW50UHJvY2Vzc2luZyA9IGZhbHNlO1xuXG5cdFx0XHQkLmVhY2goJCgnW2RhdGEtY2hlY2tvdXQtdHlwZV0nKSwgZnVuY3Rpb24gKGUsIGkpIHtcblx0XHRcdFx0JCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGlmICggISBwYXltZW50UHJvY2Vzc2luZykge1xuXHRcdFx0XHRcdFx0dmFyICRidXR0b24gPSAkKHRoaXMpO1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0cGF5bWVudFByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0JGJ1dHRvbi5kaXNhYmxlKHRydWUpO1xuXHRcdFx0XHRcdFx0dmFyIGNoZWNrb3V0X3R5cGUgPSAkYnV0dG9uLmRhdGEoJ2NoZWNrb3V0LXR5cGUnKTtcblx0XHRcdFx0XHRcdHZhciBwb3N0RGF0YSA9IHt9O1xuXG5cdFx0XHRcdFx0XHRpZiAoY2hlY2tvdXRfdHlwZSA9PSAxKSB7XG5cdFx0XHRcdFx0XHRcdHBvc3REYXRhID0ge1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6ICdwYXlwYWwnLFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBjaGVja291dF90eXBlXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGlmIChjaGVja291dF90eXBlID09IDIpIHtcblx0XHRcdFx0XHRcdFx0cG9zdERhdGEgPSB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogJ3BheXBhbCcsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IGNoZWNrb3V0X3R5cGUsXG5cdFx0XHRcdFx0XHRcdFx0YW1vdW50OiAkYnV0dG9uLnBhcmVudCgpLmZpbmQoJ2lucHV0W25hbWU9X2NyZWRfYW10XScpLnZhbCgpXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9hcGkvcGF5bWVudC9wcm9jZXNzLXBheW1lbnQnLCBwb3N0RGF0YSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIHdpbmRvdy5vcGVuKGUucmVkaXJlY3QpO1xuXHRcdFx0XHRcdFx0XHRlbHNlIGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRcdCRidXR0b24uZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdHBheW1lbnRQcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0XHRwYXltZW50UHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHQkYnV0dG9uLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQoJ0Fub3RoZXIgcGF5bWVudCBpcyBwcm9jZXNzaW5nLCBwbGVhc2Ugd2FpdC4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdGluaXRCb290c3RyYXAoKSB7XG5cdFx0JCgnLnBhbmVsLXRvb2x0aXAnKS50b29sdGlwKCk7XG5cdFx0JCgnW2RhdGEtdG9nZ2xlPVwicG9wb3ZlclwiXScpLnBvcG92ZXIoKTtcblxuXHRcdCQoJy5pbnB1dC1kYXRlcmFuZ2UgaW5wdXQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdCQodGhpcykuZGF0ZXBpY2tlcih7XG5cdFx0XHRcdGZvcm1hdDogXCJ5eXl5LW1tLWRkXCIsXG5cdFx0XHRcdHN0YXJ0RGF0ZTogXCIrMWRcIlxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblx0Zm9ybUNvdW50cnlTZWxlY3RvckluaXQoKSB7XG5cdFx0JC5hamF4KHtcblx0XHRcdHR5cGU6ICdnZXQnLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHR0eXBlOiBcImFsbFwiXG5cdFx0XHR9LFxuXHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0dXJsOiB3aW5kb3cub3JpZ2luICsgJy9hcGkvY291bnRyeScsXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuXHRcdFx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZCA9ICcnO1xuXHRcdFx0XHRcdFx0aWYgKCQoJyNjb3VudHJ5U2VsZWN0b3InKS5kYXRhKCd2YWx1ZScpICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHR2YXIgY291bnRyeVZhbHVlID0gJCgnI2NvdW50cnlTZWxlY3RvcicpLmRhdGEoJ3ZhbHVlJyk7XG5cdFx0XHRcdFx0XHRcdHNlbGVjdGVkID0gKGRhdGFba2V5XS5OYW1lID09PSBjb3VudHJ5VmFsdWUpID8gJ3NlbGVjdGVkPVwic2VsZWN0ZWRcIicgOiAnJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZCA9IChkYXRhW2tleV0uQ29kZSA9PT0gJ0dCUicpID8gJ3NlbGVjdGVkPVwic2VsZWN0ZWRcIicgOiAnJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdCQoJyNjb3VudHJ5U2VsZWN0b3InKS5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCInICsgZGF0YVtrZXldLk5hbWUgKyAnXCIgZGF0YS1jb2RlPVwiJyArIGRhdGFba2V5XS5Db2RlICsgJ1wiICcgKyBzZWxlY3RlZCArICc+JyArIGRhdGFba2V5XS5OYW1lICsnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCQoJyNjaXR5U2VsZWN0b3InKVswXSkge1xuXHRcdFx0XHRcdHZhciBwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnI2NpdHlTZWxlY3RvcicpLmVtcHR5KCk7XG5cblx0XHRcdFx0XHR2YXIgY2l0eVJlbG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0XHR0eXBlOiAnZ2V0Jyxcblx0XHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiAkKCcjY291bnRyeVNlbGVjdG9yIDpzZWxlY3RlZCcpLmRhdGEoJ2NvZGUnKVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdFx0XHRcdHVybDogd2luZG93Lm9yaWdpbiArICcvYXBpL2NpdHknLFxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoY2l0eURhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0JCgnI2NpdHlTZWxlY3RvcicpLmVtcHR5KCk7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGNpdHlEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoY2l0eURhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgc2VsZWN0ZWQgPSAnJztcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoJCgnI2NpdHlTZWxlY3RvcicpLmRhdGEoJ3ZhbHVlJykgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIGNpdHlWYWx1ZSA9ICQoJyNjaXR5U2VsZWN0b3InKS5kYXRhKCd2YWx1ZScpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkID0gKGNpdHlEYXRhW2tleV0uTmFtZSA9PT0gY2l0eVZhbHVlKSA/ICdzZWxlY3RlZD1cInNlbGVjdGVkXCInIDogJyc7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQkKCcjY2l0eVNlbGVjdG9yJykuYXBwZW5kKCc8b3B0aW9uIHZhbHVlPVwiJyArIGNpdHlEYXRhW2tleV0uTmFtZSArICdcIiAnICsgc2VsZWN0ZWQgKyAnPicgKyBjaXR5RGF0YVtrZXldLk5hbWUgKyc8L29wdGlvbj4nKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpcm0oXCJDYW5ub3QgbG9hZCBcIiArIGNvdW50cnkgKyBcIidzIGNpdHkgbGlzdCwgcmVsb2FkP1wiKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y2l0eVJlbG9hZCgpO1xuXG5cdFx0XHRcdFx0JCgnI2NvdW50cnlTZWxlY3RvcicpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmICggISBwcm9jZXNzaW5nKSBjaXR5UmVsb2FkKCk7XG5cdFx0XHRcdFx0XHRlbHNlIGFsZXJ0KCdQbGVhc2Ugd2FpdCB3aGlsZSBwcmV2aW91cyBsaXN0IHdhcyBsb2FkZWQuJyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdGlmIChjb25maXJtKCdDYW5ub3QgbG9hZCBjb3VudHJ5IGxpc3QsIHJlbG9hZD8nKSkge1xuXHRcdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0iXX0=
