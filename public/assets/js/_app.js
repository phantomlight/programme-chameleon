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

var adminRoutes = {
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
					$('.page-preloader').show();
					aes = $.jCryption.encrypt(jKey.key1, jKey.key2);
					$.jCryption.authenticate(aes, jKey.pub_key, jKey.handshake, function () {
						$form.find('[type=submit]').disable(true);
						$.post(adminRoutes.login, {
							data: JSON.stringify($.jCryption.encrypt($form.serialize(), aes))
						}).done(function (e) {
							processing = false;
							$('.page-preloader').hide();
							$form.showMessage(e.message, e.type);
							if (e.type === 'success') {
								window.location.replace(e.redirect);
							} else {
								$form.find('[type=submit]').disable(false);
							}
						}).fail(function (xhr, status, e) {
							processing = false;
							$('.page-preloader').hide();
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
					if (this.files[0].size > 5000000) {
						$(this).parent().showMessage('File cannot be larger than 5mb !', 'danger');
						image = null;
					} else if ($.inArray(this.files[0].type, allowed_mime) === -1) {
						$(this).parent().showMessage('File cannot be uploaded !', 'danger');
						image = null;
					} else {
						$(this).parent().showMessage('<i class="fa fa-check"></i> File can be uploaded', 'success');
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
					$('.page-preloader').show();
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
						$('.page-preloader').hide();
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
						$('.page-preloader').hide();
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
					if (this.files[0].size > 5000000) {
						$(this).parent().showMessage('File cannot be larger than 3Mb !', 'danger');
						image = null;
					} else if ($.inArray(this.files[0].type, allowed_mime) === -1) {
						$(this).parent().showMessage('File cannot be uplaoded !', 'danger');
						image = null;
					} else {
						$(this).parent().showMessage('<i class="fa fa-check"></i> File allowed', 'success');
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
					$('.page-preloader').show();
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
						$('.page-preloader').hide();
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
						$('.page-preloader').hide();
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

	var processing = true;

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
					processing = true;
					$('.page-preloader').show();

					$.get($this.attr('data-route'), {
						data: $form.serializeForm()
					}).done(function (e) {
						processing = false;
						$('.page-preloader').hide();
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
								processing = true;
								$('.page-preloader').show();
								$.post(removeLink, { i: $(this).attr('data-id') }).done(function (e) {
									processing = false;
									$('.page-preloader').hide();
									alert(e.message);
									if (e.type === 'success') location.reload();
								}).fail(function (xhr, status, e) {
									processing = false;
									$('.page-preloader').hide();
									footable.trigger('footable_redraw');
									alert(xhr.responseText);
								});
							}
						});
					}).fail(function (xhr, status, e) {
						alert(e.responseText);
						processing = false;
						$('.page-preloader').hide();
					});
				}
			});

			footable = $this.footable({
				columns: $.get($this.attr('data-route')).done(function (e) {
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
							processing = true;
							$('.page-preloader').show();
							$.post(removeLink, { i: $(this).attr('data-id') }).done(function (e) {
								alert(e.message);
								processing = false;
								$('.page-preloader').hide();
								if (e.type === 'success') location.reload();
							}).fail(function (xhr, status, e) {
								footable.trigger('footable_redraw');
								processing = false;
								$('.page-preloader').hide();
								alert(xhr.responseText);
							});
						}
					});
				}).fail(function (xhr, status, e) {
					alert(e.responseText);
					processing = false;
					$('.page-preloader').hide();
				})
			});

			footable = $this.footable();
		});
	}

	if ($('.footable-simple')[0]) {
		$('.footable-simple').footable();
	}
};

