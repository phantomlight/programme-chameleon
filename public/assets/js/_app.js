(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/ford/web/www-job/resources/assets/js/back/app.js":[function(require,module,exports){
"use strict";

var _core = require("./core");

var _forms = require("./forms");

var _plugins = require("./plugins");

var _tables = require("./tables");

new _core.Core();
new _plugins.Plugins();
new _forms.Forms();
new _tables.Tables();

},{"./core":"/home/ford/web/www-job/resources/assets/js/back/core.js","./forms":"/home/ford/web/www-job/resources/assets/js/back/forms.js","./plugins":"/home/ford/web/www-job/resources/assets/js/back/plugins.js","./tables":"/home/ford/web/www-job/resources/assets/js/back/tables.js"}],"/home/ford/web/www-job/resources/assets/js/back/core.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Core = (function () {
	function Core() {
		_classCallCheck(this, Core);

		this.disable();
		this.formMessage();
		this.serializeForm();
		this.setupAjax();
	}

	_createClass(Core, [{
		key: 'disable',
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
		key: 'formMessage',
		value: function formMessage() {
			$.fn.showMessage = function (message, type, alertClass) {
				var html;
				html = void 0;
				if (alertClass === undefined) {
					alertClass = '';
				}
				$('.status-message').remove();
				html = '<div class=\'status-message m-t ' + alertClass + '\'> <div role=\'alert\' class=\'fade-in alert alert-dismissable alert-' + type + '\'> <button type=\'button\' class=\'close\' data-dismiss=\'alert\'> <span aria-hidden=\'true\'><i class=\'fa fa-times\'></i></span> <span class=\'sr-only\'>Close</span> </button>' + message + '</div></div>';
				return $(html).appendTo(this).hide().fadeIn(900);
			};
		}
	}, {
		key: 'serializeForm',
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
		key: 'setupAjax',
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
				headers: {
					'X-CSRF-Token': $('meta[name="_t"]').attr('content')
				}
			});
		}
	}]);

	return Core;
})();

exports.Core = Core;

},{}],"/home/ford/web/www-job/resources/assets/js/back/forms.js":[function(require,module,exports){
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

var merchantRoutes = { // merchant routes
	login: window.origin + '/merchant/login'
};

var adminRoutes = { // admin routes
	login: window.origin + '/admin/login'
};

var Forms = (function () {
	function Forms() {
		_classCallCheck(this, Forms);

		if ($('#adminLoginForm')[0]) {
			this.initAdminLoginForm('#adminLoginForm');
		}

		if ($('.form-action-add')[0]) {
			this.initCommonAddForm();
		}

		if ($('.form-action-edit')[0]) {
			this.initCommonEditForm();
		}
	}

	_createClass(Forms, [{
		key: 'initAdminLoginForm',
		value: function initAdminLoginForm(form) {
			var processing = false;
			var $form = $(form);

			$form.find('[type=submit]').on('click', function (f) {
				f.preventDefault();
				var aes;

				if ($form.parsley().validate() && !processing) {
					processing = true;
					aes = $.jCryption.encrypt(jKey.key1, jKey.key2);
					$.jCryption.authenticate(aes, jKey.pub_key, jKey.handshake, function () {
						$form.find('[type=submit]').disable(true);
						$.post(adminRoutes.login, {
							data: JSON.stringify($.jCryption.encrypt($form.serialize(), aes))
						}).done(function (e) {
							processing = false;
							$form.showMessage(e.message, e.type);
							if (e.type === 'success') {
								window.location.replace(e.redirect);
							} else {
								$form.find('[type=submit]').disable(false);
							}
						}).fail(function (xhr, status, e) {
							processing = false;
							$form.showMessage(xhr.responseText, 'danger');
							$form.find('[type=submit]').disable(false);
						});
					});
				} else {
					$form.showMessage('Logging you in', 'info');
					return;
				}
				return false;
			});
		}
	}, {
		key: 'initCommonAddForm',
		value: function initCommonAddForm() {
			// RESTful add form action
			var processing = false;
			var data = {};
			var allowed_mime = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/png'];
			var image = null;

			$('button[type=cancel]').on('click', function (f) {
				f.preventDefault();
				$('.form-action-add')[0].reset();
			});

			if ($('input[type=file]')[0]) {
				$('input[type=file]').on('change', function () {
					if (this.files[0].size > 3000000) {
						$(this).parent().showMessage('File tidak bisa lebih dari 3Mb !', 'danger');
						image = null;
					} else if ($.inArray(this.files[0].type, allowed_mime) === -1) {
						$(this).parent().showMessage('Tipe file ini tidak dapat dipuload !', 'danger');
						image = null;
					} else {
						$(this).parent().showMessage('<i class="fa fa-check"></i> File ini dapat diupload', 'success');
						image = this.files[0];
					}
				});
			}

			$('.form-action-add').find('[type=submit]').on('click', function (f) {
				f.preventDefault();
				var $form = $('.form-action-add');
				var $route = $form.find('input[data-route]').val();

				if ($form.parsley().validate() && !processing) {
					processing = true;
					var fd = new FormData();
					fd.append('data', JSON.stringify($form.serializeForm()));

					if ($('input[type=file]')[0]) {
						fd.append('image', image);
					}

					if ($('.summernote')[0]) {
						var textarea = {};
						$('.summernote').each(function (e) {
							textarea[$(this).attr('data-id')] = $(this).code();
						});
						fd.append('longText', JSON.stringify(textarea));
					}

					$form.find('input, textarea, select, button').attr('disabled', 'disabled');
					$form.find('button, .btn, input').addClass('disabled').attr('disabled', 'disabled');
					$form.find('[type=submit]').disable(true);

					$.ajax({
						method: 'post',
						url: $route,
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
						$form.showMessage(e.message, e.type);
						$form.find('input, textarea, select, button').removeClass('disabled').removeAttr('disabled');
						$form.find('[type=submit]').disable(false);
						if (e.type === 'success') {
							$form[0].reset();
							if ($form.find('input[data-route]').attr('data-reload') === 'true') {
								setTimeout(function () {
									location.reload();
								}, 3000);
							}
						}
					}).fail(function (xhr, status, e) {
						processing = false;
						$form.showMessage(xhr.responseText, 'danger');
						$form.find('input, textarea, select, button').removeClass('disabled').removeAttr('disabled');
						$form.find('[type=submit]').disable(false);
					});
				} else {
					$form.showMessage('Something wrong!', 'info');
					return;
				}
				return false;
			});
		}
	}, {
		key: 'initCommonEditForm',
		value: function initCommonEditForm() {
			// RESTful edit form action
			var processing = false;
			var data = {};
			var allowed_mime = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/png'];
			var image = null;

			$('button[type=cancel]').on('click', function (f) {
				f.preventDefault();
				$('.form-action-edit')[0].reset();
			});

			if ($('input[type=file]')[0]) {
				$('input[type=file]').on('change', function () {
					if (this.files[0].size > 3000000) {
						$(this).parent().showMessage('File tidak bisa lebih dari 3Mb !', 'danger');
						image = null;
					} else if ($.inArray(this.files[0].type, allowed_mime) === -1) {
						$(this).parent().showMessage('Tipe file ini tidak dapat dipuload !', 'danger');
						image = null;
					} else {
						$(this).parent().showMessage('<i class="fa fa-check"></i> File ini dapat diupload', 'success');
						image = this.files[0];
					}
				});
			}

			$('.form-action-edit').find('[type=submit]').on('click', function (f) {
				f.preventDefault();
				var $form = $('.form-action-edit');
				var $route = $form.find('input[data-route]').val();

				if ($form.parsley().validate() && !processing) {
					processing = true;
					var fd = new FormData();
					fd.append('data', JSON.stringify($form.serializeForm()));

					if ($('input[type=file]')[0]) {
						fd.append('image', image);
					}

					if ($('.summernote')[0]) {
						var textarea = {};
						$('.summernote').each(function (e) {
							textarea[$(this).attr('data-id')] = $(this).code();
						});
						fd.append('longText', JSON.stringify(textarea));
					}

					$form.find('input, textarea, select, button').attr('disabled', 'disabled');
					$form.find('button, .btn, input').addClass('disabled').attr('disabled', 'disabled');
					$form.find('[type=submit]').disable(true);

					$.ajax({
						method: 'post',
						url: $route,
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
						$form.showMessage(e.message, e.type);
						$form.find('input, textarea, select, button').removeClass('disabled').removeAttr('disabled');
						$form.find('[type=submit]').disable(false);
						if (e.type === 'success') {
							$form[0].reset();
							if ($form.find('input[data-route]').attr('data-reload') === 'true') {
								setTimeout(function () {
									location.reload();
								}, 3000);
							}
						}
					}).fail(function (xhr, status, e) {
						processing = false;
						$form.showMessage(xhr.responseText, 'danger');
						$form.find('input, textarea, select, button').removeClass('disabled').removeAttr('disabled');
						$form.find('[type=submit]').disable(false);
					});
				} else {
					$form.showMessage('Something wrong!', 'info');
					return;
				}
				return false;
			});
		}
	}]);

	return Forms;
})();

exports.Forms = Forms;

},{}],"/home/ford/web/www-job/resources/assets/js/back/plugins.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Plugins = (function () {
	function Plugins() {
		_classCallCheck(this, Plugins);

		this.initBootstrap();

		if ($('.ibox-tools')[0]) {
			this.initIbox();
		}

		function smoothlyMenu() {
			if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
				$('#side-menu').hide();
				setTimeout(function () {
					$('#side-menu').fadeIn(500);
				}, 100);
			} else if ($('body').hasClass('fixed-sidebar')) {
				$('#side-menu').hide();
				setTimeout(function () {
					$('#side-menu').fadeIn(500);
				}, 300);
			} else {
				$('#side-menu').removeAttr('style');
			}
		}

		function fixHeight() {
			var heightWithoutNavbar = $("body > #wrapper").height() - 61;
			$(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

			var navbarHeigh = $('nav.navbar-default').height();
			var wrapperHeigh = $('#page-wrapper').height();

			if (navbarHeigh > wrapperHeigh) {
				$('#page-wrapper').css("min-height", navbarHeigh + "px");
			}

			if (navbarHeigh < wrapperHeigh) {
				$('#page-wrapper').css("min-height", $(window).height() + "px");
			}

			if ($('body').hasClass('fixed-nav')) {
				$('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
			}
		}

		if ($("#side-menu")[0]) {
			$("#side-menu").metisMenu();
		}

		if ($(document).width() < 769) {
			$('body').addClass('body-small');
		} else {
			$('body').removeClass('body-small');
		}

		$('.navbar-minimalize').click(function () {
			$("body").toggleClass("mini-navbar");
			smoothlyMenu();
		});

		fixHeight();

		$(window).bind("load", function () {
			if ($("body").hasClass('fixed-sidebar')) {
				$('.sidebar-collapse').slimScroll({
					height: '100%',
					railOpacity: 0.9
				});
			}
		});

		if ($('.summernote')[0]) {
			$('.summernote').summernote({ dialogsInBody: true });
		}
	}

	_createClass(Plugins, [{
		key: 'initBootstrap',
		value: function initBootstrap() {
			$('[data-toggle="tooltip"]').tooltip();
			$('[data-toggle="popover"]').popover();
			$('.modal').appendTo("body");
			if ($('#datepicker')[0]) {
				$('#datepicker').find('input').datepicker({
					clearBtn: true,
					format: 'yyyy-mm-dd'
				});
			}
		}
	}, {
		key: 'initIbox',
		value: function initIbox() {
			// Collapse ibox function
			$('.collapse-link').click(function () {
				var ibox = $(this).closest('div.ibox');
				var button = $(this).find('i');
				var content = ibox.find('div.ibox-content');
				content.slideToggle(200);
				button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
				ibox.toggleClass('').toggleClass('border-bottom');
				setTimeout(function () {
					ibox.resize();
					ibox.find('[id^=map-]').resize();
				}, 50);
			});

			// Close ibox function
			$('.close-link').click(function () {
				var content = $(this).closest('div.ibox');
				content.remove();
			});
		}
	}]);

	return Plugins;
})();

