/**
* 
*/

app.controller("ctrl", function($scope, $http) {
	$scope.pageCount=1;
	$scope.items = [];
	$scope.load_all = function() {

		var url = `${host}/invoices/cancelled`;
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

});

app.controller("loadForm", function($scope, $location, $http) {

	$scope.pageCount;
	$scope.user = {};
	$scope.user.image;
	$scope.items = [];

	$scope.oneImage;
	$scope.errorMessage = "";
	$scope.successMessageModal = "";


	/*reset*/
	$scope.reset = function() {
		$scope.user = { confirm: true, status: true, admin: false };
	};
	/*load all*/
	$scope.load_all = function() {
		var url = `${host}/users`;
		$http.get(url).then(resp => {
			$scope.items = resp.data;
			$scope.pageCount = Math.ceil($scope.items.length / 5);

			console.log("Success", resp);

			// Gọi các hàm sau khi dữ liệu đã được tải thành công
			$scope.reset();
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
		var itemm = angular.copy($scope.user);
		var indexID = $scope.items.findIndex(itemx => itemx.id === itemm.id);
		var indexEmail = $scope.items.findIndex(item => item.email === itemm.email);
		var indexPhone = $scope.items.findIndex(item => item.phone === itemm.phone);
		console.log(indexID)
		var check = 0;
		if (indexID !== -1) {
			$scope.errorMessageID = "ID đã tồn tại, vui lòng nhập một ID khác.";
			$scope.showErrorID = true;
			check++;
		} else {
			$scope.showErrorID = false;
			$scope.errorMessageID = "";
		}
		if (indexEmail !== -1) {
			$scope.errorMessageEmail = "Email đã tồn tại, vui lòng nhập một Số điện thoại khác.";
			$scope.showErrorEmail = true;
			check++;
		} else {
			$scope.showErrorEmailEmail = false;
			$scope.errorMessage = "";
		}
		if (indexPhone !== -1) {
			$scope.errorMessagePhone = "Số điện thoạiđã tồn tại, vui lòng nhập một Phone khác.";
			$scope.showErrorPhone = true;
			check++;
		} else {
			$scope.showErrorPhone = false;
			$scope.errorMessage = "";
		}
		if (check != 0) {
			return false
		}
		return true;
	}

	$scope.catcherror = () => {
		var item = angular.copy($scope.user);
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
		if (!item.password) {
			$scope.errorMessagePassword = "Không được để trống mật khẩu.";
			$scope.showErrorPassword = true;
			check++;
		} else {
			$scope.showErrorPassword = false;
			$scope.errorMessagePassword = "";
		} if (!item.email) {
			$scope.errorMessageEmail = "Không được để trống email.";
			$scope.showErrorEmail = true;
			check++;

		} else {
			$scope.showErrorEmail = false;
			$scope.errorMessageEmail = "";
		}
		if (!item.phone) {
			$scope.errorMessagePhone = "Không được để trống số điện thoại.";
			$scope.showErrorPhone = true;
			check++;

		} else {
			$scope.showErrorPhone = false;
			$scope.errorMessagePhone = "";
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




	$scope.create = function() {

		var item = angular.copy($scope.user);
		var url = `${host}/users`;
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

	$scope.update = function() {
		if ($scope.catcherror() == false) {
			return
		}
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
			$scope.message(true, "Cập nhật thành công", "success")
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

			/*Thông báo thành công*/
			$scope.message(true, "Xóa thành công", "success")
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
		var one = "one";
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