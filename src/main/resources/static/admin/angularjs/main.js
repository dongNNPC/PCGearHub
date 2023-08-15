var app = angular.module('main', []);
let host = "http://localhost:8088/pcgearhub/rest";

app.controller("info", function($scope, $http) {
	$scope.pageCount = 1;
	$scope.user = {};
	$scope.items = [];
	$scope.lengthMessage = "";
	$scope.load_all = function() {
		/*Load user đăng nhập*/
		var url = `http://localhost:8088/pcgearhub/api/user`;
		$http.get(url).then(resp => {
			$scope.info = resp.data;
		}).catch(error => {
			console.log("Error", error);
		});

		/*Load user mua hàng*/
		var status = "pending";
		var urlUserInvoice = `${host}/users/invoice/${status}`;
		$http.get(urlUserInvoice).then(resp => {
			$scope.usersInvoces = resp.data;
			$scope.lengthMessage = $scope.usersInvoces.length;

		}).catch(error => {
			console.log("Error", error);
		});

		$scope.usersHostories=[]
		$scope.lengthMessageHis;
		
		var urlHostory = `${host}/UserHistories`;
		$http.get(urlHostory).then(resp => {
			$scope.usersHostories = resp.data;
			$scope.pageCount = Math.ceil($scope.usersHostories.length / 5);
			$scope.lengthMessageHis = $scope.usersHostories.length;

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

	var urlImage = "http://localhost:8088/pcgearhub/rest/files/images";
	$scope.url = function() {
		return `${urlImage}/${$scope.info.image}`
	}
	$scope.urlSetName = function(name) {
		return `${urlImage}/${name}`
	}

	$scope.load_all();
	/*Thực hiện sắp xếp*/

});


app.controller("invoice-index", function($scope, $http) {
	$scope.pageCount = 1;
	$scope.user = {};
	$scope.items = [];
	$scope.load_all = function() {

		var url = `${host}/invoices`;
		$http.get(url).then(resp => {
			// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.items
			$scope.items = resp.data;
			/*Tổng số trang*/
			$scope.pageCount = Math.ceil($scope.items.length / 5);
			console.log($scope.pageCount)
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	};
	/*edit*/
	$scope.edit = function(id) {
		window.location.href = '/pcgearhub/admin/form-user/' + id;
	}
	//Thực hiện tải toàn bộ users
	$scope.load_all();
	/*Thực hiện sắp xếp*/


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

});
