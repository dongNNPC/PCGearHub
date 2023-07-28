/**
 * 
 */
let host = "http://localhost:8088/pcgearhub/rest";

const app = angular.module("myApp", []);
app.controller("ctrl", function($scope, $http, $window,) {
	$scope.pageCount;
	$scope.items = [];
	$scope.load_all = function() {
		var url = `${host}/products`;
		$http.get(url).then(resp => {
			// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.items
			$scope.items = resp.data;
			/*Tổng số trang*/
			$scope.pageCount = Math.ceil($scope.items.length / 5);
			console.log($scope.items);
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	};
	/*edit*/
	$scope.edit = function(id) {
		window.location.href = '/pcgearhub/admin/form-product/' + id;
	}
	//Thực hiện tải toàn bộ products
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
	$scope.product = {};
	$scope.product.image;
	$scope.items = [];
	$scope.categories = [];
	$scope.category = {};
	$scope.productsDistinctives = [];
	$scope.productsDistinctives2 = [];
	$scope.distinctives = [];
	$scope.stockReceipts = [];
	// stock 2 để lọc nhiều thành 1
	$scope.stockReceipts2 = []
	$scope.brands = [];
	$scope.fileNames = [];
	$scope.errorMessage = "";
	$scope.successMessageModal = "";
	$scope.errorMessageModal = "Chỉ được chọn 2 hình";
	// Khởi tạo biến $scope.selectedDistinctives là một mảng để lưu trữ các option đã chọn
	$scope.selectedDistinctives = [];

	function showSuccessModal() {
		$("#successModal").modal('show');
		setTimeout(hideModal, 2000);
	}
	function showErrorModal() {
		$("#errorModal").modal('show');
		setTimeout(hideModal2, 2000);
	}

	function hideModal() {
		$("#successModal").modal('hide');
	}
	function hideModal2() {
		$("#errorModal").modal('hide');
	}


	/*reset*/
	$scope.reset = function() {
		// $scope.product = { confirm: true, status: true, admin: false };
	};
	/*load all*/
	$scope.load_all = function() {
		var url = `${host}/products`;
		$http.get(url).then(resp => {
			$scope.items = resp.data;
			console.log("Success", resp);
			// Gọi các hàm sau khi dữ liệu đã được tải thành công
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
		var url = `${host}/product/${id}`;
		$http.get(url).then(resp => {
			// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.form
			$scope.product = resp.data;
			// lấy tên 2 hình ảnh của product nhaaaaa
			$scope.fileNames.push($scope.product.image1)
			$scope.fileNames.push($scope.product.image2)
			console.log($scope.fileNames);
			// goi lại các phương thức để đổ dữ liệu vào các select
			$scope.listCategory();
			$scope.listStockReceipt()
			$scope.listProductDistinctive();
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	}
	// Phần danh mụuc
	var categoryUrl = "http://localhost:8088/pcgearhub/rest/categories";

	$scope.listCategory = function() {

		$http.get(categoryUrl).then(resp => {
			$scope.categories = resp.data;

			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	}


	// Phần Đặt trưng

	$scope.listProductDistinctive = function() {
		var distinctiveUrl = "http://localhost:8088/pcgearhub/rest/productDistinctives";
		$http.get(distinctiveUrl).then(resp => {
			$scope.productsDistinctives = resp.data;

			angular.forEach($scope.productsDistinctives, function(productDistinctive) {
				// lọc những cái tên đã có rồi
				var isIdExist = $scope.distinctives.some(function(item) {
					return item.id === productDistinctive.distinctive.id;
				});

				// Nếu id không tồn tại, thêm receipt vào mảng brand
				if (!isIdExist) {
					$scope.productsDistinctives2.push(productDistinctive)
					// Thêm tên các $scope.distinctives để lọc 
					$scope.distinctives.push(productDistinctive.distinctive);
					console.log($scope.productsDistinctives2)
				}
			}

			);

			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});

	}
	// Phần phiếu nhập kho

	$scope.listStockReceipt = function() {
		var distinctiveUrl = "http://localhost:8088/pcgearhub/rest/stockReceipts";
		$http.get(distinctiveUrl).then(resp => {
			$scope.stockReceipts = resp.data;
			angular.forEach($scope.stockReceipts, function(receipt) {
				// lọc những cái tên đã có rồi
				var isIdExist = $scope.brands.some(function(item) {
					return item.id === receipt.brand.id;
				});

				// Nếu id không tồn tại, thêm receipt vào mảng brand và thêm receipt(nhiều) thành stockReceipts2(một)
				if (!isIdExist) {
					$scope.stockReceipts2.push(receipt)
					$scope.brands.push(receipt.brand);
				}
			});
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	}

	$scope.validation = function() {
		// Kiểm tra trùng lặp 
		var indexID = $scope.items.findIndex(item => item.id === $scope.product.id);
		if (indexID !== -1) {
			$scope.errorMessage = "ID đã tồn tại, vui lòng nhập một ID khác.";
			$scope.showErrorID = true;
			return false;
		} else {
			$scope.showErrorID = false;
			$scope.errorMessageID = "";
		}
		return true;
	}

	$scope.hideError = function() {
		$scope.showErrorID = false;
		$scope.showErrorEmail = false;
		$scope.errorMessage = "";
	}
	// Phần sản phẩm

	$scope.create = function() {
		// Thêm product và danh mục
		var item = angular.copy($scope.product);
		var url = `${host}/product`;
		if ($scope.validation() == false) {
			return
		}
		$http.post(url, item).then(resp => {
			$scope.items.push(item);
			$scope.reset()
			console.log("Success", resp);
			// Ẩn thông báo lỗi nếu không có lỗi
			$scope.hideError();
			$scope.successMessageModal = "Thêm sản phẩm dùng thành công.";
			// Hiển thị Modal thông báo thành công
			$("#successModal").modal('show');
			// Tự động ẩn Modal sau 2 giây
			// Hiển thị Modal thông báo lỗi mượt mà
			showSuccessModal();
			
		// Thêm đặt trưng
		var distinctiveUrl = "http://localhost:8088/pcgearhub/rest/productDistinctive";
		$scope.productsDistinctives2.forEach(function(pds) {
			console.log(item.id)
			console.log(item.name)
			var newData = {
				product: {
					id: item.id,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
					description: item.description,
					image1: item.image1,
					image2: item.image2,
					status: true,
					category: {
						id: item.category.id,
						name: item.category.name,
						description: item.category.description
					}
				},
				distinctive: pds.distinctive

			};
			

			$http.post(distinctiveUrl, newData).then(resp => {
				console.log("Success", resp);
			}).catch(error => {
				console.log("Error", error);
			});
		});
		
		// Thêm phiếu nhập kho
			var distinctiveUrl = "http://localhost:8088/pcgearhub/rest/stockReceipt/";
		$scope.productsDistinctives2.forEach(function(pds) {
			var newData = {
				product: {
					id: item.id,
					name: item.name,
					price: item.price,
					quantity: item.quantity,
					description: item.description,
					image1: item.image1,
					image2: item.image2,
					status: true,
					category: {
						id: item.category.id,
						name: item.category.name,
						description: item.category.description
					}
				},
				
				distinctive: pds.distinctive

			};
			

			$http.post(distinctiveUrl, newData).then(resp => {
				console.log("Success", resp);
			}).catch(error => {
				console.log("Error", error);
			});
		});
			
			
			
			
			
			
			
		}).catch(error => {
			console.log("Error", error);
		});

	




	};
	
  // Hàm xử lý khi có sự thay đổi trong select element
    $scope.handleSelectedOption = function () {
        // Lấy option đã chọn thông qua ng-selected
        var selectedOption = $scope.stockReceipts2.find(function (stockReceipt) {
            return stockReceipt.brand.id === $scope.selectedBrandId;
        });

        // Xử lý dữ liệu đã chọn ở đây (ví dụ: gửi request lên server, thực hiện tính toán, v.v.)
        if (selectedOption) {
            console.log("Thông tin của stockReceipt đã chọn:");
            console.log("Tên:", selectedOption.brand.name);
            console.log("ID:", selectedOption.brand.id);
        }
    };

	$scope.update = function() {
		var item = angular.copy($scope.product);
		var url = `${host}/product/${$scope.product.id}`;
		$http.put(url, item).then(resp => {
			/*Cập nhật lại sinh viên trong mảng*/
			/*Tìm xem index so sánh email cũ và emial trên form*/
			var index = $scope.items.findIndex(item => item.id == $scope.product.id)

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
		var url = `${host}/products/${id}`;
		$http.delete(url).then(resp => {

			var index = $scope.items.findIndex(item => item.id == $scope.product.id)
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
	$scope.upload = function(files) {

		// Kiểm tra số lượng tệp đã chọn và chặn nếu vượt quá giới hạn
		var maxFiles = 2;
		if (files.length > maxFiles) {
			$scope.errorMessageModal = "Xóa người dùng thành công.";
			// Hiển thị Modal thông báo thành công
			$("#errorModal").modal('show');
			// Tự động ẩn Modal sau 2 giây
			showErrorModal();
			return; // Dừng việc upload nếu vượt quá giới hạn
		}
		//   $scope.product.image = files[0].name;
		var form = new FormData();
		for (var i = 0; i < files.length; i++) {
			form.append("files", files[i])
		}
		$http.post(url, form, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		}).then(resp => {
			$scope.fileNames = [];
			$scope.fileNames.push(...resp.data)
		}).catch(error => {
			console.log("Errors", error)
		})


	}
	$scope.load_all();

});