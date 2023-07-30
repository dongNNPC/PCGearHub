// Định nghĩa URL của máy chủ để gửi các yêu cầu HTTP đến
let host = "http://localhost:8088/pcgearhub/rest";

// Tạo ứng dụng AngularJS và đặt tên là "myApp"
const app = angular.module("myApp", []);

// Định nghĩa controller cho ứng dụng
app.controller("ctrl", function ($scope, $http, $window) {
	// Khởi tạo biến $scope.pageCount, $scope.brand, và $scope.items
	$scope.pageCount;
	$scope.brand = {};
	$scope.items = [];

	// Hàm load_all thực hiện tải danh sách danh mục từ máy chủ
	$scope.load_all = function () {
		var url = `${host}/brand`;

		// Gửi yêu cầu GET đến máy chủ để lấy danh sách danh mục
		$http.get(url).then(resp => {
			// Lấy dữ liệu phản hồi và gán vào biến $scope.items
			$scope.items = resp.data;

			/*Tổng số trang*/
			// Tính số trang dựa trên số lượng danh mục và số mục trên mỗi trang (5 mục/trang)
			$scope.pageCount = Math.ceil($scope.items.length / 5);

			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	};

	/*edit*/
	// Hàm edit chuyển hướng người dùng đến trang chỉnh sửa danh mục với id tương ứng
	$scope.edit = function (id) {
		// Chuyển hướng đến trang chỉnh sửa danh mục bằng cách thay đổi địa chỉ URL
		$window.location.href = '/pcgearhub/admin/form-brand/' + id;
	}

	//Thực hiện tải toàn bộ danh mục khi trang được tải
	$scope.load_all();

	/*Thực hiện sắp xếp*/

	// Hàm sortBy sắp xếp danh sách danh mục dựa trên thuộc tính được chỉ định (prop)
	$scope.sortBy = function (prop) {
		$scope.prop = prop;
	}

	// Khởi tạo biến $scope.begin và $scope.pageCount
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

/**
 * Controller cho chức năng quản lý danh mục (brand).
 */

// Định nghĩa controller và các dependencies ($scope, $location, $http)
app.controller("loadForm", function ($scope, $location, $http) {
	// Khởi tạo biến $scope.pageCount, $scope.brand, $scope.items
	$scope.pageCount;
	$scope.brand = {};
	$scope.brand.image; // Khởi tạo trường image của brand
	$scope.items = [];

	$scope.oneImage;
	$scope.errorMessage = "";
	$scope.successMessageModal = "";

	// Hàm showSuccessModal và hideModal dùng để hiển thị và ẩn modal thông báo thành công
	function showSuccessModal() {
		$("#successModal").modal('show');
		setTimeout(hideModal, 2000);
	}

	function hideModal() {
		$("#successModal").modal('hide');
	}

	// Đoạn mã trong controller của bạn
	$scope.brand = { id: "", name: "", phoneNumber: "", email: "", address: "" };

	// Hàm reset để làm mới đối tượng Brand
	$scope.reset = function () {
		$scope.brand = { id: "", name: "", phoneNumber: "", email: "", address: "" };
		// Ẩn thông báo lỗi
		$scope.showError = false;
		$scope.errorMessage = "";
		$scope.errorMessageSdt = "";
		$scope.errorMessageID = "";
	};


	/*load all*/
	// Hàm load_all dùng để tải danh sách danh mục từ máy chủ và gán vào biến $scope.items
	$scope.load_all = function () {
		var url = `${host}/brand`;
		$http.get(url).then(resp => {
			$scope.items = resp.data;
			$scope.pageCount = Math.ceil($scope.items.length / 5);

			console.log("Success", resp);

			// Gọi các hàm sau khi dữ liệu đã được tải thành công
			$scope.list();
			$scope.edit();  // Gọi hàm edit
		}).catch(error => {
			console.log("Error", error);
		});
	};

	/*edit*/
	// Hàm edit dùng để tải thông tin danh mục có id tương ứng và gán vào biến $scope.brand
	$scope.edit = function () {
		var currentURL = $location.absUrl();
		console.log("Current URL:", currentURL);

		var parts = currentURL.split('/'); // Tách đường dẫn thành mảng các phần tử
		const id = parts[parts.length - 1];
		var url = `${host}/brand/${id}`;
		$http.get(url).then(resp => {
			// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.brand
			$scope.brand = resp.data;
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	};
	$scope.validation = function () {
		// Kiểm tra trường ID không được bỏ trống
		if (!$scope.brand.id || $scope.brand.id.trim() === '') {
			$scope.errorMessage = "ID không được bỏ trống.";
			$scope.showError = true;
			return false;
		}
		// Kiểm tra trùng lặp
		var indexID = $scope.items.findIndex(item => item.id === $scope.brand.id);
		if (indexID !== -1) {
			$scope.errorMessage = "ID đã tồn tại, vui lòng nhập một ID khác.";
			$scope.showError = true;
			return false;
		} else {
			$scope.showError = false;
			$scope.errorMessageID = "";
		}

		// Kiểm tra ký tự đặc biệt trong ID
		var specialChars = /[!@#$%^&*()_+{}[\]\\|:;"'<>,.?/]/;
		if (specialChars.test($scope.brand.id)) {
			$scope.errorMessage = "ID không được chứa ký tự đặc biệt.";
			$scope.showError = true;
			return false;
		}
		// Kiểm tra trùng lặp số điện thoại
		var indexPhoneNumber = $scope.items.findIndex(item => item.phoneNumber === $scope.brand.phoneNumber);
		if (indexPhoneNumber !== -1) {
			$scope.errorMessageSdt = "Số điện thoại đã tồn tại, vui lòng nhập một số điện thoại khác.";
			$scope.showError = true;
			return false;
		}
		// Kiểm tra định dạng số điện thoại
		var phoneNumberPattern = /^\d{10,}$/;
		if (!phoneNumberPattern.test($scope.brand.phoneNumber)) {
			$scope.errorMessageSdt = "Số điện thoại phải chứa ít nhất 10 chữ số và đúng định dạng.";
			$scope.showError = true;
			return false;
		}
		// Kiểm tra định dạng email
		var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test($scope.brand.email)) {
			$scope.errorMessageEmail = "Email không đúng định dạng.";
			$scope.showError = true;
			return false;
		}




		// Nếu không có lỗi, cho phép thêm brand vào danh sách
		return true;
	};


	// Hàm hideError dùng để ẩn thông báo lỗi
	$scope.hideError = function () {
		$scope.showError = false;
		$scope.errorMessage = "";
	};

	// Hàm create dùng để thêm danh mục mới vào máy chủ
	$scope.create = function () {
		var item = angular.copy($scope.brand);
		var url = `${host}/brand`;
		if (!$scope.validation()) {
			$("#errorModal").modal('show');
			return;
		}
		// Gửi yêu cầu POST để thêm danh mục mới
		$http.post(url, item).then(resp => {
			$scope.items.push(item);
			$scope.reset();
			console.log("Success", resp);
			// Ẩn thông báo lỗi nếu không có lỗi
			$scope.hideError();

			$scope.successMessageModal = "Thêm danh mục thành công.";
			// Hiển thị Modal thông báo thành công
			$("#successModal").modal('show');

			// Tự động ẩn Modal sau 2 giây
			// Hiển thị Modal thông báo lỗi mượt mà
			showSuccessModal();
		}).catch(error => {
			console.log("Error", error);
		});
	};

	// Hàm update dùng để cập nhật thông tin danh mục
	$scope.update = function () {
		var item = angular.copy($scope.brand);
		var url = `${host}/brand/${$scope.brand.id}`;

		// Kiểm tra trường ID không được bỏ trống
		if (!$scope.brand.id || $scope.brand.id.trim() === '') {
			$scope.errorMessage = "ID không được bỏ trống.";
			$scope.showError = true;
			return;
		}
		// Kiểm tra ký tự đặc biệt trong ID
		var specialChars = /[!@#$%^&*()_+{}[\]\\|:;"'<>,.?/]/;
		if (specialChars.test($scope.brand.id)) {
			$scope.errorMessage = "ID không được chứa ký tự đặc biệt.";
			$scope.showError = true;
			return false;
		}
		// Kiểm tra định dạng số điện thoại
		var phoneNumberPattern = /^\d{10,}$/;
		if (!phoneNumberPattern.test($scope.brand.phoneNumber)) {
			$scope.errorMessageSdt = "Số điện thoại phải chứa ít nhất 10 chữ số và đúng định dạng.";
			$scope.showError = true;
			return false;
		}
		// Kiểm tra định dạng email
		var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test($scope.brand.email)) {
			$scope.errorMessageEmail = "Email không đúng định dạng.";
			$scope.showError = true;
			return false;
		}
		// Tiếp tục xử lý khi không có lỗi trường ID
		$http.put(url, item).then(resp => {
			/*Tìm xem index so sánh ID cũ và ID trên form*/
			var index = $scope.items.findIndex(item => item.id == $scope.brand.id);

			/*Tìm được vị trí thì cập nhật lại danh mục*/
			$scope.items[index] = resp.data;
			console.log("Success", resp);
			/*Thông báo thành công*/
			$scope.successMessageModal = "Cập nhật danh mục thành công.";
			// Hiển thị Modal thông báo thành công
			$("#successModal").modal('show');

			// Tự động ẩn Modal sau 2 giây
			$timeout(function () {
				$("#successModal").modal('hide');
			}, 2000);

			// Ẩn thông báo lỗi nếu không có lỗi
			$scope.hideError();
		}).catch(error => {
			console.log("Error", error);
		});
	};


	// Hàm delete dùng để xóa danh mục có id tương ứng
	$scope.delete = function (id) {
		var url = `${host}/brand/${id}`;
		$http.delete(url).then(resp => {
			var index = $scope.items.findIndex(item => item.id == $scope.brand.id);
			// Tại vị trí index xóa 1 phần tử trong mảng items
			$scope.items.splice(index, 1);
			$scope.reset();
			console.log("Success", resp);
			/*Thông báo thành công*/

			$scope.successMessageModal = "Xóa danh mục thành công.";
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
	};

	// Đường dẫn tới ảnh
	var url = "http:localhost:8088/pcgearhub/rest/files/images";

	// Hàm url dùng để xây dựng đường dẫn tới ảnh dựa trên tên file
	$scope.url = function (filename) {
		return `${url}/${filename}`;
	};

	// Hàm list dùng để tải danh sách các tệp hình ảnh của danh mục và gán vào biến $scope.filenames
	$scope.list = function () {
		var currentURL = $location.absUrl();
		console.log("Current URL:", currentURL);

		var parts = currentURL.split('/');  // Tách đường dẫn thành mảng các phần tử
		const id = parts[parts.length - 1];

		var item = $scope.items.find(item => item.id === id);

		var name = item ? item.image : null;
		var one = "one";
		var urlOneImage = `${url}/${one}/${name}`;
		$http.get(urlOneImage).then(resp => {
			$scope.filenames = resp.data;
		}).catch(error => {
			console.log("Error", error);
		});
	};

	// Gọi hàm load_all để tải toàn bộ danh sách danh mục khi controller khởi tạo
	$scope.load_all();
});
