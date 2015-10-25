var chart;

export class Charts {
	constructor() {
		if ($("#dbcSelectorType")[0] && $("#dbcSelectorTime")[0]) {
			// initial chart render
			this.initMerchantWeeklyData($("#dbcSelectorType").val());

			// data type
			$("#dbcSelectorType").on("change", function (e) {
				if (typeof chart === 'object') {
					chart.destroy();
				}
				if ($("#dbcSelectorTime").val() === 'monthly') {
					this.initMerchantMonthlyData($(e.target).val());
				}
				else if ($("#dbcSelectorTime").val() === 'weekly') {
					this.initMerchantWeeklyData($(e.target).val());
				}
			}.bind(this));

			// data time range
			$("#dbcSelectorTime").on("change", function (e) {
				if (typeof chart === 'object') {
					chart.destroy();
				}
				if ($(e.target).val() === 'monthly') {
					this.initMerchantMonthlyData($("#dbcSelectorType").val());
				}
				else if ($(e.target).val() === 'weekly') {
					this.initMerchantWeeklyData($("#dbcSelectorType").val());
				}
			}.bind(this));
		}
	}
	initMerchantMonthlyData(type) {
		/* all code below are for chartjs configuration */
		var ctx = document.getElementById("dashboardChart").getContext("2d");
		var monthLabel = [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"Mei",
					"Jun",
					"Jul",
					"Aug",
					"Sept",
					"Oct",
					"Nov",
					"Dec"
				];

		var monthSalesData = [
					122000,
					159000,
					180000,
					221000,
					172000,
					550000,
					140000,
					350000,
					245500,
					180000,
					1101000,
					625000
				];

		var monthVoucherData = [
					101,
					102,
					206,
					731,
					201,
					1022,
					566,
					15,
					281,
					300,
					291,
					222
				];

		var monthCustomerData = [
					22,
					31,
					52,
					77,
					102,
					566,
					132,
					44,
					281,
					108,
					1,
					46
				];

		var colors = {
			fillColor: "rgba(24,166,137,0.5)",
			strokeColor: "rgba(24,166,137,0.8)",
			highlightFill: "rgba(24,166,137,0.75)",
			highlightStroke: "rgba(24,166,137,1)"
		};

		switch (type) {
			case "sales":
				var sampleData = {
					labels: monthLabel,
					datasets: [{
						label: "Penjualan",
						fillColor: colors.fillColor,
						strokeColor: colors.strokeColor,
						highlightFill: colors.highlightFill,
						highlightStroke: colors.highlightStroke,
						data: monthSalesData
					}]
				};

				chart = new Chart(ctx).Bar(sampleData, {
					responsive: true,
					maintainAspectRatio: true
				});
				break;
			case "voucher":
				var sampleData = {
					labels: monthLabel,
					datasets: [{
						label: "Voucher",
						fillColor: colors.fillColor,
						strokeColor: colors.strokeColor,
						highlightFill: colors.highlightFill,
						highlightStroke: colors.highlightStroke,
						data: monthVoucherData
					}]
				};

				chart = new Chart(ctx).Bar(sampleData, {
					responsive: true,
					maintainAspectRatio: true
				});
				break;
			case "customer":
				var sampleData = {
					labels: monthLabel,
					datasets: [{
						label: "Voucher",
						fillColor: colors.fillColor,
						strokeColor: colors.strokeColor,
						highlightFill: colors.highlightFill,
						highlightStroke: colors.highlightStroke,
						data: monthCustomerData
					}]
				};

				chart = new Chart(ctx).Bar(sampleData, {
					responsive: true,
					maintainAspectRatio: true
				});
				break;
			default:
				return false;
		}
	}
	initMerchantWeeklyData(type) {
		/* all code below are for chartjs configuration */
		var ctx = document.getElementById("dashboardChart").getContext("2d");
		var weekLabel = [
					"Mon",
					"Tue",
					"Wed",
					"Thu",
					"Fri",
					"Sat",
					"Sun",
				];

		var weekSalesData = [
					122000,
					159000,
					180000,
					221000,
					172000,
					550000,
					140000,
				];

		var weekVoucherData = [
					101,
					102,
					206,
					731,
					201,
					1022,
					566,
				];

		var weekCustomerData = [
					22,
					31,
					52,
					77,
					102,
					566,
					132,
				];

		var colors = {
			fillColor: "rgba(24,166,137,0.5)",
			strokeColor: "rgba(24,166,137,0.8)",
			highlightFill: "rgba(24,166,137,0.75)",
			highlightStroke: "rgba(24,166,137,1)"
		};

		switch (type) {
			case "sales":
				var sampleData = {
					labels: weekLabel,
					datasets: [{
						label: "Penjualan",
						fillColor: colors.fillColor,
						strokeColor: colors.strokeColor,
						highlightFill: colors.highlightFill,
						highlightStroke: colors.highlightStroke,
						data: weekSalesData
					}]
				};

				chart = new Chart(ctx).Bar(sampleData, {
					responsive: true,
					maintainAspectRatio: true
				});
				break;
			case "voucher":
				var sampleData = {
					labels: weekLabel,
					datasets: [{
						label: "Voucher",
						fillColor: colors.fillColor,
						strokeColor: colors.strokeColor,
						highlightFill: colors.highlightFill,
						highlightStroke: colors.highlightStroke,
						data: weekVoucherData
					}]
				};

				chart = new Chart(ctx).Bar(sampleData, {
					responsive: true,
					maintainAspectRatio: true
				});
				break;
			case "customer":
				var sampleData = {
					labels: weekLabel,
					datasets: [{
						label: "Voucher",
						fillColor: colors.fillColor,
						strokeColor: colors.strokeColor,
						highlightFill: colors.highlightFill,
						highlightStroke: colors.highlightStroke,
						data: weekCustomerData
					}]
				};

				chart = new Chart(ctx).Bar(sampleData, {
					responsive: true,
					maintainAspectRatio: true
				});
				break;
			default:
				return false;
		}
	}
}