exports.Plugins = Plugins;

},{}],"/home/ford/web/www-job/resources/assets/js/back/tables.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Tables = function Tables() {
	_classCallCheck(this, Tables);

	if ($('.footable-init')[0]) {
		$('.footable-init').each(function (e) {
			var $this = $(this);
			var footable = null;
			var removeLink = $this.attr('data-remove-link');

			$this.find('.check-all').click(function (e) {
				if ($(this).is(':checked')) {
					$this.find('input:checkbox').each(function (e) {
						$(this).prop('checked', true);
					});
				} else {
					$this.find('input:checkbox').each(function (e) {
						$(this).prop('checked', false);
					});
				}
			});

			$('#configTableMenu a').on('click', function (e) {
				var target = $('#configTableMenu').attr('data-target');
				var type = $(this).attr('data-value');
				if (type === 'remove') {
					if (confirm('Remove checked data? Cannot be undo')) {
						var ids = [];
						$this.find('input[type=checkbox]:checked').not('.check-all').each(function (e) {
							ids.push($(this).val());
						});
						$.post(removeLink, { i: ids }).done(function (e) {
							footable.trigger('footable_redraw');
							alert(e.message);
						}).fail(function (xhr, status, e) {
							footable.trigger('footable_redraw');
							alert(xhr.responseText);
						});
					}
				} else {
					$('#' + target).tableExport({ type: type, escape: 'false' });
				}
			});

			$('.ft-form').on('submit', function (e) {
				var $form = $(this);
				if ($form.parsley().validate()) {
					$.get($this.attr('data-route'), {
						data: $form.serializeForm()
					}).done(function (e) {
						$this.find('tbody').empty();
						for (var i = 0; i < e.length; i++) {
							var obj = e[i];
							var html = '<tr>';
							$('th[data-sort]').each(function () {
								var key = $(this).attr('data-id');
								if (key === 'id') {
									html += '<td><input type="checkbox" value="' + obj['id'] + '" /></td>';
								} else if (key === 'actions') {
									html += '<td><div class="btn-group">';
									if (obj.hasOwnProperty('viewLink')) {
										html += '<a class="btn btn-xs btn-white" href="' + obj['viewLink'] + '">View</a>';
									}
									if (obj.hasOwnProperty('editLink')) {
										html += '<a class="btn btn-xs btn-white" href="' + obj['editLink'] + '">Edit</a>';
									}
									if (obj.hasOwnProperty('removeLink')) {
										html += '<a class="btn btn-xs btn-white" data-action="remove" data-id="' + obj['id'] + '">Remove</a>';
									}
									html += '</div></td>';
								} else {
									html += '<td>' + obj[key] + '</td>';
								}
							});
							html += '</td>';
							$this.find('tbody').append(html);
							footable.trigger('footable_redraw');
						}

						$('[data-action="remove"]').on('click', function (e) {
							if (confirm('Remove data? Cannot be undo')) {
								$.post(removeLink, { i: $(this).attr('data-id') }).done(function (e) {
									alert(e.message);
									if (e.type === 'success') location.reload();
								}).fail(function (xhr, status, e) {
									footable.trigger('footable_redraw');
									alert(xhr.responseText);
								});
							}
						});
					}).fail(function (xhr, status, e) {
						alert(e.responseText);
					});
				}
			});

			// footable = $this.footable({
			// 	columns: $.get($this.attr('data-route')).done(function (e) {
			// 		$this.find('tbody').empty();
			// 		for (var i = 0; i < e.length; i++) {
			// 			var obj = e[i];
			// 			var html = '<tr>';
			// 			$('th[data-sort]').each(function() {
			// 				var key = $(this).attr('data-id');
			// 				if (key === 'id') {
			// 					html += '<td><input type="checkbox" value="' + obj['id'] + '" /></td>';
			// 				}
			// 				else if (key === 'actions') {
			// 					html += '<td><div class="btn-group">';
			// 					if (obj.hasOwnProperty('viewLink')) {
			// 						html += '<a class="btn btn-xs btn-white" href="' + obj['viewLink'] + '">View</a>';
			// 					}
			// 					if (obj.hasOwnProperty('editLink')) {
			// 						html += '<a class="btn btn-xs btn-white" href="' + obj['editLink'] + '">Edit</a>';
			// 					}
			// 					if (obj.hasOwnProperty('removeLink')) {
			// 						html += '<a class="btn btn-xs btn-white" data-action="remove" data-id="' + obj['id'] + '">Remove</a>';
			// 					}
			// 					html += '</div></td>';
			// 				}
			// 				else {
			// 					html += '<td>' + obj[key] + '</td>';
			// 				}
			// 			});
			// 			html += '</td>';
			// 			$this.find('tbody').append(html);
			// 			footable.trigger('footable_redraw');
			// 		}

			// 		$('[data-action="remove"]').on('click', function (e) {
			// 			if (confirm('Remove data? Cannot be undo')) {
			// 				$.post(removeLink, {i: $(this).attr('data-id')}).done(function (e) {
			// 					alert(e.message);
			// 					if (e.type === 'success') location.reload();
			// 				}).fail(function (xhr, status, e) {
			// 					footable.trigger('footable_redraw');
			// 					alert(xhr.responseText);
			// 				});
			// 			}
			// 		});
			// 	}).fail(function (xhr, status, e) {
			// 		alert(e.responseText);
			// 	})
			// });

			footable = $this.footable();
		});
	}

	// GENERATE VOUCHER LIST FOR MERCHANT
	if ($('#generateMerchantVoucherBtn')[0] && $('#merchantVoucherTableList')[0]) {
		$('#generateMerchantVoucherBtn').on('click', function (e) {
			e.preventDefault();
			$('#merchantVoucherTableList').tableExport({ type: 'excel', escape: 'false' });
		});
	}

	if ($('.footable-simple')[0]) {
		$('.footable-simple').footable();
	}
};

