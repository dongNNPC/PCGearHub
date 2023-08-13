app.controller("line", function($scope, $http) {

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
		/*Lấy dữ liệ các tháng*/
		var countArray = $scope.items.map(item => item.count);
		console.log(countArray);

		'use strict';

		var data = {
			labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
			datasets: [{
				label: '# of Votes',
				data: countArray,
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
				fill: false
			}]
		};
		var multiLineData = {
			labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
			datasets: [{
				label: 'Dataset 1',
				data: [12, 19, 3, 5, 2, 3],
				borderColor: [
					'#587ce4'
				],
				borderWidth: 2,
				fill: false
			},
			{
				label: 'Dataset 2',
				data: [5, 23, 7, 12, 42, 23],
				borderColor: [
					'#ede190'
				],
				borderWidth: 2,
				fill: false
			},
			{
				label: 'Dataset 3',
				data: [15, 10, 21, 32, 12, 33],
				borderColor: [
					'#f44252'
				],
				borderWidth: 2,
				fill: false
			}
			]
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

	$scope.runLineChart();



});