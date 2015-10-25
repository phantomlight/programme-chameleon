export class Plugins {
	constructor() {
		this.initBootstrap();
		var slider = {"init":"1","home_init":"1"};

		// Job search: Advanced Search toggle
		if ( $('#advance-search-option').length ) {
			$('.advance-search-toggle').click(function (e) {
				if ($('#advance-search-option:visible').length ) {
					$('#advance-search-option').slideUp();
				}else{
					$('#advance-search-option').slideDown();
				}
				return false;
			});
		}

		$('#job-listing-tabs').tabs({ hide: { effect: "fade", duration: 'fast' }, show: { effect: "fade", duration: 'fast' } });

		// Featured Job Carousel
		$('.featured-job-wrapper').owlCarousel({
			loop: true,
			dots: false,
			nav: true,
			navText: ['&nbsp;','&nbsp;'],
			autoplay: true,
			autoplayTimeout: 4000,
			autoWidth: true,
			items: 3,
		});

		// Featured Job Widget
		$('.featured-job-widget').owlCarousel({
			loop: true,
			dots: false,
			nav: true,
			navText: ['&nbsp;','&nbsp;'],
			autoplay: true,
			autoplayTimeout: 4000,
			autoWidth: true,
			items: 1,
		});

		var screenWidth = $(window).width();
		if ( screenWidth > 767 ) {
		} else {
			$('li.menu-item-has-children > a').on('click', function(e){
				e.preventDefault();
				$(this).next('.sub-menu').slideToggle('fast');
			});
		}

		$('#job-category-dropdown').minimalect({
			placeholder : 'Select Job Category'
		});

		$('#job-type-dropdown').minimalect({
			placeholder : 'Select Job Type'
		});

		var initSlider = slider.init;

		if (initSlider) {
			$('select#experience_min, select#experience_max').selectToUISlider({
				labels:10,
				labelSrc:'text',
				tooltip:true,
			});
			$('select#sallary_min, select#sallary_max').selectToUISlider({
				labels:11,
				labelSrc:'text',
				tooltip:true,
			});
		}

		$('#job-listing-tabs').tabs({ hide: { effect: "fade", duration: 'fast' }, show: { effect: "fade", duration: 'fast' } });

		$('.featured-job-wrapper').owlCarousel({
			loop: true,
			dots: false,
			nav: true,
			navText: ['&nbsp;','&nbsp;'],
			autoplay: true,
			autoplayTimeout: 4000,
			autoWidth: true,
			items: 3,
		});
	}
	initBootstrap() {
		$('.panel-tooltip').tooltip();
		$('[data-toggle="popover"]').popover();
	}
}