exports.Tables = Tables;

},{}]},{},["/home/ford/web/www-job/resources/assets/js/back/app.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9mb3JkL3dlYi93d3ctam9iL3Jlc291cmNlcy9hc3NldHMvanMvYmFjay9hcHAuanMiLCIvaG9tZS9mb3JkL3dlYi93d3ctam9iL3Jlc291cmNlcy9hc3NldHMvanMvYmFjay9jb3JlLmpzIiwiL2hvbWUvZm9yZC93ZWIvd3d3LWpvYi9yZXNvdXJjZXMvYXNzZXRzL2pzL2JhY2svZm9ybXMuanMiLCIvaG9tZS9mb3JkL3dlYi93d3ctam9iL3Jlc291cmNlcy9hc3NldHMvanMvYmFjay9wbHVnaW5zLmpzIiwiL2hvbWUvZm9yZC93ZWIvd3d3LWpvYi9yZXNvdXJjZXMvYXNzZXRzL2pzL2JhY2svdGFibGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7b0JDQXFCLFFBQVE7O3FCQUNQLFNBQVM7O3VCQUNQLFdBQVc7O3NCQUNaLFVBQVU7O0FBRWpDLGdCQUFVLENBQUM7QUFDWCxzQkFBYSxDQUFDO0FBQ2Qsa0JBQVcsQ0FBQztBQUNaLG9CQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7SUNSQSxJQUFJO0FBQ0wsVUFEQyxJQUFJLEdBQ0Y7d0JBREYsSUFBSTs7QUFFZixNQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDZixNQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkIsTUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ3JCLE1BQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztFQUNqQjs7Y0FOVyxJQUFJOztTQU9ULG1CQUFHO0FBQ1QsSUFBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDWCxXQUFPLEVBQUUsaUJBQVMsS0FBSyxFQUFFO0FBQ3hCLFlBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFXO0FBQzNCLFVBQUksS0FBSyxFQUFFO0FBQ1YsUUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFN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Q0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDeEIsQ0FBQyxDQUFDO1FBQ0g7T0FDRCxDQUFDLENBQUM7TUFDSCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDakMsV0FBSyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztNQUN0QixDQUFDLENBQUM7S0FDSDtJQUNELENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbURILFdBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7R0FDNUIsQ0FBQyxDQUFDO0VBQ0g7OztBQUdELEtBQUksQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDN0UsR0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBRTtBQUN6RCxJQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsSUFBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztHQUM3RSxDQUFDLENBQUM7RUFDSDs7QUFFRCxLQUFJLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzdCLEdBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0VBQ2pDO0NBQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgQ29yZSB9IGZyb20gXCIuL2NvcmVcIjtcbmltcG9ydCB7IEZvcm1zIH0gZnJvbSBcIi4vZm9ybXNcIjtcbmltcG9ydCB7IFBsdWdpbnMgfSBmcm9tIFwiLi9wbHVnaW5zXCI7XG5pbXBvcnQgeyBUYWJsZXMgfSBmcm9tIFwiLi90YWJsZXNcIjtcblxubmV3IENvcmUoKTtcbm5ldyBQbHVnaW5zKCk7XG5uZXcgRm9ybXMoKTtcbm5ldyBUYWJsZXMoKTsiLCJleHBvcnQgY2xhc3MgQ29yZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuZGlzYWJsZSgpO1xuXHRcdHRoaXMuZm9ybU1lc3NhZ2UoKTtcblx0XHR0aGlzLnNlcmlhbGl6ZUZvcm0oKTtcblx0XHR0aGlzLnNldHVwQWpheCgpO1xuXHR9XG5cdGRpc2FibGUoKSB7XG5cdFx0JC5mbi5leHRlbmQoe1xuXHRcdFx0ZGlzYWJsZTogZnVuY3Rpb24oc3RhdGUpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoc3RhdGUpIHtcblx0XHRcdFx0XHRcdCQodGhpcykuZmluZCgnc3BhbicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKS5maW5kKCcuYnRuLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5maW5kKCdzcGFuJykuc2hvdygpO1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpLmZpbmQoJy5idG4tcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0Zm9ybU1lc3NhZ2UoKSB7XG5cdFx0JC5mbi5zaG93TWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHR5cGUsIGFsZXJ0Q2xhc3MpIHtcblx0XHRcdHZhciBodG1sO1xuXHRcdFx0aHRtbCA9IHZvaWQgMDtcblx0XHRcdGlmIChhbGVydENsYXNzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0YWxlcnRDbGFzcyA9ICcnO1xuXHRcdFx0fVxuXHRcdFx0JCgnLnN0YXR1cy1tZXNzYWdlJykucmVtb3ZlKCk7XG5cdFx0XHRodG1sID0gJzxkaXYgY2xhc3M9XFwnc3RhdHVzLW1lc3NhZ2UgbS10ICcgKyBhbGVydENsYXNzICsgJ1xcJz4gPGRpdiByb2xlPVxcJ2FsZXJ0XFwnIGNsYXNzPVxcJ2ZhZGUtaW4gYWxlcnQgYWxlcnQtZGlzbWlzc2FibGUgYWxlcnQtJyArIHR5cGUgKyAnXFwnPiA8YnV0dG9uIHR5cGU9XFwnYnV0dG9uXFwnIGNsYXNzPVxcJ2Nsb3NlXFwnIGRhdGEtZGlzbWlzcz1cXCdhbGVydFxcJz4gPHNwYW4gYXJpYS1oaWRkZW49XFwndHJ1ZVxcJz48aSBjbGFzcz1cXCdmYSBmYS10aW1lc1xcJz48L2k+PC9zcGFuPiA8c3BhbiBjbGFzcz1cXCdzci1vbmx5XFwnPkNsb3NlPC9zcGFuPiA8L2J1dHRvbj4nICsgbWVzc2FnZSArICc8L2Rpdj48L2Rpdj4nO1xuXHRcdFx0cmV0dXJuICQoaHRtbCkuYXBwZW5kVG8odGhpcykuaGlkZSgpLmZhZGVJbig5MDApO1xuXHRcdH07XG5cdH1cblx0c2VyaWFsaXplRm9ybSgpIHtcblx0XHQkLmZuLnNlcmlhbGl6ZUZvcm0gPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBkYXRhLCBsb29rdXAsIHBhcnNlLCBzZWxlY3Rvcjtcblx0XHRcdGRhdGEgPSB2b2lkIDA7XG5cdFx0XHRsb29rdXAgPSB2b2lkIDA7XG5cdFx0XHRwYXJzZSA9IHZvaWQgMDtcblx0XHRcdHNlbGVjdG9yID0gdm9pZCAwO1xuXHRcdFx0aWYgKHRoaXMubGVuZ3RoIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRkYXRhID0ge307XG5cdFx0XHRsb29rdXAgPSBkYXRhO1xuXHRcdFx0c2VsZWN0b3IgPSAnOmlucHV0W3R5cGUhPVwiY2hlY2tib3hcIl1bdHlwZSE9XCJyYWRpb1wiXSwgaW5wdXQ6Y2hlY2tlZCc7XG5cdFx0XHRwYXJzZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgJGVsLCBjYXAsIGksIG5hbWVkO1xuXHRcdFx0XHQkZWwgPSB2b2lkIDA7XG5cdFx0XHRcdGNhcCA9IHZvaWQgMDtcblx0XHRcdFx0aSA9IHZvaWQgMDtcblx0XHRcdFx0bmFtZWQgPSB2b2lkIDA7XG5cdFx0XHRcdGlmICh0aGlzLmRpc2FibGVkKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG5hbWVkID0gdGhpcy5uYW1lLnJlcGxhY2UoL1xcWyhbXlxcXV0rKT9cXF0vZywgJywkMScpLnNwbGl0KCcsJyk7XG5cdFx0XHRcdGNhcCA9IG5hbWVkLmxlbmd0aCAtIDE7XG5cdFx0XHRcdCRlbCA9ICQodGhpcyk7XG5cdFx0XHRcdGlmIChuYW1lZFswXSkge1xuXHRcdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRcdHdoaWxlIChpIDwgY2FwKSB7XG5cdFx0XHRcdFx0XHRsb29rdXAgPSBsb29rdXBbbmFtZWRbaV1dID0gbG9va3VwW25hbWVkW2ldXSB8fCAobmFtZWRbaSArIDFdID09PSAnJyB8fCBuYW1lZFtpICsgMV0gPT09ICcwJyA/IFtdIDoge30pO1xuXHRcdFx0XHRcdFx0aSsrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAobG9va3VwLmxlbmd0aCAhPT0gdm9pZCAwKSB7XG5cdFx0XHRcdFx0XHRsb29rdXAucHVzaCgkZWwudmFsKCkpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRsb29rdXBbbmFtZWRbY2FwXV0gPSAkZWwudmFsKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxvb2t1cCA9IGRhdGE7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR0aGlzLmZpbHRlcihzZWxlY3RvcikuZWFjaChwYXJzZSk7XG5cdFx0XHR0aGlzLmZpbmQoc2VsZWN0b3IpLmVhY2gocGFyc2UpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fTtcblx0fVxuXHRzZXR1cEFqYXgoKSB7XG5cdFx0JC5hamF4U2V0dXAoe1xuXHRcdFx0c3RhdHVzQ29kZToge1xuXHRcdFx0XHQ0MDM6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRyZXR1cm4gd2luZG93LmFsZXJ0KCdGb3JiaWRkZW4gY29udGVudCEnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0NDA0OiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdpbmRvdy5hbGVydCgnUmVxdWVzdGVkIHJvdXRlIG5vdCBmb3VuZCEnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0NTAwOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdpbmRvdy5hbGVydCgnSW50ZXJuYWwgc2VydmVyIGVycm9yIScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y3Jvc3NEb21haW46IGZhbHNlLFxuXHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdGNhY2hlOiB0cnVlLFxuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHQnWC1DU1JGLVRva2VuJzogJCgnbWV0YVtuYW1lPVwiX3RcIl0nKS5hdHRyKCdjb250ZW50Jylcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSIsImNvbnN0IGpLZXkgPSB7IC8vIGpjcnlwdGlvbiBhZXMga2V5XG5cdGtleTE6ICdWZWZUNVdwbkdUJyxcblx0a2V5MjogJ2xSWWozSWJVMGUnLFxuXHRwdWJfa2V5OiBcdHdpbmRvdy5vcmlnaW4gKyAnL2dlbicsXG5cdGhhbmRzaGFrZTogd2luZG93Lm9yaWdpbiArICcvaGFuZHNoYWtlJ1xufVxuXG5jb25zdCBtZXJjaGFudFJvdXRlcyA9IHsgLy8gbWVyY2hhbnQgcm91dGVzXG5cdGxvZ2luOiB3aW5kb3cub3JpZ2luICsgJy9tZXJjaGFudC9sb2dpbidcbn1cblxuY29uc3QgYWRtaW5Sb3V0ZXMgPSB7IC8vIGFkbWluIHJvdXRlc1xuXHRsb2dpbjogd2luZG93Lm9yaWdpbiArICcvYWRtaW4vbG9naW4nXG59XG5cbmV4cG9ydCBjbGFzcyBGb3JtcyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGlmICgkKCcjYWRtaW5Mb2dpbkZvcm0nKVswXSkge1xuXHRcdFx0dGhpcy5pbml0QWRtaW5Mb2dpbkZvcm0oJyNhZG1pbkxvZ2luRm9ybScpO1xuXHRcdH1cblxuXHRcdGlmICgkKCcuZm9ybS1hY3Rpb24tYWRkJylbMF0pIHtcblx0XHRcdHRoaXMuaW5pdENvbW1vbkFkZEZvcm0oKTtcblx0XHR9XG5cblx0XHRpZiAoJCgnLmZvcm0tYWN0aW9uLWVkaXQnKVswXSkge1xuXHRcdFx0dGhpcy5pbml0Q29tbW9uRWRpdEZvcm0oKTtcblx0XHR9XG5cdH1cblx0aW5pdEFkbWluTG9naW5Gb3JtKGZvcm0pIHtcblx0XHR2YXIgcHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdHZhciAkZm9ybSA9ICQoZm9ybSk7XG5cblx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGYpIHtcblx0XHRcdGYucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHZhciBhZXM7XG5cblx0XHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoKSAmJiAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdGFlcyA9ICQuakNyeXB0aW9uLmVuY3J5cHQoaktleS5rZXkxLCBqS2V5LmtleTIpO1xuXHRcdFx0XHQkLmpDcnlwdGlvbi5hdXRoZW50aWNhdGUoYWVzLCBqS2V5LnB1Yl9rZXksIGpLZXkuaGFuZHNoYWtlLCAoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0XHRcdCQucG9zdChhZG1pblJvdXRlcy5sb2dpbiwge1xuXHRcdFx0XHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoJC5qQ3J5cHRpb24uZW5jcnlwdCgkZm9ybS5zZXJpYWxpemUoKSwgYWVzKSlcblx0XHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIHtcblx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZS5yZWRpcmVjdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSh4aHIucmVzcG9uc2VUZXh0LCAnZGFuZ2VyJyk7XG5cdFx0XHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSgnTG9nZ2luZyB5b3UgaW4nLCAnaW5mbycpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cdH1cblx0aW5pdENvbW1vbkFkZEZvcm0oKSB7IC8vIFJFU1RmdWwgYWRkIGZvcm0gYWN0aW9uXG5cdFx0dmFyIHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHR2YXIgZGF0YSA9IHt9O1xuXHRcdHZhciBhbGxvd2VkX21pbWUgPSBbXG5cdFx0XHQnaW1hZ2UvZ2lmJyxcblx0XHRcdCdpbWFnZS9qcGVnJyxcblx0XHRcdCdpbWFnZS9wanBlZycsXG5cdFx0XHQnaW1hZ2UvcG5nJ1xuXHRcdF07XG5cdFx0dmFyIGltYWdlID0gbnVsbDtcblxuXHRcdCQoJ2J1dHRvblt0eXBlPWNhbmNlbF0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZikge1xuXHRcdFx0Zi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnLmZvcm0tYWN0aW9uLWFkZCcpWzBdLnJlc2V0KCk7XG5cdFx0fSk7XG5cblx0XHRpZiAoJCgnaW5wdXRbdHlwZT1maWxlXScpWzBdKSB7XG5cdFx0XHQkKCdpbnB1dFt0eXBlPWZpbGVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAodGhpcy5maWxlc1swXS5zaXplID4gMzAwMDAwMCkge1xuXHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkuc2hvd01lc3NhZ2UoJ0ZpbGUgdGlkYWsgYmlzYSBsZWJpaCBkYXJpIDNNYiAhJywgJ2RhbmdlcicpO1xuXHRcdFx0XHRcdGltYWdlID0gbnVsbDtcblx0XHRcdFx0fSBlbHNlIGlmICgkLmluQXJyYXkodGhpcy5maWxlc1swXS50eXBlLCBhbGxvd2VkX21pbWUpID09PSAtMSkge1xuXHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkuc2hvd01lc3NhZ2UoJ1RpcGUgZmlsZSBpbmkgdGlkYWsgZGFwYXQgZGlwdWxvYWQgIScsICdkYW5nZXInKTtcblx0XHRcdFx0XHRpbWFnZSA9IG51bGw7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5zaG93TWVzc2FnZSgnPGkgY2xhc3M9XCJmYSBmYS1jaGVja1wiPjwvaT4gRmlsZSBpbmkgZGFwYXQgZGl1cGxvYWQnLCAnc3VjY2VzcycpO1xuXHRcdFx0XHRcdGltYWdlID0gdGhpcy5maWxlc1swXTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0JCgnLmZvcm0tYWN0aW9uLWFkZCcpLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZikge1xuXHRcdFx0Zi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dmFyICRmb3JtID0gJCgnLmZvcm0tYWN0aW9uLWFkZCcpO1xuXHRcdFx0dmFyICRyb3V0ZSA9ICRmb3JtLmZpbmQoJ2lucHV0W2RhdGEtcm91dGVdJykudmFsKCk7XG5cblx0XHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoKSAmJiAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdHZhciBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdFx0XHRmZC5hcHBlbmQoJ2RhdGEnLCBKU09OLnN0cmluZ2lmeSgkZm9ybS5zZXJpYWxpemVGb3JtKCkpKTtcblxuXHRcdFx0XHRpZiAoJCgnaW5wdXRbdHlwZT1maWxlXScpWzBdKSB7XG5cdFx0XHRcdFx0ZmQuYXBwZW5kKCdpbWFnZScsIGltYWdlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICgkKCcuc3VtbWVybm90ZScpWzBdKSB7XG5cdFx0XHRcdFx0dmFyIHRleHRhcmVhID0ge307XG5cdFx0XHRcdFx0JCgnLnN1bW1lcm5vdGUnKS5lYWNoKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHR0ZXh0YXJlYVskKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKV0gPSAkKHRoaXMpLmNvZGUoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRmZC5hcHBlbmQoJ2xvbmdUZXh0JywgSlNPTi5zdHJpbmdpZnkodGV4dGFyZWEpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCRmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0LCBidXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdidXR0b24sIC5idG4sIGlucHV0JykuYWRkQ2xhc3MoJ2Rpc2FibGVkJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUodHJ1ZSk7XG5cblx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRtZXRob2Q6ICdwb3N0Jyxcblx0XHRcdFx0XHR1cmw6ICRyb3V0ZSxcblx0XHRcdFx0XHRkYXRhOiBmZCxcblx0XHRcdFx0XHRjcm9zc0RvbWFpbjogZmFsc2UsXG5cdFx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0XHRjYWNoZTogdHJ1ZSxcblx0XHRcdFx0XHRwcm9jZXNzRGF0YTogZmFsc2UsXG5cdFx0XHRcdFx0Y29udGVudFR5cGU6IGZhbHNlLFxuXHRcdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHRcdCdYLUNTUkYtVG9rZW4nOiAkKCdtZXRhW25hbWU9XCJfdFwiXScpLmF0dHIoJ2NvbnRlbnQnKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoZS5tZXNzYWdlLCBlLnR5cGUpO1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0LCBidXR0b24nKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIHtcblx0XHRcdFx0XHRcdCRmb3JtWzBdLnJlc2V0KCk7XG5cdFx0XHRcdFx0XHRpZiAoJGZvcm0uZmluZCgnaW5wdXRbZGF0YS1yb3V0ZV0nKS5hdHRyKCdkYXRhLXJlbG9hZCcpID09PSAndHJ1ZScpIHtcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHsgbG9jYXRpb24ucmVsb2FkKCk7IH0sIDMwMDApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCwgJ2RhbmdlcicpO1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0LCBidXR0b24nKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSgnU29tZXRoaW5nIHdyb25nIScsICdpbmZvJyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9KTtcblx0fVxuXHRpbml0Q29tbW9uRWRpdEZvcm0oKSB7IC8vIFJFU1RmdWwgZWRpdCBmb3JtIGFjdGlvblxuXHRcdHZhciBwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0dmFyIGRhdGEgPSB7fTtcblx0XHR2YXIgYWxsb3dlZF9taW1lID0gW1xuXHRcdFx0J2ltYWdlL2dpZicsXG5cdFx0XHQnaW1hZ2UvanBlZycsXG5cdFx0XHQnaW1hZ2UvcGpwZWcnLFxuXHRcdFx0J2ltYWdlL3BuZydcblx0XHRdO1xuXHRcdHZhciBpbWFnZSA9IG51bGw7XG5cblx0XHQkKCdidXR0b25bdHlwZT1jYW5jZWxdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGYpIHtcblx0XHRcdGYucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJy5mb3JtLWFjdGlvbi1lZGl0JylbMF0ucmVzZXQoKTtcblx0XHR9KTtcblxuXHRcdGlmICgkKCdpbnB1dFt0eXBlPWZpbGVdJylbMF0pIHtcblx0XHRcdCQoJ2lucHV0W3R5cGU9ZmlsZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICh0aGlzLmZpbGVzWzBdLnNpemUgPiAzMDAwMDAwKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5zaG93TWVzc2FnZSgnRmlsZSB0aWRhayBiaXNhIGxlYmloIGRhcmkgM01iICEnLCAnZGFuZ2VyJyk7XG5cdFx0XHRcdFx0aW1hZ2UgPSBudWxsO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCQuaW5BcnJheSh0aGlzLmZpbGVzWzBdLnR5cGUsIGFsbG93ZWRfbWltZSkgPT09IC0xKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5zaG93TWVzc2FnZSgnVGlwZSBmaWxlIGluaSB0aWRhayBkYXBhdCBkaXB1bG9hZCAhJywgJ2RhbmdlcicpO1xuXHRcdFx0XHRcdGltYWdlID0gbnVsbDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCc8aSBjbGFzcz1cImZhIGZhLWNoZWNrXCI+PC9pPiBGaWxlIGluaSBkYXBhdCBkaXVwbG9hZCcsICdzdWNjZXNzJyk7XG5cdFx0XHRcdFx0aW1hZ2UgPSB0aGlzLmZpbGVzWzBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQkKCcuZm9ybS1hY3Rpb24tZWRpdCcpLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZikge1xuXHRcdFx0Zi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dmFyICRmb3JtID0gJCgnLmZvcm0tYWN0aW9uLWVkaXQnKTtcblx0XHRcdHZhciAkcm91dGUgPSAkZm9ybS5maW5kKCdpbnB1dFtkYXRhLXJvdXRlXScpLnZhbCgpO1xuXG5cdFx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCkgJiYgISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHR2YXIgZmQgPSBuZXcgRm9ybURhdGEoKTtcblx0XHRcdFx0ZmQuYXBwZW5kKCdkYXRhJywgSlNPTi5zdHJpbmdpZnkoJGZvcm0uc2VyaWFsaXplRm9ybSgpKSk7XG5cblx0XHRcdFx0aWYgKCQoJ2lucHV0W3R5cGU9ZmlsZV0nKVswXSkge1xuXHRcdFx0XHRcdGZkLmFwcGVuZCgnaW1hZ2UnLCBpbWFnZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoJCgnLnN1bW1lcm5vdGUnKVswXSkge1xuXHRcdFx0XHRcdHZhciB0ZXh0YXJlYSA9IHt9O1xuXHRcdFx0XHRcdCQoJy5zdW1tZXJub3RlJykuZWFjaChmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0dGV4dGFyZWFbJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyldID0gJCh0aGlzKS5jb2RlKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0ZmQuYXBwZW5kKCdsb25nVGV4dCcsIEpTT04uc3RyaW5naWZ5KHRleHRhcmVhKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCwgYnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnYnV0dG9uLCAuYnRuLCBpbnB1dCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXG5cdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0bWV0aG9kOiAncG9zdCcsXG5cdFx0XHRcdFx0dXJsOiAkcm91dGUsXG5cdFx0XHRcdFx0ZGF0YTogZmQsXG5cdFx0XHRcdFx0Y3Jvc3NEb21haW46IGZhbHNlLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdFx0Y2FjaGU6IHRydWUsXG5cdFx0XHRcdFx0cHJvY2Vzc0RhdGE6IGZhbHNlLFxuXHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBmYWxzZSxcblx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHQnWC1DU1JGLVRva2VuJzogJCgnbWV0YVtuYW1lPVwiX3RcIl0nKS5hdHRyKCdjb250ZW50Jylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKGUubWVzc2FnZSwgZS50eXBlKTtcblx0XHRcdFx0XHQkZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCwgYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblx0XHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG5cdFx0XHRcdFx0XHQkZm9ybVswXS5yZXNldCgpO1xuXHRcdFx0XHRcdFx0aWYgKCRmb3JtLmZpbmQoJ2lucHV0W2RhdGEtcm91dGVdJykuYXR0cignZGF0YS1yZWxvYWQnKSA9PT0gJ3RydWUnKSB7XG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGxvY2F0aW9uLnJlbG9hZCgpOyB9LCAzMDAwKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKHhoci5yZXNwb25zZVRleHQsICdkYW5nZXInKTtcblx0XHRcdFx0XHQkZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCwgYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblx0XHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoJ1NvbWV0aGluZyB3cm9uZyEnLCAnaW5mbycpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cdH1cbn0iLCJleHBvcnQgY2xhc3MgUGx1Z2lucyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuaW5pdEJvb3RzdHJhcCgpO1xuXG5cdFx0aWYgKCQoJy5pYm94LXRvb2xzJylbMF0pIHtcblx0XHRcdHRoaXMuaW5pdElib3goKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzbW9vdGhseU1lbnUoKSB7XG5cdFx0XHRpZiAoISQoJ2JvZHknKS5oYXNDbGFzcygnbWluaS1uYXZiYXInKSB8fCAkKCdib2R5JykuaGFzQ2xhc3MoJ2JvZHktc21hbGwnKSkge1xuXHRcdFx0XHQkKCcjc2lkZS1tZW51JykuaGlkZSgpO1xuXHRcdFx0XHRzZXRUaW1lb3V0KFxuXHRcdFx0XHRcdGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdCQoJyNzaWRlLW1lbnUnKS5mYWRlSW4oNTAwKTtcblx0XHRcdFx0XHR9LCAxMDApO1xuXHRcdFx0fSBlbHNlIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ2ZpeGVkLXNpZGViYXInKSkge1xuXHRcdFx0XHQkKCcjc2lkZS1tZW51JykuaGlkZSgpO1xuXHRcdFx0XHRzZXRUaW1lb3V0KFxuXHRcdFx0XHRcdGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdCQoJyNzaWRlLW1lbnUnKS5mYWRlSW4oNTAwKTtcblx0XHRcdFx0XHR9LCAzMDApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCgnI3NpZGUtbWVudScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZml4SGVpZ2h0KCkge1xuXHRcdFx0dmFyIGhlaWdodFdpdGhvdXROYXZiYXIgPSAkKFwiYm9keSA+ICN3cmFwcGVyXCIpLmhlaWdodCgpIC0gNjE7XG5cdFx0XHQkKFwiLnNpZGViYXJkLXBhbmVsXCIpLmNzcyhcIm1pbi1oZWlnaHRcIiwgaGVpZ2h0V2l0aG91dE5hdmJhciArIFwicHhcIik7XG5cblx0XHRcdHZhciBuYXZiYXJIZWlnaCA9ICQoJ25hdi5uYXZiYXItZGVmYXVsdCcpLmhlaWdodCgpO1xuXHRcdFx0dmFyIHdyYXBwZXJIZWlnaCA9ICQoJyNwYWdlLXdyYXBwZXInKS5oZWlnaHQoKTtcblxuXHRcdFx0aWYgKG5hdmJhckhlaWdoID4gd3JhcHBlckhlaWdoKSB7XG5cdFx0XHRcdCQoJyNwYWdlLXdyYXBwZXInKS5jc3MoXCJtaW4taGVpZ2h0XCIsIG5hdmJhckhlaWdoICsgXCJweFwiKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG5hdmJhckhlaWdoIDwgd3JhcHBlckhlaWdoKSB7XG5cdFx0XHRcdCQoJyNwYWdlLXdyYXBwZXInKS5jc3MoXCJtaW4taGVpZ2h0XCIsICQod2luZG93KS5oZWlnaHQoKSArIFwicHhcIik7XG5cdFx0XHR9XG5cblx0XHRcdGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ2ZpeGVkLW5hdicpKSB7XG5cdFx0XHRcdCQoJyNwYWdlLXdyYXBwZXInKS5jc3MoXCJtaW4taGVpZ2h0XCIsICQod2luZG93KS5oZWlnaHQoKSAtIDYwICsgXCJweFwiKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoJChcIiNzaWRlLW1lbnVcIilbMF0pIHtcblx0XHRcdCQoXCIjc2lkZS1tZW51XCIpLm1ldGlzTWVudSgpO1xuXHRcdH1cblx0XHRcblx0XHRpZiAoJChkb2N1bWVudCkud2lkdGgoKSA8IDc2OSkge1xuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdib2R5LXNtYWxsJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnYm9keS1zbWFsbCcpO1xuXHRcdH1cblxuXHRcdCQoJy5uYXZiYXItbWluaW1hbGl6ZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdCQoXCJib2R5XCIpLnRvZ2dsZUNsYXNzKFwibWluaS1uYXZiYXJcIik7XG5cdFx0XHRzbW9vdGhseU1lbnUoKTtcblx0XHR9KTtcblxuXHRcdGZpeEhlaWdodCgpO1xuXG5cdFx0JCh3aW5kb3cpLmJpbmQoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICgkKFwiYm9keVwiKS5oYXNDbGFzcygnZml4ZWQtc2lkZWJhcicpKSB7XG5cdFx0XHRcdCQoJy5zaWRlYmFyLWNvbGxhcHNlJykuc2xpbVNjcm9sbCh7XG5cdFx0XHRcdFx0aGVpZ2h0OiAnMTAwJScsXG5cdFx0XHRcdFx0cmFpbE9wYWNpdHk6IDAuOVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmICgkKCcuc3VtbWVybm90ZScpWzBdKSB7XG5cdFx0XHQkKCcuc3VtbWVybm90ZScpLnN1bW1lcm5vdGUoe2RpYWxvZ3NJbkJvZHk6IHRydWV9KTtcblx0XHR9XG5cdH1cblx0aW5pdEJvb3RzdHJhcCgpIHtcblx0XHQkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xuXHRcdCQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKCk7XG5cdFx0JCgnLm1vZGFsJykuYXBwZW5kVG8oXCJib2R5XCIpO1xuXHRcdGlmICgkKCcjZGF0ZXBpY2tlcicpWzBdKSB7XG5cdFx0XHQkKCcjZGF0ZXBpY2tlcicpLmZpbmQoJ2lucHV0JykuZGF0ZXBpY2tlcih7XG5cdFx0XHRcdGNsZWFyQnRuOiB0cnVlLFxuXHRcdFx0XHRmb3JtYXQ6ICd5eXl5LW1tLWRkJyxcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXHRpbml0SWJveCgpIHtcblx0XHQvLyBDb2xsYXBzZSBpYm94IGZ1bmN0aW9uXG5cdFx0JCgnLmNvbGxhcHNlLWxpbmsnKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgaWJveCA9ICQodGhpcykuY2xvc2VzdCgnZGl2Lmlib3gnKTtcblx0XHRcdHZhciBidXR0b24gPSAkKHRoaXMpLmZpbmQoJ2knKTtcblx0XHRcdHZhciBjb250ZW50ID0gaWJveC5maW5kKCdkaXYuaWJveC1jb250ZW50Jyk7XG5cdFx0XHRjb250ZW50LnNsaWRlVG9nZ2xlKDIwMCk7XG5cdFx0XHRidXR0b24udG9nZ2xlQ2xhc3MoJ2ZhLWNoZXZyb24tdXAnKS50b2dnbGVDbGFzcygnZmEtY2hldnJvbi1kb3duJyk7XG5cdFx0XHRpYm94LnRvZ2dsZUNsYXNzKCcnKS50b2dnbGVDbGFzcygnYm9yZGVyLWJvdHRvbScpO1xuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlib3gucmVzaXplKCk7XG5cdFx0XHRcdGlib3guZmluZCgnW2lkXj1tYXAtXScpLnJlc2l6ZSgpO1xuXHRcdFx0fSwgNTApO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQ2xvc2UgaWJveCBmdW5jdGlvblxuXHRcdCQoJy5jbG9zZS1saW5rJykuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJ2Rpdi5pYm94Jyk7XG5cdFx0XHRjb250ZW50LnJlbW92ZSgpO1xuXHRcdH0pO1xuXHR9XG59IiwiZXhwb3J0IGNsYXNzIFRhYmxlcyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGlmICgkKCcuZm9vdGFibGUtaW5pdCcpWzBdKSB7XG5cdFx0XHQkKCcuZm9vdGFibGUtaW5pdCcpLmVhY2goZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdFx0dmFyIGZvb3RhYmxlID0gbnVsbDtcblx0XHRcdFx0dmFyIHJlbW92ZUxpbmsgPSAkdGhpcy5hdHRyKCdkYXRhLXJlbW92ZS1saW5rJyk7XG5cblx0XHRcdFx0JHRoaXMuZmluZCgnLmNoZWNrLWFsbCcpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0aWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcblx0XHRcdFx0XHRcdCR0aGlzLmZpbmQoJ2lucHV0OmNoZWNrYm94JykuZWFjaChmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdCR0aGlzLmZpbmQoJ2lucHV0OmNoZWNrYm94JykuZWFjaChmdW5jdGlvbiAoZSl7XG5cdFx0XHRcdFx0XHRcdCQodGhpcykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI2NvbmZpZ1RhYmxlTWVudSBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHR2YXIgdGFyZ2V0ID0gJCgnI2NvbmZpZ1RhYmxlTWVudScpLmF0dHIoJ2RhdGEtdGFyZ2V0Jyk7XG5cdFx0XHRcdFx0dmFyIHR5cGUgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdmFsdWUnKTtcblx0XHRcdFx0XHRpZiAodHlwZSA9PT0gJ3JlbW92ZScpIHtcblx0XHRcdFx0XHRcdGlmIChjb25maXJtKCdSZW1vdmUgY2hlY2tlZCBkYXRhPyBDYW5ub3QgYmUgdW5kbycpKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBpZHMgPSBbXTtcblx0XHRcdFx0XHRcdFx0JHRoaXMuZmluZCgnaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCcpLm5vdCgnLmNoZWNrLWFsbCcpLmVhY2goZnVuY3Rpb24gKGUpe1xuXHRcdFx0XHRcdFx0XHRcdGlkcy5wdXNoKCQodGhpcykudmFsKCkpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0JC5wb3N0KHJlbW92ZUxpbmssIHtpOiBpZHN9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9vdGFibGUudHJpZ2dlcignZm9vdGFibGVfcmVkcmF3Jyk7XG5cdFx0XHRcdFx0XHRcdFx0YWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRcdFx0XHRmb290YWJsZS50cmlnZ2VyKCdmb290YWJsZV9yZWRyYXcnKTtcblx0XHRcdFx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0JCgnIycgKyB0YXJnZXQpLnRhYmxlRXhwb3J0KHt0eXBlOiB0eXBlLCBlc2NhcGU6ICdmYWxzZSd9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCQoJy5mdC1mb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0dmFyICRmb3JtID0gJCh0aGlzKTtcblx0XHRcdFx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCkpIHtcblx0XHRcdFx0XHRcdCQuZ2V0KCR0aGlzLmF0dHIoJ2RhdGEtcm91dGUnKSwge1xuXHRcdFx0XHRcdFx0XHRkYXRhOiAkZm9ybS5zZXJpYWxpemVGb3JtKClcblx0XHRcdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0JHRoaXMuZmluZCgndGJvZHknKS5lbXB0eSgpO1xuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgb2JqID0gZVtpXTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgaHRtbCA9ICc8dHI+Jztcblx0XHRcdFx0XHRcdFx0XHQkKCd0aFtkYXRhLXNvcnRdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBrZXkgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChrZXkgPT09ICdpZCcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPHRkPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIicgKyBvYmpbJ2lkJ10gKyAnXCIgLz48L3RkPic7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgKGtleSA9PT0gJ2FjdGlvbnMnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzx0ZD48ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+Jztcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eSgndmlld0xpbmsnKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzxhIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4td2hpdGVcIiBocmVmPVwiJyArIG9ialsndmlld0xpbmsnXSArICdcIj5WaWV3PC9hPic7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eSgnZWRpdExpbmsnKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzxhIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4td2hpdGVcIiBocmVmPVwiJyArIG9ialsnZWRpdExpbmsnXSArICdcIj5FZGl0PC9hPic7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eSgncmVtb3ZlTGluaycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPGEgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi13aGl0ZVwiIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCIgZGF0YS1pZD1cIicgKyBvYmpbJ2lkJ10gKyAnXCI+UmVtb3ZlPC9hPic7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPC9kaXY+PC90ZD4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzx0ZD4nICsgb2JqW2tleV0gKyAnPC90ZD4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzwvdGQ+Jztcblx0XHRcdFx0XHRcdFx0XHQkdGhpcy5maW5kKCd0Ym9keScpLmFwcGVuZChodG1sKTtcblx0XHRcdFx0XHRcdFx0XHRmb290YWJsZS50cmlnZ2VyKCdmb290YWJsZV9yZWRyYXcnKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdCQoJ1tkYXRhLWFjdGlvbj1cInJlbW92ZVwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpcm0oJ1JlbW92ZSBkYXRhPyBDYW5ub3QgYmUgdW5kbycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQkLnBvc3QocmVtb3ZlTGluaywge2k6ICQodGhpcykuYXR0cignZGF0YS1pZCcpfSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9vdGFibGUudHJpZ2dlcignZm9vdGFibGVfcmVkcmF3Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0XHRcdGFsZXJ0KGUucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gZm9vdGFibGUgPSAkdGhpcy5mb290YWJsZSh7XG5cdFx0XHRcdC8vIFx0Y29sdW1uczogJC5nZXQoJHRoaXMuYXR0cignZGF0YS1yb3V0ZScpKS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdC8vIFx0XHQkdGhpcy5maW5kKCd0Ym9keScpLmVtcHR5KCk7XG5cdFx0XHRcdC8vIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Ly8gXHRcdFx0dmFyIG9iaiA9IGVbaV07XG5cdFx0XHRcdC8vIFx0XHRcdHZhciBodG1sID0gJzx0cj4nO1xuXHRcdFx0XHQvLyBcdFx0XHQkKCd0aFtkYXRhLXNvcnRdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0Ly8gXHRcdFx0XHR2YXIga2V5ID0gJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyk7XG5cdFx0XHRcdC8vIFx0XHRcdFx0aWYgKGtleSA9PT0gJ2lkJykge1xuXHRcdFx0XHQvLyBcdFx0XHRcdFx0aHRtbCArPSAnPHRkPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIicgKyBvYmpbJ2lkJ10gKyAnXCIgLz48L3RkPic7XG5cdFx0XHRcdC8vIFx0XHRcdFx0fVxuXHRcdFx0XHQvLyBcdFx0XHRcdGVsc2UgaWYgKGtleSA9PT0gJ2FjdGlvbnMnKSB7XG5cdFx0XHRcdC8vIFx0XHRcdFx0XHRodG1sICs9ICc8dGQ+PGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPic7XG5cdFx0XHRcdC8vIFx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KCd2aWV3TGluaycpKSB7XG5cdFx0XHRcdC8vIFx0XHRcdFx0XHRcdGh0bWwgKz0gJzxhIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4td2hpdGVcIiBocmVmPVwiJyArIG9ialsndmlld0xpbmsnXSArICdcIj5WaWV3PC9hPic7XG5cdFx0XHRcdC8vIFx0XHRcdFx0XHR9XG5cdFx0XHRcdC8vIFx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KCdlZGl0TGluaycpKSB7XG5cdFx0XHRcdC8vIFx0XHRcdFx0XHRcdGh0bWwgKz0gJzxhIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4td2hpdGVcIiBocmVmPVwiJyArIG9ialsnZWRpdExpbmsnXSArICdcIj5FZGl0PC9hPic7XG5cdFx0XHRcdC8vIFx0XHRcdFx0XHR9XG5cdFx0XHRcdC8vIFx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KCdyZW1vdmVMaW5rJykpIHtcblx0XHRcdFx0Ly8gXHRcdFx0XHRcdFx0aHRtbCArPSAnPGEgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi13aGl0ZVwiIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCIgZGF0YS1pZD1cIicgKyBvYmpbJ2lkJ10gKyAnXCI+UmVtb3ZlPC9hPic7XG5cdFx0XHRcdC8vIFx0XHRcdFx0XHR9XG5cdFx0XHRcdC8vIFx0XHRcdFx0XHRodG1sICs9ICc8L2Rpdj48L3RkPic7XG5cdFx0XHRcdC8vIFx0XHRcdFx0fVxuXHRcdFx0XHQvLyBcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHQvLyBcdFx0XHRcdFx0aHRtbCArPSAnPHRkPicgKyBvYmpba2V5XSArICc8L3RkPic7XG5cdFx0XHRcdC8vIFx0XHRcdFx0fVxuXHRcdFx0XHQvLyBcdFx0XHR9KTtcblx0XHRcdFx0Ly8gXHRcdFx0aHRtbCArPSAnPC90ZD4nO1xuXHRcdFx0XHQvLyBcdFx0XHQkdGhpcy5maW5kKCd0Ym9keScpLmFwcGVuZChodG1sKTtcblx0XHRcdFx0Ly8gXHRcdFx0Zm9vdGFibGUudHJpZ2dlcignZm9vdGFibGVfcmVkcmF3Jyk7XG5cdFx0XHRcdC8vIFx0XHR9XG5cblx0XHRcdFx0Ly8gXHRcdCQoJ1tkYXRhLWFjdGlvbj1cInJlbW92ZVwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdC8vIFx0XHRcdGlmIChjb25maXJtKCdSZW1vdmUgZGF0YT8gQ2Fubm90IGJlIHVuZG8nKSkge1xuXHRcdFx0XHQvLyBcdFx0XHRcdCQucG9zdChyZW1vdmVMaW5rLCB7aTogJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyl9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdC8vIFx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHQvLyBcdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSBsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0Ly8gXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHQvLyBcdFx0XHRcdFx0Zm9vdGFibGUudHJpZ2dlcignZm9vdGFibGVfcmVkcmF3Jyk7XG5cdFx0XHRcdC8vIFx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0Ly8gXHRcdFx0XHR9KTtcblx0XHRcdFx0Ly8gXHRcdFx0fVxuXHRcdFx0XHQvLyBcdFx0fSk7XG5cdFx0XHRcdC8vIFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0Ly8gXHRcdGFsZXJ0KGUucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0Ly8gXHR9KVxuXHRcdFx0XHQvLyB9KTtcblxuXHRcdFx0XHRmb290YWJsZSA9ICR0aGlzLmZvb3RhYmxlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBHRU5FUkFURSBWT1VDSEVSIExJU1QgRk9SIE1FUkNIQU5UXG5cdFx0aWYgKCQoJyNnZW5lcmF0ZU1lcmNoYW50Vm91Y2hlckJ0bicpWzBdICYmICQoJyNtZXJjaGFudFZvdWNoZXJUYWJsZUxpc3QnKVswXSkge1xuXHRcdFx0JCgnI2dlbmVyYXRlTWVyY2hhbnRWb3VjaGVyQnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHQkKCcjbWVyY2hhbnRWb3VjaGVyVGFibGVMaXN0JykudGFibGVFeHBvcnQoe3R5cGU6ICdleGNlbCcsIGVzY2FwZTogJ2ZhbHNlJ30pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKCQoJy5mb290YWJsZS1zaW1wbGUnKVswXSkge1xuXHRcdFx0JCgnLmZvb3RhYmxlLXNpbXBsZScpLmZvb3RhYmxlKCk7XG5cdFx0fVxuXHR9XG59Il19
