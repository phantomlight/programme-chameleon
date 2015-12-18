(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/ford/web/www-job/resources/assets/js/front/app.js":[function(require,module,exports){
"use strict";

var _core = require("./core");

var _forms = require("./forms");

var _plugins = require("./plugins");

new _core.Core();
new _plugins.Plugins();
new _forms.Forms();

},{"./core":"/home/ford/web/www-job/resources/assets/js/front/core.js","./forms":"/home/ford/web/www-job/resources/assets/js/front/forms.js","./plugins":"/home/ford/web/www-job/resources/assets/js/front/plugins.js"}],"/home/ford/web/www-job/resources/assets/js/front/core.js":[function(require,module,exports){
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

},{}],"/home/ford/web/www-job/resources/assets/js/front/forms.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var jKey = { // jcryption aes key
	key1: 'VefT5WpnGT',
	key2: 'lRYj3IbU0e',
	pub_key: window.origin + '/gen',
	handshake: window.origin + '/handshake'
};

var Forms = (function () {
	function Forms() {
		_classCallCheck(this, Forms);

		if ($('#register-form')[0]) {
			this.initRegisterForm();
		}

		if ($('#login-form')[0]) {
			this.initLoginForm();
		}
	}

	_createClass(Forms, [{
		key: 'initRegisterForm',
		value: function initRegisterForm() {
			var aes;
			var $form = $('#register-form');
			var processing = false;
			var $route = $form.data('route');

			$form.find('[type=submit]').on('click', function (f) {
				if ($form.parsley().validate() && !processing) {
					processing = true;
					$('.page-preloader').show();
					aes = $.jCryption.encrypt(jKey.key1, jKey.key2);
					$form.find('[type=submit]').disable(true);

					$.jCryption.authenticate(aes, jKey.pub_key, jKey.handshake, function () {
						$.post($route, {
							data: JSON.stringify($.jCryption.encrypt($form.serialize(), aes))
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
					});
				}
			});
		}
	}, {
		key: 'initLoginForm',
		value: function initLoginForm() {
			var aes;
			var $form = $('#login-form');
			var processing = false;
			var $route = $form.data('route');

			$form.find('[type=submit]').on('click', function (f) {
				if ($form.parsley().validate() && !processing) {
					processing = true;
					$('.page-preloader').show();
					aes = $.jCryption.encrypt(jKey.key1, jKey.key2);
					$form.find('[type=submit]').disable(true);

					$.jCryption.authenticate(aes, jKey.pub_key, jKey.handshake, function () {
						$.post($route, {
							data: JSON.stringify($.jCryption.encrypt($form.serialize(), aes))
						}).done(function (e) {
							processing = false;
							$('.page-preloader').hide();
							$form.showMessage(e.message, e.type);
							$form.find('[type=submit]').disable(false);
							if (e.type === 'success') location.replace(e.redirect);
						}).fail(function (xhr, status, e) {
							processing = false;
							$('.page-preloader').hide();
							$form.showMessage(xhr.responseText, 'danger');
							$form.find('[type=submit]').disable(false);
						});
					});
				}
			});
		}
	}]);

	return Forms;
})();

exports.Forms = Forms;

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

},{}]},{},["/home/ford/web/www-job/resources/assets/js/front/app.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9mb3JkL3dlYi93d3ctam9iL3Jlc291cmNlcy9hc3NldHMvanMvZnJvbnQvYXBwLmpzIiwiL2hvbWUvZm9yZC93ZWIvd3d3LWpvYi9yZXNvdXJjZXMvYXNzZXRzL2pzL2Zyb250L2NvcmUuanMiLCIvaG9tZS9mb3JkL3dlYi93d3ctam9iL3Jlc291cmNlcy9hc3NldHMvanMvZnJvbnQvZm9ybXMuanMiLCIvaG9tZS9mb3JkL3dlYi93d3ctam9iL3Jlc291cmNlcy9hc3NldHMvanMvZnJvbnQvcGx1Z2lucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O29CQ0FxQixRQUFROztxQkFDUCxTQUFTOzt1QkFDUCxXQUFXOztBQUVuQyxnQkFBVSxDQUFDO0FBQ1gsc0JBQWEsQ0FBQztBQUNkLGtCQUFXLENBQUM7Ozs7Ozs7Ozs7Ozs7SUNOQyxJQUFJO0FBQ0wsVUFEQyxJQUFJLEdBQ0Y7d0JBREYsSUFBSTs7QUFFZixNQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDZixNQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkIsTUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ3JCLE1BQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7QUFFakIsUUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQztBQUMvQyxPQUFJLENBQUMsR0FBRyxJQUFJO09BQ1osQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO09BQ2xDLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDO09BQzVCLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUyxHQUFHLEdBQUcs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b3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IENvcmUgfSBmcm9tIFwiLi9jb3JlXCI7XG5pbXBvcnQgeyBGb3JtcyB9IGZyb20gXCIuL2Zvcm1zXCI7XG5pbXBvcnQgeyBQbHVnaW5zIH0gZnJvbSBcIi4vcGx1Z2luc1wiO1xuXG5uZXcgQ29yZSgpO1xubmV3IFBsdWdpbnMoKTtcbm5ldyBGb3JtcygpOyIsImV4cG9ydCBjbGFzcyBDb3JlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5kaXNhYmxlKCk7XG5cdFx0dGhpcy5mb3JtTWVzc2FnZSgpO1xuXHRcdHRoaXMuc2VyaWFsaXplRm9ybSgpO1xuXHRcdHRoaXMuc2V0dXBBamF4KCk7XG5cblx0XHROdW1iZXIucHJvdG90eXBlLmZvcm1hdE1vbmV5ID0gZnVuY3Rpb24oYywgZCwgdCl7XG5cdFx0XHR2YXIgbiA9IHRoaXMsIFxuXHRcdFx0YyA9IGlzTmFOKGMgPSBNYXRoLmFicyhjKSkgPyAyIDogYywgXG5cdFx0XHRkID0gZCA9PSB1bmRlZmluZWQgPyBcIi5cIiA6IGQsIFxuXHRcdFx0dCA9IHQgPT0gdW5kZWZpbmVkID8gXCIsXCIgOiB0LCBcblx0XHRcdHMgPSBuIDwgMCA/IFwiLVwiIDogXCJcIiwgXG5cdFx0XHRpID0gcGFyc2VJbnQobiA9IE1hdGguYWJzKCtuIHx8IDApLnRvRml4ZWQoYykpICsgXCJcIiwgXG5cdFx0XHRqID0gKGogPSBpLmxlbmd0aCkgPiAzID8gaiAlIDMgOiAwO1xuXHRcdFx0cmV0dXJuIHMgKyAoaiA/IGkuc3Vic3RyKDAsIGopICsgdCA6IFwiXCIpICsgaS5zdWJzdHIoaikucmVwbGFjZSgvKFxcZHszfSkoPz1cXGQpL2csIFwiJDFcIiArIHQpICsgKGMgPyBkICsgTWF0aC5hYnMobiAtIGkpLnRvRml4ZWQoYykuc2xpY2UoMikgOiBcIlwiKTtcblx0XHR9O1xuXHR9XG5cdGRpc2FibGUoKSB7XG5cdFx0JC5mbi5leHRlbmQoe1xuXHRcdFx0ZGlzYWJsZTogZnVuY3Rpb24oc3RhdGUpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoc3RhdGUpIHtcblx0XHRcdFx0XHRcdCQodGhpcykuZmluZCgnc3BhbicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKS5maW5kKCcuYnRuLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5maW5kKCdzcGFuJykuc2hvdygpO1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpLmZpbmQoJy5idG4tcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0Zm9ybU1lc3NhZ2UoKSB7XG5cdFx0JC5mbi5zaG93TWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHR5cGUsIGFsZXJ0Q2xhc3MpIHtcblx0XHRcdHZhciBodG1sO1xuXHRcdFx0aHRtbCA9IHZvaWQgMDtcblx0XHRcdGlmIChhbGVydENsYXNzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0YWxlcnRDbGFzcyA9ICcnO1xuXHRcdFx0fVxuXHRcdFx0JCgnLnN0YXR1cy1tZXNzYWdlJykucmVtb3ZlKCk7XG5cdFx0XHRodG1sID0gJzxkaXYgY2xhc3M9XFwnc3RhdHVzLW1lc3NhZ2UgZWxlbWVudC10b3AtMTAgJyArIGFsZXJ0Q2xhc3MgKyAnXFwnPiA8ZGl2IHJvbGU9XFwnYWxlcnRcXCcgY2xhc3M9XFwnZmFkZS1pbiBhbGVydCBhbGVydC1kaXNtaXNzYWJsZSBhbGVydC0nICsgdHlwZSArICdcXCc+IDxidXR0b24gdHlwZT1cXCdidXR0b25cXCcgY2xhc3M9XFwnY2xvc2VcXCcgZGF0YS1kaXNtaXNzPVxcJ2FsZXJ0XFwnPiA8c3BhbiBhcmlhLWhpZGRlbj1cXCd0cnVlXFwnPjxpIGNsYXNzPVxcJ2ZhIGZhLXRpbWVzXFwnPjwvaT48L3NwYW4+IDxzcGFuIGNsYXNzPVxcJ3NyLW9ubHlcXCc+Q2xvc2U8L3NwYW4+IDwvYnV0dG9uPicgKyBtZXNzYWdlICsgJzwvZGl2PjwvZGl2Pic7XG5cdFx0XHRyZXR1cm4gJChodG1sKS5hcHBlbmRUbyh0aGlzKS5oaWRlKCkuZmFkZUluKDkwMCk7XG5cdFx0fTtcblx0fVxuXHRzZXJpYWxpemVGb3JtKCkge1xuXHRcdCQuZm4uc2VyaWFsaXplRm9ybSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGRhdGEsIGxvb2t1cCwgcGFyc2UsIHNlbGVjdG9yO1xuXHRcdFx0ZGF0YSA9IHZvaWQgMDtcblx0XHRcdGxvb2t1cCA9IHZvaWQgMDtcblx0XHRcdHBhcnNlID0gdm9pZCAwO1xuXHRcdFx0c2VsZWN0b3IgPSB2b2lkIDA7XG5cdFx0XHRpZiAodGhpcy5sZW5ndGggPCAxKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGRhdGEgPSB7fTtcblx0XHRcdGxvb2t1cCA9IGRhdGE7XG5cdFx0XHRzZWxlY3RvciA9ICc6aW5wdXRbdHlwZSE9XCJjaGVja2JveFwiXVt0eXBlIT1cInJhZGlvXCJdLCBpbnB1dDpjaGVja2VkJztcblx0XHRcdHBhcnNlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciAkZWwsIGNhcCwgaSwgbmFtZWQ7XG5cdFx0XHRcdCRlbCA9IHZvaWQgMDtcblx0XHRcdFx0Y2FwID0gdm9pZCAwO1xuXHRcdFx0XHRpID0gdm9pZCAwO1xuXHRcdFx0XHRuYW1lZCA9IHZvaWQgMDtcblx0XHRcdFx0aWYgKHRoaXMuZGlzYWJsZWQpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0bmFtZWQgPSB0aGlzLm5hbWUucmVwbGFjZSgvXFxbKFteXFxdXSspP1xcXS9nLCAnLCQxJykuc3BsaXQoJywnKTtcblx0XHRcdFx0Y2FwID0gbmFtZWQubGVuZ3RoIC0gMTtcblx0XHRcdFx0JGVsID0gJCh0aGlzKTtcblx0XHRcdFx0aWYgKG5hbWVkWzBdKSB7XG5cdFx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKGkgPCBjYXApIHtcblx0XHRcdFx0XHRcdGxvb2t1cCA9IGxvb2t1cFtuYW1lZFtpXV0gPSBsb29rdXBbbmFtZWRbaV1dIHx8IChuYW1lZFtpICsgMV0gPT09ICcnIHx8IG5hbWVkW2kgKyAxXSA9PT0gJzAnID8gW10gOiB7fSk7XG5cdFx0XHRcdFx0XHRpKys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChsb29rdXAubGVuZ3RoICE9PSB2b2lkIDApIHtcblx0XHRcdFx0XHRcdGxvb2t1cC5wdXNoKCRlbC52YWwoKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGxvb2t1cFtuYW1lZFtjYXBdXSA9ICRlbC52YWwoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bG9va3VwID0gZGF0YTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHRoaXMuZmlsdGVyKHNlbGVjdG9yKS5lYWNoKHBhcnNlKTtcblx0XHRcdHRoaXMuZmluZChzZWxlY3RvcikuZWFjaChwYXJzZSk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9O1xuXHR9XG5cdHNldHVwQWpheCgpIHtcblx0XHQkLmFqYXhTZXR1cCh7XG5cdFx0XHRzdGF0dXNDb2RlOiB7XG5cdFx0XHRcdDQwMzogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJldHVybiB3aW5kb3cuYWxlcnQoJ0ZvcmJpZGRlbiBjb250ZW50IScpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQ0MDQ6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRyZXR1cm4gd2luZG93LmFsZXJ0KCdSZXF1ZXN0ZWQgcm91dGUgbm90IGZvdW5kIScpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQ1MDA6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRyZXR1cm4gd2luZG93LmFsZXJ0KCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3IhJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjcm9zc0RvbWFpbjogZmFsc2UsXG5cdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0Y2FjaGU6IHRydWUsXG5cdFx0XHRhc3luYzogZmFsc2UsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdYLUNTUkYtVG9rZW4nOiAkKCdtZXRhW25hbWU9XCJfdFwiXScpLmF0dHIoJ2NvbnRlbnQnKVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59IiwiY29uc3QgaktleSA9IHsgLy8gamNyeXB0aW9uIGFlcyBrZXlcblx0a2V5MTogJ1ZlZlQ1V3BuR1QnLFxuXHRrZXkyOiAnbFJZajNJYlUwZScsXG5cdHB1Yl9rZXk6IFx0d2luZG93Lm9yaWdpbiArICcvZ2VuJyxcblx0aGFuZHNoYWtlOiB3aW5kb3cub3JpZ2luICsgJy9oYW5kc2hha2UnXG59XG5cbmV4cG9ydCBjbGFzcyBGb3JtcyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGlmICgkKCcjcmVnaXN0ZXItZm9ybScpWzBdKSB7XG5cdFx0XHR0aGlzLmluaXRSZWdpc3RlckZvcm0oKTtcblx0XHR9XG5cblx0XHRpZiAoJCgnI2xvZ2luLWZvcm0nKVswXSkge1xuXHRcdFx0dGhpcy5pbml0TG9naW5Gb3JtKCk7XG5cdFx0fVxuXHR9XG5cdGluaXRSZWdpc3RlckZvcm0oKSB7XG5cdFx0dmFyIGFlcztcblx0XHR2YXIgJGZvcm0gPSAkKCcjcmVnaXN0ZXItZm9ybScpO1xuXHRcdHZhciBwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0dmFyICRyb3V0ZSA9ICRmb3JtLmRhdGEoJ3JvdXRlJyk7XG5cblx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGYpIHtcblx0XHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoKSAmJiAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0YWVzID0gJC5qQ3J5cHRpb24uZW5jcnlwdChqS2V5LmtleTEsIGpLZXkua2V5Mik7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXG5cdFx0XHRcdCQuakNyeXB0aW9uLmF1dGhlbnRpY2F0ZShhZXMsIGpLZXkucHViX2tleSwgaktleS5oYW5kc2hha2UsIChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JC5wb3N0KCRyb3V0ZSwge1xuXHRcdFx0XHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoJC5qQ3J5cHRpb24uZW5jcnlwdCgkZm9ybS5zZXJpYWxpemUoKSwgYWVzKSlcblx0XHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKGUubWVzc2FnZSwgZS50eXBlKTtcblx0XHRcdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCwgJ2RhbmdlcicpO1xuXHRcdFx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0aW5pdExvZ2luRm9ybSgpIHtcblx0XHR2YXIgYWVzO1xuXHRcdHZhciAkZm9ybSA9ICQoJyNsb2dpbi1mb3JtJyk7XG5cdFx0dmFyIHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHR2YXIgJHJvdXRlID0gJGZvcm0uZGF0YSgncm91dGUnKTtcblxuXHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZikge1xuXHRcdFx0aWYgKCRmb3JtLnBhcnNsZXkoKS52YWxpZGF0ZSgpICYmICEgcHJvY2Vzc2luZykge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHRhZXMgPSAkLmpDcnlwdGlvbi5lbmNyeXB0KGpLZXkua2V5MSwgaktleS5rZXkyKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUodHJ1ZSk7XG5cblx0XHRcdFx0JC5qQ3J5cHRpb24uYXV0aGVudGljYXRlKGFlcywgaktleS5wdWJfa2V5LCBqS2V5LmhhbmRzaGFrZSwgKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHQkLnBvc3QoJHJvdXRlLCB7XG5cdFx0XHRcdFx0XHRkYXRhOiBKU09OLnN0cmluZ2lmeSgkLmpDcnlwdGlvbi5lbmNyeXB0KCRmb3JtLnNlcmlhbGl6ZSgpLCBhZXMpKVxuXHRcdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoZS5tZXNzYWdlLCBlLnR5cGUpO1xuXHRcdFx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSBsb2NhdGlvbi5yZXBsYWNlKGUucmVkaXJlY3QpO1xuXHRcdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSh4aHIucmVzcG9uc2VUZXh0LCAnZGFuZ2VyJyk7XG5cdFx0XHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSIsImV4cG9ydCBjbGFzcyBQbHVnaW5zIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5pbml0Qm9vdHN0cmFwKCk7XG5cdFx0dmFyIHNsaWRlciA9IHtcImluaXRcIjpcIjFcIixcImhvbWVfaW5pdFwiOlwiMVwifTtcblxuXHRcdGlmICgkKCdpbWdbZGF0YS1pbWFnZS1yZXNpemVdJylbMF0pIHtcblx0XHRcdCQuZWFjaCgkKCdpbWdbZGF0YS1pbWFnZS1yZXNpemVdJyksIGZ1bmN0aW9uIChpLCBlKSB7XG5cdFx0XHRcdCQoZSkucGFyZW50KCkuaW1nTGlxdWlkKHtcblx0XHRcdFx0XHRmaWxsOiB0cnVlLFxuXHRcdFx0XHRcdHZlcnRpY2FsQWxpZ246ICdjZW50ZXInLFxuXHRcdFx0XHRcdGhvcml6b250YWxBbGlnbjogJ2NlbnRlcidcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBKb2Igc2VhcmNoOiBBZHZhbmNlZCBTZWFyY2ggdG9nZ2xlXG5cdFx0aWYgKCAkKCcjYWR2YW5jZS1zZWFyY2gtb3B0aW9uJylbMF0gKSB7XG5cdFx0XHQkKCcuYWR2YW5jZS1zZWFyY2gtdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0aWYgKCQoJyNhZHZhbmNlLXNlYXJjaC1vcHRpb246dmlzaWJsZScpLmxlbmd0aCApIHtcblx0XHRcdFx0XHQkKCcjYWR2YW5jZS1zZWFyY2gtb3B0aW9uJykuc2xpZGVVcCgpO1xuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHQkKCcjYWR2YW5jZS1zZWFyY2gtb3B0aW9uJykuc2xpZGVEb3duKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0dmFyIHNjcmVlbldpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG5cblx0XHRpZiAoIHNjcmVlbldpZHRoID4gNzY3ICkge1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkKCdsaS5tZW51LWl0ZW0taGFzLWNoaWxkcmVuID4gYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdCQodGhpcykubmV4dCgnLnN1Yi1tZW51Jykuc2xpZGVUb2dnbGUoJ2Zhc3QnKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdCQoJyNqb2ItY2F0ZWdvcnktZHJvcGRvd24nKS5taW5pbWFsZWN0KHtcblx0XHRcdHBsYWNlaG9sZGVyIDogJ1NlbGVjdCBKb2IgQ2F0ZWdvcnknXG5cdFx0fSk7XG5cblx0XHQkKCcjam9iLXR5cGUtZHJvcGRvd24nKS5taW5pbWFsZWN0KHtcblx0XHRcdHBsYWNlaG9sZGVyIDogJ1NlbGVjdCBKb2IgVHlwZSdcblx0XHR9KTtcblx0XHRcblx0XHRpZiAoc2xpZGVyLmluaXQpIHtcblx0XHRcdGlmICgkKCdzZWxlY3QjZXhwZXJpZW5jZV9taW4nKVswXSAmJiAkKCdzZWxlY3QjZXhwZXJpZW5jZV9tYXgnKVswXSkge1xuXHRcdFx0XHQkKCdzZWxlY3QjZXhwZXJpZW5jZV9taW4sIHNlbGVjdCNleHBlcmllbmNlX21heCcpLnNlbGVjdFRvVUlTbGlkZXIoe1xuXHRcdFx0XHRcdGxhYmVsczogMTAsXG5cdFx0XHRcdFx0bGFiZWxTcmM6ICd0ZXh0Jyxcblx0XHRcdFx0XHR0b29sdGlwOiB0cnVlLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCQoJ3NlbGVjdCNzYWxhcnlfbWluJylbMF0gJiYgJCgnc2VsZWN0I3NhbGFyeV9tYXgnKVswXSkge1xuXHRcdFx0XHQkKCdzZWxlY3Qjc2FsYXJ5X21pbiwgc2VsZWN0I3NhbGFyeV9tYXgnKS5zZWxlY3RUb1VJU2xpZGVyKHtcblx0XHRcdFx0XHRsYWJlbHM6MTEsXG5cdFx0XHRcdFx0bGFiZWxTcmM6J3RleHQnLFxuXHRcdFx0XHRcdHRvb2x0aXA6dHJ1ZSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0JCgnI2pvYi1saXN0aW5nLXRhYnMnKS50YWJzKHsgaGlkZTogeyBlZmZlY3Q6IFwiZmFkZVwiLCBkdXJhdGlvbjogJ2Zhc3QnIH0sIHNob3c6IHsgZWZmZWN0OiBcImZhZGVcIiwgZHVyYXRpb246ICdmYXN0JyB9IH0pO1xuXG5cdFx0dmFyIHNjcmVlbldpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG5cblx0XHRpZiAoIHNjcmVlbldpZHRoIDwgNzY3ICkge1xuXHRcdFx0JCgnbGkuaGFzLWNoaWxkcmVuID4gYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKXtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHQkKHRoaXMpLm5leHQoJy5zdWItbWVudScpLnNsaWRlVG9nZ2xlKCdmYXN0Jyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAoJCgnI2NvdW50cnlTZWxlY3RvcicpWzBdKSB7XG5cdFx0XHR0aGlzLmZvcm1Db3VudHJ5U2VsZWN0b3JJbml0KCk7XG5cdFx0fVxuXG5cdFx0aWYgKCQoJy5zdW1tZXJub3RlJylbMF0pIHtcblx0XHRcdCQoJy5zdW1tZXJub3RlJykuc3VtbWVybm90ZSh7ZGlhbG9nc0luQm9keTogdHJ1ZX0pO1xuXHRcdH1cblxuXHRcdGlmICgkKCdbZGF0YS1jaGVja291dC10eXBlXScpWzBdKSB7XG5cdFx0XHR2YXIgcGF5bWVudFByb2Nlc3NpbmcgPSBmYWxzZTtcblxuXHRcdFx0JC5lYWNoKCQoJ1tkYXRhLWNoZWNrb3V0LXR5cGVdJyksIGZ1bmN0aW9uIChlLCBpKSB7XG5cdFx0XHRcdCQodGhpcykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRpZiAoICEgcGF5bWVudFByb2Nlc3NpbmcpIHtcblx0XHRcdFx0XHRcdHZhciAkYnV0dG9uID0gJCh0aGlzKTtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdHBheW1lbnRQcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0XHRcdCRidXR0b24uZGlzYWJsZSh0cnVlKTtcblx0XHRcdFx0XHRcdHZhciBjaGVja291dF90eXBlID0gJGJ1dHRvbi5kYXRhKCdjaGVja291dC10eXBlJyk7XG5cdFx0XHRcdFx0XHR2YXIgcG9zdERhdGEgPSB7fTtcblxuXHRcdFx0XHRcdFx0aWYgKGNoZWNrb3V0X3R5cGUgPT0gMSkge1xuXHRcdFx0XHRcdFx0XHRwb3N0RGF0YSA9IHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiAncGF5cGFsJyxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogY2hlY2tvdXRfdHlwZVxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSBpZiAoY2hlY2tvdXRfdHlwZSA9PSAyKSB7XG5cdFx0XHRcdFx0XHRcdHBvc3REYXRhID0ge1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6ICdwYXlwYWwnLFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBjaGVja291dF90eXBlLFxuXHRcdFx0XHRcdFx0XHRcdGFtb3VudDogJGJ1dHRvbi5wYXJlbnQoKS5maW5kKCdpbnB1dFtuYW1lPV9jcmVkX2FtdF0nKS52YWwoKVxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvYXBpL3BheW1lbnQvcHJvY2Vzcy1wYXltZW50JywgcG9zdERhdGEpLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSB3aW5kb3cub3BlbihlLnJlZGlyZWN0KTtcblx0XHRcdFx0XHRcdFx0ZWxzZSBhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHQkYnV0dG9uLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHRwYXltZW50UHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0XHRwYXltZW50UHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRcdCRidXR0b24uZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRhbGVydCgnQW5vdGhlciBwYXltZW50IGlzIHByb2Nlc3NpbmcsIHBsZWFzZSB3YWl0LicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblx0aW5pdEJvb3RzdHJhcCgpIHtcblx0XHQkKCcucGFuZWwtdG9vbHRpcCcpLnRvb2x0aXAoKTtcblx0XHQkKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJykucG9wb3ZlcigpO1xuXG5cdFx0JCgnLmlucHV0LWRhdGVyYW5nZSBpbnB1dCcpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0JCh0aGlzKS5kYXRlcGlja2VyKHtcblx0XHRcdFx0Zm9ybWF0OiBcInl5eXktbW0tZGRcIixcblx0XHRcdFx0c3RhcnREYXRlOiBcIisxZFwiXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXHRmb3JtQ291bnRyeVNlbGVjdG9ySW5pdCgpIHtcblx0XHQkLmFqYXgoe1xuXHRcdFx0dHlwZTogJ2dldCcsXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdHR5cGU6IFwiYWxsXCJcblx0XHRcdH0sXG5cdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHR1cmw6IHdpbmRvdy5vcmlnaW4gKyAnL2FwaS9jb3VudHJ5Jyxcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG5cdFx0XHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0dmFyIHNlbGVjdGVkID0gJyc7XG5cdFx0XHRcdFx0XHRpZiAoJCgnI2NvdW50cnlTZWxlY3RvcicpLmRhdGEoJ3ZhbHVlJykgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBjb3VudHJ5VmFsdWUgPSAkKCcjY291bnRyeVNlbGVjdG9yJykuZGF0YSgndmFsdWUnKTtcblx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQgPSAoZGF0YVtrZXldLk5hbWUgPT09IGNvdW50cnlWYWx1ZSkgPyAnc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJyA6ICcnO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHNlbGVjdGVkID0gKGRhdGFba2V5XS5Db2RlID09PSAnR0JSJykgPyAnc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJyA6ICcnO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0JCgnI2NvdW50cnlTZWxlY3RvcicpLmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBkYXRhW2tleV0uTmFtZSArICdcIiBkYXRhLWNvZGU9XCInICsgZGF0YVtrZXldLkNvZGUgKyAnXCIgJyArIHNlbGVjdGVkICsgJz4nICsgZGF0YVtrZXldLk5hbWUgKyc8L29wdGlvbj4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoJCgnI2NpdHlTZWxlY3RvcicpWzBdKSB7XG5cdFx0XHRcdFx0dmFyIHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcjY2l0eVNlbGVjdG9yJykuZW1wdHkoKTtcblxuXHRcdFx0XHRcdHZhciBjaXR5UmVsb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHRcdHR5cGU6ICdnZXQnLFxuXHRcdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6ICQoJyNjb3VudHJ5U2VsZWN0b3IgOnNlbGVjdGVkJykuZGF0YSgnY29kZScpXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0XHRcdFx0dXJsOiB3aW5kb3cub3JpZ2luICsgJy9hcGkvY2l0eScsXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChjaXR5RGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHQkKCcjY2l0eVNlbGVjdG9yJykuZW1wdHkoKTtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gY2l0eURhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChjaXR5RGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZCA9ICcnO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICgkKCcjY2l0eVNlbGVjdG9yJykuZGF0YSgndmFsdWUnKSAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgY2l0eVZhbHVlID0gJCgnI2NpdHlTZWxlY3RvcicpLmRhdGEoJ3ZhbHVlJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQgPSAoY2l0eURhdGFba2V5XS5OYW1lID09PSBjaXR5VmFsdWUpID8gJ3NlbGVjdGVkPVwic2VsZWN0ZWRcIicgOiAnJztcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQoJyNjaXR5U2VsZWN0b3InKS5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCInICsgY2l0eURhdGFba2V5XS5OYW1lICsgJ1wiICcgKyBzZWxlY3RlZCArICc+JyArIGNpdHlEYXRhW2tleV0uTmFtZSArJzwvb3B0aW9uPicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY29uZmlybShcIkNhbm5vdCBsb2FkIFwiICsgY291bnRyeSArIFwiJ3MgY2l0eSBsaXN0LCByZWxvYWQ/XCIpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRjaXR5UmVsb2FkKCk7XG5cblx0XHRcdFx0XHQkKCcjY291bnRyeVNlbGVjdG9yJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aWYgKCAhIHByb2Nlc3NpbmcpIGNpdHlSZWxvYWQoKTtcblx0XHRcdFx0XHRcdGVsc2UgYWxlcnQoJ1BsZWFzZSB3YWl0IHdoaWxlIHByZXZpb3VzIGxpc3Qgd2FzIGxvYWRlZC4nKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0aWYgKGNvbmZpcm0oJ0Nhbm5vdCBsb2FkIGNvdW50cnkgbGlzdCwgcmVsb2FkPycpKSB7XG5cdFx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSJdfQ==
