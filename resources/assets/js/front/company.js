import { Core } from "./core";
import { Plugins } from "./plugins";

var $form;
var processing = false;

// Post Job
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

		$('html, body').animate({
			scrollTop: $form.offset().top - 100
		}, 100);
	}

	$('.form-navigation .previous').click(function() {
		navigateTo(curIndex() - 1);
	});

	$('.form-navigation .next').click(function() {
		if ($form.parsley().validate('block-' + curIndex())) {
			navigateTo(curIndex() + 1);
		}
	});

	$sections.each(function (index, section) {
		$(section).find(':input').attr('data-parsley-group', 'block-' + index);
	});

	navigateTo(0);

	$form.find('[type=submit]').on('click', function (e) {
		e.preventDefault();

		if ($form.parsley().validate() && ! processing) {
			processing = true;
			$form.find('[type=submit]').disable(true);
			$.post(window.origin + '/job/submit-job', {
				data: $form.serializeForm()
			}).done(function (e) {
				processing = false;
				$form.showMessage(e.message, e.type);
				$form.find('[type=submit]').disable(false);
			}).fail(function (xhr, status, e) {
				processing = false;
				$form.showMessage(xhr.responseText, 'danger');
				$form.find('[type=submit]').disable(false);
			});
		}
	});
}

// Edit Job
if ($('#companyEditJobForm')[0]) {
	var $sections = $('.form-section');
	var $form = $('#companyEditJobForm');
	var jobId = $form.data('job');

	function curIndex() {
		return $sections.index($sections.filter('.current'));
	}

	function navigateTo(index) {
		$sections.removeClass('current').eq(index).addClass('current');
		$('.form-navigation .previous').toggle(index > 0);
		var atTheEnd = index >= $sections.length - 1;
		$('.form-navigation .next').toggle(!atTheEnd);
		$('.form-navigation [type=submit]').toggle(atTheEnd);

		$('html, body').animate({
			scrollTop: $form.offset().top - 100
		}, 100);
	}

	$('.form-navigation .previous').click(function() {
		navigateTo(curIndex() - 1);
	});

	$('.form-navigation .next').click(function() {
		if ($form.parsley().validate('block-' + curIndex())) {
			navigateTo(curIndex() + 1);
		}
	});

	$sections.each(function (index, section) {
		$(section).find(':input').attr('data-parsley-group', 'block-' + index);
	});

	navigateTo(0);

	$form.find('[type=submit]').on('click', function (e) {
		e.preventDefault();

		if ($form.parsley().validate() && ! processing) {
			processing = true;
			$form.find('[type=submit]').disable(true);
			$.post(window.origin + '/job/edit-job', {
				data: $form.serializeForm(),
				job: jobId
			}).done(function (e) {
				processing = false;
				$form.showMessage(e.message, e.type);
				$form.find('[type=submit]').disable(false);
			}).fail(function (xhr, status, e) {
				processing = false;
				$form.showMessage(xhr.responseText, 'danger');
				$form.find('[type=submit]').disable(false);
			});
		}
	});
}

// Edit Account
if ($('#companyEditAccountForm')[0]) {
	$form = $('#companyEditAccountForm');

	$form.find('[type=submit]').on('click', function (e) {
		e.preventDefault();
		if ($form.parsley().validate() && ! processing) {
			$form.find('[type=submit]').disable(true);
			$.post(window.origin + '/company/update-account', {
				data: $form.serializeForm()
			}).done(function (e) {
				$form.showMessage(e.message, e.type);
				$form.find('[type=submit]').disable(false);
				processing = false;
			}).fail(function (xhr, status, e) {
				$form.showMessage(xhr.responseText, 'danger');
				$form.find('[type=submit]').disable(false);
				processing = false;
			});
		}
	});
}