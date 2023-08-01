/**
 * 
 */
let host = "http://localhost:8088/pcgearhub/rest";

const app = angular.module("myApp", []);
app.controller("loadAll", function ($scope, $http, $window,) {
	$scope.pageCount;
	$scope.user = {};
	$scope.items = [];
	$scope.load_all = function () {
		console.log

		var url = `${host}/comments`;
		$http.get(url).then(resp => {
			// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.items
			$scope.items = resp.data;
			/*Tổng số trang*/
			$scope.pageCount = Math.ceil($scope.items.length / 5);

			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	};
	/*edit*/
	$scope.edit = function (id) {
		window.location.href = '/pcgearhub/admin/form-user/' + id;
	}
	//Thực hiện tải toàn bộ users
	$scope.load_all();
	/*Thực hiện sắp xếp*/


	$scope.sortBy = function (prop) {
		$scope.prop = prop
	}


	$scope.begin = 0;
	$scope.pageCount = Math.ceil($scope.items.length / 5);
	console.log($scope.pageCount)

	$scope.first = function () {
		$scope.begin = 0;
	}
	$scope.prev = function () {
		console.log($scope.begin)
		if ($scope.begin > 0) {
			$scope.begin -= 5;
		}
	}
	$scope.next = function () {
		console.log($scope.begin)

		console.log(($scope.pageCount - 1) * 5)

		if ($scope.begin < ($scope.pageCount - 1) * 5) {
			$scope.begin += 2;
		}
	}
	$scope.last = function () {
		$scope.begin = ($scope.pageCount - 1) * 5;
	}

});

app.controller("editForm", function ($scope, $location, $http, $timeout) {
	$scope.showSuccessMessage = false;
	$scope.successMessage = "";

	function showSuccessModal() {
		$scope.showSuccessMessage = true;
		$timeout(hideSuccessMessage, 2000); // Tự động ẩn thông báo sau 2 giây
	}

	function hideSuccessMessage() {
		$scope.showSuccessMessage = false;
	}
	// ẩn
	$scope.showRoleSection = false;
	$scope.showActivitySection = false;
	$scope.showConfirmationSection = false;
	$scope.matkhau = false;
	$scope.id = false;

	// Khi bạn muốn ẩn phần tử Chức vụ, chỉ cần thay đổi giá trị của biến showRoleSection
	// Ví dụ:
	$scope.hideRoleSection = function () {
		$scope.showRoleSection = false;
	};

	/*load all*/
	$scope.load_all = function () {
		var url = `${host}/users`;
		$http.get(url).then(resp => {
			$scope.items = resp.data;
			$scope.pageCount = Math.ceil($scope.items.length / 5);

			console.log("Success", resp);

			// Gọi các hàm sau khi dữ liệu đã được tải thành công
			$scope.list();
			$scope.edit(); // Gọi hàm edit
		}).catch(error => {
			console.log("Error", error);
		});
	};

	/*edit*/
	$scope.edit = function () {
		var currentURL = $location.absUrl();
		console.log("Current URL:", currentURL);

		var parts = currentURL.split('/'); // Tách đường dẫn thành mảng các phần tử
		const id = parts[parts.length - 1];
		var url = `${host}/users/${id}`;
		$http.get(url).then(resp => {
			// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.form
			$scope.user = resp.data;
			console.log("Success", resp);
			console.log("Success", $scope.user.admin);
			console.log("Success", $scope.user.status);

		}).catch(error => {
			console.log("Error", error);
		});
	}


	$scope.update = function () {
		if (!$scope.validation()) {
			// Validation failed, do not proceed with update
			return;
		}

		var item = angular.copy($scope.user);
		var url = `${host}/users/${$scope.user.id}`;
		$http.put(url, item).then(resp => {
			// Cập nhật lại sinh viên trong mảng và các thao tác khác
			// ...

			// Set the success message and show it
			$scope.successMessage = "Cập nhật người dùng thành công.";
			$scope.showSuccessMessage = true;

			// Hiển thị Modal thông báo thành công
			$("#successModal").modal('show');

			// Tự động ẩn Modal sau 2 giây
			$timeout(function () {
				$("#successModal").modal('hide');
				$scope.showSuccessMessage = false;
			}, 2000);

			// Ẩn thông báo lỗi nếu không có lỗi
			$scope.hideError();

			// Hide the radio buttons after a successful update
			$scope.showRadioButtons = false;
		}).catch(error => {
			console.log("Error", error);
		});
	};



	/*	var url = "http://localhost:8080/slide5/rest/files/image";*/

	var url = "http://localhost:8088/pcgearhub/rest/files/images";

	$scope.url = function (filename) {
		return `${url}/${filename}`
	}

	$scope.list = function () {
		var currentURL = $location.absUrl();
		console.log("Current URL:", currentURL);

		var parts = currentURL.split('/'); // Tách đường dẫn thành mảng các phần tử
		const id = parts[parts.length - 1]

		var item = $scope.items.find(item => item.id === id);

		var name = item ? item.image : null;
		var one = "one";
		var urlOneImage = `${url}/${one}/${name}`;
		$http.get(urlOneImage).then(resp => {
			$scope.filenames = resp.data;
		}).catch(error => {
			console.log("Error", error)
		})
	}
	$scope.load_all();

});