export class Tables {
	constructor() {
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
					}
					else {
						$this.find('input:checkbox').each(function (e){
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
							$this.find('input[type=checkbox]:checked').not('.check-all').each(function (e){
								ids.push($(this).val());
							});
							$.post(removeLink, {i: ids}).done(function (e) {
								footable.trigger('footable_redraw');
								alert(e.message);
							}).fail(function (xhr, status, e) {
								footable.trigger('footable_redraw');
								alert(xhr.responseText);
							});
						}
					}
					else {
						$('#' + target).tableExport({type: type, escape: 'false'});
					}
				});

				$('.ft-form').on('submit', function (e) {
					var $form = $(this);
					if ($form.parsley().validate()) {
						$.get($this.attr('data-route'), {
							data: $form.serializeForm()
						}).done(function (e) {
							$this.find('tbody').empty();
							for (var i = 0; i < e.length; i++) {
								var obj = e[i];
								var html = '<tr>';
								$('th[data-sort]').each(function() {
									var key = $(this).attr('data-id');
									if (key === 'id') {
										html += '<td><input type="checkbox" value="' + obj['id'] + '" /></td>';
									}							
									else if (key === 'actions') {
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
									}
									else {
										html += '<td>' + obj[key] + '</td>';
									}
								});
								html += '</td>';
								$this.find('tbody').append(html);
								footable.trigger('footable_redraw');
							}

							$('[data-action="remove"]').on('click', function (e) {
								if (confirm('Remove data? Cannot be undo')) {
									$.post(removeLink, {i: $(this).attr('data-id')}).done(function (e) {
										alert(e.message);
										if (e.type === 'success') location.reload();
									}).fail(function (xhr, status, e) {
										footable.trigger('footable_redraw');
										alert(xhr.responseText);
									});
								}
							});
						}).fail(function (xhr, status, e) {
							alert(e.responseText);
						});
					}
				});

				footable = $this.footable({
					columns: $.get($this.attr('data-route')).done(function (e) {
						$this.find('tbody').empty();
						for (var i = 0; i < e.length; i++) {
							var obj = e[i];
							var html = '<tr>';
							$('th[data-sort]').each(function() {
								var key = $(this).attr('data-id');
								if (key === 'id') {
									html += '<td><input type="checkbox" value="' + obj['id'] + '" /></td>';
								}
								else if (key === 'actions') {
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
								}
								else {
									html += '<td>' + obj[key] + '</td>';
								}
							});
							html += '</td>';
							$this.find('tbody').append(html);
							footable.trigger('footable_redraw');
						}

						$('[data-action="remove"]').on('click', function (e) {
							if (confirm('Remove data? Cannot be undo')) {
								$.post(removeLink, {i: $(this).attr('data-id')}).done(function (e) {
									alert(e.message);
									if (e.type === 'success') location.reload();
								}).fail(function (xhr, status, e) {
									footable.trigger('footable_redraw');
									alert(xhr.responseText);
								});
							}
						});
					}).fail(function (xhr, status, e) {
						alert(e.responseText);
					})
				});
			});
		}

		// GENERATE VOUCHER LIST FOR MERCHANT
		if ($('#generateMerchantVoucherBtn')[0] && $('#merchantVoucherTableList')[0]) {
			$('#generateMerchantVoucherBtn').on('click', function (e) {
				e.preventDefault();
				$('#merchantVoucherTableList').tableExport({type: 'excel', escape: 'false'});
			});
		}

		if ($('.footable-simple')[0]) {
			$('.footable-simple').footable();
		}
	}
}