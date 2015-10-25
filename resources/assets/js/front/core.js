export class Core {
	constructor() {
		this.disable();
		this.formMessage();
		this.serializeForm();
		this.setupAjax();

		Number.prototype.formatMoney = function(c, d, t){
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
	disable() {
		$.fn.extend({
			disable: function(state) {
				return this.each(function() {
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
	formMessage() {
		$.fn.showMessage = function(message, type, alertClass) {
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
	serializeForm() {
		$.fn.serializeForm = function() {
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
			parse = function() {
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
	setupAjax() {
		$.ajaxSetup({
			statusCode: {
				403: function(e) {
					return window.alert('Forbidden content!');
				},
				404: function(e) {
					return window.alert('Requested route not found!');
				},
				500: function(e) {
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
}