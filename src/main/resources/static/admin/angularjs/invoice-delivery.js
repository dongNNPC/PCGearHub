/**
* 
*/
let host = "http://localhost:8088/pcgearhub/rest";

const app = angular.module("myApp", []);
app.controller("ctrl", function($scope, $http) {
	$scope.pageCount=1;
	$scope.items = [];
	$scope.load_all = function() {

		var url = `${host}/invoices/delivery`;
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
		window.location.href = '/pcgearhub/admin/table-invoice-detailed/' + id;
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
		$scope.message = (animation, title, icon) => {
		toastMixin.fire({
			animation: animation,
			title: title,
			icon: icon
		});
	}

	$scope.update = (id) => {
		var urlID = `${host}/invoice/${id}`;
		$http.get(urlID).then(resp => {
			$scope.invoice = resp.data;
			console.log("Success", resp);
			console.log($scope.invoice)
			var url = `${host}/invoice/${id}`;
			var invoice = angular.copy($scope.invoice);
			invoice.status = "complete"
			$http.put(url, invoice).then(resp => {
				var index = $scope.items.findIndex(item => item.id == invoice.id)
				if (index !== -1) {
					$scope.items.splice(index, 1); // Xóa phần tử tại index
				}
				console.log("Success", resp);
				/*Thông báo thành công*/
				$scope.message(true, "Chuyển trạng thái sang đã hoàn thành đơn hàng thành công", "success")
			}).catch(error => {
				console.log("Error", error);
			});
		}).catch(error => {
			console.log("Error", error);
		});
	}

});