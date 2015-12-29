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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZXNvdXJjZXMvYXNzZXRzL2pzL2JhY2svYXBwLmpzIiwicmVzb3VyY2VzL2Fzc2V0cy9qcy9iYWNrL2NvcmUuanMiLCJyZXNvdXJjZXMvYXNzZXRzL2pzL2JhY2svZm9ybXMuanMiLCJyZXNvdXJjZXMvYXNzZXRzL2pzL2JhY2svcGx1Z2lucy5qcyIsInJlc291cmNlcy9hc3NldHMvanMvYmFjay90YWJsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FDS0EsVUFMUyxJQUFJLEVBS0gsQ0FBQztBQUNYLGFBSlMsT0FBTyxFQUlILENBQUM7QUFDZCxXQU5TLEtBQUssRUFNSCxDQUFDO0FBQ1osWUFMUyxNQUFNLEVBS0gsQ0FBQzs7Ozs7Ozs7Ozs7OztJQ1JBLElBQUksV0FBSixJQUFJO0FBQ2hCLFVBRFksSUFBSSxHQUNGO3dCQURGLElBQUk7O0FBRWYsTUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2YsTUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ25CLE1BQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUNyQixNQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7RUFDakI7O2NBTlcsSUFBSTs7NEJBT047QUFDVCxJQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUNYLFdBQU8sRUFBRSxpQkFBUyxLQUFLLEVBQUU7QUFDeEIsWUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVc7QUFDM0IsVUFBSSxLQUFLLEVBQUU7QUFDVixRQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVCLFFBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxD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QUM7S0FDNUIsQ0FBQztJQUNGLENBQUMsQ0FBQzs7QUFFSCxXQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0dBQzVCLENBQUMsQ0FBQztFQUNIOztBQUVELEtBQUksQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDN0IsR0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7RUFDakM7Q0FDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBDb3JlIH0gZnJvbSBcIi4vY29yZVwiO1xuaW1wb3J0IHsgRm9ybXMgfSBmcm9tIFwiLi9mb3Jtc1wiO1xuaW1wb3J0IHsgUGx1Z2lucyB9IGZyb20gXCIuL3BsdWdpbnNcIjtcbmltcG9ydCB7IFRhYmxlcyB9IGZyb20gXCIuL3RhYmxlc1wiO1xuXG5uZXcgQ29yZSgpO1xubmV3IFBsdWdpbnMoKTtcbm5ldyBGb3JtcygpO1xubmV3IFRhYmxlcygpOyIsImV4cG9ydCBjbGFzcyBDb3JlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5kaXNhYmxlKCk7XG5cdFx0dGhpcy5mb3JtTWVzc2FnZSgpO1xuXHRcdHRoaXMuc2VyaWFsaXplRm9ybSgpO1xuXHRcdHRoaXMuc2V0dXBBamF4KCk7XG5cdH1cblx0ZGlzYWJsZSgpIHtcblx0XHQkLmZuLmV4dGVuZCh7XG5cdFx0XHRkaXNhYmxlOiBmdW5jdGlvbihzdGF0ZSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmIChzdGF0ZSkge1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5maW5kKCdzcGFuJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0JCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpLmZpbmQoJy5idG4tcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoJ3NwYW4nKS5zaG93KCk7XG5cdFx0XHRcdFx0XHQkKHRoaXMpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJykuZmluZCgnLmJ0bi1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRmb3JtTWVzc2FnZSgpIHtcblx0XHQkLmZuLnNob3dNZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSwgdHlwZSwgYWxlcnRDbGFzcykge1xuXHRcdFx0dmFyIGh0bWw7XG5cdFx0XHRodG1sID0gdm9pZCAwO1xuXHRcdFx0aWYgKGFsZXJ0Q2xhc3MgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRhbGVydENsYXNzID0gJyc7XG5cdFx0XHR9XG5cdFx0XHQkKCcuc3RhdHVzLW1lc3NhZ2UnKS5yZW1vdmUoKTtcblx0XHRcdGh0bWwgPSAnPGRpdiBjbGFzcz1cXCdzdGF0dXMtbWVzc2FnZSBtLXQgJyArIGFsZXJ0Q2xhc3MgKyAnXFwnPiA8ZGl2IHJvbGU9XFwnYWxlcnRcXCcgY2xhc3M9XFwnZmFkZS1pbiBhbGVydCBhbGVydC1kaXNtaXNzYWJsZSBhbGVydC0nICsgdHlwZSArICdcXCc+IDxidXR0b24gdHlwZT1cXCdidXR0b25cXCcgY2xhc3M9XFwnY2xvc2VcXCcgZGF0YS1kaXNtaXNzPVxcJ2FsZXJ0XFwnPiA8c3BhbiBhcmlhLWhpZGRlbj1cXCd0cnVlXFwnPjxpIGNsYXNzPVxcJ2ZhIGZhLXRpbWVzXFwnPjwvaT48L3NwYW4+IDxzcGFuIGNsYXNzPVxcJ3NyLW9ubHlcXCc+Q2xvc2U8L3NwYW4+IDwvYnV0dG9uPicgKyBtZXNzYWdlICsgJzwvZGl2PjwvZGl2Pic7XG5cdFx0XHRyZXR1cm4gJChodG1sKS5hcHBlbmRUbyh0aGlzKS5oaWRlKCkuZmFkZUluKDkwMCk7XG5cdFx0fTtcblx0fVxuXHRzZXJpYWxpemVGb3JtKCkge1xuXHRcdCQuZm4uc2VyaWFsaXplRm9ybSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGRhdGEsIGxvb2t1cCwgcGFyc2UsIHNlbGVjdG9yO1xuXHRcdFx0ZGF0YSA9IHZvaWQgMDtcblx0XHRcdGxvb2t1cCA9IHZvaWQgMDtcblx0XHRcdHBhcnNlID0gdm9pZCAwO1xuXHRcdFx0c2VsZWN0b3IgPSB2b2lkIDA7XG5cdFx0XHRpZiAodGhpcy5sZW5ndGggPCAxKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGRhdGEgPSB7fTtcblx0XHRcdGxvb2t1cCA9IGRhdGE7XG5cdFx0XHRzZWxlY3RvciA9ICc6aW5wdXRbdHlwZSE9XCJjaGVja2JveFwiXVt0eXBlIT1cInJhZGlvXCJdLCBpbnB1dDpjaGVja2VkJztcblx0XHRcdHBhcnNlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciAkZWwsIGNhcCwgaSwgbmFtZWQ7XG5cdFx0XHRcdCRlbCA9IHZvaWQgMDtcblx0XHRcdFx0Y2FwID0gdm9pZCAwO1xuXHRcdFx0XHRpID0gdm9pZCAwO1xuXHRcdFx0XHRuYW1lZCA9IHZvaWQgMDtcblx0XHRcdFx0aWYgKHRoaXMuZGlzYWJsZWQpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0bmFtZWQgPSB0aGlzLm5hbWUucmVwbGFjZSgvXFxbKFteXFxdXSspP1xcXS9nLCAnLCQxJykuc3BsaXQoJywnKTtcblx0XHRcdFx0Y2FwID0gbmFtZWQubGVuZ3RoIC0gMTtcblx0XHRcdFx0JGVsID0gJCh0aGlzKTtcblx0XHRcdFx0aWYgKG5hbWVkWzBdKSB7XG5cdFx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKGkgPCBjYXApIHtcblx0XHRcdFx0XHRcdGxvb2t1cCA9IGxvb2t1cFtuYW1lZFtpXV0gPSBsb29rdXBbbmFtZWRbaV1dIHx8IChuYW1lZFtpICsgMV0gPT09ICcnIHx8IG5hbWVkW2kgKyAxXSA9PT0gJzAnID8gW10gOiB7fSk7XG5cdFx0XHRcdFx0XHRpKys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChsb29rdXAubGVuZ3RoICE9PSB2b2lkIDApIHtcblx0XHRcdFx0XHRcdGxvb2t1cC5wdXNoKCRlbC52YWwoKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGxvb2t1cFtuYW1lZFtjYXBdXSA9ICRlbC52YWwoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bG9va3VwID0gZGF0YTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHRoaXMuZmlsdGVyKHNlbGVjdG9yKS5lYWNoKHBhcnNlKTtcblx0XHRcdHRoaXMuZmluZChzZWxlY3RvcikuZWFjaChwYXJzZSk7XG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9O1xuXHR9XG5cdHNldHVwQWpheCgpIHtcblx0XHQkLmFqYXhTZXR1cCh7XG5cdFx0XHRzdGF0dXNDb2RlOiB7XG5cdFx0XHRcdDQwMzogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJldHVybiB3aW5kb3cuYWxlcnQoJ0ZvcmJpZGRlbiBjb250ZW50IScpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQ0MDQ6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRyZXR1cm4gd2luZG93LmFsZXJ0KCdSZXF1ZXN0ZWQgcm91dGUgbm90IGZvdW5kIScpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHQ1MDA6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRyZXR1cm4gd2luZG93LmFsZXJ0KCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3IhJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjcm9zc0RvbWFpbjogZmFsc2UsXG5cdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0Y2FjaGU6IHRydWUsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdYLUNTUkYtVG9rZW4nOiAkKCdtZXRhW25hbWU9XCJfdFwiXScpLmF0dHIoJ2NvbnRlbnQnKVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59IiwiY29uc3QgaktleSA9IHsgLy8gamNyeXB0aW9uIGFlcyBrZXlcblx0a2V5MTogJ1ZlZlQ1V3BuR1QnLFxuXHRrZXkyOiAnbFJZajNJYlUwZScsXG5cdHB1Yl9rZXk6IFx0d2luZG93Lm9yaWdpbiArICcvZ2VuJyxcblx0aGFuZHNoYWtlOiB3aW5kb3cub3JpZ2luICsgJy9oYW5kc2hha2UnXG59XG5cbmNvbnN0IGFkbWluUm91dGVzID0ge1xuXHRsb2dpbjogd2luZG93Lm9yaWdpbiArICcvYWRtaW4vbG9naW4nXG59XG5cbmV4cG9ydCBjbGFzcyBGb3JtcyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGlmICgkKCcjYWRtaW5Mb2dpbkZvcm0nKVswXSkge1xuXHRcdFx0dGhpcy5pbml0QWRtaW5Mb2dpbkZvcm0oJyNhZG1pbkxvZ2luRm9ybScpO1xuXHRcdH1cblxuXHRcdGlmICgkKCcuZm9ybS1hY3Rpb24tYWRkJylbMF0pIHtcblx0XHRcdHRoaXMuaW5pdENvbW1vbkFkZEZvcm0oKTtcblx0XHR9XG5cblx0XHRpZiAoJCgnLmZvcm0tYWN0aW9uLWVkaXQnKVswXSkge1xuXHRcdFx0dGhpcy5pbml0Q29tbW9uRWRpdEZvcm0oKTtcblx0XHR9XG5cdH1cblx0aW5pdEFkbWluTG9naW5Gb3JtKGZvcm0pIHtcblx0XHR2YXIgcHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdHZhciAkZm9ybSA9ICQoZm9ybSk7XG5cblx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGYpIHtcblx0XHRcdGYucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHZhciBhZXM7XG5cblx0XHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoKSAmJiAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0YWVzID0gJC5qQ3J5cHRpb24uZW5jcnlwdChqS2V5LmtleTEsIGpLZXkua2V5Mik7XG5cdFx0XHRcdCQuakNyeXB0aW9uLmF1dGhlbnRpY2F0ZShhZXMsIGpLZXkucHViX2tleSwgaktleS5oYW5kc2hha2UsIChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JGZvcm0uZmluZCgnW3R5cGU9c3VibWl0XScpLmRpc2FibGUodHJ1ZSk7XG5cdFx0XHRcdFx0JC5wb3N0KGFkbWluUm91dGVzLmxvZ2luLCB7XG5cdFx0XHRcdFx0XHRkYXRhOiBKU09OLnN0cmluZ2lmeSgkLmpDcnlwdGlvbi5lbmNyeXB0KCRmb3JtLnNlcmlhbGl6ZSgpLCBhZXMpKVxuXHRcdFx0XHRcdH0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKGUubWVzc2FnZSwgZS50eXBlKTtcblx0XHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykge1xuXHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24ucmVwbGFjZShlLnJlZGlyZWN0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKHhoci5yZXNwb25zZVRleHQsICdkYW5nZXInKTtcblx0XHRcdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKCdMb2dnaW5nIHlvdSBpbicsICdpbmZvJyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9KTtcblx0fVxuXHRpbml0Q29tbW9uQWRkRm9ybSgpIHtcblx0XHR2YXIgcHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdHZhciBkYXRhID0ge307XG5cdFx0dmFyIGFsbG93ZWRfbWltZSA9IFtcblx0XHRcdCdpbWFnZS9naWYnLFxuXHRcdFx0J2ltYWdlL2pwZWcnLFxuXHRcdFx0J2ltYWdlL3BqcGVnJyxcblx0XHRcdCdpbWFnZS9wbmcnXG5cdFx0XTtcblx0XHR2YXIgaW1hZ2UgPSBudWxsO1xuXG5cdFx0JCgnYnV0dG9uW3R5cGU9Y2FuY2VsXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChmKSB7XG5cdFx0XHRmLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCcuZm9ybS1hY3Rpb24tYWRkJylbMF0ucmVzZXQoKTtcblx0XHR9KTtcblxuXHRcdGlmICgkKCdpbnB1dFt0eXBlPWZpbGVdJylbMF0pIHtcblx0XHRcdCQoJ2lucHV0W3R5cGU9ZmlsZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICh0aGlzLmZpbGVzWzBdLnNpemUgPiA1MDAwMDAwKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5zaG93TWVzc2FnZSgnRmlsZSBjYW5ub3QgYmUgbGFyZ2VyIHRoYW4gNW1iICEnLCAnZGFuZ2VyJyk7XG5cdFx0XHRcdFx0aW1hZ2UgPSBudWxsO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCQuaW5BcnJheSh0aGlzLmZpbGVzWzBdLnR5cGUsIGFsbG93ZWRfbWltZSkgPT09IC0xKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5zaG93TWVzc2FnZSgnRmlsZSBjYW5ub3QgYmUgdXBsb2FkZWQgIScsICdkYW5nZXInKTtcblx0XHRcdFx0XHRpbWFnZSA9IG51bGw7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5zaG93TWVzc2FnZSgnPGkgY2xhc3M9XCJmYSBmYS1jaGVja1wiPjwvaT4gRmlsZSBjYW4gYmUgdXBsb2FkZWQnLCAnc3VjY2VzcycpO1xuXHRcdFx0XHRcdGltYWdlID0gdGhpcy5maWxlc1swXTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0JCgnLmZvcm0tYWN0aW9uLWFkZCcpLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZikge1xuXHRcdFx0Zi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dmFyICRmb3JtID0gJCgnLmZvcm0tYWN0aW9uLWFkZCcpO1xuXHRcdFx0dmFyICRyb3V0ZSA9ICRmb3JtLmZpbmQoJ2lucHV0W2RhdGEtcm91dGVdJykudmFsKCk7XG5cblx0XHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoKSAmJiAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0dmFyIGZkID0gbmV3IEZvcm1EYXRhKCk7XG5cdFx0XHRcdGZkLmFwcGVuZCgnZGF0YScsIEpTT04uc3RyaW5naWZ5KCRmb3JtLnNlcmlhbGl6ZUZvcm0oKSkpO1xuXG5cdFx0XHRcdGlmICgkKCdpbnB1dFt0eXBlPWZpbGVdJylbMF0pIHtcblx0XHRcdFx0XHRmZC5hcHBlbmQoJ2ltYWdlJywgaW1hZ2UpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCQoJy5zdW1tZXJub3RlJylbMF0pIHtcblx0XHRcdFx0XHR2YXIgdGV4dGFyZWEgPSB7fTtcblx0XHRcdFx0XHQkKCcuc3VtbWVybm90ZScpLmVhY2goZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHRleHRhcmVhWyQodGhpcykuYXR0cignZGF0YS1pZCcpXSA9ICQodGhpcykuY29kZSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGZkLmFwcGVuZCgnbG9uZ1RleHQnLCBKU09OLnN0cmluZ2lmeSh0ZXh0YXJlYSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0JGZvcm0uZmluZCgnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QsIGJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ2J1dHRvbiwgLmJ0biwgaW5wdXQnKS5hZGRDbGFzcygnZGlzYWJsZWQnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZSh0cnVlKTtcblxuXHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdG1ldGhvZDogJ3Bvc3QnLFxuXHRcdFx0XHRcdHVybDogJHJvdXRlLFxuXHRcdFx0XHRcdGRhdGE6IGZkLFxuXHRcdFx0XHRcdGNyb3NzRG9tYWluOiBmYWxzZSxcblx0XHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRcdGNhY2hlOiB0cnVlLFxuXHRcdFx0XHRcdHByb2Nlc3NEYXRhOiBmYWxzZSxcblx0XHRcdFx0XHRjb250ZW50VHlwZTogZmFsc2UsXG5cdFx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFx0J1gtQ1NSRi1Ub2tlbic6ICQoJ21ldGFbbmFtZT1cIl90XCJdJykuYXR0cignY29udGVudCcpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoZS5tZXNzYWdlLCBlLnR5cGUpO1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0LCBidXR0b24nKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIHtcblx0XHRcdFx0XHRcdCRmb3JtWzBdLnJlc2V0KCk7XG5cdFx0XHRcdFx0XHRpZiAoJGZvcm0uZmluZCgnaW5wdXRbZGF0YS1yb3V0ZV0nKS5hdHRyKCdkYXRhLXJlbG9hZCcpID09PSAndHJ1ZScpIHtcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHsgbG9jYXRpb24ucmVsb2FkKCk7IH0sIDMwMDApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKHhoci5yZXNwb25zZVRleHQsICdkYW5nZXInKTtcblx0XHRcdFx0XHQkZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCwgYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblx0XHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoJ1NvbWV0aGluZyB3cm9uZyEnLCAnaW5mbycpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cdH1cblx0aW5pdENvbW1vbkVkaXRGb3JtKCkge1xuXHRcdHZhciBwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0dmFyIGRhdGEgPSB7fTtcblx0XHR2YXIgYWxsb3dlZF9taW1lID0gW1xuXHRcdFx0J2ltYWdlL2dpZicsXG5cdFx0XHQnaW1hZ2UvanBlZycsXG5cdFx0XHQnaW1hZ2UvcGpwZWcnLFxuXHRcdFx0J2ltYWdlL3BuZydcblx0XHRdO1xuXHRcdHZhciBpbWFnZSA9IG51bGw7XG5cblx0XHQkKCdidXR0b25bdHlwZT1jYW5jZWxdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGYpIHtcblx0XHRcdGYucHJldmVudERlZmF1bHQoKTtcblx0XHRcdCQoJy5mb3JtLWFjdGlvbi1lZGl0JylbMF0ucmVzZXQoKTtcblx0XHR9KTtcblxuXHRcdGlmICgkKCdpbnB1dFt0eXBlPWZpbGVdJylbMF0pIHtcblx0XHRcdCQoJ2lucHV0W3R5cGU9ZmlsZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICh0aGlzLmZpbGVzWzBdLnNpemUgPiA1MDAwMDAwKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5zaG93TWVzc2FnZSgnRmlsZSBjYW5ub3QgYmUgbGFyZ2VyIHRoYW4gM01iICEnLCAnZGFuZ2VyJyk7XG5cdFx0XHRcdFx0aW1hZ2UgPSBudWxsO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCQuaW5BcnJheSh0aGlzLmZpbGVzWzBdLnR5cGUsIGFsbG93ZWRfbWltZSkgPT09IC0xKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5zaG93TWVzc2FnZSgnRmlsZSBjYW5ub3QgYmUgdXBsYW9kZWQgIScsICdkYW5nZXInKTtcblx0XHRcdFx0XHRpbWFnZSA9IG51bGw7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5zaG93TWVzc2FnZSgnPGkgY2xhc3M9XCJmYSBmYS1jaGVja1wiPjwvaT4gRmlsZSBhbGxvd2VkJywgJ3N1Y2Nlc3MnKTtcblx0XHRcdFx0XHRpbWFnZSA9IHRoaXMuZmlsZXNbMF07XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdCQoJy5mb3JtLWFjdGlvbi1lZGl0JykuZmluZCgnW3R5cGU9c3VibWl0XScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChmKSB7XG5cdFx0XHRmLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR2YXIgJGZvcm0gPSAkKCcuZm9ybS1hY3Rpb24tZWRpdCcpO1xuXHRcdFx0dmFyICRyb3V0ZSA9ICRmb3JtLmZpbmQoJ2lucHV0W2RhdGEtcm91dGVdJykudmFsKCk7XG5cblx0XHRcdGlmICgkZm9ybS5wYXJzbGV5KCkudmFsaWRhdGUoKSAmJiAhIHByb2Nlc3NpbmcpIHtcblx0XHRcdFx0cHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLnNob3coKTtcblx0XHRcdFx0dmFyIGZkID0gbmV3IEZvcm1EYXRhKCk7XG5cdFx0XHRcdGZkLmFwcGVuZCgnZGF0YScsIEpTT04uc3RyaW5naWZ5KCRmb3JtLnNlcmlhbGl6ZUZvcm0oKSkpO1xuXG5cdFx0XHRcdGlmICgkKCdpbnB1dFt0eXBlPWZpbGVdJylbMF0pIHtcblx0XHRcdFx0XHRmZC5hcHBlbmQoJ2ltYWdlJywgaW1hZ2UpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCQoJy5zdW1tZXJub3RlJylbMF0pIHtcblx0XHRcdFx0XHR2YXIgdGV4dGFyZWEgPSB7fTtcblx0XHRcdFx0XHQkKCcuc3VtbWVybm90ZScpLmVhY2goZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHRleHRhcmVhWyQodGhpcykuYXR0cignZGF0YS1pZCcpXSA9ICQodGhpcykuY29kZSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGZkLmFwcGVuZCgnbG9uZ1RleHQnLCBKU09OLnN0cmluZ2lmeSh0ZXh0YXJlYSkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0JGZvcm0uZmluZCgnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QsIGJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cdFx0XHRcdCRmb3JtLmZpbmQoJ2J1dHRvbiwgLmJ0biwgaW5wdXQnKS5hZGRDbGFzcygnZGlzYWJsZWQnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuXHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZSh0cnVlKTtcblxuXHRcdFx0XHQkLmFqYXgoe1xuXHRcdFx0XHRcdG1ldGhvZDogJ3Bvc3QnLFxuXHRcdFx0XHRcdHVybDogJHJvdXRlLFxuXHRcdFx0XHRcdGRhdGE6IGZkLFxuXHRcdFx0XHRcdGNyb3NzRG9tYWluOiBmYWxzZSxcblx0XHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRcdGNhY2hlOiB0cnVlLFxuXHRcdFx0XHRcdHByb2Nlc3NEYXRhOiBmYWxzZSxcblx0XHRcdFx0XHRjb250ZW50VHlwZTogZmFsc2UsXG5cdFx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFx0J1gtQ1NSRi1Ub2tlbic6ICQoJ21ldGFbbmFtZT1cIl90XCJdJykuYXR0cignY29udGVudCcpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoZS5tZXNzYWdlLCBlLnR5cGUpO1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0LCBidXR0b24nKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuXHRcdFx0XHRcdCRmb3JtLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS5kaXNhYmxlKGZhbHNlKTtcblx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIHtcblx0XHRcdFx0XHRcdCRmb3JtWzBdLnJlc2V0KCk7XG5cdFx0XHRcdFx0XHRpZiAoJGZvcm0uZmluZCgnaW5wdXRbZGF0YS1yb3V0ZV0nKS5hdHRyKCdkYXRhLXJlbG9hZCcpID09PSAndHJ1ZScpIHtcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHsgbG9jYXRpb24ucmVsb2FkKCk7IH0sIDMwMDApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdCRmb3JtLnNob3dNZXNzYWdlKHhoci5yZXNwb25zZVRleHQsICdkYW5nZXInKTtcblx0XHRcdFx0XHQkZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCwgYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblx0XHRcdFx0XHQkZm9ybS5maW5kKCdbdHlwZT1zdWJtaXRdJykuZGlzYWJsZShmYWxzZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JGZvcm0uc2hvd01lc3NhZ2UoJ1NvbWV0aGluZyB3cm9uZyEnLCAnaW5mbycpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cdH1cbn0iLCJleHBvcnQgY2xhc3MgUGx1Z2lucyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuaW5pdEJvb3RzdHJhcCgpO1xuXG5cdFx0aWYgKCQoJy5pYm94LXRvb2xzJylbMF0pIHtcblx0XHRcdHRoaXMuaW5pdElib3goKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzbW9vdGhseU1lbnUoKSB7XG5cdFx0XHRpZiAoISQoJ2JvZHknKS5oYXNDbGFzcygnbWluaS1uYXZiYXInKSB8fCAkKCdib2R5JykuaGFzQ2xhc3MoJ2JvZHktc21hbGwnKSkge1xuXHRcdFx0XHQkKCcjc2lkZS1tZW51JykuaGlkZSgpO1xuXHRcdFx0XHRzZXRUaW1lb3V0KFxuXHRcdFx0XHRcdGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdCQoJyNzaWRlLW1lbnUnKS5mYWRlSW4oNTAwKTtcblx0XHRcdFx0XHR9LCAxMDApO1xuXHRcdFx0fSBlbHNlIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ2ZpeGVkLXNpZGViYXInKSkge1xuXHRcdFx0XHQkKCcjc2lkZS1tZW51JykuaGlkZSgpO1xuXHRcdFx0XHRzZXRUaW1lb3V0KFxuXHRcdFx0XHRcdGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdCQoJyNzaWRlLW1lbnUnKS5mYWRlSW4oNTAwKTtcblx0XHRcdFx0XHR9LCAzMDApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCgnI3NpZGUtbWVudScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZml4SGVpZ2h0KCkge1xuXHRcdFx0dmFyIGhlaWdodFdpdGhvdXROYXZiYXIgPSAkKFwiYm9keSA+ICN3cmFwcGVyXCIpLmhlaWdodCgpIC0gNjE7XG5cdFx0XHQkKFwiLnNpZGViYXJkLXBhbmVsXCIpLmNzcyhcIm1pbi1oZWlnaHRcIiwgaGVpZ2h0V2l0aG91dE5hdmJhciArIFwicHhcIik7XG5cblx0XHRcdHZhciBuYXZiYXJIZWlnaCA9ICQoJ25hdi5uYXZiYXItZGVmYXVsdCcpLmhlaWdodCgpO1xuXHRcdFx0dmFyIHdyYXBwZXJIZWlnaCA9ICQoJyNwYWdlLXdyYXBwZXInKS5oZWlnaHQoKTtcblxuXHRcdFx0aWYgKG5hdmJhckhlaWdoID4gd3JhcHBlckhlaWdoKSB7XG5cdFx0XHRcdCQoJyNwYWdlLXdyYXBwZXInKS5jc3MoXCJtaW4taGVpZ2h0XCIsIG5hdmJhckhlaWdoICsgXCJweFwiKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG5hdmJhckhlaWdoIDwgd3JhcHBlckhlaWdoKSB7XG5cdFx0XHRcdCQoJyNwYWdlLXdyYXBwZXInKS5jc3MoXCJtaW4taGVpZ2h0XCIsICQod2luZG93KS5oZWlnaHQoKSArIFwicHhcIik7XG5cdFx0XHR9XG5cblx0XHRcdGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ2ZpeGVkLW5hdicpKSB7XG5cdFx0XHRcdCQoJyNwYWdlLXdyYXBwZXInKS5jc3MoXCJtaW4taGVpZ2h0XCIsICQod2luZG93KS5oZWlnaHQoKSAtIDYwICsgXCJweFwiKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoJChcIiNzaWRlLW1lbnVcIilbMF0pIHtcblx0XHRcdCQoXCIjc2lkZS1tZW51XCIpLm1ldGlzTWVudSgpO1xuXHRcdH1cblx0XHRcblx0XHRpZiAoJChkb2N1bWVudCkud2lkdGgoKSA8IDc2OSkge1xuXHRcdFx0JCgnYm9keScpLmFkZENsYXNzKCdib2R5LXNtYWxsJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnYm9keS1zbWFsbCcpO1xuXHRcdH1cblxuXHRcdCQoJy5uYXZiYXItbWluaW1hbGl6ZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdCQoXCJib2R5XCIpLnRvZ2dsZUNsYXNzKFwibWluaS1uYXZiYXJcIik7XG5cdFx0XHRzbW9vdGhseU1lbnUoKTtcblx0XHR9KTtcblxuXHRcdGZpeEhlaWdodCgpO1xuXG5cdFx0JCh3aW5kb3cpLmJpbmQoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICgkKFwiYm9keVwiKS5oYXNDbGFzcygnZml4ZWQtc2lkZWJhcicpKSB7XG5cdFx0XHRcdCQoJy5zaWRlYmFyLWNvbGxhcHNlJykuc2xpbVNjcm9sbCh7XG5cdFx0XHRcdFx0aGVpZ2h0OiAnMTAwJScsXG5cdFx0XHRcdFx0cmFpbE9wYWNpdHk6IDAuOVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmICgkKCcuc3VtbWVybm90ZScpWzBdKSB7XG5cdFx0XHQkKCcuc3VtbWVybm90ZScpLnN1bW1lcm5vdGUoe2RpYWxvZ3NJbkJvZHk6IHRydWV9KTtcblx0XHR9XG5cdH1cblx0aW5pdEJvb3RzdHJhcCgpIHtcblx0XHQkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xuXHRcdCQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKCk7XG5cdFx0JCgnLm1vZGFsJykuYXBwZW5kVG8oXCJib2R5XCIpO1xuXHRcdGlmICgkKCcjZGF0ZXBpY2tlcicpWzBdKSB7XG5cdFx0XHQkKCcjZGF0ZXBpY2tlcicpLmZpbmQoJ2lucHV0JykuZGF0ZXBpY2tlcih7XG5cdFx0XHRcdGNsZWFyQnRuOiB0cnVlLFxuXHRcdFx0XHRmb3JtYXQ6ICd5eXl5LW1tLWRkJyxcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXHRpbml0SWJveCgpIHtcblx0XHQvLyBDb2xsYXBzZSBpYm94IGZ1bmN0aW9uXG5cdFx0JCgnLmNvbGxhcHNlLWxpbmsnKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgaWJveCA9ICQodGhpcykuY2xvc2VzdCgnZGl2Lmlib3gnKTtcblx0XHRcdHZhciBidXR0b24gPSAkKHRoaXMpLmZpbmQoJ2knKTtcblx0XHRcdHZhciBjb250ZW50ID0gaWJveC5maW5kKCdkaXYuaWJveC1jb250ZW50Jyk7XG5cdFx0XHRjb250ZW50LnNsaWRlVG9nZ2xlKDIwMCk7XG5cdFx0XHRidXR0b24udG9nZ2xlQ2xhc3MoJ2ZhLWNoZXZyb24tdXAnKS50b2dnbGVDbGFzcygnZmEtY2hldnJvbi1kb3duJyk7XG5cdFx0XHRpYm94LnRvZ2dsZUNsYXNzKCcnKS50b2dnbGVDbGFzcygnYm9yZGVyLWJvdHRvbScpO1xuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlib3gucmVzaXplKCk7XG5cdFx0XHRcdGlib3guZmluZCgnW2lkXj1tYXAtXScpLnJlc2l6ZSgpO1xuXHRcdFx0fSwgNTApO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQ2xvc2UgaWJveCBmdW5jdGlvblxuXHRcdCQoJy5jbG9zZS1saW5rJykuY2xpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSAkKHRoaXMpLmNsb3Nlc3QoJ2Rpdi5pYm94Jyk7XG5cdFx0XHRjb250ZW50LnJlbW92ZSgpO1xuXHRcdH0pO1xuXHR9XG59IiwiZXhwb3J0IGNsYXNzIFRhYmxlcyB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHZhciBwcm9jZXNzaW5nID0gdHJ1ZTtcblxuXHRcdGlmICgkKCcuZm9vdGFibGUtaW5pdCcpWzBdKSB7XG5cdFx0XHQkKCcuZm9vdGFibGUtaW5pdCcpLmVhY2goZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcblx0XHRcdFx0dmFyIGZvb3RhYmxlID0gbnVsbDtcblx0XHRcdFx0dmFyIHJlbW92ZUxpbmsgPSAkdGhpcy5hdHRyKCdkYXRhLXJlbW92ZS1saW5rJyk7XG5cdFx0XHRcdHZhciB1c2VyTGluayA9ICR0aGlzLmF0dHIoJ2RhdGEtdXNlci1saW5rJyk7XG5cblx0XHRcdFx0JHRoaXMuZmluZCgnLmNoZWNrLWFsbCcpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0aWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcblx0XHRcdFx0XHRcdCR0aGlzLmZpbmQoJ2lucHV0OmNoZWNrYm94JykuZWFjaChmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdCR0aGlzLmZpbmQoJ2lucHV0OmNoZWNrYm94JykuZWFjaChmdW5jdGlvbiAoZSl7XG5cdFx0XHRcdFx0XHRcdCQodGhpcykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JCgnI2NvbmZpZ1RhYmxlTWVudSBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHR2YXIgdGFyZ2V0ID0gJCgnI2NvbmZpZ1RhYmxlTWVudScpLmF0dHIoJ2RhdGEtdGFyZ2V0Jyk7XG5cdFx0XHRcdFx0dmFyIHR5cGUgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtdmFsdWUnKTtcblx0XHRcdFx0XHRpZiAodHlwZSA9PT0gJ3JlbW92ZScpIHtcblx0XHRcdFx0XHRcdGlmIChjb25maXJtKCdSZW1vdmUgY2hlY2tlZCBkYXRhPyBDYW5ub3QgYmUgdW5kbycpKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBpZHMgPSBbXTtcblx0XHRcdFx0XHRcdFx0JHRoaXMuZmluZCgnaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCcpLm5vdCgnLmNoZWNrLWFsbCcpLmVhY2goZnVuY3Rpb24gKGUpe1xuXHRcdFx0XHRcdFx0XHRcdGlkcy5wdXNoKCQodGhpcykudmFsKCkpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0JC5wb3N0KHJlbW92ZUxpbmssIHtpOiBpZHN9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9vdGFibGUudHJpZ2dlcignZm9vdGFibGVfcmVkcmF3Jyk7XG5cdFx0XHRcdFx0XHRcdFx0YWxlcnQoZS5tZXNzYWdlKTtcblx0XHRcdFx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRcdFx0XHRmb290YWJsZS50cmlnZ2VyKCdmb290YWJsZV9yZWRyYXcnKTtcblx0XHRcdFx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0JCgnIycgKyB0YXJnZXQpLnRhYmxlRXhwb3J0KHt0eXBlOiB0eXBlLCBlc2NhcGU6ICdmYWxzZSd9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdCQoJy5mdC1mb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0dmFyICRmb3JtID0gJCh0aGlzKTtcblx0XHRcdFx0XHRpZiAoJGZvcm0ucGFyc2xleSgpLnZhbGlkYXRlKCkpIHtcblx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXG5cdFx0XHRcdFx0XHQkLmdldCgkdGhpcy5hdHRyKCdkYXRhLXJvdXRlJyksIHtcblx0XHRcdFx0XHRcdFx0ZGF0YTogJGZvcm0uc2VyaWFsaXplRm9ybSgpXG5cdFx0XHRcdFx0XHR9KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0XHQkdGhpcy5maW5kKCd0Ym9keScpLmVtcHR5KCk7XG5cdFx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBvYmogPSBlW2ldO1xuXHRcdFx0XHRcdFx0XHRcdHZhciBodG1sID0gJzx0cj4nO1xuXHRcdFx0XHRcdFx0XHRcdCQoJ3RoW2RhdGEtc29ydF0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGtleSA9ICQodGhpcykuYXR0cignZGF0YS1pZCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGtleSA9PT0gJ2lkJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8dGQ+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiJyArIG9ialsnaWQnXSArICdcIiAvPjwvdGQ+Jztcblx0XHRcdFx0XHRcdFx0XHRcdH1cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAoa2V5ID09PSAnYWN0aW9ucycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPHRkPjxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KCd2aWV3TGluaycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPGEgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi13aGl0ZVwiIGhyZWY9XCInICsgb2JqWyd2aWV3TGluayddICsgJ1wiPlZpZXc8L2E+Jztcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KCdlZGl0TGluaycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPGEgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi13aGl0ZVwiIGhyZWY9XCInICsgb2JqWydlZGl0TGluayddICsgJ1wiPkVkaXQ8L2E+Jztcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KCdyZW1vdmVMaW5rJykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8YSBjbGFzcz1cImJ0biBidG4teHMgYnRuLXdoaXRlXCIgZGF0YS1hY3Rpb249XCJyZW1vdmVcIiBkYXRhLWlkPVwiJyArIG9ialsnaWQnXSArICdcIj5SZW1vdmU8L2E+Jztcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KCdiYW5MaW5rJykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8YSBjbGFzcz1cImJ0biBidG4teHMgYnRuLXdoaXRlXCIgZGF0YS1hY3Rpb249XCJiYW5cIiBkYXRhLWlkPVwiJyArIG9ialsnaWQnXSArICdcIj5CYW48L2E+Jztcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8L2Rpdj48L3RkPic7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPHRkPicgKyBvYmpba2V5XSArICc8L3RkPic7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPC90ZD4nO1xuXHRcdFx0XHRcdFx0XHRcdCR0aGlzLmZpbmQoJ3Rib2R5JykuYXBwZW5kKGh0bWwpO1xuXHRcdFx0XHRcdFx0XHRcdGZvb3RhYmxlLnRyaWdnZXIoJ2Zvb3RhYmxlX3JlZHJhdycpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0JCgnW2RhdGEtYWN0aW9uPVwicmVtb3ZlXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY29uZmlybSgnUmVtb3ZlIGRhdGE/IENhbm5vdCBiZSB1bmRvJykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuc2hvdygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0JC5wb3N0KHJlbW92ZUxpbmssIHtpOiAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKX0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICdzdWNjZXNzJykgbG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9vdGFibGUudHJpZ2dlcignZm9vdGFibGVfcmVkcmF3Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0XHRcdGFsZXJ0KGUucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGZvb3RhYmxlID0gJHRoaXMuZm9vdGFibGUoe1xuXHRcdFx0XHRcdGNvbHVtbnM6ICQuZ2V0KCR0aGlzLmF0dHIoJ2RhdGEtcm91dGUnKSkuZG9uZShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0JHRoaXMuZmluZCgndGJvZHknKS5lbXB0eSgpO1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBvYmogPSBlW2ldO1xuXHRcdFx0XHRcdFx0XHR2YXIgaHRtbCA9ICc8dHI+Jztcblx0XHRcdFx0XHRcdFx0JCgndGhbZGF0YS1zb3J0XScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGtleSA9ICQodGhpcykuYXR0cignZGF0YS1pZCcpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChrZXkgPT09ICdpZCcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzx0ZD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCInICsgb2JqWydpZCddICsgJ1wiIC8+PC90ZD4nO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmIChrZXkgPT09ICdhY3Rpb25zJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPHRkPjxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eSgndmlld0xpbmsnKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8YSBjbGFzcz1cImJ0biBidG4teHMgYnRuLXdoaXRlXCIgaHJlZj1cIicgKyBvYmpbJ3ZpZXdMaW5rJ10gKyAnXCI+VmlldzwvYT4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eSgnZWRpdExpbmsnKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRodG1sICs9ICc8YSBjbGFzcz1cImJ0biBidG4teHMgYnRuLXdoaXRlXCIgaHJlZj1cIicgKyBvYmpbJ2VkaXRMaW5rJ10gKyAnXCI+RWRpdDwvYT4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eSgncmVtb3ZlTGluaycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzxhIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4td2hpdGVcIiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiIGRhdGEtaWQ9XCInICsgb2JqWydpZCddICsgJ1wiPlJlbW92ZTwvYT4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KCd1c2VyQmFuTGluaycpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzxhIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4td2hpdGVcIiBkYXRhLWFjdGlvbj1cImJhblwiIGRhdGEtaWQ9XCInICsgb2JqWydpZCddICsgJ1wiPkJhbjwvYT4nO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAob2JqLmhhc093blByb3BlcnR5KCd1c2VyVW5CYW5MaW5rJykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPGEgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi13aGl0ZVwiIGRhdGEtYWN0aW9uPVwidW5iYW5cIiBkYXRhLWlkPVwiJyArIG9ialsnaWQnXSArICdcIj5Vbi1CYW48L2E+Jztcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0aHRtbCArPSAnPC9kaXY+PC90ZD4nO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzx0ZD4nICsgb2JqW2tleV0gKyAnPC90ZD4nO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdGh0bWwgKz0gJzwvdGQ+Jztcblx0XHRcdFx0XHRcdFx0JHRoaXMuZmluZCgndGJvZHknKS5hcHBlbmQoaHRtbCk7XG5cdFx0XHRcdFx0XHRcdGZvb3RhYmxlLnRyaWdnZXIoJ2Zvb3RhYmxlX3JlZHJhdycpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQkKCdbZGF0YS1hY3Rpb249XCJyZW1vdmVcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoY29uZmlybSgnUmVtb3ZlIGRhdGE/IENhbm5vdCBiZSB1bmRvJykpIHtcblx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHRcdFx0XHRcdFx0JC5wb3N0KHJlbW92ZUxpbmssIHtpOiAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKX0pLmRvbmUoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGFsZXJ0KGUubWVzc2FnZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAnc3VjY2VzcycpIGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHRcdFx0XHRcdH0pLmZhaWwoZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb290YWJsZS50cmlnZ2VyKCdmb290YWJsZV9yZWRyYXcnKTtcblx0XHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGFsZXJ0KHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0JCgnW2RhdGEtYWN0aW9uPVwiYmFuXCJdLFtkYXRhLWFjdGlvbj1cInVuYmFuXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0dmFyIGNvbmZpcm1Nc2cgPSAnQmFuIHRoaXMgdXNlcj8nO1xuXHRcdFx0XHRcdFx0XHR2YXIgaXNCYW4gPSB0cnVlO1xuXG5cdFx0XHRcdFx0XHRcdGlmICgkKHRoaXMpLmRhdGEoJ2FjdGlvbicpID09PSAndW5iYW4nKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uZmlybU1zZyA9ICdVbi1CYW4gdGhpcyB1c2VyPyc7XG5cdFx0XHRcdFx0XHRcdFx0aXNCYW4gPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRjb25maXJtTXNnID0gJ0JhbiB0aGlzIHVzZXI/Jztcblx0XHRcdFx0XHRcdFx0XHRpc0JhbiA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKGNvbmZpcm0oY29uZmlybU1zZykpIHtcblx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5zaG93KCk7XG5cdFx0XHRcdFx0XHRcdFx0JC5wb3N0KHVzZXJMaW5rLCB7aTogJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyksIGJhbjogaXNCYW59KS5kb25lKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRhbGVydChlLm1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0JCgnLnBhZ2UtcHJlbG9hZGVyJykuaGlkZSgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3N1Y2Nlc3MnKSBsb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHRcdFx0XHR9KS5mYWlsKGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm9vdGFibGUudHJpZ2dlcignZm9vdGFibGVfcmVkcmF3Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKCcucGFnZS1wcmVsb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRhbGVydCh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSkuZmFpbChmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGUpIHtcblx0XHRcdFx0XHRcdGFsZXJ0KGUucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0XHRcdHByb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdCQoJy5wYWdlLXByZWxvYWRlcicpLmhpZGUoKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRmb290YWJsZSA9ICR0aGlzLmZvb3RhYmxlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAoJCgnLmZvb3RhYmxlLXNpbXBsZScpWzBdKSB7XG5cdFx0XHQkKCcuZm9vdGFibGUtc2ltcGxlJykuZm9vdGFibGUoKTtcblx0XHR9XG5cdH1cbn0iXX0=
