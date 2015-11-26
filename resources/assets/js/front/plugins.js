export class Plugins {
	constructor() {
		this.initBootstrap();
		var slider = {"init":"1","home_init":"1"};

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

		if ($('#countrySelector')[0]) {
			this.formCountrySelectorInit();
		}

		if ($('.summernote')[0]) {
			$('.summernote').summernote({dialogsInBody: true});
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
	formCountrySelectorInit() {
		$.ajax({
			type: 'get',
			data: {
				type: "all"
			},
			dataType: "json",
			url: window.origin + '/api/country',
			success: function (data) {
				for (var key in data) {
					if (data.hasOwnProperty(key)) {
						var selected = (data[key].Code === 'GBR') ? 'selected="selected"' : '';
						$('#countrySelector').append('<option value="' + data[key].Code + '" ' + selected + '>' + data[key].Name +'</option>');
					}
				}

				if ($('#citySelector')[0]) {
					var processing = false;
					$('#citySelector').empty();

					var cityReload = function() {
						processing = true;
						$.ajax({
							type: 'get',
							data: {
								value: $('#countrySelector').val()
							},
							dataType: "json",
							url: window.origin + '/api/city',
							success: function (cityData) {
								processing = false;
								$('#citySelector').empty();
								for (var key in cityData) {
									if (cityData.hasOwnProperty(key)) {
										$('#citySelector').append('<option value="' + cityData[key].Name + '">' + cityData[key].Name +'</option>');
									}
								}
							},
							error: function (xhr, status, e) {
								processing = false;
								if (confirm("Cannot load " + country + "'s city list, reload?")) {
									location.reload();
								}
							}
						});
					};

					cityReload();

					$('#countrySelector').on('change', function() {
						if ( ! processing) cityReload();
						else alert('Please wait while previous list was loaded.');
					});
				}
			},
			error: function (xhr, status, e) {
				if (confirm('Cannot load country list, reload?')) {
					location.reload();
				}
			}
		});
	}
}