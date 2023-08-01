/**
 * 
 */
let host = "http://localhost:8088/pcgearhub/rest";

const app = angular.module("shopping-cart-app", []);
app.controller("shopping-cart-ctrl", function ($scope, $location, $http, $timeout) {
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

	// Tươ

	/*reset*/
	$scope.reset = function () {
		$scope.user = { confirm: true, status: true, admin: false };
		$scope.load_all();
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

	$scope.validation = function () {
		var item = angular.copy($scope.user);
		$scope.errorMessageEmail = "";
		return true;
	}


	$scope.update = function () {
		if (!$scope.validation()) {
			// Validation failed, do not proceed with update
			return;
		}

		var item = angular.copy($scope.user);
		var url = `${host}/users/${$scope.user.id}`;
		$http.put(url, item).then(resp => {
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

	$scope.upload = function (files) {
		$scope.user.image = files[0].name;
		var form = new FormData();
		for (var i = 0; i < files.length; i++) {
			form.append("files", files[i])
		}
		$http.post(url, form, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		}).then(resp => {
			$scope.filenames = [];
			$scope.filenames.push(...resp.data)
		}).catch(error => {
			console.log("Errors", error)
		})
	}
	$scope.load_all();

});