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

},{}],"/home/ford/web/www-job/resources/assets/js/back/forms.js":[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jKey = { // jcryption aes key
	key1: 'VefT5WpnGT',
	key2: 'lRYj3IbU0e',
	pub_key: window.origin + '/gen',
	handshake: window.origin + '/handshake'
};

var adminRoutes = {
	login: window.origin + '/admin/login'
};

var Forms = exports.Forms = (function () {
	function Forms() {
		_classCallCheck(this, Forms);

		if ($('#adminLoginForm')[0]) {
			this.initAdminLoginForm('#adminLoginForm');
		}

		if ($('#adminSettingsForm')[0]) {
			this.initSettingsForm();
		}

		if ($('.form-action-add')[0]) {
			this.initCommonAddForm();
		}

		if ($('.form-action-edit')[0]) {
			this.initCommonEditForm();
		}

		if ($('#listServices')[0]) {
			this.initServices();
		}

		if ($('#addResourceForm')[0]) {
			this.initResourceForm();
		}

		if ($('#listResources')[0]) {
			this.initResources();
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
		key: 'initSettingsForm',
		value: function initSettingsForm() {
			var $form = $('#adminSettingsForm');
			var processing = false;

			$form.find('[type=submit]').on('click', function (e) {
				if (!processing) {
					processing = true;
					$('.page-preloader').show();
					$form.find('[type=submit]').disable(true);

					$.post(window.origin + '/admin/account', {
						data: $form.serializeForm()
					}).done(function (e) {
						processing = false;
						$('.page-preloader').hide();
						$form.find('[type=submit]').disable(false);
						$form.showMessage(e.message, e.type);
					}).fail(function (xhr, status, e) {
						processing = false;
						$('.page-preloader').hide();
						$form.find('[type=submit]').disable(false);
						$form.showMessage(xhr.responseText, 'danger');
					});
				} else {
					alert('Another process is running, please wait.');
				}
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
	}, {
		key: 'initServices',
		value: function initServices() {
			var allowed_images = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/png'];
			var $list = $('#listServices');
			var processing = false;

			$('.service-image').on('change', function (e) {
				var $input = $(this);
				var id = $input.data('id');

				if (this.files[0].size > 2000000) {
					$(this).parent().showMessage('File cannot be more than 2Mb.', 'danger');
				} else if ($.inArray(this.files[0].type, allowed_images) === -1) {
					$(this).parent().showMessage('Can only upload image files.', 'danger');
				} else {
					if (!processing) {
						var fd = new FormData();
						fd.append('file', this.files[0]);
						fd.append('key', 'service');
						fd.append('id', id);
						processing = true;
						$('.page-preloader').show();
						$list.find('.btn').disable(true);

						$.ajax({
							method: 'post',
							url: window.origin + '/admin/update-service-image',
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
							$list.find('.btn').disable(false);
							alert(e.message);
							if (e.type === 'success') {
								$input.parent().find('img.img-thumbnail').attr('src', e.image);
							}
						}).fail(function (xhr, status, e) {
							processing = false;
							$('.page-preloader').hide();
							$list.find('.btn').disable(false);
							alert(xhr.responseText);
						});
					} else {
						alert('Another process is still running, please wait.');
					}
				}
			});

			$('#listServices').find('[type=submit]').on('click', function (e) {
				if (!processing) {
					var $form = $(this).parent().parent();
					var list = $form.parent();
					processing = true;
					$('.page-preloader').show();
					$list.find('.btn').disable(true);

					$.post(window.origin + '/admin/update-service', {
						data: $form.serializeForm(),
						description: $form.find('.summernote').code(),
						id: list.data('id')
					}).done(function (e) {
						processing = false;
						$('.page-preloader').hide();
						$list.find('.btn').disable(false);
						alert(e.message);
					}).fail(function (xhr, status, e) {
						processing = false;
						$('.page-preloader').hide();
						$list.find('.btn').disable(false);
						alert(xhr.responseText);
					});
				} else {
					alert('Another process is still running, please wait.');
				}
			});
		}
	}, {
		key: 'initResources',
		value: function initResources() {
			var allowed_documents = ['application/msword', 'application/msexcel', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
			var $resList = $('#listResources');
			var processing = false;

			$resList.find('input[type=file]').on('change', function (e) {
				var $input = $(this);
				var id = $input.data('id');

				if (this.files[0].size > 5000000) {
					$(this).parent().showMessage('File cannot be more than 5Mb.', 'danger');
					addResourceFile = null;
				} else if ($.inArray(this.files[0].type, allowed_documents) === -1) {
					$(this).parent().showMessage('Can only upload document files.', 'danger');
					addResourceFile = null;
				} else {
					if (!processing) {
						var fd = new FormData();
						fd.append('file', this.files[0]);
						fd.append('id', id);
						processing = true;
						$('.page-preloader').show();
						$resList.find('.btn').disable(true);

						$.ajax({
							method: 'post',
							url: window.origin + '/admin/edit-resource-file',
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
							$resList.find('.btn').disable(false);
							alert(e.message);
						}).fail(function (xhr, status, e) {
							processing = false;
							$('.page-preloader').hide();
							$resList.find('.btn').disable(false);
							alert(xhr.responseText);
						});
					} else {
						alert('Another process is still running, please wait.');
					}
				}
			});

			$resList.find('.btn-edit').on('click', function (e) {
				if (!processing) {
					var $form = $(this).parent().parent();
					processing = true;
					$('.page-preloader').show();
					$resList.find('.btn').disable(true);
					$.post(window.origin + '/admin/edit-resource', {
						id: $(this).data('id'),
						data: $form.serializeForm(),
						description: $form.find('.summernote').code()
					}).done(function (e) {
						processing = false;
						$('.page-preloader').hide();
						$resList.find('.btn').disable(false);
						alert(e.message);
					}).fail(function (xhr, status, e) {
						processing = false;
						$('.page-preloader').hide();
						$resList.find('.btn').disable(false);
						alert(xhr.responseText);
					});
				} else {
					alert('Another process is still running, please wait.');
				}
			});

			$resList.find('.btn-remove').on('click', function (e) {
				if (confirm('Really remove this resource?')) {
					if (!processing) {
						var id = $(this).data('id');
						processing = true;
						$('.page-preloader').show();
						$resList.find('.btn').disable(true);
						$.post(window.origin + '/admin/remove-resource', {
							id: $(this).data('id')
						}).done(function (e) {
							processing = false;
							$('.page-preloader').hide();
							$resList.find('.btn').disable(false);
							alert(e.message);
						}).fail(function (xhr, status, e) {
							processing = false;
							$('.page-preloader').hide();
							$resList.find('.btn').disable(false);
							alert(xhr.responseText);
						});
					} else {
						alert('Another process is still running, please wait.');
					}
				}
			});
		}
	}, {
		key: 'initResourceForm',
		value: function initResourceForm() {
			var $form = $('#addResourceForm');
			var addResourceFile = null;
			var allowed_documents = ['application/msword', 'application/msexcel', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
			var processing = false;

			$form.find('input[type=file]').on('change', function (e) {
				var $input = $(this);
				var id = $input.data('id');

				if (this.files[0].size > 5000000) {
					$(this).parent().showMessage('File cannot be more than 5Mb.', 'danger');
					addResourceFile = null;
				} else if ($.inArray(this.files[0].type, allowed_documents) === -1) {
					console.log(this.files[0].type);
					$(this).parent().showMessage('Can only upload document files.', 'danger');
					addResourceFile = null;
				} else {
					$(this).parent().showMessage('Can upload this file.', 'success');
					addResourceFile = this.files[0];
				}
			});

			$form.find('[type=submit]').on('click', function (e) {
				if (addResourceFile == null) {
					$form.showMessage('No file is set yet', 'danger');
					return;
				}

				if (!processing) {
					processing = true;
					$('.page-preloader').show();
					$form.find('[type=submit]').disable(true);
					var fd = new FormData();
					fd.append('file', addResourceFile);
					fd.append('data', JSON.stringify($form.serializeForm()));
					fd.append('description', $form.find('.summernote').code());
					$.ajax({
						method: 'post',
						url: window.origin + '/admin/add-resource',
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
						$form.find('[type=submit]').disable(false);
						alert(e.message);
					}).fail(function (xhr, status, e) {
						processing = false;
						$('.page-preloader').hide();
						$list.find('[type=submit]').disable(false);
						alert(xhr.responseText);
					});
				} else {
					alert('Another process is still running, please wait.');
				}
			});
		}
	}]);

	return Forms;
})();

},{}],"/home/ford/web/www-job/resources/assets/js/back/plugins.js":[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plugins = exports.Plugins = (function () {
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

},{}],"/home/ford/web/www-job/resources/assets/js/back/tables.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tables = exports.Tables = function Tables() {
	_classCallCheck(this, Tables);

	var processing = true;

	if ($('.footable-init')[0]) {
		$('.footable-init').each(function (e) {
			var $this = $(this);
			var footable = null;
			var removeLink = $this.attr('data-remove-link');
			var userLink = $this.attr('data-user-link');

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
									if (obj.hasOwnProperty('banLink')) {
										html += '<a class="btn btn-xs btn-white" data-action="ban" data-id="' + obj['id'] + '">Ban</a>';
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

								if (obj.hasOwnProperty('userBanLink')) {
									html += '<a class="btn btn-xs btn-white" data-action="ban" data-id="' + obj['id'] + '">Ban</a>';
								} else if (obj.hasOwnProperty('userUnBanLink')) {
									html += '<a class="btn btn-xs btn-white" data-action="unban" data-id="' + obj['id'] + '">Un-Ban</a>';
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

					$('[data-action="ban"],[data-action="unban"]').on('click', function (e) {
						var confirmMsg = 'Ban this user?';
						var isBan = true;

						if ($(this).data('action') === 'unban') {
							confirmMsg = 'Un-Ban this user?';
							isBan = false;
						} else {
							confirmMsg = 'Ban this user?';
							isBan = true;
						}
						if (confirm(confirmMsg)) {
							processing = true;
							$('.page-preloader').show();
							$.post(userLink, { i: $(this).attr('data-id'), ban: isBan }).done(function (e) {
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

},{}]},{},["/home/ford/web/www-job/resources/assets/js/back/app.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZXNvdXJjZXMvYXNzZXRzL2pzL2JhY2svYXBwLmpzIiwicmVzb3VyY2VzL2Fzc2V0cy9qcy9iYWNrL2NvcmUuanMiLCJyZXNvdXJjZXMvYXNzZXRzL2pzL2JhY2svZm9ybXMuanMiLCJyZXNvdXJjZXMvYXNzZXRzL2pzL2JhY2svcGx1Z2lucy5qcyIsInJlc291cmNlcy9hc3NldHMvanMvYmFjay90YWJsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FDS0EsVUFMUyxJQUFJLEVBS0gsQ0FBQztBQUNYLGFBSlMsT0FBTyxFQUlILENBQUM7QUFDZCxXQU5TLEtBQUssRUFNSCxDQUFDO0FBQ1osWUFMUyxNQUFNLEVBS0gsQ0FBQzs7Ozs7Ozs7Ozs7OztJQ1JBLElBQUksV0FBSixJQUFJO0FBQ2hCLFVBRFksSUFBSSxHQUNGO3dCQURGLElBQUk7O0FBRWYsTUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2YsTUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ25CLE1BQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUNyQixNQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7RUFDakI7O2NBTlcsSUFBSTs7NEJBT047QUFDVCxJQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUNYLFdBQU8sRUFBRSxpQkFBUyxLQUFLLEVBQUU7QUFDeEIsWUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVc7QUFDM0IsVUFBSSxLQUFLLEVBQUU7QUFDVixRQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFFBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxD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QVEsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNwQyxrQkFBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixTQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM1QixhQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQztPQUNIO01BQ0QsQ0FBQyxDQUFDO0tBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0FBQ2pDLFVBQUssQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdEIsZUFBVSxHQUFHLEtBQUssQ0FBQztBQUNuQixNQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUM1QixDQUFDO0lBQ0YsQ0FBQyxDQUFDOztBQUVILFdBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7R0FDNUIsQ0FBQyxDQUFDO0VBQ0g7O0FBRUQsS0FBSSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUM3QixHQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztFQUNqQztDQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IENvcmUgfSBmcm9tIFwiLi9jb3JlXCI7XG5pbXBvcnQgeyBGb3JtcyB9IGZyb20gXCIuL2Zvcm1zXCI7XG5pbXBvcnQgeyBQbHVnaW5zIH0gZnJvbSBcIi4vcGx1Z2luc1wiO1xuaW1wb3J0IHsgVGFibGVzIH0gZnJvbSBcIi4vdGFibGVzXCI7XG5cbm5ldyBDb3JlKCk7XG5uZXcgUGx1Z2lucygpO1xubmV3IEZvcm1zKCk7XG5uZXcgVGFibGVzKCk7IiwiZXhwb3J0IGNsYXNzIENvcmUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmRpc2FibGUoKTtcblx0XHR0aGlzLmZvcm1NZXNzYWdlKCk7XG5cdFx0dGhpcy5zZXJpYWxpemVGb3JtKCk7XG5cdFx0dGhpcy5zZXR1cEFqYXgoKTtcblx0fVxuXHRkaXNhYmxlKCkge1xuXHRcdCQuZm4uZXh0ZW5kKHtcblx0XHRcdGRpc2FibGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKHN0YXRlKSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoJ3NwYW4nKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJykuZmluZCgnLmJ0bi1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCQodGhpcykuZmluZCgnc3BhbicpLnNob3coKTtcblx0XHRcdFx0XHRcdCQodGhpcykucmVtb3ZlQXR0cignZGlzYWJsZWQnKS5maW5kKCcuYnRuLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdGZvcm1NZXNzYWdlKCkge1xuXHRcdCQuZm4uc2hvd01lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlLCB0eXBlLCBhbGVydENsYXNzKSB7XG5cdFx0XHR2YXIgaHRtbDtcblx0XHRcdGh0bWwgPSB2b2lkIDA7XG5cdFx0XHRpZiAoYWxlcnRDbGFzcyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGFsZXJ0Q2xhc3MgPSAnJztcblx0XHRcdH1cblx0XHRcdCQoJy5zdGF0dXMtbWVzc2FnZScpLnJlbW92ZSgpO1xuXHRcdFx0aHRtbCA9ICc8ZGl2IGNsYXNzPVxcJ3N0YXR1cy1tZXNzYWdlIG0tdCAnICsgYWxlcnRDbGFzcyArICdcXCc+IDxkaXYgcm9sZT1cXCdhbGVydFxcJyBjbGFzcz1cXCdmYWRlLWluIGFsZXJ0IGFsZXJ0LWRpc21pc3NhYmxlIGFsZXJ0LScgKyB0eXBlICsgJ1xcJz4gPGJ1dHRvbiB0eXBlPVxcJ2J1dHRvblxcJyBjbGFzcz1cXCdjbG9zZVxcJyBkYXRhLWRpc21pc3M9XFwnYWxlcnRcXCc+IDxzcGFuIGFyaWEtaGlkZGVuPVxcJ3RydWVcXCc+PGkgY2xhc3M9XFwnZmEgZmEtdGltZXNcXCc+PC9pPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XFwnc3Itb25seVxcJz5DbG9zZTwvc3Bhbj4gPC9idXR0b24+JyArIG1lc3NhZ2UgKyAnPC9kaXY+PC9kaXY+Jztcblx0XHRcdHJldHVybiAkKGh0bWwpLmFwcGVuZFRvKHRoaXMpLmhpZGUoKS5mYWRlSW4oOTAwKTtcblx0XHR9O1xuXHR9XG5cdHNlcmlhbGl6ZUZvcm0oKSB7XG5cdFx0JC5mbi5zZXJpYWxpemVGb3JtID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZGF0YSwgbG9va3VwLCBwYXJzZSwgc2VsZWN0b3I7XG5cdFx0XHRkYXRhID0gdm9pZCAwO1xuXHRcdFx0bG9va3VwID0gdm9pZCAwO1xuXHRcdFx0cGFyc2UgPSB2b2lkIDA7XG5cdFx0XHRzZWxlY3RvciA9IHZvaWQgMDtcblx0XHRcdGlmICh0aGlzLmxlbmd0aCA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0ZGF0YSA9IHt9O1xuXHRcdFx0bG9va3VwID0gZGF0YTtcblx0XHRcdHNlbGVjdG9yID0gJzppbnB1dFt0eXBlIT1cImNoZWNrYm94XCJdW3R5cGUhPVwicmFkaW9cIl0sIGlucHV0OmNoZWNrZWQnO1xuXHRcdFx0cGFyc2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyICRlbCwgY2FwLCBpLCBuYW1lZDtcblx0XHRcdFx0JGVsID0gdm9pZCAwO1xuXHRcdFx0XHRjYXAgPSB2b2lkIDA7XG5cdFx0XHRcdGkgPSB2b2lkIDA7XG5cdFx0XHRcdG5hbWVkID0gdm9pZCAwO1xuXHRcdFx0XHRpZiAodGhpcy5kaXNhYmxlZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRuYW1lZCA9IHRoaXMubmFtZS5yZXBsYWNlKC9cXFsoW15cXF1dKyk/XFxdL2csICcsJDEnKS5zcGxpdCgnLCcpO1xuXHRcdFx0XHRjYXAgPSBuYW1lZC5sZW5ndGggLSAxO1xuXHRcdFx0XHQkZWwgPSAkKHRoaXMpO1xuXHRcdFx0XHRpZiAobmFtZWRbMF0pIHtcblx0XHRcdFx0XHRpID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoaSA8IGNhcCkge1xuXHRcdFx0XHRcdFx0bG9va3VwID0gbG9va3VwW25hbWVkW2ldXSA9IGxvb2t1cFtuYW1lZFtpXV0gfHwgKG5hbWVkW2kgKyAxXSA9PT0gJycgfHwgbmFtZWRbaSArIDFdID09PSAnMCcgPyBbXSA6IHt9KTtcblx0XHRcdFx0XHRcdGkrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGxvb2t1cC5sZW5ndGggIT09IHZvaWQgMCkge1xuXHRcdFx0XHRcdFx0bG9va3VwLnB1c2goJGVsLnZhbCgpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bG9va3VwW25hbWVkW2NhcF1dID0gJGVsLnZhbCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsb29rdXAgPSBkYXRhO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5maWx0ZXIoc2VsZWN0b3IpLmVhY2gocGFyc2UpO1xuXHRcdFx0dGhpcy5maW5kKHNlbGVjdG9yKS5lYWNoKHBhcnNlKTtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH07XG5cdH1cblx0c2V0dXBBamF4KCkge1xuXHRcdCQuYWpheFNldHVwKHtcblx0XHRcdHN0YXR1c0NvZGU6IHtcblx0XHRcdFx0NDAzOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHdpbmRvdy5hbGVydCgnRm9yYmlkZGVuIGNvbnRlbnQhJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdDQwNDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJldHVybiB3aW5kb3cuYWxlcnQoJ1JlcXVlc3RlZCByb3V0ZSBub3QgZm91bmQhJyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdDUwMDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJldHVybiB3aW5kb3cuYWxlcnQoJ0ludGVybmFsIHNlcnZlciBlcnJvciEnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNyb3NzRG9tYWluOiBmYWxzZSxcblx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRjYWNoZTogdHJ1ZSxcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J1gtQ1NSRi1Ub2tlbic6ICQoJ21ldGFbbmFtZT1cIl90XCJdJykuYXR0cignY29udGVudCcpXG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0iLCJjb25zdCBqS2V5ID0geyAvLyBqY3J5cHRpb24gYWVzIGtleVxuXHRrZXkxOiAnVmVmVDVXcG5HVCcsXG5cdGtleTI6ICdsUllqM0liVTBlJyxcblx0cHViX2tleTogXHR3aW5kb3cub3JpZ2luICsgJy9nZW4nLFxuXHRoYW5kc2hha2U6IHdpbmRvdy5vcmlnaW4gKyAnL2hhbmRzaGFrZSdcbn1cblxuY29uc3QgYWRtaW5Sb3V0ZXMgPSB7XG5cdGxvZ2luOiB3aW5kb3cub3JpZ2luICsgJy9hZG1pbi9sb2dpbidcbn1cblxuZXhwb3J0IGNsYXNzIEZvcm1zIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0aWYgKCQoJyNhZG1pbkxvZ2luRm9ybScpWzBdKSB7XG5cdFx0XHR0aGlzLmluaXRBZG1pbkxvZ2luRm9ybSgnI2FkbWluTG9naW5Gb3JtJyk7XG5cdFx0fVxuXG5cdFx0aWYgKCQoJyNhZG1pblNldHRpbmdzRm9ybScpWzBdKSB7XG5cdFx0XHR0aGlzLmluaXRTZXR0aW5nc0Zvcm0oKTtcblx0XHR9XG5cblx0XHRpZiAoJCgnLmZvcm0tYWN0aW9uLWFkZCcpWzBdKSB7XG5cdFx0XHR0aGlzLmluaXRDb21tb25BZGRGb3JtKCk7XG5cdFx0fVxuXG5cdFx0aWYgKCQoJy5mb3JtLWFjdGlvbi1lZGl0JylbMF0pIHtcblx0XHRcdHRoaXMuaW5pdENvbW1vbkVkaXRGb3JtKCk7XG5cdFx0fVxuXG5cdFx0aWYgKCQoJyNsaXN0U2VydmljZXMnKVswXSkge1xuXHRcdFx0dGhpcy5pbml0U2VydmljZXMoKTtcblx0XHR9XG5cblx0XHRpZiAoJCgnI2FkZFJlc291cmNlRm9ybScpWzBdKSB7XG5cdFx0XHR0aGlzLmluaXRSZXNvdXJjZUZvcm0oKTtcblx0XHR9XG5cblx0XHRpZiAoJCgnI2xpc3RSZXNvdXJjZXMnKVswXSkge1xuXHRcdFx0dGhpcy5pbml0UmVzb3VyY2VzKCk7XG5cdFx0fVxuXHR9XG5cdGluaXRBZG1pbkxvZ2luRm9ybShmb3JtKSB7XG5cdFx0dmFyIHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHR2YXIgJGZvcm0gPSAkKGZvcm0pO1xuXG5cdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChmKSB7XG5cdFx0XHRmLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR2YXIgYWVzO1xuXG5cdFx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCkgJiYgISBwcm9jZXNzaW5nKSB7XG5cdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHRcdGFlcyA9ICQuakNyeXB0aW9uLmVuY3J5cHQoaktleS5rZXkxLCBqS2V5LmtleTIpO1xuXHRcdFx0XHQkLmpDcnlwdGlvbi5hdXRoZW50aWNhdGUoYWVzLCBqS2V5LnB1Yl9rZXksIGpLZXkuaGFuZHNoYWtlLCAoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0XHRcdCQucG9zdChhZG1pblJvdXRlcy5sb2dpbiwge1xuXHRcdFx0XHRcdFx0ZGF0YTogSlNPTi5zdHJpbmdpZnkoJC5qQ3J5cHRpb24uZW5jcnlwdCgkZm9ybS5zZXJpYWxpemUoKSwgYWVzKSlcblx0XHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIHtcblx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZS5yZWRpcmVjdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSh4aHIucmVzcG9uc2VUZXh0LCAnZGFuZ2VyJyk7XG5cdFx0XHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSgnTG9nZ2luZyB5b3UgaW4nLCAnaW5mbycpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cdH1cblx0aW5pdFNldHRpbmdzRm9ybSgpIHtcblx0XHR2YXIgJGZvcm0gPSAkKCcjYWRtaW5TZXR0aW5nc0Zvcm0nKTtcblx0XHR2YXIgcHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFxuXHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUodHJ1ZSk7XG5cblx0XHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2FkbWluL2FjY291bnQnLCB7XG5cdFx0XHRcdFx0ZGF0YTogJGZvcm0uc2VyaWFsaXplRm9ybSgpXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCwgJ2RhbmdlcicpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRhbGVydCgnQW5vdGhlciBwcm9jZXNzIGlzIHJ1bm5pbmcsIHBsZWFzZSB3YWl0LicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdGluaXRDb21tb25BZGRGb3JtKCkge1xuXHRcdHZhciBwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0dmFyIGRhdGEgPSB7fTtcblx0XHR2YXIgYWxsb3dlZF9taW1lID0gW1xuXHRcdFx0J2ltYWdlL2dpZicsXG5cdFx0XHQnaW1hZ2UvanBlZycsXG5cdFx0XHQnaW1hZ2UvcGpwZWcnLFxuXHRcdFx0J2ltYWdlL3BuZydcblx0XHRdO1xuXHRcdHZhciBpbWFnZSA9IG51bGw7XG5cblx0XHQkKCdidXR0b25bdHlwZT1jYW5jZWxdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGYpIHtcblx0XHRcdGYucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJy5mb3JtLWFjdGlvbi1hZGQnKVswXS5yZXNldCgpO1xuXHRcdH0pO1xuXG5cdFx0aWYgKCQoJ2lucHV0W3R5cGU9ZmlsZV0nKVswXSkge1xuXHRcdFx0JCgnaW5wdXRbdHlwZT1maWxlXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKHRoaXMuZmlsZXNbMF0uc2l6ZSA+IDUwMDAwMDApIHtcblx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdGaWxlIGNhbm5vdCBiZSBsYXJnZXIgdGhhbiA1bWIgIScsICdkYW5nZXInKTtcblx0XHRcdFx0XHRpbWFnZSA9IG51bGw7XG5cdFx0XHRcdH0gZWxzZSBpZiAoJC5pbkFycmF5KHRoaXMuZmlsZXNbMF0udHlwZSwgYWxsb3dlZF9taW1lKSA9PT0gLTEpIHtcblx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdGaWxlIGNhbm5vdCBiZSB1cGxvYWRlZCAhJywgJ2RhbmdlcicpO1xuXHRcdFx0XHRcdGltYWdlID0gbnVsbDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCc8aSBjbGFzcz1cImZhIGZhLWNoZWNrXCI+PC9pPiBGaWxlIGNhbiBiZSB1cGxvYWRlZCcsICdzdWNjZXNzJyk7XG5cdFx0XHRcdFx0aW1hZ2UgPSB0aGlzLmZpbGVzWzBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQkKCcuZm9ybS1hY3Rpb24tYWRkJykuZmluZCgnW3R5cGU9c3VibWl0XScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChmKSB7XG5cdFx0XHRmLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR2YXIgJGZvcm0gPSAkKCcuZm9ybS1hY3Rpb24tYWRkJyk7XG5cdFx0XHR2YXIgJHJvdXRlID0gJGZvcm0uZmluZCgnaW5wdXRbZGF0YS1yb3V0ZV0nKS52YWwoKTtcblxuXHRcdFx0aWYgKCRmb3JtLnBhcnNsZXkoKS52YWxpZGF0ZSgpICYmICEgcHJvY2Vzc2luZykge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHR2YXIgZmQgPSBuZXcgRm9ybURhdGEoKTtcblx0XHRcdFx0ZmQuYXBwZW5kKCdkYXRhJywgSlNPTi5zdHJpbmdpZnkoJGZvcm0uc2VyaWFsaXplRm9ybSgpKSk7XG5cblx0XHRcdFx0aWYgKCQoJ2lucHV0W3R5cGU9ZmlsZV0nKVswXSkge1xuXHRcdFx0XHRcdGZkLmFwcGVuZCgnaW1hZ2UnLCBpbWFnZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoJCgnLnN1bW1lcm5vdGUnKVswXSkge1xuXHRcdFx0XHRcdHZhciB0ZXh0YXJlYSA9IHt9O1xuXHRcdFx0XHRcdCQoJy5zdW1tZXJub3RlJykuZWFjaChmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0dGV4dGFyZWFbJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyldID0gJCh0aGlzKS5jb2RlKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0ZmQuYXBwZW5kKCdsb25nVGV4dCcsIEpTT04uc3RyaW5naWZ5KHRleHRhcmVhKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCwgYnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnYnV0dG9uLCAuYnRuLCBpbnB1dCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXG5cdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0bWV0aG9kOiAncG9zdCcsXG5cdFx0XHRcdFx0dXJsOiAkcm91dGUsXG5cdFx0XHRcdFx0ZGF0YTogZmQsXG5cdFx0XHRcdFx0Y3Jvc3NEb21haW46IGZhbHNlLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdFx0Y2FjaGU6IHRydWUsXG5cdFx0XHRcdFx0cHJvY2Vzc0RhdGE6IGZhbHNlLFxuXHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBmYWxzZSxcblx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHQnWC1DU1JGLVRva2VuJzogJCgnbWV0YVtuYW1lPVwiX3RcIl0nKS5hdHRyKCdjb250ZW50Jylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdFx0JGZvcm0uZmluZCgnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QsIGJ1dHRvbicpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdFx0XHRcdFx0JGZvcm1bMF0ucmVzZXQoKTtcblx0XHRcdFx0XHRcdGlmICgkZm9ybS5maW5kKCdpbnB1dFtkYXRhLXJvdXRlXScpLmF0dHIoJ2RhdGEtcmVsb2FkJykgPT09ICd0cnVlJykge1xuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBsb2NhdGlvbi5yZWxvYWQoKTsgfSwgMzAwMCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCwgJ2RhbmdlcicpO1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0LCBidXR0b24nKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSgnU29tZXRoaW5nIHdyb25nIScsICdpbmZvJyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9KTtcblx0fVxuXHRpbml0Q29tbW9uRWRpdEZvcm0oKSB7XG5cdFx0dmFyIHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHR2YXIgZGF0YSA9IHt9O1xuXHRcdHZhciBhbGxvd2VkX21pbWUgPSBbXG5cdFx0XHQnaW1hZ2UvZ2lmJyxcblx0XHRcdCdpbWFnZS9qcGVnJyxcblx0XHRcdCdpbWFnZS9wanBlZycsXG5cdFx0XHQnaW1hZ2UvcG5nJ1xuXHRcdF07XG5cdFx0dmFyIGltYWdlID0gbnVsbDtcblxuXHRcdCQoJ2J1dHRvblt0eXBlPWNhbmNlbF0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZikge1xuXHRcdFx0Zi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnLmZvcm0tYWN0aW9uLWVkaXQnKVswXS5yZXNldCgpO1xuXHRcdH0pO1xuXG5cdFx0aWYgKCQoJ2lucHV0W3R5cGU9ZmlsZV0nKVswXSkge1xuXHRcdFx0JCgnaW5wdXRbdHlwZT1maWxlXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKHRoaXMuZmlsZXNbMF0uc2l6ZSA+IDUwMDAwMDApIHtcblx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdGaWxlIGNhbm5vdCBiZSBsYXJnZXIgdGhhbiAzTWIgIScsICdkYW5nZXInKTtcblx0XHRcdFx0XHRpbWFnZSA9IG51bGw7XG5cdFx0XHRcdH0gZWxzZSBpZiAoJC5pbkFycmF5KHRoaXMuZmlsZXNbMF0udHlwZSwgYWxsb3dlZF9taW1lKSA9PT0gLTEpIHtcblx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdGaWxlIGNhbm5vdCBiZSB1cGxhb2RlZCAhJywgJ2RhbmdlcicpO1xuXHRcdFx0XHRcdGltYWdlID0gbnVsbDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCc8aSBjbGFzcz1cImZhIGZhLWNoZWNrXCI+PC9pPiBGaWxlIGFsbG93ZWQnLCAnc3VjY2VzcycpO1xuXHRcdFx0XHRcdGltYWdlID0gdGhpcy5maWxlc1swXTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0JCgnLmZvcm0tYWN0aW9uLWVkaXQnKS5maW5kKCdbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGYpIHtcblx0XHRcdGYucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHZhciAkZm9ybSA9ICQoJy5mb3JtLWFjdGlvbi1lZGl0Jyk7XG5cdFx0XHR2YXIgJHJvdXRlID0gJGZvcm0uZmluZCgnaW5wdXRbZGF0YS1yb3V0ZV0nKS52YWwoKTtcblxuXHRcdFx0aWYgKCRmb3JtLnBhcnNsZXkoKS52YWxpZGF0ZSgpICYmICEgcHJvY2Vzc2luZykge1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHR2YXIgZmQgPSBuZXcgRm9ybURhdGEoKTtcblx0XHRcdFx0ZmQuYXBwZW5kKCdkYXRhJywgSlNPTi5zdHJpbmdpZnkoJGZvcm0uc2VyaWFsaXplRm9ybSgpKSk7XG5cblx0XHRcdFx0aWYgKCQoJ2lucHV0W3R5cGU9ZmlsZV0nKVswXSkge1xuXHRcdFx0XHRcdGZkLmFwcGVuZCgnaW1hZ2UnLCBpbWFnZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoJCgnLnN1bW1lcm5vdGUnKVswXSkge1xuXHRcdFx0XHRcdHZhciB0ZXh0YXJlYSA9IHt9O1xuXHRcdFx0XHRcdCQoJy5zdW1tZXJub3RlJykuZWFjaChmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0dGV4dGFyZWFbJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyldID0gJCh0aGlzKS5jb2RlKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0ZmQuYXBwZW5kKCdsb25nVGV4dCcsIEpTT04uc3RyaW5naWZ5KHRleHRhcmVhKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQkZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCwgYnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnYnV0dG9uLCAuYnRuLCBpbnB1dCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKHRydWUpO1xuXG5cdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0bWV0aG9kOiAncG9zdCcsXG5cdFx0XHRcdFx0dXJsOiAkcm91dGUsXG5cdFx0XHRcdFx0ZGF0YTogZmQsXG5cdFx0XHRcdFx0Y3Jvc3NEb21haW46IGZhbHNlLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdFx0Y2FjaGU6IHRydWUsXG5cdFx0XHRcdFx0cHJvY2Vzc0RhdGE6IGZhbHNlLFxuXHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBmYWxzZSxcblx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHQnWC1DU1JGLVRva2VuJzogJCgnbWV0YVtuYW1lPVwiX3RcIl0nKS5hdHRyKCdjb250ZW50Jylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZShlLm1lc3NhZ2UsIGUudHlwZSk7XG5cdFx0XHRcdFx0JGZvcm0uZmluZCgnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QsIGJ1dHRvbicpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdFx0XHRcdFx0JGZvcm1bMF0ucmVzZXQoKTtcblx0XHRcdFx0XHRcdGlmICgkZm9ybS5maW5kKCdpbnB1dFtkYXRhLXJvdXRlXScpLmF0dHIoJ2RhdGEtcmVsb2FkJykgPT09ICd0cnVlJykge1xuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBsb2NhdGlvbi5yZWxvYWQoKTsgfSwgMzAwMCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoeGhyLnJlc3BvbnNlVGV4dCwgJ2RhbmdlcicpO1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0LCBidXR0b24nKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkZm9ybS5zaG93TWVzc2FnZSgnU29tZXRoaW5nIHdyb25nIScsICdpbmZvJyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9KTtcblx0fVxuXHRpbml0U2VydmljZXMoKSB7XG5cdFx0dmFyIGFsbG93ZWRfaW1hZ2VzID0gW1xuXHRcdFx0J2ltYWdlL2dpZicsXG5cdFx0XHQnaW1hZ2UvanBlZycsXG5cdFx0XHQnaW1hZ2UvcGpwZWcnLFxuXHRcdFx0J2ltYWdlL3BuZydcblx0XHRdO1xuXHRcdHZhciAkbGlzdCA9ICQoJyNsaXN0U2VydmljZXMnKTtcblx0XHR2YXIgcHJvY2Vzc2luZyA9IGZhbHNlO1xuXG5cdFx0JCgnLnNlcnZpY2UtaW1hZ2UnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdHZhciAkaW5wdXQgPSAkKHRoaXMpO1xuXHRcdFx0dmFyIGlkID0gJGlucHV0LmRhdGEoJ2lkJyk7XG5cblx0XHRcdGlmICh0aGlzLmZpbGVzWzBdLnNpemUgPiAyMDAwMDAwKSB7XG5cdFx0XHRcdCQodGhpcykucGFyZW50KCkuc2hvd01lc3NhZ2UoJ0ZpbGUgY2Fubm90IGJlIG1vcmUgdGhhbiAyTWIuJywgJ2RhbmdlcicpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoJC5pbkFycmF5KHRoaXMuZmlsZXNbMF0udHlwZSwgYWxsb3dlZF9pbWFnZXMpID09PSAtMSkge1xuXHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdDYW4gb25seSB1cGxvYWQgaW1hZ2UgZmlsZXMuJywgJ2RhbmdlcicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0XHR2YXIgZmQgPSBuZXcgRm9ybURhdGEoKTtcblx0XHRcdFx0XHRmZC5hcHBlbmQoJ2ZpbGUnLCB0aGlzLmZpbGVzWzBdKTtcblx0XHRcdFx0XHRmZC5hcHBlbmQoJ2tleScsICdzZXJ2aWNlJyk7XG5cdFx0XHRcdFx0ZmQuYXBwZW5kKCdpZCcsIGlkKTtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHRcdFx0JGxpc3QuZmluZCgnLmJ0bicpLmRpc2FibGUodHJ1ZSk7XG5cblx0XHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdFx0bWV0aG9kOiAncG9zdCcsXG5cdFx0XHRcdFx0XHR1cmw6IHdpbmRvdy5vcmlnaW4gKyAnL2FkbWluL3VwZGF0ZS1zZXJ2aWNlLWltYWdlJyxcblx0XHRcdFx0XHRcdGRhdGE6IGZkLFxuXHRcdFx0XHRcdFx0Y3Jvc3NEb21haW46IGZhbHNlLFxuXHRcdFx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0XHRcdGNhY2hlOiB0cnVlLFxuXHRcdFx0XHRcdFx0cHJvY2Vzc0RhdGE6IGZhbHNlLFxuXHRcdFx0XHRcdFx0Y29udGVudFR5cGU6IGZhbHNlLFxuXHRcdFx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFx0XHQnWC1DU1JGLVRva2VuJzogJCgnbWV0YVtuYW1lPVwiX3RcIl0nKS5hdHRyKCdjb250ZW50Jylcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0JGxpc3QuZmluZCgnLmJ0bicpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0YWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdFx0XHRcdFx0XHQkaW5wdXQucGFyZW50KCkuZmluZCgnaW1nLmltZy10aHVtYm5haWwnKS5hdHRyKCdzcmMnLCBlLmltYWdlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0JGxpc3QuZmluZCgnLmJ0bicpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoJ0Fub3RoZXIgcHJvY2VzcyBpcyBzdGlsbCBydW5uaW5nLCBwbGVhc2Ugd2FpdC4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXHRcdCQoJyNsaXN0U2VydmljZXMnKS5maW5kKCdbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGlmICggISBwcm9jZXNzaW5nICkge1xuXHRcdFx0XHR2YXIgJGZvcm0gPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpO1xuXHRcdFx0XHR2YXIgbGlzdCA9ICRmb3JtLnBhcmVudCgpO1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHQkbGlzdC5maW5kKCcuYnRuJykuZGlzYWJsZSh0cnVlKTtcblxuXHRcdFx0XHQkLnBvc3Qod2luZG93Lm9yaWdpbiArICcvYWRtaW4vdXBkYXRlLXNlcnZpY2UnLCB7XG5cdFx0XHRcdFx0ZGF0YTogJGZvcm0uc2VyaWFsaXplRm9ybSgpLFxuXHRcdFx0XHRcdGRlc2NyaXB0aW9uOiAkZm9ybS5maW5kKCcuc3VtbWVybm90ZScpLmNvZGUoKSxcblx0XHRcdFx0XHRpZDogbGlzdC5kYXRhKCdpZCcpXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdCRsaXN0LmZpbmQoJy5idG4nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0JGxpc3QuZmluZCgnLmJ0bicpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRhbGVydCgnQW5vdGhlciBwcm9jZXNzIGlzIHN0aWxsIHJ1bm5pbmcsIHBsZWFzZSB3YWl0LicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdGluaXRSZXNvdXJjZXMoKSB7XG5cdFx0dmFyIGFsbG93ZWRfZG9jdW1lbnRzID0gW1xuXHRcdFx0J2FwcGxpY2F0aW9uL21zd29yZCcsXG5cdFx0XHQnYXBwbGljYXRpb24vbXNleGNlbCcsXG5cdFx0XHQnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJyxcblx0XHRcdCdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC5zaGVldCcsXG5cdFx0XHQnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnQnXG5cdFx0XTtcblx0XHR2YXIgJHJlc0xpc3QgPSAkKCcjbGlzdFJlc291cmNlcycpO1xuXHRcdHZhciBwcm9jZXNzaW5nID0gZmFsc2U7XG5cblx0XHQkcmVzTGlzdC5maW5kKCdpbnB1dFt0eXBlPWZpbGVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHR2YXIgJGlucHV0ID0gJCh0aGlzKTtcblx0XHRcdHZhciBpZCA9ICRpbnB1dC5kYXRhKCdpZCcpO1xuXG5cdFx0XHRpZiAodGhpcy5maWxlc1swXS5zaXplID4gNTAwMDAwMCkge1xuXHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdGaWxlIGNhbm5vdCBiZSBtb3JlIHRoYW4gNU1iLicsICdkYW5nZXInKTtcblx0XHRcdFx0YWRkUmVzb3VyY2VGaWxlID0gbnVsbDtcblx0XHRcdH0gZWxzZSBpZiAoJC5pbkFycmF5KHRoaXMuZmlsZXNbMF0udHlwZSwgYWxsb3dlZF9kb2N1bWVudHMpID09PSAtMSkge1xuXHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdDYW4gb25seSB1cGxvYWQgZG9jdW1lbnQgZmlsZXMuJywgJ2RhbmdlcicpO1xuXHRcdFx0XHRhZGRSZXNvdXJjZUZpbGUgPSBudWxsO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0XHR2YXIgZmQgPSBuZXcgRm9ybURhdGEoKTtcblx0XHRcdFx0XHRmZC5hcHBlbmQoJ2ZpbGUnLCB0aGlzLmZpbGVzWzBdKTtcblx0XHRcdFx0XHRmZC5hcHBlbmQoJ2lkJywgaWQpO1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0XHQkcmVzTGlzdC5maW5kKCcuYnRuJykuZGlzYWJsZSh0cnVlKTtcblxuXHRcdFx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdFx0XHRtZXRob2Q6ICdwb3N0Jyxcblx0XHRcdFx0XHRcdHVybDogd2luZG93Lm9yaWdpbiArICcvYWRtaW4vZWRpdC1yZXNvdXJjZS1maWxlJyxcblx0XHRcdFx0XHRcdGRhdGE6IGZkLFxuXHRcdFx0XHRcdFx0Y3Jvc3NEb21haW46IGZhbHNlLFxuXHRcdFx0XHRcdFx0ZGF0YVR5cGU6ICdqc29uJyxcblx0XHRcdFx0XHRcdGNhY2hlOiB0cnVlLFxuXHRcdFx0XHRcdFx0cHJvY2Vzc0RhdGE6IGZhbHNlLFxuXHRcdFx0XHRcdFx0Y29udGVudFR5cGU6IGZhbHNlLFxuXHRcdFx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFx0XHQnWC1DU1JGLVRva2VuJzogJCgnbWV0YVtuYW1lPVwiX3RcIl0nKS5hdHRyKCdjb250ZW50Jylcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0JHJlc0xpc3QuZmluZCgnLmJ0bicpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0YWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0JHJlc0xpc3QuZmluZCgnLmJ0bicpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoJ0Fub3RoZXIgcHJvY2VzcyBpcyBzdGlsbCBydW5uaW5nLCBwbGVhc2Ugd2FpdC4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0JHJlc0xpc3QuZmluZCgnLmJ0bi1lZGl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdGlmICggISBwcm9jZXNzaW5nICkge1xuXHRcdFx0XHR2YXIgJGZvcm0gPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpO1xuXHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHQkcmVzTGlzdC5maW5kKCcuYnRuJykuZGlzYWJsZSh0cnVlKTtcblx0XHRcdFx0JC5wb3N0KHdpbmRvdy5vcmlnaW4gKyAnL2FkbWluL2VkaXQtcmVzb3VyY2UnLCB7XG5cdFx0XHRcdFx0aWQ6ICQodGhpcykuZGF0YSgnaWQnKSxcblx0XHRcdFx0XHRkYXRhOiAkZm9ybS5zZXJpYWxpemVGb3JtKCksXG5cdFx0XHRcdFx0ZGVzY3JpcHRpb246ICRmb3JtLmZpbmQoJy5zdW1tZXJub3RlJykuY29kZSgpXG5cdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdCRyZXNMaXN0LmZpbmQoJy5idG4nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0JHJlc0xpc3QuZmluZCgnLmJ0bicpLmRpc2FibGUoZmFsc2UpO1xuXHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRhbGVydCgnQW5vdGhlciBwcm9jZXNzIGlzIHN0aWxsIHJ1bm5pbmcsIHBsZWFzZSB3YWl0LicpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0JHJlc0xpc3QuZmluZCgnLmJ0bi1yZW1vdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0aWYgKGNvbmZpcm0oJ1JlYWxseSByZW1vdmUgdGhpcyByZXNvdXJjZT8nKSkge1xuXHRcdFx0XHRpZiAoICEgcHJvY2Vzc2luZyApIHtcblx0XHRcdFx0XHR2YXIgaWQgPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHRcdCRyZXNMaXN0LmZpbmQoJy5idG4nKS5kaXNhYmxlKHRydWUpO1xuXHRcdFx0XHRcdCQucG9zdCh3aW5kb3cub3JpZ2luICsgJy9hZG1pbi9yZW1vdmUtcmVzb3VyY2UnLCB7XG5cdFx0XHRcdFx0XHRpZDogJCh0aGlzKS5kYXRhKCdpZCcpLFxuXHRcdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdCRyZXNMaXN0LmZpbmQoJy5idG4nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdCRyZXNMaXN0LmZpbmQoJy5idG4nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGFsZXJ0KCdBbm90aGVyIHByb2Nlc3MgaXMgc3RpbGwgcnVubmluZywgcGxlYXNlIHdhaXQuJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRpbml0UmVzb3VyY2VGb3JtKCkge1xuXHRcdHZhciAkZm9ybSA9ICQoJyNhZGRSZXNvdXJjZUZvcm0nKTtcblx0XHR2YXIgYWRkUmVzb3VyY2VGaWxlID0gbnVsbDtcblx0XHR2YXIgYWxsb3dlZF9kb2N1bWVudHMgPSBbXG5cdFx0XHQnYXBwbGljYXRpb24vbXN3b3JkJyxcblx0XHRcdCdhcHBsaWNhdGlvbi9tc2V4Y2VsJyxcblx0XHRcdCdhcHBsaWNhdGlvbi92bmQubXMtZXhjZWwnLFxuXHRcdFx0J2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnNoZWV0Jyxcblx0XHRcdCdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCdcblx0XHRdO1xuXHRcdHZhciBwcm9jZXNzaW5nID0gZmFsc2U7XG5cblx0XHQkZm9ybS5maW5kKCdpbnB1dFt0eXBlPWZpbGVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHR2YXIgJGlucHV0ID0gJCh0aGlzKTtcblx0XHRcdHZhciBpZCA9ICRpbnB1dC5kYXRhKCdpZCcpO1xuXG5cdFx0XHRpZiAodGhpcy5maWxlc1swXS5zaXplID4gNTAwMDAwMCkge1xuXHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdGaWxlIGNhbm5vdCBiZSBtb3JlIHRoYW4gNU1iLicsICdkYW5nZXInKTtcblx0XHRcdFx0YWRkUmVzb3VyY2VGaWxlID0gbnVsbDtcblx0XHRcdH0gZWxzZSBpZiAoJC5pbkFycmF5KHRoaXMuZmlsZXNbMF0udHlwZSwgYWxsb3dlZF9kb2N1bWVudHMpID09PSAtMSkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmZpbGVzWzBdLnR5cGUpO1xuXHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLnNob3dNZXNzYWdlKCdDYW4gb25seSB1cGxvYWQgZG9jdW1lbnQgZmlsZXMuJywgJ2RhbmdlcicpO1xuXHRcdFx0XHRhZGRSZXNvdXJjZUZpbGUgPSBudWxsO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5zaG93TWVzc2FnZSgnQ2FuIHVwbG9hZCB0aGlzIGZpbGUuJywgJ3N1Y2Nlc3MnKTtcblx0XHRcdFx0YWRkUmVzb3VyY2VGaWxlID0gdGhpcy5maWxlc1swXTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0aWYgKGFkZFJlc291cmNlRmlsZSA9PSBudWxsKSB7XG5cdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKCdObyBmaWxlIGlzIHNldCB5ZXQnLCAnZGFuZ2VyJyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUodHJ1ZSk7XG5cdFx0XHRcdHZhciBmZCA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdFx0XHRmZC5hcHBlbmQoJ2ZpbGUnLCBhZGRSZXNvdXJjZUZpbGUpO1xuXHRcdFx0XHRmZC5hcHBlbmQoJ2RhdGEnLCBKU09OLnN0cmluZ2lmeSgkZm9ybS5zZXJpYWxpemVGb3JtKCkpKTtcblx0XHRcdFx0ZmQuYXBwZW5kKCdkZXNjcmlwdGlvbicsICRmb3JtLmZpbmQoJy5zdW1tZXJub3RlJykuY29kZSgpKTtcblx0XHRcdFx0JC5hamF4KHtcblx0XHRcdFx0XHRtZXRob2Q6ICdwb3N0Jyxcblx0XHRcdFx0XHR1cmw6IHdpbmRvdy5vcmlnaW4gKyAnL2FkbWluL2FkZC1yZXNvdXJjZScsXG5cdFx0XHRcdFx0ZGF0YTogZmQsXG5cdFx0XHRcdFx0Y3Jvc3NEb21haW46IGZhbHNlLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiAnanNvbicsXG5cdFx0XHRcdFx0Y2FjaGU6IHRydWUsXG5cdFx0XHRcdFx0cHJvY2Vzc0RhdGE6IGZhbHNlLFxuXHRcdFx0XHRcdGNvbnRlbnRUeXBlOiBmYWxzZSxcblx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHQnWC1DU1JGLVRva2VuJzogJCgnbWV0YVtuYW1lPVwiX3RcIl0nKS5hdHRyKCdjb250ZW50Jylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0YWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdCRsaXN0LmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0YWxlcnQoJ0Fub3RoZXIgcHJvY2VzcyBpcyBzdGlsbCBydW5uaW5nLCBwbGVhc2Ugd2FpdC4nKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSIsImV4cG9ydCBjbGFzcyBQbHVnaW5zIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5pbml0Qm9vdHN0cmFwKCk7XG5cblx0XHRpZiAoJCgnLmlib3gtdG9vbHMnKVswXSkge1xuXHRcdFx0dGhpcy5pbml0SWJveCgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNtb290aGx5TWVudSgpIHtcblx0XHRcdGlmICghJCgnYm9keScpLmhhc0NsYXNzKCdtaW5pLW5hdmJhcicpIHx8ICQoJ2JvZHknKS5oYXNDbGFzcygnYm9keS1zbWFsbCcpKSB7XG5cdFx0XHRcdCQoJyNzaWRlLW1lbnUnKS5oaWRlKCk7XG5cdFx0XHRcdHNldFRpbWVvdXQoXG5cdFx0XHRcdFx0ZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0JCgnI3NpZGUtbWVudScpLmZhZGVJbig1MDApO1xuXHRcdFx0XHRcdH0sIDEwMCk7XG5cdFx0XHR9IGVsc2UgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnZml4ZWQtc2lkZWJhcicpKSB7XG5cdFx0XHRcdCQoJyNzaWRlLW1lbnUnKS5oaWRlKCk7XG5cdFx0XHRcdHNldFRpbWVvdXQoXG5cdFx0XHRcdFx0ZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0JCgnI3NpZGUtbWVudScpLmZhZGVJbig1MDApO1xuXHRcdFx0XHRcdH0sIDMwMCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkKCcjc2lkZS1tZW51JykucmVtb3ZlQXR0cignc3R5bGUnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBmaXhIZWlnaHQoKSB7XG5cdFx0XHR2YXIgaGVpZ2h0V2l0aG91dE5hdmJhciA9ICQoXCJib2R5ID4gI3dyYXBwZXJcIikuaGVpZ2h0KCkgLSA2MTtcblx0XHRcdCQoXCIuc2lkZWJhcmQtcGFuZWxcIikuY3NzKFwibWluLWhlaWdodFwiLCBoZWlnaHRXaXRob3V0TmF2YmFyICsgXCJweFwiKTtcblxuXHRcdFx0dmFyIG5hdmJhckhlaWdoID0gJCgnbmF2Lm5hdmJhci1kZWZhdWx0JykuaGVpZ2h0KCk7XG5cdFx0XHR2YXIgd3JhcHBlckhlaWdoID0gJCgnI3BhZ2Utd3JhcHBlcicpLmhlaWdodCgpO1xuXG5cdFx0XHRpZiAobmF2YmFySGVpZ2ggPiB3cmFwcGVySGVpZ2gpIHtcblx0XHRcdFx0JCgnI3BhZ2Utd3JhcHBlcicpLmNzcyhcIm1pbi1oZWlnaHRcIiwgbmF2YmFySGVpZ2ggKyBcInB4XCIpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobmF2YmFySGVpZ2ggPCB3cmFwcGVySGVpZ2gpIHtcblx0XHRcdFx0JCgnI3BhZ2Utd3JhcHBlcicpLmNzcyhcIm1pbi1oZWlnaHRcIiwgJCh3aW5kb3cpLmhlaWdodCgpICsgXCJweFwiKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnZml4ZWQtbmF2JykpIHtcblx0XHRcdFx0JCgnI3BhZ2Utd3JhcHBlcicpLmNzcyhcIm1pbi1oZWlnaHRcIiwgJCh3aW5kb3cpLmhlaWdodCgpIC0gNjAgKyBcInB4XCIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICgkKFwiI3NpZGUtbWVudVwiKVswXSkge1xuXHRcdFx0JChcIiNzaWRlLW1lbnVcIikubWV0aXNNZW51KCk7XG5cdFx0fVxuXHRcdFxuXHRcdGlmICgkKGRvY3VtZW50KS53aWR0aCgpIDwgNzY5KSB7XG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoJ2JvZHktc21hbGwnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdib2R5LXNtYWxsJyk7XG5cdFx0fVxuXG5cdFx0JCgnLm5hdmJhci1taW5pbWFsaXplJykuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0JChcImJvZHlcIikudG9nZ2xlQ2xhc3MoXCJtaW5pLW5hdmJhclwiKTtcblx0XHRcdHNtb290aGx5TWVudSgpO1xuXHRcdH0pO1xuXG5cdFx0Zml4SGVpZ2h0KCk7XG5cblx0XHQkKHdpbmRvdykuYmluZChcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCQoXCJib2R5XCIpLmhhc0NsYXNzKCdmaXhlZC1zaWRlYmFyJykpIHtcblx0XHRcdFx0JCgnLnNpZGViYXItY29sbGFwc2UnKS5zbGltU2Nyb2xsKHtcblx0XHRcdFx0XHRoZWlnaHQ6ICcxMDAlJyxcblx0XHRcdFx0XHRyYWlsT3BhY2l0eTogMC45XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0aWYgKCQoJy5zdW1tZXJub3RlJylbMF0pIHtcblx0XHRcdCQoJy5zdW1tZXJub3RlJykuc3VtbWVybm90ZSh7ZGlhbG9nc0luQm9keTogdHJ1ZX0pO1xuXHRcdH1cblx0fVxuXHRpbml0Qm9vdHN0cmFwKCkge1xuXHRcdCQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG5cdFx0JCgnW2RhdGEtdG9nZ2xlPVwicG9wb3ZlclwiXScpLnBvcG92ZXIoKTtcblx0XHQkKCcubW9kYWwnKS5hcHBlbmRUbyhcImJvZHlcIik7XG5cdFx0aWYgKCQoJyNkYXRlcGlja2VyJylbMF0pIHtcblx0XHRcdCQoJyNkYXRlcGlja2VyJykuZmluZCgnaW5wdXQnKS5kYXRlcGlja2VyKHtcblx0XHRcdFx0Y2xlYXJCdG46IHRydWUsXG5cdFx0XHRcdGZvcm1hdDogJ3l5eXktbW0tZGQnLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdGluaXRJYm94KCkge1xuXHRcdC8vIENvbGxhcHNlIGlib3ggZnVuY3Rpb25cblx0XHQkKCcuY29sbGFwc2UtbGluaycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBpYm94ID0gJCh0aGlzKS5jbG9zZXN0KCdkaXYuaWJveCcpO1xuXHRcdFx0dmFyIGJ1dHRvbiA9ICQodGhpcykuZmluZCgnaScpO1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBpYm94LmZpbmQoJ2Rpdi5pYm94LWNvbnRlbnQnKTtcblx0XHRcdGNvbnRlbnQuc2xpZGVUb2dnbGUoMjAwKTtcblx0XHRcdGJ1dHRvbi50b2dnbGVDbGFzcygnZmEtY2hldnJvbi11cCcpLnRvZ2dsZUNsYXNzKCdmYS1jaGV2cm9uLWRvd24nKTtcblx0XHRcdGlib3gudG9nZ2xlQ2xhc3MoJycpLnRvZ2dsZUNsYXNzKCdib3JkZXItYm90dG9tJyk7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWJveC5yZXNpemUoKTtcblx0XHRcdFx0aWJveC5maW5kKCdbaWRePW1hcC1dJykucmVzaXplKCk7XG5cdFx0XHR9LCA1MCk7XG5cdFx0fSk7XG5cblx0XHQvLyBDbG9zZSBpYm94IGZ1bmN0aW9uXG5cdFx0JCgnLmNsb3NlLWxpbmsnKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgY29udGVudCA9ICQodGhpcykuY2xvc2VzdCgnZGl2Lmlib3gnKTtcblx0XHRcdGNvbnRlbnQucmVtb3ZlKCk7XG5cdFx0fSk7XG5cdH1cbn0iLCJleHBvcnQgY2xhc3MgVGFibGVzIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dmFyIHByb2Nlc3NpbmcgPSB0cnVlO1xuXG5cdFx0aWYgKCQoJy5mb290YWJsZS1pbml0JylbMF0pIHtcblx0XHRcdCQoJy5mb290YWJsZS1pbml0JykuZWFjaChmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXHRcdFx0XHR2YXIgZm9vdGFibGUgPSBudWxsO1xuXHRcdFx0XHR2YXIgcmVtb3ZlTGluayA9ICR0aGlzLmF0dHIoJ2RhdGEtcmVtb3ZlLWxpbmsnKTtcblx0XHRcdFx0dmFyIHVzZXJMaW5rID0gJHRoaXMuYXR0cignZGF0YS11c2VyLWxpbmsnKTtcblxuXHRcdFx0XHQkdGhpcy5maW5kKCcuY2hlY2stYWxsJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuXHRcdFx0XHRcdFx0JHRoaXMuZmluZCgnaW5wdXQ6Y2hlY2tib3gnKS5lYWNoKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdCQodGhpcykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0JHRoaXMuZmluZCgnaW5wdXQ6Y2hlY2tib3gnKS5lYWNoKGZ1bmN0aW9uIChlKXtcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQkKCcjY29uZmlnVGFibGVNZW51IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdHZhciB0YXJnZXQgPSAkKCcjY29uZmlnVGFibGVNZW51JykuYXR0cignZGF0YS10YXJnZXQnKTtcblx0XHRcdFx0XHR2YXIgdHlwZSA9ICQodGhpcykuYXR0cignZGF0YS12YWx1ZScpO1xuXHRcdFx0XHRcdGlmICh0eXBlID09PSAncmVtb3ZlJykge1xuXHRcdFx0XHRcdFx0aWYgKGNvbmZpcm0oJ1JlbW92ZSBjaGVja2VkIGRhdGE/IENhbm5vdCBiZSB1bmRvJykpIHtcblx0XHRcdFx0XHRcdFx0dmFyIGlkcyA9IFtdO1xuXHRcdFx0XHRcdFx0XHQkdGhpcy5maW5kKCdpbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkJykubm90KCcuY2hlY2stYWxsJykuZWFjaChmdW5jdGlvbiAoZSl7XG5cdFx0XHRcdFx0XHRcdFx0aWRzLnB1c2goJCh0aGlzKS52YWwoKSk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHQkLnBvc3QocmVtb3ZlTGluaywge2k6IGlkc30pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRmb290YWJsZS50cmlnZ2VyKCdmb290YWJsZV9yZWRyYXcnKTtcblx0XHRcdFx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0XHRcdGZvb3RhYmxlLnRyaWdnZXIoJ2Zvb3RhYmxlX3JlZHJhdycpO1xuXHRcdFx0XHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHQkKCcjJyArIHRhcmdldCkudGFibGVFeHBvcnQoe3R5cGU6IHR5cGUsIGVzY2FwZTogJ2ZhbHNlJ30pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnLmZ0LWZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHR2YXIgJGZvcm0gPSAkKHRoaXMpO1xuXHRcdFx0XHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoKSkge1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cblx0XHRcdFx0XHRcdCQuZ2V0KCR0aGlzLmF0dHIoJ2RhdGEtcm91dGUnKSwge1xuXHRcdFx0XHRcdFx0XHRkYXRhOiAkZm9ybS5zZXJpYWxpemVGb3JtKClcblx0XHRcdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHRcdCR0aGlzLmZpbmQoJ3Rib2R5JykuZW1wdHkoKTtcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIG9iaiA9IGVbaV07XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGh0bWwgPSAnPHRyPic7XG5cdFx0XHRcdFx0XHRcdFx0JCgndGhbZGF0YS1zb3J0XScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIga2V5ID0gJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoa2V5ID09PSAnaWQnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzx0ZD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCInICsgb2JqWydpZCddICsgJ1wiIC8+PC90ZD4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmIChrZXkgPT09ICdhY3Rpb25zJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8dGQ+PGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPic7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoJ3ZpZXdMaW5rJykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8YSBjbGFzcz1cImJ0biBidG4teHMgYnRuLXdoaXRlXCIgaHJlZj1cIicgKyBvYmpbJ3ZpZXdMaW5rJ10gKyAnXCI+VmlldzwvYT4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoJ2VkaXRMaW5rJykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8YSBjbGFzcz1cImJ0biBidG4teHMgYnRuLXdoaXRlXCIgaHJlZj1cIicgKyBvYmpbJ2VkaXRMaW5rJ10gKyAnXCI+RWRpdDwvYT4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoJ3JlbW92ZUxpbmsnKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzxhIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4td2hpdGVcIiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiIGRhdGEtaWQ9XCInICsgb2JqWydpZCddICsgJ1wiPlJlbW92ZTwvYT4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoJ2JhbkxpbmsnKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzxhIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4td2hpdGVcIiBkYXRhLWFjdGlvbj1cImJhblwiIGRhdGEtaWQ9XCInICsgb2JqWydpZCddICsgJ1wiPkJhbjwvYT4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzwvZGl2PjwvdGQ+Jztcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8dGQ+JyArIG9ialtrZXldICsgJzwvdGQ+Jztcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8L3RkPic7XG5cdFx0XHRcdFx0XHRcdFx0JHRoaXMuZmluZCgndGJvZHknKS5hcHBlbmQoaHRtbCk7XG5cdFx0XHRcdFx0XHRcdFx0Zm9vdGFibGUudHJpZ2dlcignZm9vdGFibGVfcmVkcmF3Jyk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQkKCdbZGF0YS1hY3Rpb249XCJyZW1vdmVcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjb25maXJtKCdSZW1vdmUgZGF0YT8gQ2Fubm90IGJlIHVuZG8nKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHQkLnBvc3QocmVtb3ZlTGluaywge2k6ICQodGhpcykuYXR0cignZGF0YS1pZCcpfSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSBsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRmb290YWJsZS50cmlnZ2VyKCdmb290YWJsZV9yZWRyYXcnKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRcdFx0YWxlcnQoZS5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Zm9vdGFibGUgPSAkdGhpcy5mb290YWJsZSh7XG5cdFx0XHRcdFx0Y29sdW1uczogJC5nZXQoJHRoaXMuYXR0cignZGF0YS1yb3V0ZScpKS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHQkdGhpcy5maW5kKCd0Ym9keScpLmVtcHR5KCk7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIG9iaiA9IGVbaV07XG5cdFx0XHRcdFx0XHRcdHZhciBodG1sID0gJzx0cj4nO1xuXHRcdFx0XHRcdFx0XHQkKCd0aFtkYXRhLXNvcnRdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIga2V5ID0gJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGtleSA9PT0gJ2lkJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPHRkPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIicgKyBvYmpbJ2lkJ10gKyAnXCIgLz48L3RkPic7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgKGtleSA9PT0gJ2FjdGlvbnMnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8dGQ+PGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPic7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KCd2aWV3TGluaycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzxhIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4td2hpdGVcIiBocmVmPVwiJyArIG9ialsndmlld0xpbmsnXSArICdcIj5WaWV3PC9hPic7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KCdlZGl0TGluaycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzxhIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4td2hpdGVcIiBocmVmPVwiJyArIG9ialsnZWRpdExpbmsnXSArICdcIj5FZGl0PC9hPic7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KCdyZW1vdmVMaW5rJykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPGEgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi13aGl0ZVwiIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCIgZGF0YS1pZD1cIicgKyBvYmpbJ2lkJ10gKyAnXCI+UmVtb3ZlPC9hPic7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvYmouaGFzT3duUHJvcGVydHkoJ3VzZXJCYW5MaW5rJykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPGEgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi13aGl0ZVwiIGRhdGEtYWN0aW9uPVwiYmFuXCIgZGF0YS1pZD1cIicgKyBvYmpbJ2lkJ10gKyAnXCI+QmFuPC9hPic7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmIChvYmouaGFzT3duUHJvcGVydHkoJ3VzZXJVbkJhbkxpbmsnKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8YSBjbGFzcz1cImJ0biBidG4teHMgYnRuLXdoaXRlXCIgZGF0YS1hY3Rpb249XCJ1bmJhblwiIGRhdGEtaWQ9XCInICsgb2JqWydpZCddICsgJ1wiPlVuLUJhbjwvYT4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8L2Rpdj48L3RkPic7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPHRkPicgKyBvYmpba2V5XSArICc8L3RkPic7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPC90ZD4nO1xuXHRcdFx0XHRcdFx0XHQkdGhpcy5maW5kKCd0Ym9keScpLmFwcGVuZChodG1sKTtcblx0XHRcdFx0XHRcdFx0Zm9vdGFibGUudHJpZ2dlcignZm9vdGFibGVfcmVkcmF3Jyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdCQoJ1tkYXRhLWFjdGlvbj1cInJlbW92ZVwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChjb25maXJtKCdSZW1vdmUgZGF0YT8gQ2Fubm90IGJlIHVuZG8nKSkge1xuXHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0XHRcdFx0XHQkLnBvc3QocmVtb3ZlTGluaywge2k6ICQodGhpcykuYXR0cignZGF0YS1pZCcpfSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0YWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykgbG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGZvb3RhYmxlLnRyaWdnZXIoJ2Zvb3RhYmxlX3JlZHJhdycpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0YWxlcnQoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0XHQkKCdbZGF0YS1hY3Rpb249XCJiYW5cIl0sW2RhdGEtYWN0aW9uPVwidW5iYW5cIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHR2YXIgY29uZmlybU1zZyA9ICdCYW4gdGhpcyB1c2VyPyc7XG5cdFx0XHRcdFx0XHRcdHZhciBpc0JhbiA9IHRydWU7XG5cblx0XHRcdFx0XHRcdFx0aWYgKCQodGhpcykuZGF0YSgnYWN0aW9uJykgPT09ICd1bmJhbicpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25maXJtTXNnID0gJ1VuLUJhbiB0aGlzIHVzZXI/Jztcblx0XHRcdFx0XHRcdFx0XHRpc0JhbiA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGNvbmZpcm1Nc2cgPSAnQmFuIHRoaXMgdXNlcj8nO1xuXHRcdFx0XHRcdFx0XHRcdGlzQmFuID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoY29uZmlybShjb25maXJtTXNnKSkge1xuXHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0XHRcdFx0XHQkLnBvc3QodXNlckxpbmssIHtpOiAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKSwgYmFuOiBpc0Jhbn0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb290YWJsZS50cmlnZ2VyKCdmb290YWJsZV9yZWRyYXcnKTtcblx0XHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0YWxlcnQoZS5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGZvb3RhYmxlID0gJHRoaXMuZm9vdGFibGUoKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICgkKCcuZm9vdGFibGUtc2ltcGxlJylbMF0pIHtcblx0XHRcdCQoJy5mb290YWJsZS1zaW1wbGUnKS5mb290YWJsZSgpO1xuXHRcdH1cblx0fVxufSJdfQ==
