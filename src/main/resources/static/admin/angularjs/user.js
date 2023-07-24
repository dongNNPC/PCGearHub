/**
 * 
 */
let host = "http://localhost:8088/pcgearhub/rest";

const app = angular.module("myApp", []);
app.controller("ctrl", function($scope, $http, $window,) {
	$scope.pageCount;
	$scope.user = {};
	$scope.items = [];
	$scope.load_all = function() {

		var url = `${host}/users`;
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
	$scope.edit = function(id) {
		window.location.href = '/pcgearhub/admin/form-user/' + id;
	}
	//Thực hiện tải toàn bộ users
	$scope.load_all();
	/*Thực hiện sắp xếp*/


	$scope.sortBy = function(prop) {
		$scope.prop = prop
	}


	$scope.begin = 0;
	$scope.pageCount = Math.ceil($scope.items.length / 5);
	console.log($scope.pageCount)

	$scope.first = function() {
		$scope.begin = 0;
	}
	$scope.prev = function() {
		console.log($scope.begin)
		if ($scope.begin > 0) {
			$scope.begin -= 5;
		}
	}
	$scope.next = function() {
		console.log($scope.begin)

		console.log(($scope.pageCount - 1) * 5)

		if ($scope.begin < ($scope.pageCount - 1) * 5) {
			$scope.begin += 2;
		}
	}
	$scope.last = function() {
		$scope.begin = ($scope.pageCount - 1) * 5;
	}

});

app.controller("loadForm", function($scope, $location, $http) {

	$scope.pageCount;
	$scope.user = {};
	 $scope.user.image;
	$scope.items = [];

	$scope.oneImage;
	$scope.errorMessage = "";
	$scope.successMessageModal = "";

	function showSuccessModal() {
		$("#successModal").modal('show');
		setTimeout(hideModal, 2000);
	}

	function hideModal() {
		$("#successModal").modal('hide');
	}

	/*reset*/
	$scope.reset = function() {
		$scope.user = { confirm: true, status: true, admin: false };
		$scope.load_all();
	};
	/*load all*/
	$scope.load_all = function() {
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
	$scope.edit = function() {
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

	$scope.validation = function() {
		var item = angular.copy($scope.user);
		// Kiểm tra trùng lặp 
		var indexID = $scope.items.findIndex(item => item.id === $scope.user.id);
		var indexEmail = $scope.items.findIndex(item => item.email === $scope.user.email);
		if (indexID !== -1) {
			$scope.errorMessage = "ID đã tồn tại, vui lòng nhập một ID khác.";
			$scope.showErrorID = true;
			return false;
		} else {
			$scope.showErrorID = false;
			$scope.errorMessageID = "";
		}
		if (indexEmail !== -1) {
			$scope.errorMessage = "Email đã tồn tại, vui lòng nhập một Email khác.";
			$scope.showErrorEmail = true;
			return false;
		} else {
			$scope.showErrorEmail = false;
			$scope.errorMessageEmail = "";
		}
		return true;

	}

	$scope.hideError = function() {
		$scope.showErrorID = false;
		$scope.showErrorEmail = false;
		$scope.errorMessage = "";
	}

	$scope.create = function() {
		var item = angular.copy($scope.user);
		var url = `${host}/users`;


		if ($scope.validation() == false) {
			return
		}

		$http.post(url, item).then(resp => {
			$scope.items.push(item);
			$scope.reset()
			console.log("Success", resp);
			// Ẩn thông báo lỗi nếu không có lỗi
			$scope.hideError();



			$scope.successMessageModal = "Thêm người dùng thành công.";
			// Hiển thị Modal thông báo thành công
			$("#successModal").modal('show');

			// Tự động ẩn Modal sau 2 giây
			// Hiển thị Modal thông báo lỗi mượt mà
			showSuccessModal();
		}).catch(error => {
			console.log("Error", error);
		});
	};

	$scope.update = function() {
		var item = angular.copy($scope.user);
		var url = `${host}/users/${$scope.user.id}`;
		$http.put(url, item).then(resp => {
			/*Cập nhật lại sinh viên trong mảng*/
			/*Tìm xem index so sánh email cũ và emial trên form*/
			var index = $scope.items.findIndex(item => item.id == $scope.user.id)

			/*Tìm được vị trí thì cập nhật lại sinh viên*/
			$scope.items[index] = resp.data;
			console.log("Success", resp);
			/*Thông báo thành công*/
			$scope.successMessageModal = "Cập nhật người dùng thành công.";
			// Hiển thị Modal thông báo thành công
			$("#successModal").modal('show');

			// Tự động ẩn Modal sau 2 giây
			// Hiển thị Modal thông báo lỗi mượt mà
			showSuccessModal();

			// Ẩn thông báo lỗi nếu không có lỗi
			$scope.hideError();
		}).catch(error => {
			console.log("Error", error);
		});
	}

	$scope.delete = function(id) {
		var url = `${host}/users/${id}`;
		$http.delete(url).then(resp => {

			var index = $scope.items.findIndex(item => item.id == $scope.user.id)
			//Tại vị trí index xóa 1 phần tử
			$scope.items.splice(index, 1)
			$scope.reset();
			console.log("Success", resp);
			/*Thông báo thành công*/

			$scope.successMessageModal = "Xóa người dùng thành công.";
			// Hiển thị Modal thông báo thành công
			$("#successModal").modal('show');

			// Tự động ẩn Modal sau 2 giây
			// Hiển thị Modal thông báo lỗi mượt mà
			showSuccessModal();
			// Ẩn thông báo lỗi nếu không có lỗi
			$scope.hideError();
		}).catch(error => {
			console.log("Error", error);
		});
	}

	/*	var url = "http://localhost:8080/slide5/rest/files/image";*/

	var url = "http://localhost:8088/pcgearhub/rest/files/images";

	$scope.url = function(filename) {
		return `${url}/${filename}`
	}

	$scope.list = function() {
		var currentURL = $location.absUrl();
		console.log("Current URL:", currentURL);

		var parts = currentURL.split('/'); // Tách đường dẫn thành mảng các phần tử
		const id = parts[parts.length - 1]

		var item = $scope.items.find(item => item.id === id);

		var name = item ? item.image : null;
		var one ="one";
		var urlOneImage = `${url}/${one}/${name}`;
		$http.get(urlOneImage).then(resp => {
			$scope.filenames = resp.data;
		}).catch(error => {
			console.log("Error", error)
		})
	}

	$scope.upload = function(files) {
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