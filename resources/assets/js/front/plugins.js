export class Plugins {
	constructor() {
		this.initBootstrap();
		var slider = {"init":"1","home_init":"1"};

		$('#home-services .home-services-widget .image-wrapper').imgLiquid();

		// Job search: Advanced Search toggle
		if ( $('#advance-search-option')[0] ) {
			$('.advance-search-toggle').click(function (e) {
				if ($('#advance-search-option:visible').length ) {
					$('#advance-search-option').slideUp();
				}else{
					$('#advance-search-option').slideDown();
				}
				return false;
			});
		}

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
		
		if (slider.init) {
			if ($('select#experience_min')[0] && $('select#experience_max')[0]) {
				$('select#experience_min, select#experience_max').selectToUISlider({
					labels: 10,
					labelSrc: 'text',
					tooltip: true,
				});
			}

			if ($('select#sallary_min')[0] && $('select#sallary_max')[0]) {
				$('select#sallary_min, select#sallary_max').selectToUISlider({
					labels:11,
					labelSrc:'text',
					tooltip:true,
				});
			}
		}

		$('#job-listing-tabs').tabs({ hide: { effect: "fade", duration: 'fast' }, show: { effect: "fade", duration: 'fast' } });

		var screenWidth = $(window).width();

		if ( screenWidth < 767 ) {
			$('li.has-children > a').on('click', function (e){
				e.preventDefault();
				$(this).next('.sub-menu').slideToggle('fast');
			});
		}
	}
	initBootstrap() {
		$('.panel-tooltip').tooltip();
		$('[data-toggle="popover"]').popover();

		$('.input-daterange input').each(function () {
			$(this).datepicker({
				format: "yyyy-mm-dd",
				startDate: "+1d"
			});
		});
	}
}