exports.Tables = Tables;

},{}]},{},["/home/ford/web/www-job/resources/assets/js/back/app.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9mb3JkL3dlYi93d3ctam9iL3Jlc291cmNlcy9hc3NldHMvanMvYmFjay9hcHAuanMiLCIvaG9tZS9mb3JkL3dlYi93d3ctam9iL3Jlc291cmNlcy9hc3NldHMvanMvYmFjay9jb3JlLmpzIiwiL2hvbWUvZm9yZC93ZWIvd3d3LWpvYi9yZXNvdXJjZXMvYXNzZXRzL2pzL2JhY2svZm9ybXMuanMiLCIvaG9tZS9mb3JkL3dlYi93d3ctam9iL3Jlc291cmNlcy9hc3NldHMvanMvYmFjay9wbHVnaW5zLmpzIiwiL2hvbWUvZm9yZC93ZWIvd3d3LWpvYi9yZXNvdXJjZXMvYXNzZXRzL2pzL2JhY2svdGFibGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7b0JDQXFCLFFBQVE7O3FCQUNQLFNBQVM7O3VCQUNQLFdBQVc7O3NCQUNaLFVBQVU7O0FBRWpDLGdCQUFVLENBQUM7QUFDWCxzQkFBYSxDQUFDO0FBQ2Qsa0JBQVcsQ0FBQztBQUNaLG9CQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7SUNSQSxJQUFJO0FBQ0wsVUFEQyxJQUFJLEdBQ0Y7d0JBREYsSUFBSTs7QUFFZixNQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDZixNQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkIsTUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ3JCLE1BQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztFQUNqQjs7Y0FOVyxJQUFJOztTQU9ULG1CQUFHO0FBQ1QsSUFBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDWCxXQUFPLEVBQUUsaUJBQVMsS0FBSyxFQUFFO0FBQ3hCLFlBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFXO0FBQzNCLFVBQUksS0FBSyxFQUFFO0FBQ1YsUUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFN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QzVCLFlBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzVDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUNqQyxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3BDLGtCQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFNBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLGFBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDO09BQ0g7TUFDRCxDQUFDLENBQUM7S0FDSCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7QUFDakMsVUFBSyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN0QixlQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ25CLE1BQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQzVCLENBQUM7SUFDRixDQUFDLENBQUM7O0FBRUgsV0FBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztHQUM1QixDQUFDLENBQUM7RUFDSDs7QUFFRCxLQUFJLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzdCLEdBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0VBQ2pDO0NBQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgQ29yZSB9IGZyb20gXCIuL2NvcmVcIjtcbmltcG9ydCB7IEZvcm1zIH0gZnJvbSBcIi4vZm9ybXNcIjtcbmltcG9ydCB7IFBsdWdpbnMgfSBmcm9tIFwiLi9wbHVnaW5zXCI7XG5pbXBvcnQgeyBUYWJsZXMgfSBmcm9tIFwiLi90YWJsZXNcIjtcblxubmV3IENvcmUoKTtcbm5ldyBQbHVnaW5zKCk7XG5uZXcgRm9ybXMoKTtcbm5ldyBUYWJsZXMoKTsiLCJleHBvcnQgY2xhc3MgQ29yZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuZGlzYWJsZSgpO1xuXHRcdHRoaXMuZm9ybU1lc3NhZ2UoKTtcblx0XHR0aGlzLnNlcmlhbGl6ZUZvcm0oKTtcblx0XHR0aGlzLnNldHVwQWpheCgpO1xuXHR9XG5cdGRpc2FibGUoKSB7XG5cdFx0JC5mbi5leHRlbmQoe1xuXHRcdFx0ZGlzYWJsZTogZnVuY3Rpb24oc3RhdGUpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoc3RhdGUpIHtcblx0XHRcdFx0XHRcdCQodGhpcykuZmluZCgnc3BhbicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdCQodGhpcykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKS5maW5kKCcuYnRuLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5maW5kKCdzcGFuJykuc2hvdygpO1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpLmZpbmQoJy5idG4tcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0Zm9ybU1lc3NhZ2UoKSB7XG5cdFx0JC5mbi5zaG93TWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHR5cGUsIGFsZXJ0Q2xhc3MpIHtcblx0XHRcdHZhciBodG1sO1xuXHRcdFx0aHRtbCA9IHZvaWQgMDtcblx0XHRcdGlmIChhbGVydENsYXNzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0YWxlcnRDbGFzcyA9ICcnO1xuXHRcdFx0fVxuXHRcdFx0JCgnLnN0YXR1cy1tZXNzYWdlJykucmVtb3ZlKCk7XG5cdFx0XHRodG1sID0gJzxkaXYgY2xhc3M9XFwnc3RhdHVzLW1lc3NhZ2UgbS10ICcgKyBhbGVydENsYXNzICsgJ1xcJz4gPGRpdiByb2xlPVxcJ2FsZXJ0XFwnIGNsYXNzPVxcJ2ZhZGUtaW4gYWxlcnQgYWxlcnQtZGlzbWlzc2FibGUgYWxlcnQtJyArIHR5cGUgKyAnXFwnPiA8YnV0dG9uIHR5cGU9XFwnYnV0dG9uXFwnIGNsYXNzPVxcJ2Nsb3NlXFwnIGRhdGEtZGlzbWlzcz1cXCdhbGVydFxcJz4gPHNwYW4gYXJpYS1oaWRkZW49XFwndHJ1ZVxcJz48aSBjbGFzcz1cXCdmYSBmYS10aW1lc1xcJz48L2k+PC9zcGFuPiA8c3BhbiBjbGFzcz1cXCdzci1vbmx5XFwnPkNsb3NlPC9zcGFuPiA8L2J1dHRvbj4nICsgbWVzc2FnZSArICc8L2Rpdj48L2Rpdj4nO1xuXHRcdFx0cmV0dXJuICQoaHRtbCkuYXBwZW5kVG8odGhpcykuaGlkZSgpLmZhZGVJbig5MDApO1xuXHRcdH07XG5cdH1cblx0c2VyaWFsaXplRm9ybSgpIHtcblx0XHQkLmZuLnNlcmlhbGl6ZUZvcm0gPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBkYXRhLCBsb29rdXAsIHBhcnNlLCBzZWxlY3Rvcjtcblx0XHRcdGRhdGEgPSB2b2lkIDA7XG5cdFx0XHRsb29rdXAgPSB2b2lkIDA7XG5cdFx0XHRwYXJzZSA9IHZvaWQgMDtcblx0XHRcdHNlbGVjdG9yID0gdm9pZCAwO1xuXHRcdFx0aWYgKHRoaXMubGVuZ3RoIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRkYXRhID0ge307XG5cdFx0XHRsb29rdXAgPSBkYXRhO1xuXHRcdFx0c2VsZWN0b3IgPSAnOmlucHV0W3R5cGUhPVwiY2hlY2tib3hcIl1bdHlwZSE9XCJyYWRpb1wiXSwgaW5wdXQ6Y2hlY2tlZCc7XG5cdFx0XHRwYXJzZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgJGVsLCBjYXAsIGksIG5hbWVkO1xuXHRcdFx0XHQkZWwgPSB2b2lkIDA7XG5cdFx0XHRcdGNhcCA9IHZvaWQgMDtcblx0XHRcdFx0aSA9IHZvaWQgMDtcblx0XHRcdFx0bmFtZWQgPSB2b2lkIDA7XG5cdFx0XHRcdGlmICh0aGlzLmRpc2FibGVkKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG5hbWVkID0gdGhpcy5uYW1lLnJlcGxhY2UoL1xcWyhbXlxcXV0rKT9cXF0vZywgJywkMScpLnNwbGl0KCcsJyk7XG5cdFx0XHRcdGNhcCA9IG5hbWVkLmxlbmd0aCAtIDE7XG5cdFx0XHRcdCRlbCA9ICQodGhpcyk7XG5cdFx0XHRcdGlmIChuYW1lZFswXSkge1xuXHRcdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRcdHdoaWxlIChpIDwgY2FwKSB7XG5cdFx0XHRcdFx0XHRsb29rdXAgPSBsb29rdXBbbmFtZWRbaV1dID0gbG9va3VwW25hbWVkW2ldXSB8fCAobmFtZWRbaSArIDFdID09PSAnJyB8fCBuYW1lZFtpICsgMV0gPT09ICcwJyA/IFtdIDoge30pO1xuXHRcdFx0XHRcdFx0aSsrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAobG9va3VwLmxlbmd0aCAhPT0gdm9pZCAwKSB7XG5cdFx0XHRcdFx0XHRsb29rdXAucHVzaCgkZWwudmFsKCkpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRsb29rdXBbbmFtZWRbY2FwXV0gPSAkZWwudmFsKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxvb2t1cCA9IGRhdGE7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR0aGlzLmZpbHRlcihzZWxlY3RvcikuZWFjaChwYXJzZSk7XG5cdFx0XHR0aGlzLmZpbmQoc2VsZWN0b3IpLmVhY2gocGFyc2UpO1xuXHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0fTtcblx0fVxuXHRzZXR1cEFqYXgoKSB7XG5cdFx0JC5hamF4U2V0dXAoe1xuXHRcdFx0c3RhdHVzQ29kZToge1xuXHRcdFx0XHQ0MDM6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRyZXR1cm4gd2luZG93LmFsZXJ0KCdGb3JiaWRkZW4gY29udGVudCEnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0NDA0OiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdpbmRvdy5hbGVydCgnUmVxdWVzdGVkIHJvdXRlIG5vdCBmb3VuZCEnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0NTAwOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdpbmRvdy5hbGVydCgnSW50ZXJuYWwgc2VydmVyIGVycm9yIScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y3Jvc3NEb21haW46IGZhbHNlLFxuXHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdGNhY2hlOiB0cnVlLFxuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHQnWC1DU1JGLVRva2VuJzogJCgnbWV0YVtuYW1lPVwiX3RcIl0nKS5hdHRyKCdjb250ZW50Jylcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSIsImNvbnN0IGpLZXkgPSB7IC8vIGpjcnlwdGlvbiBhZXMga2V5XG5cdGtleTE6ICdWZWZUNVdwbkdUJyxcblx0a2V5MjogJ2xSWWozSWJVMGUnLFxuXHRwdWJfa2V5OiBcdHdpbmRvdy5vcmlnaW4gKyAnL2dlbicsXG5cdGhhbmRzaGFrZTogd2luZG93Lm9yaWdpbiArICcvaGFuZHNoYWtlJ1xufVxuXG5jb25zdCBhZG1pblJvdXRlcyA9IHtcblx0bG9naW46IHdpbmRvdy5vcmlnaW4gKyAnL2FkbWluL2xvZ2luJ1xufVxuXG5leHBvcnQgY2xhc3MgRm9ybXMge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRpZiAoJCgnI2FkbWluTG9naW5Gb3JtJylbMF0pIHtcblx0XHRcdHRoaXMuaW5pdEFkbWluTG9naW5Gb3JtKCcjYWRtaW5Mb2dpbkZvcm0nKTtcblx0XHR9XG5cblx0XHRpZiAoJCgnLmZvcm0tYWN0aW9uLWFkZCcpWzBdKSB7XG5cdFx0XHR0aGlzLmluaXRDb21tb25BZGRGb3JtKCk7XG5cdFx0fVxuXG5cdFx0aWYgKCQoJy5mb3JtLWFjdGlvbi1lZGl0JylbMF0pIHtcblx0XHRcdHRoaXMuaW5pdENvbW1vbkVkaXRGb3JtKCk7XG5cdFx0fVxuXHR9XG5cdGluaXRBZG1pbkxvZ2luRm9ybShmb3JtKSB7XG5cdFx0dmFyIHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHR2YXIgJGZvcm0gPSAkKGZvcm0pO1xuXG5cdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChmKSB7XG5cdFx0XHRmLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR2YXIgYWVzO1xuXG5cdFx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCkgJiYgISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHRcdGFlcyA9ICQuakNyeXB0aW9uLmVuY3J5cHQoaktleS5rZXkxLCBqS2V5LmtleTIpO1xuXHRcdFx0XHQkLmpDcnlwdGlvbi5hdXRoZW50aWNhdGUoYWVzLCBqS2V5LnB1Yl9rZXksIGpLZXkuaGFuZHNoYWtlLCAoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0XHRcdCQucG9zdChhZG1pblJvdXRlcy5sb2dpbiwge1xuXHRcdFx0XHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoJC5qQ3J5cHRpb24uZW5jcnlwdCgkZm9ybS5zZXJpYWxpemUoKSwgYWVzKSlcblx0XHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIHtcblx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZS5yZWRpcmVjdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSh4aHIucmVzcG9uc2VUZXh0LCAnZGFuZ2VyJyk7XG5cdFx0XHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSgnTG9nZ2luZyB5b3UgaW4nLCAnaW5mbycpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cdH1cblx0aW5pdENvbW1vbkFkZEZvcm0oKSB7XG5cdFx0dmFyIHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHR2YXIgZGF0YSA9IHt9O1xuXHRcdHZhciBhbGxvd2VkX21pbWUgPSBbXG5cdFx0XHQnaW1hZ2UvZ2lmJyxcblx0XHRcdCdpbWFnZS9qcGVnJyxcblx0XHRcdCdpbWFnZS9wanBlZycsXG5cdFx0XHQnaW1hZ2UvcG5nJ1xuXHRcdF07XG5cdFx0dmFyIGltYWdlID0gbnVsbDtcblxuXHRcdCQoJ2J1dHRvblt0eXBlPWNhbmNlbF0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZikge1xuXHRcdFx0Zi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnLmZvcm0tYWN0aW9uLWFkZCcpWzBdLnJlc2V0KCk7XG5cdFx0fSk7XG5cblx0XHRpZiAoJCgnaW5wdXRbdHlwZT1maWxlXScpWzBdKSB7XG5cdFx0XHQkKCdpbnB1dFt0eXBlPWZpbGVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAodGhpcy5maWxlc1swXS5zaXplID4gNTAwMDAwMCkge1xuXHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkuc2hvd01lc3NhZ2UoJ0ZpbGUgY2Fubm90IGJlIGxhcmdlciB0aGFuIDVtYiAhJywgJ2RhbmdlcicpO1xuXHRcdFx0XHRcdGltYWdlID0gbnVsbDtcblx0XHRcdFx0fSBlbHNlIGlmICgkLmluQXJyYXkodGhpcy5maWxlc1swXS50eXBlLCBhbGxvd2VkX21pbWUpID09PSAtMSkge1xuXHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkuc2hvd01lc3NhZ2UoJ0ZpbGUgY2Fubm90IGJlIHVwbG9hZGVkICEnLCAnZGFuZ2VyJyk7XG5cdFx0XHRcdFx0aW1hZ2UgPSBudWxsO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkuc2hvd01lc3NhZ2UoJzxpIGNsYXNzPVwiZmEgZmEtY2hlY2tcIj48L2k+IEZpbGUgY2FuIGJlIHVwbG9hZGVkJywgJ3N1Y2Nlc3MnKTtcblx0XHRcdFx0XHRpbWFnZSA9IHRoaXMuZmlsZXNbMF07XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdCQoJy5mb3JtLWFjdGlvbi1hZGQnKS5maW5kKCdbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGYpIHtcblx0XHRcdGYucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHZhciAkZm9ybSA9ICQoJy5mb3JtLWFjdGlvbi1hZGQnKTtcblx0XHRcdHZhciAkcm91dGUgPSAkZm9ybS5maW5kKCdpbnB1dFtkYXRhLXJvdXRlXScpLnZhbCgpO1xuXG5cdFx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCkgJiYgISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHRcdHZhciBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdFx0XHRmZC5hcHBlbmQoJ2RhdGEnLCBKU09OLnN0cmluZ2lmeSgkZm9ybS5zZXJpYWxpemVGb3JtKCkpKTtcblxuXHRcdFx0XHRpZiAoJCgnaW5wdXRbdHlwZT1maWxlXScpWzBdKSB7XG5cdFx0XHRcdFx0ZmQuYXBwZW5kKCdpbWFnZScsIGltYWdlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICgkKCcuc3VtbWVybm90ZScpWzBdKSB7XG5cdFx0XHRcdFx0dmFyIHRleHRhcmVhID0ge307XG5cdFx0XHRcdFx0JCgnLnN1bW1lcm5vdGUnKS5lYWNoKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHR0ZXh0YXJlYVskKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKV0gPSAkKHRoaXMpLmNvZGUoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRmZC5hcHBlbmQoJ2xvbmdUZXh0JywgSlNPTi5zdHJpbmdpZnkodGV4dGFyZWEpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCRmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0LCBidXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdidXR0b24sIC5idG4sIGlucHV0JykuYWRkQ2xhc3MoJ2Rpc2FibGVkJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUodHJ1ZSk7XG5cblx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRtZXRob2Q6ICdwb3N0Jyxcblx0XHRcdFx0XHR1cmw6ICRyb3V0ZSxcblx0XHRcdFx0XHRkYXRhOiBmZCxcblx0XHRcdFx0XHRjcm9zc0RvbWFpbjogZmFsc2UsXG5cdFx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0XHRjYWNoZTogdHJ1ZSxcblx0XHRcdFx0XHRwcm9jZXNzRGF0YTogZmFsc2UsXG5cdFx0XHRcdFx0Y29udGVudFR5cGU6IGZhbHNlLFxuXHRcdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHRcdCdYLUNTUkYtVG9rZW4nOiAkKCdtZXRhW25hbWU9XCJfdFwiXScpLmF0dHIoJ2NvbnRlbnQnKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKGUubWVzc2FnZSwgZS50eXBlKTtcblx0XHRcdFx0XHQkZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCwgYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblx0XHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG5cdFx0XHRcdFx0XHQkZm9ybVswXS5yZXNldCgpO1xuXHRcdFx0XHRcdFx0aWYgKCRmb3JtLmZpbmQoJ2lucHV0W2RhdGEtcm91dGVdJykuYXR0cignZGF0YS1yZWxvYWQnKSA9PT0gJ3RydWUnKSB7XG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGxvY2F0aW9uLnJlbG9hZCgpOyB9LCAzMDAwKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSh4aHIucmVzcG9uc2VUZXh0LCAnZGFuZ2VyJyk7XG5cdFx0XHRcdFx0JGZvcm0uZmluZCgnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QsIGJ1dHRvbicpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKCdTb21ldGhpbmcgd3JvbmchJywgJ2luZm8nKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0pO1xuXHR9XG5cdGluaXRDb21tb25FZGl0Rm9ybSgpIHtcblx0XHR2YXIgcHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdHZhciBkYXRhID0ge307XG5cdFx0dmFyIGFsbG93ZWRfbWltZSA9IFtcblx0XHRcdCdpbWFnZS9naWYnLFxuXHRcdFx0J2ltYWdlL2pwZWcnLFxuXHRcdFx0J2ltYWdlL3BqcGVnJyxcblx0XHRcdCdpbWFnZS9wbmcnXG5cdFx0XTtcblx0XHR2YXIgaW1hZ2UgPSBudWxsO1xuXG5cdFx0JCgnYnV0dG9uW3R5cGU9Y2FuY2VsXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChmKSB7XG5cdFx0XHRmLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCcuZm9ybS1hY3Rpb24tZWRpdCcpWzBdLnJlc2V0KCk7XG5cdFx0fSk7XG5cblx0XHRpZiAoJCgnaW5wdXRbdHlwZT1maWxlXScpWzBdKSB7XG5cdFx0XHQkKCdpbnB1dFt0eXBlPWZpbGVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAodGhpcy5maWxlc1swXS5zaXplID4gNTAwMDAwMCkge1xuXHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkuc2hvd01lc3NhZ2UoJ0ZpbGUgY2Fubm90IGJlIGxhcmdlciB0aGFuIDNNYiAhJywgJ2RhbmdlcicpO1xuXHRcdFx0XHRcdGltYWdlID0gbnVsbDtcblx0XHRcdFx0fSBlbHNlIGlmICgkLmluQXJyYXkodGhpcy5maWxlc1swXS50eXBlLCBhbGxvd2VkX21pbWUpID09PSAtMSkge1xuXHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkuc2hvd01lc3NhZ2UoJ0ZpbGUgY2Fubm90IGJlIHVwbGFvZGVkICEnLCAnZGFuZ2VyJyk7XG5cdFx0XHRcdFx0aW1hZ2UgPSBudWxsO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkuc2hvd01lc3NhZ2UoJzxpIGNsYXNzPVwiZmEgZmEtY2hlY2tcIj48L2k+IEZpbGUgYWxsb3dlZCcsICdzdWNjZXNzJyk7XG5cdFx0XHRcdFx0aW1hZ2UgPSB0aGlzLmZpbGVzWzBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQkKCcuZm9ybS1hY3Rpb24tZWRpdCcpLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZikge1xuXHRcdFx0Zi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dmFyICRmb3JtID0gJCgnLmZvcm0tYWN0aW9uLWVkaXQnKTtcblx0XHRcdHZhciAkcm91dGUgPSAkZm9ybS5maW5kKCdpbnB1dFtkYXRhLXJvdXRlXScpLnZhbCgpO1xuXG5cdFx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCkgJiYgISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHRcdHZhciBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdFx0XHRmZC5hcHBlbmQoJ2RhdGEnLCBKU09OLnN0cmluZ2lmeSgkZm9ybS5zZXJpYWxpemVGb3JtKCkpKTtcblxuXHRcdFx0XHRpZiAoJCgnaW5wdXRbdHlwZT1maWxlXScpWzBdKSB7XG5cdFx0XHRcdFx0ZmQuYXBwZW5kKCdpbWFnZScsIGltYWdlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICgkKCcuc3VtbWVybm90ZScpWzBdKSB7XG5cdFx0XHRcdFx0dmFyIHRleHRhcmVhID0ge307XG5cdFx0XHRcdFx0JCgnLnN1bW1lcm5vdGUnKS5lYWNoKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHR0ZXh0YXJlYVskKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKV0gPSAkKHRoaXMpLmNvZGUoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRmZC5hcHBlbmQoJ2xvbmdUZXh0JywgSlNPTi5zdHJpbmdpZnkodGV4dGFyZWEpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdCRmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0LCBidXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdidXR0b24sIC5idG4sIGlucHV0JykuYWRkQ2xhc3MoJ2Rpc2FibGVkJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUodHJ1ZSk7XG5cblx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRtZXRob2Q6ICdwb3N0Jyxcblx0XHRcdFx0XHR1cmw6ICRyb3V0ZSxcblx0XHRcdFx0XHRkYXRhOiBmZCxcblx0XHRcdFx0XHRjcm9zc0RvbWFpbjogZmFsc2UsXG5cdFx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0XHRjYWNoZTogdHJ1ZSxcblx0XHRcdFx0XHRwcm9jZXNzRGF0YTogZmFsc2UsXG5cdFx0XHRcdFx0Y29udGVudFR5cGU6IGZhbHNlLFxuXHRcdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHRcdCdYLUNTUkYtVG9rZW4nOiAkKCdtZXRhW25hbWU9XCJfdFwiXScpLmF0dHIoJ2NvbnRlbnQnKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKGUubWVzc2FnZSwgZS50eXBlKTtcblx0XHRcdFx0XHQkZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCwgYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblx0XHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG5cdFx0XHRcdFx0XHQkZm9ybVswXS5yZXNldCgpO1xuXHRcdFx0XHRcdFx0aWYgKCRmb3JtLmZpbmQoJ2lucHV0W2RhdGEtcm91dGVdJykuYXR0cignZGF0YS1yZWxvYWQnKSA9PT0gJ3RydWUnKSB7XG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGxvY2F0aW9uLnJlbG9hZCgpOyB9LCAzMDAwKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSh4aHIucmVzcG9uc2VUZXh0LCAnZGFuZ2VyJyk7XG5cdFx0XHRcdFx0JGZvcm0uZmluZCgnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QsIGJ1dHRvbicpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKCdTb21ldGhpbmcgd3JvbmchJywgJ2luZm8nKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0pO1xuXHR9XG59IiwiZXhwb3J0IGNsYXNzIFBsdWdpbnMge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmluaXRCb290c3RyYXAoKTtcblxuXHRcdGlmICgkKCcuaWJveC10b29scycpWzBdKSB7XG5cdFx0XHR0aGlzLmluaXRJYm94KCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc21vb3RobHlNZW51KCkge1xuXHRcdFx0aWYgKCEkKCdib2R5JykuaGFzQ2xhc3MoJ21pbmktbmF2YmFyJykgfHwgJCgnYm9keScpLmhhc0NsYXNzKCdib2R5LXNtYWxsJykpIHtcblx0XHRcdFx0JCgnI3NpZGUtbWVudScpLmhpZGUoKTtcblx0XHRcdFx0c2V0VGltZW91dChcblx0XHRcdFx0XHRmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHQkKCcjc2lkZS1tZW51JykuZmFkZUluKDUwMCk7XG5cdFx0XHRcdFx0fSwgMTAwKTtcblx0XHRcdH0gZWxzZSBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdmaXhlZC1zaWRlYmFyJykpIHtcblx0XHRcdFx0JCgnI3NpZGUtbWVudScpLmhpZGUoKTtcblx0XHRcdFx0c2V0VGltZW91dChcblx0XHRcdFx0XHRmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHQkKCcjc2lkZS1tZW51JykuZmFkZUluKDUwMCk7XG5cdFx0XHRcdFx0fSwgMzAwKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoJyNzaWRlLW1lbnUnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGZpeEhlaWdodCgpIHtcblx0XHRcdHZhciBoZWlnaHRXaXRob3V0TmF2YmFyID0gJChcImJvZHkgPiAjd3JhcHBlclwiKS5oZWlnaHQoKSAtIDYxO1xuXHRcdFx0JChcIi5zaWRlYmFyZC1wYW5lbFwiKS5jc3MoXCJtaW4taGVpZ2h0XCIsIGhlaWdodFdpdGhvdXROYXZiYXIgKyBcInB4XCIpO1xuXG5cdFx0XHR2YXIgbmF2YmFySGVpZ2ggPSAkKCduYXYubmF2YmFyLWRlZmF1bHQnKS5oZWlnaHQoKTtcblx0XHRcdHZhciB3cmFwcGVySGVpZ2ggPSAkKCcjcGFnZS13cmFwcGVyJykuaGVpZ2h0KCk7XG5cblx0XHRcdGlmIChuYXZiYXJIZWlnaCA+IHdyYXBwZXJIZWlnaCkge1xuXHRcdFx0XHQkKCcjcGFnZS13cmFwcGVyJykuY3NzKFwibWluLWhlaWdodFwiLCBuYXZiYXJIZWlnaCArIFwicHhcIik7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChuYXZiYXJIZWlnaCA8IHdyYXBwZXJIZWlnaCkge1xuXHRcdFx0XHQkKCcjcGFnZS13cmFwcGVyJykuY3NzKFwibWluLWhlaWdodFwiLCAkKHdpbmRvdykuaGVpZ2h0KCkgKyBcInB4XCIpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdmaXhlZC1uYXYnKSkge1xuXHRcdFx0XHQkKCcjcGFnZS13cmFwcGVyJykuY3NzKFwibWluLWhlaWdodFwiLCAkKHdpbmRvdykuaGVpZ2h0KCkgLSA2MCArIFwicHhcIik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCQoXCIjc2lkZS1tZW51XCIpWzBdKSB7XG5cdFx0XHQkKFwiI3NpZGUtbWVudVwiKS5tZXRpc01lbnUoKTtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKCQoZG9jdW1lbnQpLndpZHRoKCkgPCA3NjkpIHtcblx0XHRcdCQoJ2JvZHknKS5hZGRDbGFzcygnYm9keS1zbWFsbCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2JvZHktc21hbGwnKTtcblx0XHR9XG5cblx0XHQkKCcubmF2YmFyLW1pbmltYWxpemUnKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKFwiYm9keVwiKS50b2dnbGVDbGFzcyhcIm1pbmktbmF2YmFyXCIpO1xuXHRcdFx0c21vb3RobHlNZW51KCk7XG5cdFx0fSk7XG5cblx0XHRmaXhIZWlnaHQoKTtcblxuXHRcdCQod2luZG93KS5iaW5kKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoJChcImJvZHlcIikuaGFzQ2xhc3MoJ2ZpeGVkLXNpZGViYXInKSkge1xuXHRcdFx0XHQkKCcuc2lkZWJhci1jb2xsYXBzZScpLnNsaW1TY3JvbGwoe1xuXHRcdFx0XHRcdGhlaWdodDogJzEwMCUnLFxuXHRcdFx0XHRcdHJhaWxPcGFjaXR5OiAwLjlcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAoJCgnLnN1bW1lcm5vdGUnKVswXSkge1xuXHRcdFx0JCgnLnN1bW1lcm5vdGUnKS5zdW1tZXJub3RlKHtkaWFsb2dzSW5Cb2R5OiB0cnVlfSk7XG5cdFx0fVxuXHR9XG5cdGluaXRCb290c3RyYXAoKSB7XG5cdFx0JCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcblx0XHQkKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJykucG9wb3ZlcigpO1xuXHRcdCQoJy5tb2RhbCcpLmFwcGVuZFRvKFwiYm9keVwiKTtcblx0XHRpZiAoJCgnI2RhdGVwaWNrZXInKVswXSkge1xuXHRcdFx0JCgnI2RhdGVwaWNrZXInKS5maW5kKCdpbnB1dCcpLmRhdGVwaWNrZXIoe1xuXHRcdFx0XHRjbGVhckJ0bjogdHJ1ZSxcblx0XHRcdFx0Zm9ybWF0OiAneXl5eS1tbS1kZCcsXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblx0aW5pdElib3goKSB7XG5cdFx0Ly8gQ29sbGFwc2UgaWJveCBmdW5jdGlvblxuXHRcdCQoJy5jb2xsYXBzZS1saW5rJykuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGlib3ggPSAkKHRoaXMpLmNsb3Nlc3QoJ2Rpdi5pYm94Jyk7XG5cdFx0XHR2YXIgYnV0dG9uID0gJCh0aGlzKS5maW5kKCdpJyk7XG5cdFx0XHR2YXIgY29udGVudCA9IGlib3guZmluZCgnZGl2Lmlib3gtY29udGVudCcpO1xuXHRcdFx0Y29udGVudC5zbGlkZVRvZ2dsZSgyMDApO1xuXHRcdFx0YnV0dG9uLnRvZ2dsZUNsYXNzKCdmYS1jaGV2cm9uLXVwJykudG9nZ2xlQ2xhc3MoJ2ZhLWNoZXZyb24tZG93bicpO1xuXHRcdFx0aWJveC50b2dnbGVDbGFzcygnJykudG9nZ2xlQ2xhc3MoJ2JvcmRlci1ib3R0b20nKTtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpYm94LnJlc2l6ZSgpO1xuXHRcdFx0XHRpYm94LmZpbmQoJ1tpZF49bWFwLV0nKS5yZXNpemUoKTtcblx0XHRcdH0sIDUwKTtcblx0XHR9KTtcblxuXHRcdC8vIENsb3NlIGlib3ggZnVuY3Rpb25cblx0XHQkKCcuY2xvc2UtbGluaycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBjb250ZW50ID0gJCh0aGlzKS5jbG9zZXN0KCdkaXYuaWJveCcpO1xuXHRcdFx0Y29udGVudC5yZW1vdmUoKTtcblx0XHR9KTtcblx0fVxufSIsImV4cG9ydCBjbGFzcyBUYWJsZXMge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR2YXIgcHJvY2Vzc2luZyA9IHRydWU7XG5cblx0XHRpZiAoJCgnLmZvb3RhYmxlLWluaXQnKVswXSkge1xuXHRcdFx0JCgnLmZvb3RhYmxlLWluaXQnKS5lYWNoKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdHZhciBmb290YWJsZSA9IG51bGw7XG5cdFx0XHRcdHZhciByZW1vdmVMaW5rID0gJHRoaXMuYXR0cignZGF0YS1yZW1vdmUtbGluaycpO1xuXG5cdFx0XHRcdCR0aGlzLmZpbmQoJy5jaGVjay1hbGwnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XG5cdFx0XHRcdFx0XHQkdGhpcy5maW5kKCdpbnB1dDpjaGVja2JveCcpLmVhY2goZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHQkdGhpcy5maW5kKCdpbnB1dDpjaGVja2JveCcpLmVhY2goZnVuY3Rpb24gKGUpe1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCQoJyNjb25maWdUYWJsZU1lbnUgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0dmFyIHRhcmdldCA9ICQoJyNjb25maWdUYWJsZU1lbnUnKS5hdHRyKCdkYXRhLXRhcmdldCcpO1xuXHRcdFx0XHRcdHZhciB0eXBlID0gJCh0aGlzKS5hdHRyKCdkYXRhLXZhbHVlJyk7XG5cdFx0XHRcdFx0aWYgKHR5cGUgPT09ICdyZW1vdmUnKSB7XG5cdFx0XHRcdFx0XHRpZiAoY29uZmlybSgnUmVtb3ZlIGNoZWNrZWQgZGF0YT8gQ2Fubm90IGJlIHVuZG8nKSkge1xuXHRcdFx0XHRcdFx0XHR2YXIgaWRzID0gW107XG5cdFx0XHRcdFx0XHRcdCR0aGlzLmZpbmQoJ2lucHV0W3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQnKS5ub3QoJy5jaGVjay1hbGwnKS5lYWNoKGZ1bmN0aW9uIChlKXtcblx0XHRcdFx0XHRcdFx0XHRpZHMucHVzaCgkKHRoaXMpLnZhbCgpKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdCQucG9zdChyZW1vdmVMaW5rLCB7aTogaWRzfSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRcdGZvb3RhYmxlLnRyaWdnZXIoJ2Zvb3RhYmxlX3JlZHJhdycpO1xuXHRcdFx0XHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9vdGFibGUudHJpZ2dlcignZm9vdGFibGVfcmVkcmF3Jyk7XG5cdFx0XHRcdFx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdCQoJyMnICsgdGFyZ2V0KS50YWJsZUV4cG9ydCh7dHlwZTogdHlwZSwgZXNjYXBlOiAnZmFsc2UnfSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcuZnQtZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdHZhciAkZm9ybSA9ICQodGhpcyk7XG5cdFx0XHRcdFx0aWYgKCRmb3JtLnBhcnNsZXkoKS52YWxpZGF0ZSgpKSB7XG5cdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblxuXHRcdFx0XHRcdFx0JC5nZXQoJHRoaXMuYXR0cignZGF0YS1yb3V0ZScpLCB7XG5cdFx0XHRcdFx0XHRcdGRhdGE6ICRmb3JtLnNlcmlhbGl6ZUZvcm0oKVxuXHRcdFx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdFx0JHRoaXMuZmluZCgndGJvZHknKS5lbXB0eSgpO1xuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgb2JqID0gZVtpXTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgaHRtbCA9ICc8dHI+Jztcblx0XHRcdFx0XHRcdFx0XHQkKCd0aFtkYXRhLXNvcnRdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBrZXkgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChrZXkgPT09ICdpZCcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPHRkPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIicgKyBvYmpbJ2lkJ10gKyAnXCIgLz48L3RkPic7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgKGtleSA9PT0gJ2FjdGlvbnMnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzx0ZD48ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+Jztcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eSgndmlld0xpbmsnKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzxhIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4td2hpdGVcIiBocmVmPVwiJyArIG9ialsndmlld0xpbmsnXSArICdcIj5WaWV3PC9hPic7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eSgnZWRpdExpbmsnKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzxhIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4td2hpdGVcIiBocmVmPVwiJyArIG9ialsnZWRpdExpbmsnXSArICdcIj5FZGl0PC9hPic7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eSgncmVtb3ZlTGluaycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPGEgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi13aGl0ZVwiIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCIgZGF0YS1pZD1cIicgKyBvYmpbJ2lkJ10gKyAnXCI+UmVtb3ZlPC9hPic7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPC9kaXY+PC90ZD4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzx0ZD4nICsgb2JqW2tleV0gKyAnPC90ZD4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzwvdGQ+Jztcblx0XHRcdFx0XHRcdFx0XHQkdGhpcy5maW5kKCd0Ym9keScpLmFwcGVuZChodG1sKTtcblx0XHRcdFx0XHRcdFx0XHRmb290YWJsZS50cmlnZ2VyKCdmb290YWJsZV9yZWRyYXcnKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdCQoJ1tkYXRhLWFjdGlvbj1cInJlbW92ZVwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpcm0oJ1JlbW92ZSBkYXRhPyBDYW5ub3QgYmUgdW5kbycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0XHRcdFx0XHRcdCQucG9zdChyZW1vdmVMaW5rLCB7aTogJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyl9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvb3RhYmxlLnRyaWdnZXIoJ2Zvb3RhYmxlX3JlZHJhdycpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0XHRhbGVydChlLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRmb290YWJsZSA9ICR0aGlzLmZvb3RhYmxlKHtcblx0XHRcdFx0XHRjb2x1bW5zOiAkLmdldCgkdGhpcy5hdHRyKCdkYXRhLXJvdXRlJykpLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdCR0aGlzLmZpbmQoJ3Rib2R5JykuZW1wdHkoKTtcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHR2YXIgb2JqID0gZVtpXTtcblx0XHRcdFx0XHRcdFx0dmFyIGh0bWwgPSAnPHRyPic7XG5cdFx0XHRcdFx0XHRcdCQoJ3RoW2RhdGEtc29ydF0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBrZXkgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoa2V5ID09PSAnaWQnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8dGQ+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiJyArIG9ialsnaWQnXSArICdcIiAvPjwvdGQ+Jztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAoa2V5ID09PSAnYWN0aW9ucycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzx0ZD48ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+Jztcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoJ3ZpZXdMaW5rJykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPGEgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi13aGl0ZVwiIGhyZWY9XCInICsgb2JqWyd2aWV3TGluayddICsgJ1wiPlZpZXc8L2E+Jztcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoJ2VkaXRMaW5rJykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPGEgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi13aGl0ZVwiIGhyZWY9XCInICsgb2JqWydlZGl0TGluayddICsgJ1wiPkVkaXQ8L2E+Jztcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoJ3JlbW92ZUxpbmsnKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8YSBjbGFzcz1cImJ0biBidG4teHMgYnRuLXdoaXRlXCIgZGF0YS1hY3Rpb249XCJyZW1vdmVcIiBkYXRhLWlkPVwiJyArIG9ialsnaWQnXSArICdcIj5SZW1vdmU8L2E+Jztcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzwvZGl2PjwvdGQ+Jztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8dGQ+JyArIG9ialtrZXldICsgJzwvdGQ+Jztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRodG1sICs9ICc8L3RkPic7XG5cdFx0XHRcdFx0XHRcdCR0aGlzLmZpbmQoJ3Rib2R5JykuYXBwZW5kKGh0bWwpO1xuXHRcdFx0XHRcdFx0XHRmb290YWJsZS50cmlnZ2VyKCdmb290YWJsZV9yZWRyYXcnKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0JCgnW2RhdGEtYWN0aW9uPVwicmVtb3ZlXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpcm0oJ1JlbW92ZSBkYXRhPyBDYW5ub3QgYmUgdW5kbycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHRcdFx0XHRcdCQucG9zdChyZW1vdmVMaW5rLCB7aTogJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyl9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSBsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm9vdGFibGUudHJpZ2dlcignZm9vdGFibGVfcmVkcmF3Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRcdGFsZXJ0KGUucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRmb290YWJsZSA9ICR0aGlzLmZvb3RhYmxlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAoJCgnLmZvb3RhYmxlLXNpbXBsZScpWzBdKSB7XG5cdFx0XHQkKCcuZm9vdGFibGUtc2ltcGxlJykuZm9vdGFibGUoKTtcblx0XHR9XG5cdH1cbn0iXX0=
