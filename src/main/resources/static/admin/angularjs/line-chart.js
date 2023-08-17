/*Khanh đã làm phần này rồi (lineChart)*/
'use strict';
app.controller("line", function($scope, $http) {
	$scope.items = []
	var url = `${host}/invoices/sales/2023`;


	$scope.getAllYear = () => {
		var url = `${host}/invoices/year`;
		return $http.get(url).then(resp => {
			$scope.years = resp.data;
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	}

	$scope.yearChanged = function() {
		if ($scope.selectedYear) {
			url = `${host}/invoices/sales/${$scope.selectedYear}`;
			$scope.runLineChart()
		}
	};
	$scope.load = () => {

		return $http.get(url).then(resp => {
			$scope.items = resp.data;
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	}
	$scope.line = function() {
		console.log(JSON.stringify($scope.items));
		var newData = [];

		for (var month = 1; month <= 12; month++) {
			var existingData = $scope.items.find(item => item.month === month);
			if (existingData) {
				newData.push(existingData);
			} else {
				newData.push({
					"month": month,
					"count": 0
				});
			}
		}

		$scope.items = newData;
		console.log($scope.items);
		/*		Lấy dữ liệ các tháng*/
		var countArray = $scope.items.map(item => item.count);
		console.log(countArray);
		'use strict';
		var data = {
			labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
			datasets: [{
				label: '# of Votes',
				data: countArray,
				backgroundColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255,99,132,1)',

				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255,99,132,1)',

				],
				borderWidth: 1,
				fill: false
			}]
		};
		var options = {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					},
					gridLines: {
						color: "rgba(204, 204, 204,0.1)"
					}
				}],
				xAxes: [{
					gridLines: {
						color: "rgba(204, 204, 204,0.1)"
					}
				}]
			},
			legend: {
				display: false
			},
			elements: {
				point: {
					radius: 0
				}
			}
		}
		if ($("#lineChart").length) {
			var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
			var lineChart = new Chart(lineChartCanvas, {
				type: 'line',
				data: data,
				options: options
			});
		}

		if ($("#linechart-multi").length) {
			var multiLineCanvas = $("#linechart-multi").get(0).getContext("2d");
			var lineChart = new Chart(multiLineCanvas, {
				type: 'line',
				data: multiLineData,
				options: options
			});
		}


	}
	$scope.runLineChart = () => {
		$scope.load().then(() => {
			$scope.line();
		});
	}
	$scope.getAllYear();
	$scope.runLineChart();
});

/*Bar Chart (Bar Chart)*/
app.controller("bar", function($scope, $http) {
	$scope.items = []
	var url = `${host}/invoices/bars/2023`;


	$scope.getAllYear = () => {
		var url = `${host}/invoices/year`;
		return $http.get(url).then(resp => {
			$scope.years = resp.data;
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	}

	$scope.yearChanged = function() {
		if ($scope.selectedYear) {
			url = `${host}/invoices/bars/${$scope.selectedYear}`;
			$scope.runLineChart()
		}
	};
	$scope.load = () => {

		return $http.get(url).then(resp => {
			$scope.items = resp.data;
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	}
	$scope.line = function() {
		console.log(JSON.stringify($scope.items));
		var newData = [];

		for (var month = 1; month <= 12; month++) {
			var existingData = $scope.items.find(item => item.month === month);
			if (existingData) {
				newData.push(existingData);
			} else {
				newData.push({
					"month": month,
					"count": 0
				});
			}
		}

		$scope.items = newData;
		console.log($scope.items);
		/*Lấy dữ liệu các tháng*/
		var countArray = $scope.items.map(item => item.count);
		console.log(countArray);
		var data = {
			labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
			datasets: [{
				label: 'Số lần hủy',
				data: countArray,
				backgroundColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255,99,132,1)',

				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255,99,132,1)',

				],
				borderWidth: 1,
				fill: false
			}]
		};
		var options = {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					},
					gridLines: {
						color: "rgba(204, 204, 204,0.1)"
					}
				}],
				xAxes: [{
					gridLines: {
						color: "rgba(204, 204, 204,0.1)"
					}
				}]
			},
			legend: {
				display: false
			},
			elements: {
				point: {
					radius: 0
				}
			}
		}
		if ($("#barChart").length) {
			var barChartCanvas = $("#barChart").get(0).getContext("2d");
			// This will get the first returned node in the jQuery collection.
			var barChart = new Chart(barChartCanvas, {
				type: 'bar',
				data: data,
				options: options
			});
		}

	}
	$scope.runLineChart = () => {
		$scope.load().then(() => {
			$scope.line();
		});
	}
		$scope.getAllYear();
	$scope.runLineChart();
});
/*Area Chart (Area Chart)*/
app.controller("area", function($scope, $http) {
	$scope.items = []

	$scope.load = () => {
		var url = `${host}/invoices/sales/2023`;
		return $http.get(url).then(resp => {
			$scope.items = resp.data;
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	}



	$scope.line = function() {
		var areaData = {
			labels: ["2013", "2014", "2015", "2016", "2017777777"],
			datasets: [{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1,
				fill: true, // 3: no fill
			}]
		};

		var areaOptions = {
			plugins: {
				filler: {
					propagate: true
				}
			},
			scales: {
				yAxes: [{
					gridLines: {
						color: "rgba(204, 204, 204,0.1)"
					}
				}],
				xAxes: [{
					gridLines: {
						color: "rgba(204, 204, 204,0.1)"
					}
				}]
			}
		}


		if ($("#areachart-multi").length) {
			var multiAreaCanvas = $("#areachart-multi").get(0).getContext("2d");
			var multiAreaChart = new Chart(multiAreaCanvas, {
				type: 'line',
				data: multiAreaData,
				options: multiAreaOptions
			});
		}


		if ($("#areaChart").length) {
			var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
			var areaChart = new Chart(areaChartCanvas, {
				type: 'line',
				data: areaData,
				options: areaOptions
			});
		}

	}

	$scope.runLineChart = () => {
		$scope.load().then(() => {
			$scope.line();
		});
	}
	$scope.runLineChart();
});
/*Doughnut chart Chart (Area Chart)*/
app.controller("doughnutChart", function($scope, $http) {

	var doughnutPieData = {
		datasets: [{
			data: [30, 40, 30],
			backgroundColor: [
				'rgba(255, 99, 132, 0.5)',
				'rgba(54, 162, 235, 0.5)',
				'rgba(255, 206, 86, 0.5)',
				'rgba(75, 192, 192, 0.5)',
				'rgba(153, 102, 255, 0.5)',
				'rgba(255, 159, 64, 0.5)'
			],
			borderColor: [
				'rgba(255,99,132,1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)'
			],
		}],

		// These labels appear in the legend and in the tooltips when hovering different arcs
		labels: [
			'Pink',
			'Blue',
			'Yellow',
		]
	};
	var doughnutPieOptions = {
		responsive: true,
		animation: {
			animateScale: true,
			animateRotate: true
		}
	};

	// Get context with jQuery - using jQuery's .get() method.

	if ($("#doughnutChart").length) {
		var doughnutChartCanvas = $("#doughnutChart").get(0).getContext("2d");
		var doughnutChart = new Chart(doughnutChartCanvas, {
			type: 'doughnut',
			data: doughnutPieData,
			options: doughnutPieOptions
		});
	}

	$scope.runLineChart();
});