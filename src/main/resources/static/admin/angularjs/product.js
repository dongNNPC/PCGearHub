
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

	// Phần Đặt trưng


	//Thực hiện tải toàn bộ products
	$scope.load_all();

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
	/*reset*/
	$scope.checkUrlForm=()=>{
		var currentURL = $location.absUrl();
		console.log("Current URL:", currentURL);
		var parts = currentURL.split('/'); // Tách đường dẫn thành mảng các phần tử
		const id = parts[parts.length - 1];
		if(id=="PNull"){
				var url = `${host}/product/P006`;
		$http.get(url).then(resp => {
			
			$scope.product = resp.data;
			$scope.product.name=""
			$scope.product.id=""
			$scope.product.price=""
			$scope.product.quantity=""
			$scope.product.description=""
			$scope.listCategory();
			$scope.listStockReceipt()
			$scope.listProductDistinctive();
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
		}
	}
	$scope.checkUrlForm()
	
	$scope.reset = function() {
		var url = `${host}/product/P006`;
		$http.get(url).then(resp => {
			
			$scope.product = resp.data;
			$scope.product.name=""
			$scope.product.id=""
			$scope.product.price=""
			$scope.product.quantity=""
			$scope.product.description=""
			$scope.listCategory();
			$scope.listStockReceipt()
			$scope.listProductDistinctive();
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
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

	$scope.itemDistinctiveDelete = [];

	$scope.listProductDistinctive = function() {
		var distinctiveUrl = "http://localhost:8088/pcgearhub/rest/productDistinctives";
		$http.get(distinctiveUrl).then(resp => {
			$scope.productsDistinctives = resp.data;
			angular.forEach($scope.productsDistinctives, function(productDistinctive) {
				var isIdExist = $scope.distinctives.some(function(item) {
					return item.id === productDistinctive.distinctive.id;
				});
				if (!isIdExist) {
					if ($scope.product.id == productDistinctive.product.id) {
						$scope.productsDistinctives2.push(productDistinctive)
						$scope.itemDistinctiveDelete.push(productDistinctive)
						$scope.distinctives.push(productDistinctive.distinctive);
					}

				}
			}
			);
			angular.forEach($scope.productsDistinctives, function(productDistinctive) {
				var isIdExist = $scope.distinctives.some(function(item) {
					return item.id === productDistinctive.distinctive.id;
				});
				if (!isIdExist) {
					$scope.productsDistinctives2.push(productDistinctive)
					$scope.distinctives.push(productDistinctive.distinctive);
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
					if ($scope.product.id == receipt.product.id) {
						$scope.stockReceipts2.push(receipt)
						$scope.brands.push(receipt.brand);
					}

				}
			});

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
		var check = 0;
		if (indexID !== -1) {
			$scope.errorMessageID = "ID đã tồn tại, vui lòng nhập một ID khác.";
			$scope.showErrorID = true;
			check++;
		} else {
			$scope.showErrorID = false;
			$scope.errorMessageID = "";
		}

		if (check != 0) {
			return false
		}


		return true;
	}
	$scope.catcherror = () => {
		var item = angular.copy($scope.product);
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
			$scope.errorMessageName = "Không được để trống tên sản phẩm.";
			$scope.showErrorName = true;
			check++;

		} else {
			$scope.showErrorName = false;
			$scope.errorMessageName = "";
		}
		if (!item.price) {
			$scope.errorMessagePrice = "Không được để trống giá.";
			$scope.showErrorPrice = true;
			check++;

		} else {
			$scope.showErrorPrice = false;
			$scope.errorMessagePrice = "";
		}
		if (!item.quantity) {
			$scope.errorMessageQuantity = "Không được để trống số lượng.";
			$scope.showErrorQuantity = true;
			check++;

		} else {
			$scope.showErrorQuantity = false;
			$scope.errorMessageQuantity = "";
		}
		if (check != 0) {
			return false
		}

	}



	/*selected đăt trưng*/
	// Hàm để lấy các tùy chọn đã chọn và đưa vào mảng bên JavaScript
	$scope.selectedOptions = [];
	function getSelectedOptions() {
		var selectElement = document.getElementById('distinctive');
		var selectedOptions = [];
		for (var i = 0; i < selectElement.options.length; i++) {
			var option = selectElement.options[i];
			if (option.selected) {
				selectedOptions.push({
					id: option.value,
					name: option.text
				});
			}
		}
		return selectedOptions;
	}

	$scope.showSelectedOptions = function() {
		$scope.selectedOptions = getSelectedOptions();
		console.log($scope.selectedOptions);
		$scope.selectedOptions.forEach(function(pds) {
			console.log(pds);
		});
	};
	/*selected nhà cung cấp  */
	// Hàm để lấy các tùy chọn đã chọn và đưa vào mảng bên JavaScript
	$scope.supplierOptions = {};
	function getSupplierOptions() {
		var selectElement = document.getElementById('supplier');

		var supplierOptions = {}; // Đã sửa thành một biến cục bộ (local variable) là một đối tượng rỗng
		for (var i = 0; i < selectElement.options.length; i++) {
			var option = selectElement.options[i];
			var supplier = option.value;
			supplierOptions = supplier
		}
		var supplierObject = JSON.parse(supplierOptions);
		return supplierObject;
	}


	$scope.showSupplierOptions = function() {
		$scope.supplierOptions = getSupplierOptions();
		console.log($scope.supplierOptions);
	};

	/*selected nhản hàng  */
	// Hàm để lấy các tùy chọn đã chọn và đưa vào mảng bên JavaScript
	function getBrandOptions() {
		var selectElement = document.getElementById('brand');
		var brandOptions = {}; // Đã sửa thành một biến cục bộ (local variable) là một đối tượng rỗng
		for (var i = 0; i < selectElement.options.length; i++) {
			var option = selectElement.options[i];

			var brand = option.value;
			brandOptions = brand
		}
		var brandObject = JSON.parse(brandOptions);
		return brandObject;
	}


	$scope.brandOptions = {}

	$scope.showBrandOptions = function() {
		$scope.brandOptions = getBrandOptions();
		console.log($scope.brandOptions);
	};


	$scope.message = (animation, title, icon) => {
		toastMixin.fire({
			animation: animation,
			title: title,
			icon: icon
		});
	}



	// Phần sản phẩm
	$scope.create = function() {
		// Thêm product và danh mục
		var item = angular.copy($scope.product);
		var url = `${host}/product`;
		item.image1 = $scope.fileNames[0]
		item.image2 = $scope.fileNames[1]
		if (item.image1 == null) {
			item.image1 = "product-default1.jpg"
		}
		if (item.image2 == null) {
			item.image2 = "product-default2.jpg"
		}
		if ($scope.catcherror() == false) {
			return
		}

		if ($scope.validation() == false) {
			return
		}
		$http.post(url, item).then(resp => {
			$scope.items.push(item);
			// Ẩn thông báo lỗi nếu không có lỗi
			console.log("Success", resp);

			$scope.message(true, "Thêm sản phẩm thành công", "success")

			// Thêm đặt trưng
			$scope.showSelectedOptions();
			var distinctiveUrl = "http://localhost:8088/pcgearhub/rest/productDistinctive";
			$scope.selectedOptions.forEach(function(pds) {
				console.log(pds.id)
				console.log(pds.id)
				console.log(pds.name)
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
					distinctive: pds
				};
				$http.post(distinctiveUrl, newData).then(resp => {
					console.log("Success", resp);
				}).catch(error => {
					console.log("Error", error);
				});
			});

			// Thêm phiếu nhập kho
			var stockUrl = "http://localhost:8088/pcgearhub/rest/stockReceipt";
			var brand = getBrandOptions();
			var supplier = getSupplierOptions();
			var currentDate = new Date();
			var year = currentDate.getFullYear();
			var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Thêm số 0 vào trước tháng nếu cần
			var day = currentDate.getDate().toString().padStart(2, '0'); // Thêm số 0 vào trước ngày nếu cần

			var formattedDate = year + '-' + month + '-' + day;

			console.log(formattedDate);


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

				brand: brand,
				supplier: supplier,
				price: item.price,
				quantity: item.quantity,
				orderDate: formattedDate

			};


			$http.post(stockUrl, newData).then(resp => {
				console.log("Success", resp);
			}).catch(error => {
				console.log("Error", error);
			});
			$scope.history("Đã thêm sản sản phẩm" + item.id)
		}).catch(error => {
			console.log("Error", error);
		});
	};

	// Hàm xử lý khi có sự thay đổi trong select element
	$scope.handleSelectedOption = function() {
		// Lấy option đã chọn thông qua ng-selected
		var selectedOption = $scope.stockReceipts2.find(function(stockReceipt) {
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
		item.image1 = $scope.fileNames[0]
		item.image2 = $scope.fileNames[1]
		$http.put(url, item).then(resp => {
			var index = $scope.items.findIndex(item => item.id == $scope.product.id)
			$scope.message(true, "Cập nhật sản phẩm thành công", "success")
			/*Tìm được vị trí thì cập nhật lại sinh viên*/
			$scope.items[index] = resp.data;
			console.log("Success", resp);

			angular.forEach($scope.itemDistinctiveDelete, function(distinctive) {
				var url = `${host}/productDistinctive/${distinctive.id}`;
				$http.delete(url).then(resp => {
					console.log("Xóa thành công", resp)
				}).catch(error => {
					console.log("Error", error);
				});
			});
			// Sửa đặt trưng
			$scope.showSelectedOptions();
			var distinctiveUrl = "http://localhost:8088/pcgearhub/rest/productDistinctive";
			$scope.selectedOptions.forEach(function(pds) {
				console.log(pds.id)
				console.log(pds.id)
				console.log(pds.name)
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
					distinctive: pds
				};
				$http.post(distinctiveUrl, newData).then(resp => {
					console.log("Success", resp);
				}).catch(error => {
					console.log("Error", error);
				});
			});
			$scope.history("Đã cập nhật lại sản phẩm" + item.id)

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
			$scope.message(true, "Xóa sản phẩm thành công", "success")

		}).catch(error => {
			console.log("Error", error);
		});
	}


	var url = "http://localhost:8088/pcgearhub/rest/files/images";

	$scope.url = function(filename) {
		return `${url}/${filename}`
	}
	$scope.upload = function(files) {

		// Kiểm tra số lượng tệp đã chọn và chặn nếu vượt quá giới hạn
		var maxFiles = 2;
		if (files.length > maxFiles) {
			$scope.message(true, "Chỉ thêm được 2 hình ảnh", "error")
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
			console.log($scope.fileNames)
			$scope.fileNames.push(...resp.data)
		}).catch(error => {
			console.log("Errors", error)
		})


	}

	$scope.history = (title) => {
		/*lấy ngày*/
		var currentDate = new Date();
		var year = currentDate.getFullYear();
		var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Thêm số 0 vào trước tháng nếu cần
		var day = currentDate.getDate().toString().padStart(2, '0'); // Thêm số 0 vào trước ngày nếu cần

		var formattedDate = year + '-' + month + '-' + day;
		console.log(formattedDate)
		/*Lấy giờ*/
		/*TIME*/
		var currentDate = new Date();
		var hours = currentDate.getHours();
		var minutes = currentDate.getMinutes();
		var seconds = currentDate.getSeconds();

		var timeString = hours + ":" + minutes + ":" + seconds;
		console.log(timeString);
		var urlUser = `http://localhost:8088/pcgearhub/api/user`;
		$http.get(urlUser).then(resp => {
			$scope.info = resp.data;

			var urlHistory = "http://localhost:8088/pcgearhub/rest/UserHistory"
			console.log($scope.info.id)


			var history = {
				note: $scope.info.name + " " + title,
				historyDate: formattedDate,
				historyTime: timeString,
				user: $scope.info

			};
			console.log(history)
			$http.post(urlHistory, history).then(resp => {
				console.log("Success", resp);

			}).catch(error => {
				console.log("Error", error);
			});
		}).catch(error => {
			console.log("Error", error);
		});
	}
	$scope.load_all();


});