let host = "http://localhost:8088/pcgearhub/rest";

// Tạo ứng dụng AngularJS và đặt tên là "myApp"
const app = angular.module("myApp", []);

// Định nghĩa controller cho ứng dụng
app.controller("ctrl", function ($scope, $http, $window) {
	// Khởi tạo biến $scope.pageCount, $scope.supplier, và $scope.items
	$scope.pageCount;
	$scope.supplier = {};
	$scope.items = [];

	// Hàm load_all thực hiện tải danh sách danh mục từ máy chủ
	$scope.load_all = function () {
		var url = `${host}/supplier`;

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
		$window.location.href = '/pcgearhub/admin/form-supplier/' + id;
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
 * Controller cho chức năng quản lý danh mục (supplier).
 */

// Định nghĩa controller và các dependencies ($scope, $location, $http)
app.controller("loadForm", function ($scope, $location, $http) {
	// Khởi tạo biến $scope.pageCount, $scope.supplier, $scope.items
	$scope.pageCount;
	$scope.supplier = {};
	$scope.supplier.image; // Khởi tạo trường image của supplier
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

	/*reset*/
	// Hàm reset dùng để reset biến $scope.supplier và gọi lại hàm load_all để tải lại danh sách danh mục
	$scope.reset = () => {
		$scope.supplier = { id: "", name: "", phoneNumber: "", email: "", address: "" };
		// Ẩn thông báo lỗi
		$scope.showError = false;
		$scope.errorMessage = "";
		$scope.errorMessageSdt = "";
		$scope.errorMessageID = "";
	};

	/*load all*/
	// Hàm load_all dùng để tải danh sách danh mục từ máy chủ và gán vào biến $scope.items
	$scope.load_all = function () {
		var url = `${host}/supplier`;
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
	// Hàm edit dùng để tải thông tin danh mục có id tương ứng và gán vào biến $scope.supplier
	$scope.edit = function () {
		var currentURL = $location.absUrl();
		console.log("Current URL:", currentURL);

		var parts = currentURL.split('/'); // Tách đường dẫn thành mảng các phần tử
		const id = parts[parts.length - 1];
		var url = `${host}/supplier/${id}`;
		$http.get(url).then(resp => {
			// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.supplier
			$scope.supplier = resp.data;
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	};

	// Hàm validation dùng để kiểm tra trường ID của supplier có trùng lặp hay không
	$scope.validation = function () {
		// Kiểm tra trường ID không được bỏ trống
		if (!$scope.supplier.id || $scope.supplier.id.trim() === '') {
			$scope.errorMessage = "ID không được bỏ trống.";
			$scope.showErrorID = true;
			return false;
		}

		// Kiểm tra ký tự đặc biệt trong ID
		var specialChars = /[!@#$%^&*()_+{}[\]\\|:;"'<>,.?/]/;
		if (specialChars.test($scope.supplier.id)) {
			$scope.errorMessage = "ID không được chứa ký tự đặc biệt.";
			$scope.showErrorID = true;
			return false;
		}

		// Kiểm tra trùng lặp
		var indexID = $scope.items.findIndex(item => item.id === $scope.supplier.id);
		if (indexID !== -1) {
			$scope.errorMessage = "ID đã tồn tại, vui lòng nhập một ID khác.";
			$scope.showErrorID = true;
			return false;
		} else {
			$scope.showErrorID = false;
			$scope.errorMessageID = "";
		}
		if (specialChars.test($scope.supplier.id)) {
			$scope.errorMessage = "ID không được chứa ký tự đặc biệt.";
			$scope.showErrorID = true;
			return false;
		}
		return true;
	};


	// Hàm hideError dùng để ẩn thông báo lỗi
	$scope.hideError = function () {
		$scope.showErrorID = false;
		$scope.errorMessage = "";
	};

	// Hàm create dùng để thêm danh mục mới vào máy chủ
	$scope.create = function () {
		var item = angular.copy($scope.supplier);
		var url = `${host}/supplier`;

		if ($scope.validation() == false) {
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
		var item = angular.copy($scope.supplier);
		var url = `${host}/supplier/${$scope.supplier.id}`;
		$http.put(url, item).then(resp => {
			/*Cập nhật lại danh mục trong mảng items*/
			/*Tìm xem index so sánh ID cũ và ID trên form*/
			var index = $scope.items.findIndex(item => item.id == $scope.supplier.id);

			/*Tìm được vị trí thì cập nhật lại danh mục*/
			$scope.items[index] = resp.data;
			console.log("Success", resp);
			/*Thông báo thành công*/
			$scope.successMessageModal = "Cập nhật danh mục thành công.";
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

	// Hàm delete dùng để xóa danh mục có id tương ứng
	$scope.delete = function (id) {
		var url = `${host}/supplier/${id}`;
		$http.delete(url).then(resp => {
			var index = $scope.items.findIndex(item => item.id == $scope.supplier.id);
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
