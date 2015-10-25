export class Plugins {
	constructor() {
		this.initBootstrap();

		if ($('.ibox-tools')[0]) {
			this.initIbox();
		}

		function smoothlyMenu() {
			if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
				$('#side-menu').hide();
				setTimeout(
					function () {
						$('#side-menu').fadeIn(500);
					}, 100);
			} else if ($('body').hasClass('fixed-sidebar')) {
				$('#side-menu').hide();
				setTimeout(
					function () {
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
			$('.summernote').summernote({dialogsInBody: true});
		}
	}
	initBootstrap() {
		$('[data-toggle="tooltip"]').tooltip();
		$('[data-toggle="popover"]').popover();
		$('.modal').appendTo("body");
		if ($('#datepicker')[0]) {
			$('#datepicker').find('input').datepicker({
				clearBtn: true,
				format: 'yyyy-mm-dd',
			});
		}
	}
	initIbox() {
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
}