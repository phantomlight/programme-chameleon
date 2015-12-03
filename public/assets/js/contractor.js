(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/ford/web/www-job/resources/assets/js/front/contractor.js":[function(require,module,exports){
"use strict";

var _core = require("./core");

var _plugins = require("./plugins");

var $form;
var processing = false;

// Account settings, upload cv, avatar
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
					alert(e.message);
					$form.showMessage(e.message, e.type);
				}).fail(function (xhr, status, e) {
					processing = false;
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
					alert(e.message);
					if (e.type === 'success') {
						$('img.tmp-img').attr('src', e.image);
					}
					$form.showMessage(e.message, e.type);
				}).fail(function (xhr, status, e) {
					processing = false;
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
				$form.showMessage(e.message, e.type);
				alert(e.message);
				$form.find('[type=submit]').disable(false);
			}).fail(function (xhr, status, e) {
				processing = false;
				alert(xhr.responseText);
				$form.showMessage(xhr.responseText, 'danger');
				$form.find('[type=submit]').disable(false);
			});
		} else {
			alert('Another upload process is running, please wait.');
		}
	});
}

if ($('#contractorSalaryRangeForm')[0]) {
	var $salaryForm = $('#contractorSalaryRangeForm');
	$salaryForm.find('[type=button]').on('click', function (e) {
		e.preventDefault();

		if (!processing) {
			processing = true;
			$salaryForm.find('[type=button]').disable(true);

			$.post(window.origin + '/contractor/update-salary', {
				data: $salaryForm.serializeForm()
			}).done(function (e) {
				processing = false;
				$salaryForm.showMessage(e.message, e.type);
				$salaryForm.find('[type=button]').disable(false);
			}).fail(function (xhr, status, e) {
				processing = false;
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

			$.post(window.origin + '/contractor/job-alert', {
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
		} else {
			$form.showMessage('Another process is running.', 'info');
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

},{}]},{},["/home/ford/web/www-job/resources/assets/js/front/contractor.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9mb3JkL3dlYi93d3ctam9iL3Jlc291cmNlcy9hc3NldHMvanMvZnJvbnQvY29udHJhY3Rvci5qcyIsIi9ob21lL2ZvcmQvd2ViL3d3dy1qb2IvcmVzb3VyY2VzL2Fzc2V0cy9qcy9mcm9udC9jb3JlLmpzIiwiL2hvbWUvZm9yZC93ZWIvd3d3LWpvYi9yZXNvdXJjZXMvYXNzZXRzL2pzL2Zyb250L3BsdWdpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztvQkNBcUIsUUFBUTs7dUJBQ0wsV0FBVzs7QUFFbkMsSUFBSSxLQUFLLENBQUM7QUFDVixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7OztBQUd2QixJQUFJLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ25DLE1BQUssR0FBRyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUNwQyxLQUFJLFVBQVUsR0FBRyxzdUJBQXN1QixDQUFDO0FBQ3h2QixLQUFJLFVBQVUsR0FBRyxvbUJBQW9tQixDQUFDO0FBQ3RuQixLQUFJLFVBQVUsR0FBRyxvWUFBb1ksQ0FBQzs7QUFFdFosS0FBSSxtQkFBbUIsR0FBRyxDQUN6QixXQUFXLEVBQ1gsWUFBWSxFQUNaLGFBQWEsRUFDYixXQUFXLENBQ1gsQ0FBQzs7QUFFRixLQUFJLG1CQUFtQixHQUFHLENBQ3pCLG9CQUFvQixFQUNwQix5RUFBeUUsQ0FDekUsQ0FBQzs7QUFFRixFQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVk7QUFDakQsTUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLEVBQUU7QUFDakMsSUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQywr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InNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgQ29yZSB9IGZyb20gXCIuL2NvcmVcIjtcbmltcG9ydCB7IFBsdWdpbnMgfSBmcm9tIFwiLi9wbHVnaW5zXCI7XG5cbnZhciAkZm9ybTtcbnZhciBwcm9jZXNzaW5nID0gZmFsc2U7XG5cbi8vIEFjY291bnQgc2V0dGluZ3MsIHVwbG9hZCBjdiwgYXZhdGFyXG5pZiAoJCgnI2NvbnRyYWN0b3JBY2NvdW50Rm9ybScpWzBdKSB7XG5cdCRmb3JtID0gJCgnI2NvbnRyYWN0b3JBY2NvdW50Rm9ybScpO1xuXHR2YXIgZXhwUm93SHRtbCA9ICc8ZGl2IGNsYXNzPVwicm93IGVsZW1lbnQtdG9wLTEwXCI+PGRpdiBjbGFzcz1cImNvbC1tZC0zXCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImV4cF9jb21wYW55XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIkNvbXBhbnlcIiAvPjwvZGl2PjxkaXYgY2xhc3M9XCJjb2wtbWQtM1wiPjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJleHBfeWVhclwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJZZWFyXCIgLz48L2Rpdj48ZGl2IGNsYXNzPVwiY29sLW1kLTNcIj48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZXhwX3NhbGFyeVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJTYWxhcnlcIiAvPjwvZGl2PjxkaXYgY2xhc3M9XCJjb2wtbWQtM1wiPjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJleHBfcG9zaXRpb25cIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiUG9zaXRpb25cIiAvPjwvZGl2PjxkaXYgY2xhc3M9XCJlbGVtZW50LXRvcC0xMFwiPiZuYnNwOzwvZGl2PjxkaXYgY2xhc3M9XCJjb2wtc20tMTBcIj48dGV4dGFyZWEgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwiZXhwX2Rlc2NcIiBtYXhsZW5ndGg9XCIyMDAwXCI+RXhwbGFpbiBhIGxpdHRsZSBhYm91dCB5b3VyIGpvYiBkdXRpZXMuPC90ZXh0YXJlYT48L2Rpdj48ZGl2IGNsYXNzPVwiY29sLXNtLTJcIj48YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuLXhzXCI+UmVtb3ZlPC9idXR0b24+PC9kaXY+PC9kaXY+Jztcblx0dmFyIGVkdVJvd0h0bWwgPSAnPGRpdiBjbGFzcz1cInJvdyBlbGVtZW50LXRvcC0xMFwiPjxkaXYgY2xhc3M9XCJjb2wtbWQtM1wiPjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJlZHVfbmFtZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJJbnN0aXR1dGlvbiBOYW1lXCIgLz48L2Rpdj48ZGl2IGNsYXNzPVwiY29sLW1kLTNcIj48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZWR1X3R5cGVcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiZXguIERlc2lnbi9FbmdpbmVlcmluZy9CdXNpbmVzc1wiIC8+PC9kaXY+PGRpdiBjbGFzcz1cImNvbC1tZC0zXCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImVkdV9ncGFcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiR1BBL1Njb3JlXCIgLz48L2Rpdj48ZGl2IGNsYXNzPVwiY29sLW1kLTNcIj48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZWR1X3F1YWxpZmljYXRpb25cIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiZXguIFBoLkRcIiAvPjwvZGl2PjxkaXYgY2xhc3M9XCJjb2wtc20tMiBlbGVtZW50LXRvcC0xMFwiPjxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG4teHNcIj5SZW1vdmU8L2J1dHRvbj48L2Rpdj48L2Rpdj4nO1xuXHR2YXIgdXJsUm93SHRtbCA9ICc8ZGl2IGNsYXNzPVwicm93IGVsZW1lbnQtdG9wLTEwXCI+PGRpdiBjbGFzcz1cImNvbC1tZC01XCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIndlYl9uYW1lXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIk5hbWUgb2YgdGhlIHdlYlwiIC8+PC9kaXY+PGRpdiBjbGFzcz1cImNvbC1tZC01XCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIndlYl9hZHJlc3NcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiaHR0cDovL3d3dy5wcm9ncmFtbWVjaGFtZWxlb24uY29tXCIgLz48L2Rpdj48ZGl2IGNsYXNzPVwiY29sLXNtLTIgZWxlbWVudC10b3AtMTBcIj48YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuLXhzXCI+UmVtb3ZlPC9idXR0b24+PC9kaXY+PC9kaXY+JztcblxuXHR2YXIgYWxsb3dlZF9hdmF0YXJfbWltZSA9IFtcblx0XHQnaW1hZ2UvZ2lmJyxcblx0XHQnaW1hZ2UvanBlZycsXG5cdFx0J2ltYWdlL3BqcGVnJyxcblx0XHQnaW1hZ2UvcG5nJ1xuXHRdO1xuXG5cdHZhciBhbGxvd2VkX3Jlc3VtZV9taW1lID0gW1xuXHRcdCdhcHBsaWNhdGlvbi9tc3dvcmQnLFxuXHRcdCdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCcsXG5cdF07XG5cblx0JCgnaW5wdXRbbmFtZT1maWxlX2N2XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuZmlsZXNbMF0uc2l6ZSA+IDUwMDAwMDApIHtcblx0XHRcdCQodGhpcykucGFyZW50KCkuc2hvd01lc3NhZ2UoJ0ZpbGUgY2Fubm90IGJlIG1vcmUgdGhhbiA1TWIuJywgJ2RhbmdlcicpO1xuXHRcdH0gZWxzZSBpZiAoJC5pbkFycmF5KHRoaXMuZmlsZXNbMF0udHlwZSwgYWxsb3dlZF9yZXN1bWVfbWltZSkgPT09IC0xKSB7XG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdDYW4gb25seSB1cGxvYWQgLmRvYyBvciAuZG9jeCBmaWxlcy4nLCAnZGFuZ2VyJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICggISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHR2YXIgZmQgPSBuZXcgRm9ybURhdGEoKTtcblx0XHRcdFx0ZmQuYXBwZW5kKCdmaWxlJywgdGhpcy5maWxlc1swXSk7XG5cdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0bWV0aG9kOiAncG9zdCcsXG5cdFx0XHRcdFx0dXJsOiB3aW5kb3cub3JpZ2luICsgJy9jb250cmFjdG9yL3VwZGF0ZS1yZXN1bWUnLFxuXHRcdFx0XHRcdGRhdGE6IGZkLFxuXHRcdFx0XHRcdGNyb3NzRG9tYWluOiBmYWxzZSxcblx0XHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRcdGNhY2hlOiB0cnVlLFxuXHRcdFx0XHRcdHByb2Nlc3NEYXRhOiBmYWxzZSxcblx0XHRcdFx0XHRjb250ZW50VHlwZTogZmFsc2UsXG5cdFx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFx0J1gtQ1NSRi1Ub2tlbic6ICQoJ21ldGFbbmFtZT1cIl90XCJdJykuYXR0cignY29udGVudCcpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKGUubWVzc2FnZSwgZS50eXBlKTtcblx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCwgJ2RhbmdlcicpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRhbGVydCgnQW5vdGhlciB1cGxvYWQgcHJvY2VzcyBpcyBydW5uaW5nLCBwbGVhc2Ugd2FpdC4nKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdCQoJ2lucHV0W25hbWU9aW1hZ2VdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5maWxlc1swXS5zaXplID4gNTAwMDAwMCkge1xuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5zaG93TWVzc2FnZSgnRmlsZSBjYW5ub3QgYmUgbW9yZSB0aGFuIDVNYi4nLCAnZGFuZ2VyJyk7XG5cdFx0fSBlbHNlIGlmICgkLmluQXJyYXkodGhpcy5maWxlc1swXS50eXBlLCBhbGxvd2VkX2F2YXRhcl9taW1lKSA9PT0gLTEpIHtcblx0XHRcdCQodGhpcykucGFyZW50KCkuc2hvd01lc3NhZ2UoJ0NhbiBvbmx5IHVwbG9hZCAuanBnLCAuZ2lmLCBvciAucG5nIGZpbGVzLicsICdkYW5nZXInKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdHZhciBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdFx0XHRmZC5hcHBlbmQoJ2ZpbGUnLCB0aGlzLmZpbGVzWzBdKTtcblx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRtZXRob2Q6ICdwb3N0Jyxcblx0XHRcdFx0XHR1cmw6IHdpbmRvdy5vcmlnaW4gKyAnL2NvbnRyYWN0b3IvdXBkYXRlLWF2YXRhcicsXG5cdFx0XHRcdFx0ZGF0YTogZmQsXG5cdFx0XHRcdFx0Y3Jvc3NEb21haW46IGZhbHNlLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdFx0Y2FjaGU6IHRydWUsXG5cdFx0XHRcdFx0cHJvY2Vzc0RhdGE6IGZhbHNlLFxuXHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBmYWxzZSxcblx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHQnWC1DU1JGLVRva2VuJzogJCgnbWV0YVtuYW1lPVwiX3RcIl0nKS5hdHRyKCdjb250ZW50Jylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG5cdFx0XHRcdFx0XHQkKCdpbWcudG1wLWltZycpLmF0dHIoJ3NyYycsIGUuaW1hZ2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKHhoci5yZXNwb25zZVRleHQsICdkYW5nZXInKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0YWxlcnQoJ0Fub3RoZXIgdXBsb2FkIHByb2Nlc3MgaXMgcnVubmluZywgcGxlYXNlIHdhaXQuJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcjZXhwQ29udGFpbmVyJykuZmluZCgnYnV0dG9uI2FkZEV4cCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdCQoJyNleHBDb250YWluZXInKS5hcHBlbmQoZXhwUm93SHRtbCk7XG5cdH0pO1xuXG5cdCQoJyNlZHVDb250YWluZXInKS5maW5kKCdidXR0b24jYWRkRWR1Y2F0aW9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0JCgnI2VkdUNvbnRhaW5lcicpLmFwcGVuZChlZHVSb3dIdG1sKTtcblx0fSk7XG5cblx0JCgnI3VybENvbnRhaW5lcicpLmZpbmQoJ2J1dHRvbiNhZGRXZWJzaXRlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0JCgnI3VybENvbnRhaW5lcicpLmFwcGVuZCh1cmxSb3dIdG1sKTtcblx0fSk7XG5cblx0JCgnI2V4cENvbnRhaW5lcicpLm9uKCdjbGljaycsICdidXR0b24uYnRuLWRhbmdlcicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKGNvbmZpcm0oJ1JlbW92ZSB0aGlzIGV4cGVyaWVuY2UgZGF0YT8gQ2Fubm90IGJlIHVuZG8uJykpIHtcblx0XHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkucmVtb3ZlKCk7XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcjZWR1Q29udGFpbmVyJykub24oJ2NsaWNrJywgJ2J1dHRvbi5idG4tZGFuZ2VyJywgZnVuY3Rpb24gKGUpIHtcblx0XHRpZiAoY29uZmlybSgnUmVtb3ZlIHRoaXMgZWR1Y2F0aW9uIGRhdGE/IENhbm5vdCBiZSB1bmRvLicpKSB7XG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZSgpO1xuXHRcdH1cblx0fSk7XG5cblx0JCgnI3VybENvbnRhaW5lcicpLm9uKCdjbGljaycsICdidXR0b24uYnRuLWRhbmdlcicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0aWYgKGNvbmZpcm0oJ1JlbW92ZSB0aGlzIHdlYnNpdGUgZGF0YT8gQ2Fubm90IGJlIHVuZG8uJykpIHtcblx0XHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkucmVtb3ZlKCk7XG5cdFx0fVxuXHR9KTtcblxuXHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0aWYgKCEgcHJvY2Vzc2luZykge1xuXHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZSh0cnVlKTtcblxuXHRcdFx0dmFyIGVkdURhdGFDb2xsZWN0aW9uID0gW107XG5cdFx0XHR2YXIgZXhwRGF0YUNvbGxlY3Rpb24gPSBbXTtcblx0XHRcdHZhciB1cmxEYXRhQ29sbGVjdGlvbiA9IFtdO1xuXG5cdFx0XHQkKCcjZWR1Q29udGFpbmVyIC5yb3cnKS5lYWNoKGZ1bmN0aW9uIChpKSB7XG5cdFx0XHRcdHZhciBlZHVEYXRhID0ge1xuXHRcdFx0XHRcdCduYW1lJzpcdCQodGhpcykuZmluZCgnaW5wdXRbbmFtZT1lZHVfbmFtZV0nKS52YWwoKSxcblx0XHRcdFx0XHQndHlwZSc6XHQkKHRoaXMpLmZpbmQoJ2lucHV0W25hbWU9ZWR1X3R5cGVdJykudmFsKCksXG5cdFx0XHRcdFx0J2dwYSc6XHQkKHRoaXMpLmZpbmQoJ2lucHV0W25hbWU9ZWR1X2dwYV0nKS52YWwoKSxcblx0XHRcdFx0XHQncXVhbGlmaWNhdGlvbic6XHQkKHRoaXMpLmZpbmQoJ2lucHV0W25hbWU9ZWR1X3F1YWxpZmljYXRpb25dJykudmFsKClcblx0XHRcdFx0fVxuXHRcdFx0XHRlZHVEYXRhQ29sbGVjdGlvbi5wdXNoKGVkdURhdGEpO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQoJyNleHBDb250YWluZXIgLnJvdycpLmVhY2goZnVuY3Rpb24gKGkpIHtcblx0XHRcdFx0dmFyIGV4cERhdGEgPSB7XG5cdFx0XHRcdFx0J2NvbXBhbnknOlx0JCh0aGlzKS5maW5kKCdpbnB1dFtuYW1lPWV4cF9jb21wYW55XScpLnZhbCgpLFxuXHRcdFx0XHRcdCd5ZWFyJzpcdCQodGhpcykuZmluZCgnaW5wdXRbbmFtZT1leHBfeWVhcl0nKS52YWwoKSxcblx0XHRcdFx0XHQncG9zaXRpb24nOlx0JCh0aGlzKS5maW5kKCdpbnB1dFtuYW1lPWV4cF9wb3NpdGlvbl0nKS52YWwoKSxcblx0XHRcdFx0XHQnc2FsYXJ5JzpcdCQodGhpcykuZmluZCgnaW5wdXRbbmFtZT1leHBfc2FsYXJ5XScpLnZhbCgpLFxuXHRcdFx0XHRcdCdkZXNjcmlwdGlvbic6XHQkKHRoaXMpLmZpbmQoJ3RleHRhcmVhW25hbWU9ZXhwX2Rlc2NdJykudmFsKClcblx0XHRcdFx0fVxuXHRcdFx0XHRleHBEYXRhQ29sbGVjdGlvbi5wdXNoKGV4cERhdGEpO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQoJyN1cmxDb250YWluZXIgLnJvdycpLmVhY2goZnVuY3Rpb24gKGkpIHtcblx0XHRcdFx0dmFyIHVybERhdGEgPSB7XG5cdFx0XHRcdFx0J25hbWUnOlx0JCh0aGlzKS5maW5kKCdpbnB1dFtuYW1lPXdlYl9uYW1lXScpLnZhbCgpLFxuXHRcdFx0XHRcdCdhZGRyZXNzJzpcdCQodGhpcykuZmluZCgnaW5wdXRbbmFtZT13ZWJfYWRyZXNzXScpLnZhbCgpXG5cdFx0XHRcdH1cblx0XHRcdFx0dXJsRGF0YUNvbGxlY3Rpb24ucHVzaCh1cmxEYXRhKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvY29udHJhY3Rvci91cGRhdGUtYWNjb3VudCcsIHtcblx0XHRcdFx0ZGF0YTogJGZvcm0uc2VyaWFsaXplRm9ybSgpLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogJCgnLnN1bW1lcm5vdGUnKS5jb2RlKCksXG5cdFx0XHRcdGVkdURhdGE6IEpTT04uc3RyaW5naWZ5KGVkdURhdGFDb2xsZWN0aW9uKSxcblx0XHRcdFx0ZXhwRGF0YTogSlNPTi5zdHJpbmdpZnkoZXhwRGF0YUNvbGxlY3Rpb24pLFxuXHRcdFx0XHR1cmxEYXRhOiBKU09OLnN0cmluZ2lmeSh1cmxEYXRhQ29sbGVjdGlvbilcblx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKHhoci5yZXNwb25zZVRleHQsICdkYW5nZXInKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0YWxlcnQoJ0Fub3RoZXIgdXBsb2FkIHByb2Nlc3MgaXMgcnVubmluZywgcGxlYXNlIHdhaXQuJyk7XG5cdFx0fVxuXHR9KTtcbn1cblxuaWYgKCQoJyNjb250cmFjdG9yU2FsYXJ5UmFuZ2VGb3JtJylbMF0pIHtcblx0dmFyICRzYWxhcnlGb3JtID0gJCgnI2NvbnRyYWN0b3JTYWxhcnlSYW5nZUZvcm0nKTtcblx0JHNhbGFyeUZvcm0uZmluZCgnW3R5cGU9YnV0dG9uXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0JHNhbGFyeUZvcm0uZmluZCgnW3R5cGU9YnV0dG9uXScpLmRpc2FibGUodHJ1ZSk7XG5cblx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9jb250cmFjdG9yL3VwZGF0ZS1zYWxhcnknLCB7XG5cdFx0XHRcdGRhdGE6ICRzYWxhcnlGb3JtLnNlcmlhbGl6ZUZvcm0oKVxuXHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdCRzYWxhcnlGb3JtLnNob3dNZXNzYWdlKGUubWVzc2FnZSwgZS50eXBlKTtcblx0XHRcdFx0JHNhbGFyeUZvcm0uZmluZCgnW3R5cGU9YnV0dG9uXScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0JHNhbGFyeUZvcm0uc2hvd01lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCwgJ2RhbmdlcicpO1xuXHRcdFx0XHQkc2FsYXJ5Rm9ybS5maW5kKCdbdHlwZT1idXR0b25dJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRhbGVydCgnQW5vdGhlciB1cGxvYWQgcHJvY2VzcyBpcyBydW5uaW5nLCBwbGVhc2Ugd2FpdCcpO1xuXHRcdH1cblx0fSk7XG59XG5cbi8vIEpvYiBhbGVydFxuaWYgKCQoJyNjb250cmFjdG9ySm9iQWxlcnRGb3JtJylbMF0pIHtcblx0JGZvcm0gPSAkKCcjY29udHJhY3RvckpvYkFsZXJ0Rm9ybScpO1xuXG5cdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoKSAmJiAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cblx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9jb250cmFjdG9yL2pvYi1hbGVydCcsIHtcblx0XHRcdFx0ZGF0YTogJGZvcm0uc2VyaWFsaXplRm9ybSgpXG5cdFx0XHR9KVxuXHRcdFx0LmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdH0pXG5cdFx0XHQuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSh4aHIucmVzcG9uc2VUZXh0LCAnZGFuZ2VyJyk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKCdBbm90aGVyIHByb2Nlc3MgaXMgcnVubmluZy4nLCAnaW5mbycpO1xuXHRcdH1cblx0fSk7XG59IiwiZXhwb3J0IGNsYXNzIENvcmUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmRpc2FibGUoKTtcblx0XHR0aGlzLmZvcm1NZXNzYWdlKCk7XG5cdFx0dGhpcy5zZXJpYWxpemVGb3JtKCk7XG5cdFx0dGhpcy5zZXR1cEFqYXgoKTtcblxuXHRcdE51bWJlci5wcm90b3R5cGUuZm9ybWF0TW9uZXkgPSBmdW5jdGlvbihjLCBkLCB0KXtcblx0XHRcdHZhciBuID0gdGhpcywgXG5cdFx0XHRjID0gaXNOYU4oYyA9IE1hdGguYWJzKGMpKSA/IDIgOiBjLCBcblx0XHRcdGQgPSBkID09IHVuZGVmaW5lZCA/IFwiLlwiIDogZCwgXG5cdFx0XHR0ID0gdCA9PSB1bmRlZmluZWQgPyBcIixcIiA6IHQsIFxuXHRcdFx0cyA9IG4gPCAwID8gXCItXCIgOiBcIlwiLCBcblx0XHRcdGkgPSBwYXJzZUludChuID0gTWF0aC5hYnMoK24gfHwgMCkudG9GaXhlZChjKSkgKyBcIlwiLCBcblx0XHRcdGogPSAoaiA9IGkubGVuZ3RoKSA+IDMgPyBqICUgMyA6IDA7XG5cdFx0XHRyZXR1cm4gcyArIChqID8gaS5zdWJzdHIoMCwgaikgKyB0IDogXCJcIikgKyBpLnN1YnN0cihqKS5yZXBsYWNlKC8oXFxkezN9KSg/PVxcZCkvZywgXCIkMVwiICsgdCkgKyAoYyA/IGQgKyBNYXRoLmFicyhuIC0gaSkudG9GaXhlZChjKS5zbGljZSgyKSA6IFwiXCIpO1xuXHRcdH07XG5cdH1cblx0ZGlzYWJsZSgpIHtcblx0XHQkLmZuLmV4dGVuZCh7XG5cdFx0XHRkaXNhYmxlOiBmdW5jdGlvbihzdGF0ZSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmIChzdGF0ZSkge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5maW5kKCdzcGFuJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpLmZpbmQoJy5idG4tcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoJ3NwYW4nKS5zaG93KCk7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJykuZmluZCgnLmJ0bi1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRmb3JtTWVzc2FnZSgpIHtcblx0XHQkLmZuLnNob3dNZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSwgdHlwZSwgYWxlcnRDbGFzcykge1xuXHRcdFx0dmFyIGh0bWw7XG5cdFx0XHRodG1sID0gdm9pZCAwO1xuXHRcdFx0aWYgKGFsZXJ0Q2xhc3MgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRhbGVydENsYXNzID0gJyc7XG5cdFx0XHR9XG5cdFx0XHQkKCcuc3RhdHVzLW1lc3NhZ2UnKS5yZW1vdmUoKTtcblx0XHRcdGh0bWwgPSAnPGRpdiBjbGFzcz1cXCdzdGF0dXMtbWVzc2FnZSBlbGVtZW50LXRvcC0xMCAnICsgYWxlcnRDbGFzcyArICdcXCc+IDxkaXYgcm9sZT1cXCdhbGVydFxcJyBjbGFzcz1cXCdmYWRlLWluIGFsZXJ0IGFsZXJ0LWRpc21pc3NhYmxlIGFsZXJ0LScgKyB0eXBlICsgJ1xcJz4gPGJ1dHRvbiB0eXBlPVxcJ2J1dHRvblxcJyBjbGFzcz1cXCdjbG9zZVxcJyBkYXRhLWRpc21pc3M9XFwnYWxlcnRcXCc+IDxzcGFuIGFyaWEtaGlkZGVuPVxcJ3RydWVcXCc+PGkgY2xhc3M9XFwnZmEgZmEtdGltZXNcXCc+PC9pPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XFwnc3Itb25seVxcJz5DbG9zZTwvc3Bhbj4gPC9idXR0b24+JyArIG1lc3NhZ2UgKyAnPC9kaXY+PC9kaXY+Jztcblx0XHRcdHJldHVybiAkKGh0bWwpLmFwcGVuZFRvKHRoaXMpLmhpZGUoKS5mYWRlSW4oOTAwKTtcblx0XHR9O1xuXHR9XG5cdHNlcmlhbGl6ZUZvcm0oKSB7XG5cdFx0JC5mbi5zZXJpYWxpemVGb3JtID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZGF0YSwgbG9va3VwLCBwYXJzZSwgc2VsZWN0b3I7XG5cdFx0XHRkYXRhID0gdm9pZCAwO1xuXHRcdFx0bG9va3VwID0gdm9pZCAwO1xuXHRcdFx0cGFyc2UgPSB2b2lkIDA7XG5cdFx0XHRzZWxlY3RvciA9IHZvaWQgMDtcblx0XHRcdGlmICh0aGlzLmxlbmd0aCA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0ZGF0YSA9IHt9O1xuXHRcdFx0bG9va3VwID0gZGF0YTtcblx0XHRcdHNlbGVjdG9yID0gJzppbnB1dFt0eXBlIT1cImNoZWNrYm94XCJdW3R5cGUhPVwicmFkaW9cIl0sIGlucHV0OmNoZWNrZWQnO1xuXHRcdFx0cGFyc2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyICRlbCwgY2FwLCBpLCBuYW1lZDtcblx0XHRcdFx0JGVsID0gdm9pZCAwO1xuXHRcdFx0XHRjYXAgPSB2b2lkIDA7XG5cdFx0XHRcdGkgPSB2b2lkIDA7XG5cdFx0XHRcdG5hbWVkID0gdm9pZCAwO1xuXHRcdFx0XHRpZiAodGhpcy5kaXNhYmxlZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRuYW1lZCA9IHRoaXMubmFtZS5yZXBsYWNlKC9cXFsoW15cXF1dKyk/XFxdL2csICcsJDEnKS5zcGxpdCgnLCcpO1xuXHRcdFx0XHRjYXAgPSBuYW1lZC5sZW5ndGggLSAxO1xuXHRcdFx0XHQkZWwgPSAkKHRoaXMpO1xuXHRcdFx0XHRpZiAobmFtZWRbMF0pIHtcblx0XHRcdFx0XHRpID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoaSA8IGNhcCkge1xuXHRcdFx0XHRcdFx0bG9va3VwID0gbG9va3VwW25hbWVkW2ldXSA9IGxvb2t1cFtuYW1lZFtpXV0gfHwgKG5hbWVkW2kgKyAxXSA9PT0gJycgfHwgbmFtZWRbaSArIDFdID09PSAnMCcgPyBbXSA6IHt9KTtcblx0XHRcdFx0XHRcdGkrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGxvb2t1cC5sZW5ndGggIT09IHZvaWQgMCkge1xuXHRcdFx0XHRcdFx0bG9va3VwLnB1c2goJGVsLnZhbCgpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bG9va3VwW25hbWVkW2NhcF1dID0gJGVsLnZhbCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsb29rdXAgPSBkYXRhO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5maWx0ZXIoc2VsZWN0b3IpLmVhY2gocGFyc2UpO1xuXHRcdFx0dGhpcy5maW5kKHNlbGVjdG9yKS5lYWNoKHBhcnNlKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH07XG5cdH1cblx0c2V0dXBBamF4KCkge1xuXHRcdCQuYWpheFNldHVwKHtcblx0XHRcdHN0YXR1c0NvZGU6IHtcblx0XHRcdFx0NDAzOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdpbmRvdy5hbGVydCgnRm9yYmlkZGVuIGNvbnRlbnQhJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdDQwNDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJldHVybiB3aW5kb3cuYWxlcnQoJ1JlcXVlc3RlZCByb3V0ZSBub3QgZm91bmQhJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdDUwMDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJldHVybiB3aW5kb3cuYWxlcnQoJ0ludGVybmFsIHNlcnZlciBlcnJvciEnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNyb3NzRG9tYWluOiBmYWxzZSxcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRjYWNoZTogdHJ1ZSxcblx0XHRcdGFzeW5jOiBmYWxzZSxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J1gtQ1NSRi1Ub2tlbic6ICQoJ21ldGFbbmFtZT1cIl90XCJdJykuYXR0cignY29udGVudCcpXG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0iLCJleHBvcnQgY2xhc3MgUGx1Z2lucyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuaW5pdEJvb3RzdHJhcCgpO1xuXHRcdHZhciBzbGlkZXIgPSB7XCJpbml0XCI6XCIxXCIsXCJob21lX2luaXRcIjpcIjFcIn07XG5cblx0XHRpZiAoJCgnaW1nW2RhdGEtaW1hZ2UtcmVzaXplXScpWzBdKSB7XG5cdFx0XHQkLmVhY2goJCgnaW1nW2RhdGEtaW1hZ2UtcmVzaXplXScpLCBmdW5jdGlvbiAoaSwgZSkge1xuXHRcdFx0XHQkKGUpLnBhcmVudCgpLmltZ0xpcXVpZCh7XG5cdFx0XHRcdFx0ZmlsbDogdHJ1ZSxcblx0XHRcdFx0XHR2ZXJ0aWNhbEFsaWduOiAnY2VudGVyJyxcblx0XHRcdFx0XHRob3Jpem9udGFsQWxpZ246ICdjZW50ZXInXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gSm9iIHNlYXJjaDogQWR2YW5jZWQgU2VhcmNoIHRvZ2dsZVxuXHRcdGlmICggJCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbicpWzBdICkge1xuXHRcdFx0JCgnLmFkdmFuY2Utc2VhcmNoLXRvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGlmICgkKCcjYWR2YW5jZS1zZWFyY2gtb3B0aW9uOnZpc2libGUnKS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0JCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbicpLnNsaWRlVXAoKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0JCgnI2FkdmFuY2Utc2VhcmNoLW9wdGlvbicpLnNsaWRlRG93bigpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHZhciBzY3JlZW5XaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXG5cdFx0aWYgKCBzY3JlZW5XaWR0aCA+IDc2NyApIHtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JCgnbGkubWVudS1pdGVtLWhhcy1jaGlsZHJlbiA+IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHQkKHRoaXMpLm5leHQoJy5zdWItbWVudScpLnNsaWRlVG9nZ2xlKCdmYXN0Jyk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQkKCcjam9iLWNhdGVnb3J5LWRyb3Bkb3duJykubWluaW1hbGVjdCh7XG5cdFx0XHRwbGFjZWhvbGRlciA6ICdTZWxlY3QgSm9iIENhdGVnb3J5J1xuXHRcdH0pO1xuXG5cdFx0JCgnI2pvYi10eXBlLWRyb3Bkb3duJykubWluaW1hbGVjdCh7XG5cdFx0XHRwbGFjZWhvbGRlciA6ICdTZWxlY3QgSm9iIFR5cGUnXG5cdFx0fSk7XG5cdFx0XG5cdFx0aWYgKHNsaWRlci5pbml0KSB7XG5cdFx0XHRpZiAoJCgnc2VsZWN0I2V4cGVyaWVuY2VfbWluJylbMF0gJiYgJCgnc2VsZWN0I2V4cGVyaWVuY2VfbWF4JylbMF0pIHtcblx0XHRcdFx0JCgnc2VsZWN0I2V4cGVyaWVuY2VfbWluLCBzZWxlY3QjZXhwZXJpZW5jZV9tYXgnKS5zZWxlY3RUb1VJU2xpZGVyKHtcblx0XHRcdFx0XHRsYWJlbHM6IDEwLFxuXHRcdFx0XHRcdGxhYmVsU3JjOiAndGV4dCcsXG5cdFx0XHRcdFx0dG9vbHRpcDogdHJ1ZSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICgkKCdzZWxlY3Qjc2FsbGFyeV9taW4nKVswXSAmJiAkKCdzZWxlY3Qjc2FsbGFyeV9tYXgnKVswXSkge1xuXHRcdFx0XHQkKCdzZWxlY3Qjc2FsbGFyeV9taW4sIHNlbGVjdCNzYWxsYXJ5X21heCcpLnNlbGVjdFRvVUlTbGlkZXIoe1xuXHRcdFx0XHRcdGxhYmVsczoxMSxcblx0XHRcdFx0XHRsYWJlbFNyYzondGV4dCcsXG5cdFx0XHRcdFx0dG9vbHRpcDp0cnVlLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQkKCcjam9iLWxpc3RpbmctdGFicycpLnRhYnMoeyBoaWRlOiB7IGVmZmVjdDogXCJmYWRlXCIsIGR1cmF0aW9uOiAnZmFzdCcgfSwgc2hvdzogeyBlZmZlY3Q6IFwiZmFkZVwiLCBkdXJhdGlvbjogJ2Zhc3QnIH0gfSk7XG5cblx0XHR2YXIgc2NyZWVuV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcblxuXHRcdGlmICggc2NyZWVuV2lkdGggPCA3NjcgKSB7XG5cdFx0XHQkKCdsaS5oYXMtY2hpbGRyZW4gPiBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpe1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdCQodGhpcykubmV4dCgnLnN1Yi1tZW51Jykuc2xpZGVUb2dnbGUoJ2Zhc3QnKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICgkKCcjY291bnRyeVNlbGVjdG9yJylbMF0pIHtcblx0XHRcdHRoaXMuZm9ybUNvdW50cnlTZWxlY3RvckluaXQoKTtcblx0XHR9XG5cblx0XHRpZiAoJCgnLnN1bW1lcm5vdGUnKVswXSkge1xuXHRcdFx0JCgnLnN1bW1lcm5vdGUnKS5zdW1tZXJub3RlKHtkaWFsb2dzSW5Cb2R5OiB0cnVlfSk7XG5cdFx0fVxuXG5cdFx0aWYgKCQoJ1tkYXRhLWNoZWNrb3V0LXR5cGVdJylbMF0pIHtcblx0XHRcdHZhciBwYXltZW50UHJvY2Vzc2luZyA9IGZhbHNlO1xuXG5cdFx0XHQkLmVhY2goJCgnW2RhdGEtY2hlY2tvdXQtdHlwZV0nKSwgZnVuY3Rpb24gKGUsIGkpIHtcblx0XHRcdFx0JCh0aGlzKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGlmICggISBwYXltZW50UHJvY2Vzc2luZykge1xuXHRcdFx0XHRcdFx0dmFyICRidXR0b24gPSAkKHRoaXMpO1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0cGF5bWVudFByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0JGJ1dHRvbi5kaXNhYmxlKHRydWUpO1xuXHRcdFx0XHRcdFx0dmFyIGNoZWNrb3V0X3R5cGUgPSAkYnV0dG9uLmRhdGEoJ2NoZWNrb3V0LXR5cGUnKTtcblx0XHRcdFx0XHRcdHZhciBwb3N0RGF0YSA9IHt9O1xuXG5cdFx0XHRcdFx0XHRpZiAoY2hlY2tvdXRfdHlwZSA9PSAxKSB7XG5cdFx0XHRcdFx0XHRcdHBvc3REYXRhID0ge1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6ICdwYXlwYWwnLFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBjaGVja291dF90eXBlXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGlmIChjaGVja291dF90eXBlID09IDIpIHtcblx0XHRcdFx0XHRcdFx0cG9zdERhdGEgPSB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogJ3BheXBhbCcsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IGNoZWNrb3V0X3R5cGUsXG5cdFx0XHRcdFx0XHRcdFx0YW1vdW50OiAkYnV0dG9uLnBhcmVudCgpLmZpbmQoJ2lucHV0W25hbWU9X2NyZWRfYW10XScpLnZhbCgpXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9hcGkvcGF5bWVudC9wcm9jZXNzLXBheW1lbnQnLCBwb3N0RGF0YSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIHdpbmRvdy5vcGVuKGUucmVkaXJlY3QpO1xuXHRcdFx0XHRcdFx0XHRlbHNlIGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRcdCRidXR0b24uZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdHBheW1lbnRQcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0XHRwYXltZW50UHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHQkYnV0dG9uLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0YWxlcnQoJ0Fub3RoZXIgcGF5bWVudCBpcyBwcm9jZXNzaW5nLCBwbGVhc2Ugd2FpdC4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdGluaXRCb290c3RyYXAoKSB7XG5cdFx0JCgnLnBhbmVsLXRvb2x0aXAnKS50b29sdGlwKCk7XG5cdFx0JCgnW2RhdGEtdG9nZ2xlPVwicG9wb3ZlclwiXScpLnBvcG92ZXIoKTtcblxuXHRcdCQoJy5pbnB1dC1kYXRlcmFuZ2UgaW5wdXQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdCQodGhpcykuZGF0ZXBpY2tlcih7XG5cdFx0XHRcdGZvcm1hdDogXCJ5eXl5LW1tLWRkXCIsXG5cdFx0XHRcdHN0YXJ0RGF0ZTogXCIrMWRcIlxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblx0Zm9ybUNvdW50cnlTZWxlY3RvckluaXQoKSB7XG5cdFx0JC5hamF4KHtcblx0XHRcdHR5cGU6ICdnZXQnLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHR0eXBlOiBcImFsbFwiXG5cdFx0XHR9LFxuXHRcdFx0ZGF0YVR5cGU6IFwianNvblwiLFxuXHRcdFx0dXJsOiB3aW5kb3cub3JpZ2luICsgJy9hcGkvY291bnRyeScsXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuXHRcdFx0XHRcdGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdHZhciBzZWxlY3RlZCA9ICcnO1xuXHRcdFx0XHRcdFx0aWYgKCQoJyNjb3VudHJ5U2VsZWN0b3InKS5kYXRhKCd2YWx1ZScpICE9PSAnJykge1xuXHRcdFx0XHRcdFx0XHR2YXIgY291bnRyeVZhbHVlID0gJCgnI2NvdW50cnlTZWxlY3RvcicpLmRhdGEoJ3ZhbHVlJyk7XG5cdFx0XHRcdFx0XHRcdHNlbGVjdGVkID0gKGRhdGFba2V5XS5OYW1lID09PSBjb3VudHJ5VmFsdWUpID8gJ3NlbGVjdGVkPVwic2VsZWN0ZWRcIicgOiAnJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRzZWxlY3RlZCA9IChkYXRhW2tleV0uQ29kZSA9PT0gJ0dCUicpID8gJ3NlbGVjdGVkPVwic2VsZWN0ZWRcIicgOiAnJztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdCQoJyNjb3VudHJ5U2VsZWN0b3InKS5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCInICsgZGF0YVtrZXldLk5hbWUgKyAnXCIgZGF0YS1jb2RlPVwiJyArIGRhdGFba2V5XS5Db2RlICsgJ1wiICcgKyBzZWxlY3RlZCArICc+JyArIGRhdGFba2V5XS5OYW1lICsnPC9vcHRpb24+Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCQoJyNjaXR5U2VsZWN0b3InKVswXSkge1xuXHRcdFx0XHRcdHZhciBwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnI2NpdHlTZWxlY3RvcicpLmVtcHR5KCk7XG5cblx0XHRcdFx0XHR2YXIgY2l0eVJlbG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0XHR0eXBlOiAnZ2V0Jyxcblx0XHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiAkKCcjY291bnRyeVNlbGVjdG9yIDpzZWxlY3RlZCcpLmRhdGEoJ2NvZGUnKVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdFx0XHRcdHVybDogd2luZG93Lm9yaWdpbiArICcvYXBpL2NpdHknLFxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoY2l0eURhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0JCgnI2NpdHlTZWxlY3RvcicpLmVtcHR5KCk7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGNpdHlEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoY2l0eURhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgc2VsZWN0ZWQgPSAnJztcblxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoJCgnI2NpdHlTZWxlY3RvcicpLmRhdGEoJ3ZhbHVlJykgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIGNpdHlWYWx1ZSA9ICQoJyNjaXR5U2VsZWN0b3InKS5kYXRhKCd2YWx1ZScpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkID0gKGNpdHlEYXRhW2tleV0uTmFtZSA9PT0gY2l0eVZhbHVlKSA/ICdzZWxlY3RlZD1cInNlbGVjdGVkXCInIDogJyc7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQkKCcjY2l0eVNlbGVjdG9yJykuYXBwZW5kKCc8b3B0aW9uIHZhbHVlPVwiJyArIGNpdHlEYXRhW2tleV0uTmFtZSArICdcIiAnICsgc2VsZWN0ZWQgKyAnPicgKyBjaXR5RGF0YVtrZXldLk5hbWUgKyc8L29wdGlvbj4nKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpcm0oXCJDYW5ub3QgbG9hZCBcIiArIGNvdW50cnkgKyBcIidzIGNpdHkgbGlzdCwgcmVsb2FkP1wiKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Y2l0eVJlbG9hZCgpO1xuXG5cdFx0XHRcdFx0JCgnI2NvdW50cnlTZWxlY3RvcicpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmICggISBwcm9jZXNzaW5nKSBjaXR5UmVsb2FkKCk7XG5cdFx0XHRcdFx0XHRlbHNlIGFsZXJ0KCdQbGVhc2Ugd2FpdCB3aGlsZSBwcmV2aW91cyBsaXN0IHdhcyBsb2FkZWQuJyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdGlmIChjb25maXJtKCdDYW5ub3QgbG9hZCBjb3VudHJ5IGxpc3QsIHJlbG9hZD8nKSkge1xuXHRcdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0iXX0=
