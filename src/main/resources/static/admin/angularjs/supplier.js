
app.controller("ctrl", function ($scope, $http, $window,) {
	$scope.pageCount;
	$scope.supplier = {};
	$scope.items = [];
	$scope.load_all = function () {

		var url = `${host}/supplier`;
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
		window.location.href = '/pcgearhub/admin/form-supplier/' + id;
	}
	$scope.load_all();


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

app.controller("loadForm", function ($scope, $location, $http) {

	$scope.pageCount;
	$scope.supplier = {};
	$scope.items = [];
	$scope.errorMessage = "";
	$scope.successMessageModal = "";


	/*reset*/
	$scope.reset = function () {
		$scope.supplier = {};
		$scope.showErrorID = false;
		$scope.errorMessageID = "";
		$scope.showErrorName = false;
		$scope.errorMessageName = "";
		$scope.showErrorPhone = false;
		$scope.errorMessagePhone = "";
		$scope.showErrorEmail = false;
		$scope.errorMessageEmail = "";
		$scope.showErrorAddress = false;
		$scope.errorMessageAddress = "";
	};
	/*load all*/
	$scope.load_all = function () {
		var url = `${host}/supplier`;
		$http.get(url).then(resp => {
			$scope.items = resp.data;
			$scope.pageCount = Math.ceil($scope.items.length / 5);
			console.log("Success", resp);
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
		var url = `${host}/supplier/${id}`;
		$http.get(url).then(resp => {
			$scope.supplier = resp.data;
			console.log("Success", resp);
			console.log("Success", $scope.supplier.admin);
			console.log("Success", $scope.supplier.status);

		}).catch(error => {
			console.log("Error", error);
		});
	}

	$scope.validation = function () {
		var itemm = angular.copy($scope.supplier);
		var indexID = $scope.items.findIndex(itemx => itemx.id === itemm.id);
		var alphanumericRegex = /^[a-zA-Z0-9]*$/;
		var indexEmail = $scope.items.findIndex(item => item.email === itemm.email);
		var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		var indexPhoneNumber = $scope.items.findIndex(item => item.phoneNumber === itemm.phoneNumber);
		var phoneNumberRegex = /^\d{10}$/;
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
		if (indexEmail !== -1) {
			$scope.errorMessageEmail = "Email đã tồn tại, vui lòng nhập một email khác.";
			$scope.showErrorEmail = true;
			check++;
		} else {
			if (!emailRegex.test(itemm.email)) {
				$scope.errorMessageEmail = "Email phải đúng định dạng.";
				$scope.showErrorEmail = true;
				check++;
			} else {
				$scope.showErrorEmail = false;
				$scope.errorMessageEmail = "";
			}
		}
		if (indexPhoneNumber !== -1) {
			$scope.errorMessagePhone = "Số điện thoại đã tồn tại, vui lòng nhập một số điện thoại khác.";
			$scope.showErrorPhone = true;
			check++;
		} else {
			if (!phoneNumberRegex.test(itemm.phoneNumber)) {
				$scope.errorMessagePhone = "Số điện thoại phải có 10 chữ số và đúng định dạng";
				$scope.showErrorPhone = true;
				check++;
			} else {
				$scope.showErrorPhone = false;
				$scope.errorMessagePhone = "";
			}
		}

		if (check != 0) {
			return false
		}

		return true;
	}

	$scope.catcherror = () => {
		var item = angular.copy($scope.supplier);
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
			$scope.errorMessageName = "Không được để trống tên.";
			$scope.showErrorName = true;
			check++;

		} else {
			$scope.showErrorName = false;
			$scope.errorMessageName = "";
		}
		if (!item.phoneNumber) {
			$scope.errorMessagePhone = "Không được để trống số điện thoại.";
			$scope.showErrorPhone = true;
			check++;
		} else {
			$scope.showErrorPhone = false;
			$scope.errorMessagePhone = "";
		} if (!item.email) {
			$scope.errorMessageEmail = "Không được để trống email.";
			$scope.showErrorEmail = true;
			check++;

		} else {
			$scope.showErrorEmail = false;
			$scope.errorMessageEmail = "";
		}

		if (!item.address) {
			$scope.errorMessageAddress = "Không được để trống địa chỉ.";
			$scope.showErrorAddress = true;
			check++;
		} else {
			$scope.showErrorAddress = false;
			$scope.errorMessageAddress = "";
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
		$scope.errorMessage = "";
	};




	$scope.create = function () {
		var item = angular.copy($scope.supplier);
		var url = `${host}/supplier`;
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

	// ...
	$scope.update = function () {
		if ($scope.catcherror() == false) {
			return;
		}
		var item = angular.copy($scope.supplier);
		var url = `${host}/supplier/${$scope.supplier.id}`;
		$http.put(url, item).then(resp => {
			var index = $scope.items.findIndex(item => item.id == $scope.supplier.id)
			$scope.items[index] = resp.data;
			console.log("Success", resp);
			/*Thông báo thành công*/
			$scope.message(true, "Cập nhật thành công", "success");
		}).catch(error => {
			console.log("Error", error);
		});
	};
	// ...

	$scope.delete = function (id) {
		var url = `${host}/supplier/${id}`;
		$http.delete(url).then(resp => {

			var index = $scope.items.findIndex(item => item.id == $scope.supplier.id)
			//Tại vị trí index xóa 1 phần tử
			$scope.items.splice(index, 1)
			$scope.reset();
			console.log("Success", resp);
			/*Thông báo thành công*/

			$scope.message(true, "Xóa thành công", "success")
		}).catch(error => {
			console.log("Error", error);
		});
	}

	$scope.load_all();

});
