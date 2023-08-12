app.controller("ctrl", function($scope, $http, $location) {
	$scope.pageCount = 1;
	$scope.items = [];
	$scope.load_all = function() {
		var currentURL = $location.absUrl();
		console.log("Current URL:", currentURL);
		var parts = currentURL.split('/'); // Tách đường dẫn thành mảng các phần tử
		const id = parts[parts.length - 1];
		var url = `${host}/detailedInvoices/${id}`;
		$http.get(url).then(resp => {
			$scope.items = resp.data;
			
			angular.forEach($scope.items, function(detailedInvoice){
				$scope.invoiceID=detailedInvoice.invoice.id
				$scope.userName=detailedInvoice.invoice.user.name
				$scope.orderDate=detailedInvoice.invoice.orderDate
				return;
			})
			
			
			/*Tổng số trang*/
			$scope.pageCount = Math.ceil($scope.items.length / 5);
			console.log($scope.pageCount)
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	};

	$scope.sortBy = function(prop) {
		$scope.prop = prop
	}


	$scope.currentPage = 1;
	$scope.begin = 0;

	$scope.first = function() {
		$scope.begin = 0;
		$scope.currentPage = 1;
	}
	$scope.prev = function() {
		console.log($scope.begin)
		if ($scope.begin > 0) {
			$scope.begin -= 5;
			$scope.currentPage--;
		}
	}
	$scope.next = function() {
		console.log($scope.begin)
		if ($scope.begin < ($scope.pageCount - 1) * 5) {
			$scope.begin += 5;
			$scope.currentPage++;
		}
	}
	$scope.last = function() {
		$scope.begin = ($scope.pageCount - 1) * 5;
		$scope.currentPage = $scope.pageCount;

	}
	$scope.load_all()
	
		var url = "http://localhost:8088/pcgearhub/rest/files/images";

	$scope.url = function(filename) {
		return `${url}/${filename}`
	}


});