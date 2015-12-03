(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/ford/web/www-job/resources/assets/js/front/agency.js":[function(require,module,exports){
"use strict";

var _core = require("./core");

var _plugins = require("./plugins");

var $form;
var processing = false;

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

},{}]},{},["/home/ford/web/www-job/resources/assets/js/front/agency.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9mb3JkL3dlYi93d3ctam9iL3Jlc291cmNlcy9hc3NldHMvanMvZnJvbnQvYWdlbmN5LmpzIiwiL2hvbWUvZm9yZC93ZWIvd3d3LWpvYi9yZXNvdXJjZXMvYXNzZXRzL2pzL2Zyb250L2NvcmUuanMiLCIvaG9tZS9mb3JkL3dlYi93d3ctam9iL3Jlc291cmNlcy9hc3NldHMvanMvZnJvbnQvcGx1Z2lucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O29CQ0FxQixRQUFROzt1QkFDTCxXQUFXOztBQUVuQyxJQUFJLEtBQUssQ0FBQztBQUNWLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQzs7Ozs7Ozs7Ozs7OztJQ0pWLElBQUk7QUFDTCxVQURDLElBQUksR0FDRjt3QkFERixJQUFJOztBQUVmLE1BQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNmLE1BQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuQixNQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDckIsTUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztBQUVqQixRQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDO0FBQy9DLE9BQUksQ0FBQyxHQUFHLElBQUk7T0FDWixDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7T0FDbEMsQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUM7T0FDNUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUM7T0FDNUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUU7T0FDcEIs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LFNBQUssRUFBRSxlQUFVLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLFNBQUksT0FBTyxDQUFDLG1DQUFtQyxDQUFDLEVBQUU7QUFDakQsY0FBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO01BQ2xCO0tBQ0Q7SUFDRCxDQUFDLENBQUM7R0FDSDs7O1FBck5XLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgQ29yZSB9IGZyb20gXCIuL2NvcmVcIjtcbmltcG9ydCB7IFBsdWdpbnMgfSBmcm9tIFwiLi9wbHVnaW5zXCI7XG5cbnZhciAkZm9ybTtcbnZhciBwcm9jZXNzaW5nID0gZmFsc2U7XG4iLCJleHBvcnQgY2xhc3MgQ29yZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuZGlzYWJsZSgpO1xuXHRcdHRoaXMuZm9ybU1lc3NhZ2UoKTtcblx0XHR0aGlzLnNlcmlhbGl6ZUZvcm0oKTtcblx0XHR0aGlzLnNldHVwQWpheCgpO1xuXG5cdFx0TnVtYmVyLnByb3RvdHlwZS5mb3JtYXRNb25leSA9IGZ1bmN0aW9uKGMsIGQsIHQpe1xuXHRcdFx0dmFyIG4gPSB0aGlzLCBcblx0XHRcdGMgPSBpc05hTihjID0gTWF0aC5hYnMoYykpID8gMiA6IGMsIFxuXHRcdFx0ZCA9IGQgPT0gdW5kZWZpbmVkID8gXCIuXCIgOiBkLCBcblx0XHRcdHQgPSB0ID09IHVuZGVmaW5lZCA/IFwiLFwiIDogdCwgXG5cdFx0XHRzID0gbiA8IDAgPyBcIi1cIiA6IFwiXCIsIFxuXHRcdFx0aSA9IHBhcnNlSW50KG4gPSBNYXRoLmFicygrbiB8fCAwKS50b0ZpeGVkKGMpKSArIFwiXCIsIFxuXHRcdFx0aiA9IChqID0gaS5sZW5ndGgpID4gMyA/IGogJSAzIDogMDtcblx0XHRcdHJldHVybiBzICsgKGogPyBpLnN1YnN0cigwLCBqKSArIHQgOiBcIlwiKSArIGkuc3Vic3RyKGopLnJlcGxhY2UoLyhcXGR7M30pKD89XFxkKS9nLCBcIiQxXCIgKyB0KSArIChjID8gZCArIE1hdGguYWJzKG4gLSBpKS50b0ZpeGVkKGMpLnNsaWNlKDIpIDogXCJcIik7XG5cdFx0fTtcblx0fVxuXHRkaXNhYmxlKCkge1xuXHRcdCQuZm4uZXh0ZW5kKHtcblx0XHRcdGRpc2FibGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKHN0YXRlKSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoJ3NwYW4nKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJykuZmluZCgnLmJ0bi1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCQodGhpcykuZmluZCgnc3BhbicpLnNob3coKTtcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQXR0cignZGlzYWJsZWQnKS5maW5kKCcuYnRuLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdGZvcm1NZXNzYWdlKCkge1xuXHRcdCQuZm4uc2hvd01lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlLCB0eXBlLCBhbGVydENsYXNzKSB7XG5cdFx0XHR2YXIgaHRtbDtcblx0XHRcdGh0bWwgPSB2b2lkIDA7XG5cdFx0XHRpZiAoYWxlcnRDbGFzcyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGFsZXJ0Q2xhc3MgPSAnJztcblx0XHRcdH1cblx0XHRcdCQoJy5zdGF0dXMtbWVzc2FnZScpLnJlbW92ZSgpO1xuXHRcdFx0aHRtbCA9ICc8ZGl2IGNsYXNzPVxcJ3N0YXR1cy1tZXNzYWdlIGVsZW1lbnQtdG9wLTEwICcgKyBhbGVydENsYXNzICsgJ1xcJz4gPGRpdiByb2xlPVxcJ2FsZXJ0XFwnIGNsYXNzPVxcJ2ZhZGUtaW4gYWxlcnQgYWxlcnQtZGlzbWlzc2FibGUgYWxlcnQtJyArIHR5cGUgKyAnXFwnPiA8YnV0dG9uIHR5cGU9XFwnYnV0dG9uXFwnIGNsYXNzPVxcJ2Nsb3NlXFwnIGRhdGEtZGlzbWlzcz1cXCdhbGVydFxcJz4gPHNwYW4gYXJpYS1oaWRkZW49XFwndHJ1ZVxcJz48aSBjbGFzcz1cXCdmYSBmYS10aW1lc1xcJz48L2k+PC9zcGFuPiA8c3BhbiBjbGFzcz1cXCdzci1vbmx5XFwnPkNsb3NlPC9zcGFuPiA8L2J1dHRvbj4nICsgbWVzc2FnZSArICc8L2Rpdj48L2Rpdj4nO1xuXHRcdFx0cmV0dXJuICQoaHRtbCkuYXBwZW5kVG8odGhpcykuaGlkZSgpLmZhZGVJbig5MDApO1xuXHRcdH07XG5cdH1cblx0c2VyaWFsaXplRm9ybSgpIHtcblx0XHQkLmZuLnNlcmlhbGl6ZUZvcm0gPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBkYXRhLCBsb29rdXAsIHBhcnNlLCBzZWxlY3Rvcjtcblx0XHRcdGRhdGEgPSB2b2lkIDA7XG5cdFx0XHRsb29rdXAgPSB2b2lkIDA7XG5cdFx0XHRwYXJzZSA9IHZvaWQgMDtcblx0XHRcdHNlbGVjdG9yID0gdm9pZCAwO1xuXHRcdFx0aWYgKHRoaXMubGVuZ3RoIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRkYXRhID0ge307XG5cdFx0XHRsb29rdXAgPSBkYXRhO1xuXHRcdFx0c2VsZWN0b3IgPSAnOmlucHV0W3R5cGUhPVwiY2hlY2tib3hcIl1bdHlwZSE9XCJyYWRpb1wiXSwgaW5wdXQ6Y2hlY2tlZCc7XG5cdFx0XHRwYXJzZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgJGVsLCBjYXAsIGksIG5hbWVkO1xuXHRcdFx0XHQkZWwgPSB2b2lkIDA7XG5cdFx0XHRcdGNhcCA9IHZvaWQgMDtcblx0XHRcdFx0aSA9IHZvaWQgMDtcblx0XHRcdFx0bmFtZWQgPSB2b2lkIDA7XG5cdFx0XHRcdGlmICh0aGlzLmRpc2FibGVkKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG5hbWVkID0gdGhpcy5uYW1lLnJlcGxhY2UoL1xcWyhbXlxcXV0rKT9cXF0vZywgJywkMScpLnNwbGl0KCcsJyk7XG5cdFx0XHRcdGNhcCA9IG5hbWVkLmxlbmd0aCAtIDE7XG5cdFx0XHRcdCRlbCA9ICQodGhpcyk7XG5cdFx0XHRcdGlmIChuYW1lZFswXSkge1xuXHRcdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRcdHdoaWxlIChpIDwgY2FwKSB7XG5cdFx0XHRcdFx0XHRsb29rdXAgPSBsb29rdXBbbmFtZWRbaV1dID0gbG9va3VwW25hbWVkW2ldXSB8fCAobmFtZWRbaSArIDFdID09PSAnJyB8fCBuYW1lZFtpICsgMV0gPT09ICcwJyA/IFtdIDoge30pO1xuXHRcdFx0XHRcdFx0aSsrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAobG9va3VwLmxlbmd0aCAhPT0gdm9pZCAwKSB7XG5cdFx0XHRcdFx0XHRsb29rdXAucHVzaCgkZWwudmFsKCkpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRsb29rdXBbbmFtZWRbY2FwXV0gPSAkZWwudmFsKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxvb2t1cCA9IGRhdGE7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR0aGlzLmZpbHRlcihzZWxlY3RvcikuZWFjaChwYXJzZSk7XG5cdFx0XHR0aGlzLmZpbmQoc2VsZWN0b3IpLmVhY2gocGFyc2UpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fTtcblx0fVxuXHRzZXR1cEFqYXgoKSB7XG5cdFx0JC5hamF4U2V0dXAoe1xuXHRcdFx0c3RhdHVzQ29kZToge1xuXHRcdFx0XHQ0MDM6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRyZXR1cm4gd2luZG93LmFsZXJ0KCdGb3JiaWRkZW4gY29udGVudCEnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0NDA0OiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdpbmRvdy5hbGVydCgnUmVxdWVzdGVkIHJvdXRlIG5vdCBmb3VuZCEnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0NTAwOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdpbmRvdy5hbGVydCgnSW50ZXJuYWwgc2VydmVyIGVycm9yIScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y3Jvc3NEb21haW46IGZhbHNlLFxuXHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdGNhY2hlOiB0cnVlLFxuXHRcdFx0YXN5bmM6IGZhbHNlLFxuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHQnWC1DU1JGLVRva2VuJzogJCgnbWV0YVtuYW1lPVwiX3RcIl0nKS5hdHRyKCdjb250ZW50Jylcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSIsImV4cG9ydCBjbGFzcyBQbHVnaW5zIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5pbml0Qm9vdHN0cmFwKCk7XG5cdFx0dmFyIHNsaWRlciA9IHtcImluaXRcIjpcIjFcIixcImhvbWVfaW5pdFwiOlwiMVwifTtcblxuXHRcdGlmICgkKCdpbWdbZGF0YS1pbWFnZS1yZXNpemVdJylbMF0pIHtcblx0XHRcdCQuZWFjaCgkKCdpbWdbZGF0YS1pbWFnZS1yZXNpemVdJyksIGZ1bmN0aW9uIChpLCBlKSB7XG5cdFx0XHRcdCQoZSkucGFyZW50KCkuaW1nTGlxdWlkKHtcblx0XHRcdFx0XHRmaWxsOiB0cnVlLFxuXHRcdFx0XHRcdHZlcnRpY2FsQWxpZ246ICdjZW50ZXInLFxuXHRcdFx0XHRcdGhvcml6b250YWxBbGlnbjogJ2NlbnRlcidcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBKb2Igc2VhcmNoOiBBZHZhbmNlZCBTZWFyY2ggdG9nZ2xlXG5cdFx0aWYgKCAkKCcjYWR2YW5jZS1zZWFyY2gtb3B0aW9uJylbMF0gKSB7XG5cdFx0XHQkKCcuYWR2YW5jZS1zZWFyY2gtdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0aWYgKCQoJyNhZHZhbmNlLXNlYXJjaC1vcHRpb246dmlzaWJsZScpLmxlbmd0aCApIHtcblx0XHRcdFx0XHQkKCcjYWR2YW5jZS1zZWFyY2gtb3B0aW9uJykuc2xpZGVVcCgpO1xuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHQkKCcjYWR2YW5jZS1zZWFyY2gtb3B0aW9uJykuc2xpZGVEb3duKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0dmFyIHNjcmVlbldpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XG5cblx0XHRpZiAoIHNjcmVlbldpZHRoID4gNzY3ICkge1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkKCdsaS5tZW51LWl0ZW0taGFzLWNoaWxkcmVuID4gYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdCQodGhpcykubmV4dCgnLnN1Yi1tZW51Jykuc2xpZGVUb2dnbGUoJ2Zhc3QnKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdCQoJyNqb2ItY2F0ZWdvcnktZHJvcGRvd24nKS5taW5pbWFsZWN0KHtcblx0XHRcdHBsYWNlaG9sZGVyIDogJ1NlbGVjdCBKb2IgQ2F0ZWdvcnknXG5cdFx0fSk7XG5cblx0XHQkKCcjam9iLXR5cGUtZHJvcGRvd24nKS5taW5pbWFsZWN0KHtcblx0XHRcdHBsYWNlaG9sZGVyIDogJ1NlbGVjdCBKb2IgVHlwZSdcblx0XHR9KTtcblx0XHRcblx0XHRpZiAoc2xpZGVyLmluaXQpIHtcblx0XHRcdGlmICgkKCdzZWxlY3QjZXhwZXJpZW5jZV9taW4nKVswXSAmJiAkKCdzZWxlY3QjZXhwZXJpZW5jZV9tYXgnKVswXSkge1xuXHRcdFx0XHQkKCdzZWxlY3QjZXhwZXJpZW5jZV9taW4sIHNlbGVjdCNleHBlcmllbmNlX21heCcpLnNlbGVjdFRvVUlTbGlkZXIoe1xuXHRcdFx0XHRcdGxhYmVsczogMTAsXG5cdFx0XHRcdFx0bGFiZWxTcmM6ICd0ZXh0Jyxcblx0XHRcdFx0XHR0b29sdGlwOiB0cnVlLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCQoJ3NlbGVjdCNzYWxsYXJ5X21pbicpWzBdICYmICQoJ3NlbGVjdCNzYWxsYXJ5X21heCcpWzBdKSB7XG5cdFx0XHRcdCQoJ3NlbGVjdCNzYWxsYXJ5X21pbiwgc2VsZWN0I3NhbGxhcnlfbWF4Jykuc2VsZWN0VG9VSVNsaWRlcih7XG5cdFx0XHRcdFx0bGFiZWxzOjExLFxuXHRcdFx0XHRcdGxhYmVsU3JjOid0ZXh0Jyxcblx0XHRcdFx0XHR0b29sdGlwOnRydWUsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdCQoJyNqb2ItbGlzdGluZy10YWJzJykudGFicyh7IGhpZGU6IHsgZWZmZWN0OiBcImZhZGVcIiwgZHVyYXRpb246ICdmYXN0JyB9LCBzaG93OiB7IGVmZmVjdDogXCJmYWRlXCIsIGR1cmF0aW9uOiAnZmFzdCcgfSB9KTtcblxuXHRcdHZhciBzY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXG5cdFx0aWYgKCBzY3JlZW5XaWR0aCA8IDc2NyApIHtcblx0XHRcdCQoJ2xpLmhhcy1jaGlsZHJlbiA+IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSl7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0JCh0aGlzKS5uZXh0KCcuc3ViLW1lbnUnKS5zbGlkZVRvZ2dsZSgnZmFzdCcpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKCQoJyNjb3VudHJ5U2VsZWN0b3InKVswXSkge1xuXHRcdFx0dGhpcy5mb3JtQ291bnRyeVNlbGVjdG9ySW5pdCgpO1xuXHRcdH1cblxuXHRcdGlmICgkKCcuc3VtbWVybm90ZScpWzBdKSB7XG5cdFx0XHQkKCcuc3VtbWVybm90ZScpLnN1bW1lcm5vdGUoe2RpYWxvZ3NJbkJvZHk6IHRydWV9KTtcblx0XHR9XG5cblx0XHRpZiAoJCgnW2RhdGEtY2hlY2tvdXQtdHlwZV0nKVswXSkge1xuXHRcdFx0dmFyIHBheW1lbnRQcm9jZXNzaW5nID0gZmFsc2U7XG5cblx0XHRcdCQuZWFjaCgkKCdbZGF0YS1jaGVja291dC10eXBlXScpLCBmdW5jdGlvbiAoZSwgaSkge1xuXHRcdFx0XHQkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0aWYgKCAhIHBheW1lbnRQcm9jZXNzaW5nKSB7XG5cdFx0XHRcdFx0XHR2YXIgJGJ1dHRvbiA9ICQodGhpcyk7XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRwYXltZW50UHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdFx0XHQkYnV0dG9uLmRpc2FibGUodHJ1ZSk7XG5cdFx0XHRcdFx0XHR2YXIgY2hlY2tvdXRfdHlwZSA9ICRidXR0b24uZGF0YSgnY2hlY2tvdXQtdHlwZScpO1xuXHRcdFx0XHRcdFx0dmFyIHBvc3REYXRhID0ge307XG5cblx0XHRcdFx0XHRcdGlmIChjaGVja291dF90eXBlID09IDEpIHtcblx0XHRcdFx0XHRcdFx0cG9zdERhdGEgPSB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogJ3BheXBhbCcsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IGNoZWNrb3V0X3R5cGVcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKGNoZWNrb3V0X3R5cGUgPT0gMikge1xuXHRcdFx0XHRcdFx0XHRwb3N0RGF0YSA9IHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiAncGF5cGFsJyxcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogY2hlY2tvdXRfdHlwZSxcblx0XHRcdFx0XHRcdFx0XHRhbW91bnQ6ICRidXR0b24ucGFyZW50KCkuZmluZCgnaW5wdXRbbmFtZT1fY3JlZF9hbXRdJykudmFsKClcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2FwaS9wYXltZW50L3Byb2Nlc3MtcGF5bWVudCcsIHBvc3REYXRhKS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykgd2luZG93Lm9wZW4oZS5yZWRpcmVjdCk7XG5cdFx0XHRcdFx0XHRcdGVsc2UgYWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0JGJ1dHRvbi5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0cGF5bWVudFByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0XHRcdHBheW1lbnRQcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRcdCRidXR0b24uZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRhbGVydCgnQW5vdGhlciBwYXltZW50IGlzIHByb2Nlc3NpbmcsIHBsZWFzZSB3YWl0LicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblx0aW5pdEJvb3RzdHJhcCgpIHtcblx0XHQkKCcucGFuZWwtdG9vbHRpcCcpLnRvb2x0aXAoKTtcblx0XHQkKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJykucG9wb3ZlcigpO1xuXG5cdFx0JCgnLmlucHV0LWRhdGVyYW5nZSBpbnB1dCcpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0JCh0aGlzKS5kYXRlcGlja2VyKHtcblx0XHRcdFx0Zm9ybWF0OiBcInl5eXktbW0tZGRcIixcblx0XHRcdFx0c3RhcnREYXRlOiBcIisxZFwiXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXHRmb3JtQ291bnRyeVNlbGVjdG9ySW5pdCgpIHtcblx0XHQkLmFqYXgoe1xuXHRcdFx0dHlwZTogJ2dldCcsXG5cdFx0XHRkYXRhOiB7XG5cdFx0XHRcdHR5cGU6IFwiYWxsXCJcblx0XHRcdH0sXG5cdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHR1cmw6IHdpbmRvdy5vcmlnaW4gKyAnL2FwaS9jb3VudHJ5Jyxcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG5cdFx0XHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0dmFyIHNlbGVjdGVkID0gJyc7XG5cdFx0XHRcdFx0XHRpZiAoJCgnI2NvdW50cnlTZWxlY3RvcicpLmRhdGEoJ3ZhbHVlJykgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBjb3VudHJ5VmFsdWUgPSAkKCcjY291bnRyeVNlbGVjdG9yJykuZGF0YSgndmFsdWUnKTtcblx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQgPSAoZGF0YVtrZXldLk5hbWUgPT09IGNvdW50cnlWYWx1ZSkgPyAnc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJyA6ICcnO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHNlbGVjdGVkID0gKGRhdGFba2V5XS5Db2RlID09PSAnR0JSJykgPyAnc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJyA6ICcnO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0JCgnI2NvdW50cnlTZWxlY3RvcicpLmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBkYXRhW2tleV0uTmFtZSArICdcIiBkYXRhLWNvZGU9XCInICsgZGF0YVtrZXldLkNvZGUgKyAnXCIgJyArIHNlbGVjdGVkICsgJz4nICsgZGF0YVtrZXldLk5hbWUgKyc8L29wdGlvbj4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoJCgnI2NpdHlTZWxlY3RvcicpWzBdKSB7XG5cdFx0XHRcdFx0dmFyIHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcjY2l0eVNlbGVjdG9yJykuZW1wdHkoKTtcblxuXHRcdFx0XHRcdHZhciBjaXR5UmVsb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHRcdHR5cGU6ICdnZXQnLFxuXHRcdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6ICQoJyNjb3VudHJ5U2VsZWN0b3IgOnNlbGVjdGVkJykuZGF0YSgnY29kZScpXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdFx0XHRcdFx0dXJsOiB3aW5kb3cub3JpZ2luICsgJy9hcGkvY2l0eScsXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChjaXR5RGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHQkKCcjY2l0eVNlbGVjdG9yJykuZW1wdHkoKTtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gY2l0eURhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChjaXR5RGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZCA9ICcnO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICgkKCcjY2l0eVNlbGVjdG9yJykuZGF0YSgndmFsdWUnKSAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgY2l0eVZhbHVlID0gJCgnI2NpdHlTZWxlY3RvcicpLmRhdGEoJ3ZhbHVlJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQgPSAoY2l0eURhdGFba2V5XS5OYW1lID09PSBjaXR5VmFsdWUpID8gJ3NlbGVjdGVkPVwic2VsZWN0ZWRcIicgOiAnJztcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQoJyNjaXR5U2VsZWN0b3InKS5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCInICsgY2l0eURhdGFba2V5XS5OYW1lICsgJ1wiICcgKyBzZWxlY3RlZCArICc+JyArIGNpdHlEYXRhW2tleV0uTmFtZSArJzwvb3B0aW9uPicpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY29uZmlybShcIkNhbm5vdCBsb2FkIFwiICsgY291bnRyeSArIFwiJ3MgY2l0eSBsaXN0LCByZWxvYWQ/XCIpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRjaXR5UmVsb2FkKCk7XG5cblx0XHRcdFx0XHQkKCcjY291bnRyeVNlbGVjdG9yJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0aWYgKCAhIHByb2Nlc3NpbmcpIGNpdHlSZWxvYWQoKTtcblx0XHRcdFx0XHRcdGVsc2UgYWxlcnQoJ1BsZWFzZSB3YWl0IHdoaWxlIHByZXZpb3VzIGxpc3Qgd2FzIGxvYWRlZC4nKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0aWYgKGNvbmZpcm0oJ0Nhbm5vdCBsb2FkIGNvdW50cnkgbGlzdCwgcmVsb2FkPycpKSB7XG5cdFx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSJdfQ==
