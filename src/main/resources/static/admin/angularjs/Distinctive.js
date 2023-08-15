// Định nghĩa URL của máy chủ để gửi các yêu cầu HTTP đến
// Định nghĩa controller cho ứng dụng
app.controller("ctrl", function ($scope, $http, $window) {
	$scope.pageCount;
	$scope.categorie = {};
	$scope.items = [];

	$scope.load_all = function () {
		var url = `${host}/distinctive`;
		$http.get(url).then(resp => {
			$scope.items = resp.data;
			$scope.pageCount = Math.ceil($scope.items.length / 5);

			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	};

	/*edit*/
	$scope.edit = function (id) {
		// Chuyển hướng đến trang chỉnh sửa danh mục bằng cách thay đổi địa chỉ URL
		$window.location.href = '/pcgearhub/admin/form-distinctive/' + id;
	}

	$scope.load_all();

	$scope.sortBy = function (prop) {
		$scope.prop = prop;
	}
	$scope.begin = 0;
	$scope.pageCount = Math.ceil($scope.items.length / 5);
	console.log($scope.pageCount);

	// Các hàm phục vụ chuyển trang
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



// Định nghĩa controller và các dependencies ($scope, $location, $http)
app.controller("loadForm", function ($scope, $location, $http) {

	$scope.pageCount;
	$scope.distinctive = {};
	$scope.items = [];
	$scope.errorMessage = "";
	$scope.successMessageModal = "";


	$scope.reset = function () {
		$scope.distinctive = {};
		$scope.showErrorID = false;
		$scope.errorMessageID = "";
		$scope.showErrorName = false;
		$scope.errorMessageName = "";
	};

	/*load all*/
	$scope.load_all = function () {
		var url = `${host}/distinctive`;
		$http.get(url).then(resp => {
			$scope.items = resp.data;
			$scope.pageCount = Math.ceil($scope.items.length / 5);

			console.log("Success", resp);

			// Gọi các hàm sau khi dữ liệu đã được tải thành công
			$scope.reset();
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
		var url = `${host}/distinctive/${id}`;
		$http.get(url).then(resp => {
			// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.distinctive
			$scope.distinctive = resp.data;
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	};


	$scope.validation = function () {
		var itemm = angular.copy($scope.distinctive);
		var indexID = $scope.items.findIndex(itemx => itemx.id === itemm.id);
		var alphanumericRegex = /^[a-zA-Z0-9]*$/;
		console.log(indexID)
		var check = 0;
		if (indexID !== -1) {
			$scope.errorMessageID = "ID đã tồn tại, vui lòng nhập một ID khác.";
			$scope.showErrorID = true;
			check++;
		} else {
			if (!alphanumericRegex.test(itemm.id)) {
				$scope.errorMessageID = "ID không được chứa kí tự đặc biệt.";
				$scope.showErrorID = true;
				check++;
			} else {
				$scope.showErrorID = false;
				$scope.errorMessageID = "";
			}
		}
		if (check != 0) {
			return false
		}
		return true;
	}

	$scope.catcherror = () => {
		var item = angular.copy($scope.distinctive);
		var check = 0;
		if (!item.id) {
			$scope.errorMessageID = "Không được để trống id.";
			$scope.showErrorID = true;
			check++;

		} else {
			$scope.showErrorID = false;
			$scope.errorMessageID = "";
		}
		if (!item.name) {
			$scope.errorMessageName = "Không được để trống Tên.";
			$scope.showErrorName = true;
			check++;

		} else {
			$scope.showErrorName = false;
			$scope.errorMessageName = "";
		}
		if (check != 0) {
			return false;
		}
		return true;
	}

	$scope.message = (animation, title, icon) => {
		toastMixin.fire({
			animation: animation,
			title: title,
			icon: icon
		});
	}

	// Hàm hideError dùng để ẩn thông báo lỗi
	$scope.hideError = function () {
		$scope.showErrorID = false;
		$scope.errorMessageID = "";
		$scope.showErrorName = false;
		$scope.errorMessageName = "";
	};


	$scope.create = function () {
		var item = angular.copy($scope.distinctive);
		var url = `${host}/distinctive`;
		if ($scope.catcherror() == false) {
			return
		}

		if ($scope.validation() == false) {
			return
		}

		$http.post(url, item).then(resp => {
			$scope.items.push(item);
			console.log("Success", resp);
			$scope.message(true, "Thêm thành công", "success")

		}).catch(error => {
			console.log("Error", error);
		});

	};

	// Hàm update dùng để cập nhật thông tin danh mục

	$scope.update = function () {
		if ($scope.catcherror() == false) {
			return
		}
		var item = angular.copy($scope.distinctive);
		var url = `${host}/distinctive/${$scope.distinctive.id}`;
		$http.put(url, item).then(resp => {
			var index = $scope.items.findIndex(item => item.id == $scope.distinctive.id)

			$scope.items[index] = resp.data;
			console.log("Success", resp);
			/*Thông báo thành công*/
			$scope.message(true, "Cập nhật thành công", "success")
		}).catch(error => {
			console.log("Error", error);
		});
	}

	// Hàm delete dùng để xóa danh mục có id tương ứng
	$scope.delete = function (id) {
		var url = `${host}/distinctive/${id}`;
		$http.delete(url).then(resp => {
			var index = $scope.items.findIndex(item => item.id == $scope.distinctive.id)
			//Tại vị trí index xóa 1 phần tử
			$scope.items.splice(index, 1)
			$scope.reset();
			console.log("Success", resp);
			/*Thông báo thành công*/

			/*Thông báo thành công*/
			$scope.message(true, "Xóa thành công", "success")
		}).catch(error => {
			$scope.message(true, "Dặc trưng không thể xóa ", "error")
			console.log("Error", error);
		});
	}

	// Gọi hàm load_all để tải toàn bộ danh sách danh mục khi controller khởi tạo
	$scope.load_all();
});
