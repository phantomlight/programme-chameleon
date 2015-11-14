const jKey = { // jcryption aes key
	key1: 'VefT5WpnGT',
	key2: 'lRYj3IbU0e',
	pub_key: 	window.origin + '/gen',
	handshake: window.origin + '/handshake'
}

export class Forms {
	constructor() {
		if ($('#companyPostJobForm')[0]) {
			var $sections = $('.form-section');
			var $form = $('#companyPostJobForm');

			function curIndex() {
				return $sections.index($sections.filter('.current'));
			}

			function navigateTo(index) {
				$sections.removeClass('current').eq(index).addClass('current');
				$('.form-navigation .previous').toggle(index > 0);
				var atTheEnd = index >= $sections.length - 1;
				$('.form-navigation .next').toggle(!atTheEnd);
				$('.form-navigation [type=submit]').toggle(atTheEnd);
			}

			$('.form-navigation .previous').click(function() {
				navigateTo(curIndex() - 1);
  		});

			$('.form-navigation .next').click(function() {
				console.log($form.parsley().validate('block-' + curIndex()));
				if ($form.parsley().validate('block-' + curIndex())) {
					navigateTo(curIndex() + 1);
				}
			});

			$sections.each(function (index, section) {
				$(section).find(':input').attr('data-parsley-group', 'block-' + index);
			});

			navigateTo(0);
		}
	}
}