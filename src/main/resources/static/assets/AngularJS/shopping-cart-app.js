let host = "http://localhost:8088/pcgearhub/rest";

const app = angular.module("shopping-cart-app", []);
app.controller("shopping-cart-ctrl", function ($scope, $location, $http, $timeout) {
	$scope.url = function (filename) {
		var url = "http://localhost:8088/pcgearhub/rest/files/images";
		return `${url}/${filename}`

	}
	$scope.cart = {
		items: [],
		add(id) {
			var item = this.items.find(item => item.id === id);
			if (item) {
				item.qty++;
				this.saveToLocalStorage();
			} else {
				$http.get(`/pcgearhub/rest/product/${id}`).then(resp => {
					resp.data.qty = 1;
					this.items.push(resp.data);
					this.saveToLocalStorage();
				});
			}
		},

		remove(id) {//xóa sản phẩm khỏi giỏ hàng
			var index = this.items.findIndex(item => item.id == id);
			this.items.splice(index, 1);
			this.saveToLocalStorage();
		},

		clear() {//xóa sạch các mặt hàng
			this.items = []
			this.saveToLocalStorage();
		},

		get count() {//tổng số lượng trong mặt hàng
			return this.items
				.map(item => item.qty)
				.reduce((total, qty) => total += qty, 0);
		},

		get amount() {//tổng thành tiền của các mặt hàng
			return this.items
				.map(item => item.qty * item.price)
				.reduce((total, qty) => total += qty, 0);

		},

		saveToLocalStorage() { // lưu vào localSto
			var json = JSON.stringify(angular.copy(this.items));
			localStorage.setItem("cart", json);
			this.cartTotalQuantity = this.count;
			this.cartTotalAmount = this.amount;

		},

		loadFormLocalStorage() {//đọc giỏ hàng từ local storage
			var json = localStorage.getItem("cart");
			this.items = json ? JSON.parse(json) : [];

		},

		decreaseQuantity(item) {//giảm số lượng trong shoppingcart
			if (item.qty > 1) {
				item.qty--;
				this.saveToLocalStorage();
			}
		},

		increaseQuantity(item) {//tăng số lượng trong shoppingcart
			if (item.qty < item.quantity) {
				item.qty++;
				this.saveToLocalStorage();
			}
		},


	}

	$scope.hasCheckedItems = () => {//kiểm tra khi click vào thanh toán
		for (var i = 0; i < $scope.cart.items.length; i++) {
			if ($scope.cart.items[i].checked) {
				return true;
			}
		}
		return false;
	};

	$scope.checkAllItems = () => {//checkall
		for (var i = 0; i < $scope.cart.items.length; i++) {
			$scope.cart.items[i].checked = $scope.checkAll;
		}
	};

	$scope.updateSelectedItems = () => {//kiểm lỗi checkbox
		for (var i = 0; i < $scope.cart.items.length; i++) {
			$scope.cart.items[i].checked = $scope.checkAll;
		}
	};

	$scope.getTotalAmount = () => {
		var totalAmount = 0;
		for (var i = 0; i < $scope.cart.items.length; i++) {
			if ($scope.cart.items[i].checked) {
				totalAmount += $scope.cart.items[i].qty * $scope.cart.items[i].price;
			}
		}
		return totalAmount;
	};


	$scope.productsPerPage = 8;
	$scope.currentPage = 1;
	$scope.totalPages = 0;
	$scope.products = [];

	// Tính tổng số trang dựa vào số lượng sản phẩm và số sản phẩm trên mỗi trang
	$scope.calculateTotalPages = function () {
		$scope.totalPages = Math.ceil($scope.products.length / $scope.productsPerPage);
	};

	// Lấy danh sách sản phẩm hiển thị trên trang hiện tại
	$scope.getCurrentPageProducts = function () {
		const startIndex = ($scope.currentPage - 1) * $scope.productsPerPage;
		const endIndex = startIndex + $scope.productsPerPage;
		return $scope.products.slice(startIndex, endIndex);
	};

	// Phương thức này được gọi khi người dùng chọn trang mới
	$scope.changePage = function (page) {
		if (page >= 1 && page <= $scope.totalPages) {
			$scope.currentPage = page;
		}
	};

	// Tạo một mảng các trang để hiển thị trong thanh phân trang
	$scope.getPagesArray = function () {
		const pages = [];
		for (let i = 1; i <= $scope.totalPages; i++) {
			pages.push(i);
		}
		return pages;
	};

	// Hàm này được gọi khi dữ liệu được tải lên trang
	$scope.loadData = function () {
		$http.get('/pcgearhub/rest/products')
			.then(function (response) {
				$scope.products = response.data;
				$scope.calculateTotalPages(); // Tính tổng số trang sau khi nhận dữ liệu
			})
			.catch(function (error) {
				console.error('Error fetching data:', error);
			});
	};

	$scope.cities = [];
	$scope.selectedCity = null;
	$scope.selectedDistrict = null;
	$scope.selectedWard = null;
	$scope.specificAddress = "";

	var Parameter = {
		url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
		method: "GET",
		responseType: "application/json",
	};

	axios(Parameter).then(function (result) {
		$scope.cities = result.data;
	});
	1
	function constructAddress() {
		if ($scope.selectedCity && $scope.selectedDistrict && $scope.selectedWard) {
			// Construct the address using selectedCity, selectedDistrict, selectedWard, and specificAddress
			$scope.order.address = $scope.specificAddress + ', ' + $scope.selectedWard.Name + ', ' + $scope.selectedDistrict.Name + ', ' + $scope.selectedCity.Name;
		}
	}

	$scope.$watchGroup(['selectedCity', 'selectedDistrict', 'selectedWard', 'specificAddress'], function () {
		constructAddress();
	});


	$http.get('/pcgearhub/api/user')
		.then(function (response) {
			$scope.selectedBankName = "";
			$scope.userLogged = response.data;
			console.log("đã có bnef : " + $scope.userLogged.phone);
			var currentDate = new Date();
			var formattedDate = currentDate.getDate() + "" + (currentDate.getMonth() + 1) + "" + currentDate.getFullYear() + "" + currentDate.getHours() + "" + currentDate.getMinutes() + "" + currentDate.getSeconds();

			$scope.order = {
				id: "HD" + formattedDate,
				orderDate: new Date(),
				address: "",
				status: "pending",
				user: $scope.userLogged,
				// phoneNumber: "",
				get detailedInvoices() {
					return $scope.selectedItems.map(item => {
						const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
						const bankName = selectedPaymentMethod === 'Thanh toán chuyển khoản' ? $scope.selectedBankName : '';
						return {
							product: { id: item.id },
							quantity: item.qty,
							paymentMethod: selectedPaymentMethod + '  ' + bankName,

						};
					});
				},

				confirm() {
					var order = angular.copy(this);
					if ($scope.selectedItems.length === 0) {
						Swal.fire(
							'Không có sản phẩm  thanh toán',
							'Vui lòng chọn sản phẩm trước khi tiến hành đặt hàng.',
							'warning'
						);
						return; // Stop further execution
					}
					if (!$scope.selectedCity) {
						Swal.fire(
							'Lỗi',
							'Vui lòng chọn TỈNH trước khi xác nhận đặt hàng.',
							'error'
						);
						return;
					}
					if (!$scope.selectedDistrict) {
						Swal.fire(
							'Lỗi',
							'Vui lòng QUẬN/HUYỆN trước khi xác nhận đặt hàng.',
							'error'
						);
						return;
					}
					if (!$scope.selectedWard) {
						Swal.fire(
							'Lỗi',
							'Vui lòng XÃ/PHƯỜNG trước khi xác nhận đặt hàng.',
							'error'
						);
						return;
					}
					//kiểm lỗi người dùng không nhập địa chỉ
					if (!$scope.specificAddress) {
						Swal.fire(
							'Địa chỉ trống',
							'Vui lòng nhập địa chỉ cụ thể trước khi xác nhận đặt hàng.',
							'warning'
						);
						return;
					}

					let orderIsValid = true;
					for (const item of $scope.selectedItems) {
						if (item.qty > item.quantity) {
							orderIsValid = false;
							Swal.fire(
								'Số lượng không hợp lệ',
								`Sản phẩm "${item.name}" chỉ còn ${item.quantity} sản phẩm.`,
								'warning'
							);
							break;
						}
					}

					if (!orderIsValid) {
						return;
					}
					$http.post("/pcgearhub/rest/orders", order).then(resp => {

						// Clear selected items from the cart
						$scope.selectedItems.forEach(item => {
							const index = $scope.cart.items.findIndex(cartItem => cartItem.id === item.id);
							if (index !== -1) {
								$scope.cart.items.splice(index, 1);
							}
						});
						//cập nhật lại số lượng khi thanh toán thành công
						$scope.selectedItems.forEach(item => {
							const updatedItem = angular.copy(item);
							updatedItem.quantity -= updatedItem.qty; // Subtract the purchased quantity
							$http.put(`/pcgearhub/rest/product/${updatedItem.id}`, updatedItem)
								.then(resp => {
									// Item quantity updated successfully
								})
								.catch(error => {
									console.error("Error updating item quantity:", error);
								});
						});
						// Save cart changes to local storage
						$scope.cart.saveToLocalStorage();

						// Swal.fire(
						// 	'Đặt hàng thành công',
						// 	'',
						// 	'success'
						// );
						this.address = "";
						// Clear selected items and local storage for them
						$scope.selectedItems = [];
						localStorage.removeItem('selectedItems');
						$scope.cart.loadFormLocalStorage();

						console.log("đât nè " + resp.data.id);

						location.href = "/pcgearhub/ordered-list/details/" + resp.data.id;


					}).catch(error => {
						console.error("Errorssss:", error); // Log error
						Swal.fire(
							'Đặt hàng không thành công',
							'',
							'error'
						);
					});

				}
			};
		})
		.catch(function (error) {
			console.error('Error fetching user data:', error);
		});

	///xử lý lấy các sản phẩm được tích sang trang confirm-info
	$scope.selectedItems = [];
	$scope.getSelectedItems = function () {
		$scope.selectedItems = [];
		var hasInvalidQuantity = false;
		var invalidProducts = [];

		for (var i = 0; i < $scope.cart.items.length; i++) {
			if ($scope.cart.items[i].checked) {
				if ($scope.cart.items[i].qty > $scope.cart.items[i].quantity) {
					hasInvalidQuantity = true;
					invalidProducts.push($scope.cart.items[i].name + " (Số lượng tối đa là: " + $scope.cart.items[i].quantity + ")");
				}

				$scope.selectedItems.push($scope.cart.items[i]);
			}
		}

		if (hasInvalidQuantity) {
			var errorMessage = "Số lượng sản phẩm vượt quá số lượng hiện có: " + invalidProducts.join(", ");
			document.getElementById('error-message').textContent = errorMessage;
			return;
		}

		// Lưu vào Local Storage để sử dụng sau này trên trang mới
		localStorage.setItem('selectedItems', JSON.stringify($scope.selectedItems));

		document.getElementById('error-message').textContent = '';

		window.location.href = '/pcgearhub/confirm-information';
	};



	// Kiểm tra nếu có dữ liệu selectedItems trong Local Storage của trang mới
	const storedItems = localStorage.getItem('selectedItems');
	if (storedItems) {
		$scope.selectedItems = JSON.parse(storedItems);
	}

	$scope.getTotalAmountConfirm = function () {//tổng tiền trong trang confirm-info.html
		let totalAmount = 0;
		for (let i = 0; i < $scope.selectedItems.length; i++) {
			const item = $scope.selectedItems[i];
			totalAmount += item.qty * item.price;
		}
		return totalAmount;
	};

	//tìm kiếm sản phẩm trong index
	$scope.search = (name) => {
		if (name != "") {
			var url = `${host}/products/search/${name}`;
		} else {
			var url = `${host}/products`;
		}
		$http({
			method: "GET",
			url: url,
		})
			.then((resp) => {
				$scope.products = resp.data;
				$scope.calculateTotalPages();
				console.log("search", resp);
			})
			.catch((error) => {
				console.log("Error_edit", error);
			});
	};

	$scope.showConfirmation = function () {
		// Hiển thị hộp thoại xác nhận
		Swal.fire({
			title: 'Bạn có chắc ?',
			text: "Muốn xóa hết tất cả sản phẩm hay không!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Xóa'
		}).then((result) => {
			if (result.isConfirmed) {
				// Xử lý khi người dùng xác nhận xóa
				Swal.fire(
					'Đã xóa!',
					'Hết tất cả các sản phẩm',
					'success'

				);
				$scope.cart.clear()
				$scope.loadData();
				$scope.cart.loadFormLocalStorage();//khởi chạys

				// Thêm mã xử lý xóa tất cả ở đây nếu cần thiết
			}
		});
	};

	//hiển thị top 10 sản phảm mới về
	$scope.top10new = [];
	$http.get('/pcgearhub/rest/products/top10new')
		.then(function (response) {
			$scope.top10new = response.data.slice(0, 8);
		}, function (error) {
			console.error('Error fetching products:', error);
		});



	//ngăn chặn vào trang chi tiết khi hết sản phẩm
	$scope.preventNavigation = function ($event) {
		if ($event) {
			$event.preventDefault();
			$event.stopPropagation();
		}
	};


	//hiển thị dữ liệu trạng thái pending trong order-list
	$scope.ordersPending = [];
	$scope.currentPage = 1;
	$scope.pageSize = 5; // Số đơn hàng trên mỗi trang
	$scope.totalPages = 0;
	$scope.displayedOrders = [];

	$scope.updateDisplayedOrders = function () {
		const startIndex = ($scope.currentPage - 1) * $scope.pageSize;
		const endIndex = startIndex + $scope.pageSize;
		$scope.displayedOrders = $scope.ordersPending.slice(startIndex, endIndex);
	};

	$http.get('/pcgearhub/rest/order-list/pending')
		.then(function (response) {
			$scope.ordersPending = response.data;
			console.log($scope.ordersPending);
			// Tính tổng số trang dựa trên số đơn hàng và kích thước trang
			$scope.totalPages = Math.ceil($scope.ordersPending.length / $scope.pageSize);

			// Hiển thị các đơn hàng trên trang đầu tiên ban đầu
			$scope.updateDisplayedOrders();
		})
		.catch(function (error) {
			console.error('Error fetching order list:', error);
		});

	$scope.goToPage = function (pageNumber) {
		if (pageNumber >= 1 && pageNumber <= $scope.totalPages) {
			$scope.currentPage = pageNumber;
			$scope.updateDisplayedOrders();
		}
	};
	// --------------------------------------------------hiển thị dữ liệu của delivery
	$scope.ordersDelivery = [];
	$scope.currentDeliveryPage = 1;
	$scope.deliveryPageSize = 5;
	$scope.deliveryTotalPages = 1;

	$scope.getDeliveryOrders = function () {
		$http.get('/pcgearhub/rest/order-list/delivery')
			.then(function (response) {

				$scope.ordersDelivery = response.data;
				// Tính tổng số
				$scope.deliveryTotalPages = Math.ceil($scope.ordersDelivery.length / $scope.deliveryPageSize);

				// Hiển thị các đơn hàng trên trang đầu tiên ban đầu
				$scope.updateDisplayedDeliveryOrders();
			})
			.catch(function (error) {
				// Xử lý lỗi khi gọi API
				console.error('Error fetching delivery order list:', error);
			});
	};

	$scope.getDeliveryOrders();

	$scope.updateDisplayedDeliveryOrders = function () {
		var startIndex = ($scope.currentDeliveryPage - 1) * $scope.deliveryPageSize;
		var endIndex = startIndex + $scope.deliveryPageSize;
		$scope.displayedDeliveryOrders = $scope.ordersDelivery.slice(startIndex, endIndex);
	};


	$scope.goToDeliveryPage = function (pageNumber) {
		if (pageNumber >= 1 && pageNumber <= $scope.deliveryTotalPages) {
			$scope.currentDeliveryPage = pageNumber;
			$scope.updateDisplayedDeliveryOrders();
		}
	};
	//--------------hiển thị dữ liệ cho complete ---------------------
	$scope.ordersComplete = [];
	$scope.currentCompletePage = 1;
	$scope.completePageSize = 5;
	$scope.completeTotalPages = 1;


	$scope.getCompleteOrders = function () {
		$http.get('/pcgearhub/rest/order-list/complete')
			.then(function (response) {

				$scope.ordersComplete = response.data;
				console.log($scope.ordersComplete);


				$scope.completeTotalPages = Math.ceil($scope.ordersComplete.length / $scope.completePageSize);


				$scope.updateDisplayedCompleteOrders();
			})
			.catch(function (error) {

				console.error('Error fetching complete order list:', error);
			});
	};

	// Gọi hàm để lấy danh sách đơn hàng khi trang được tải
	$scope.getCompleteOrders();

	// Hàm cập nhật danh sách đơn hàng hiển thị trên trang hiện tại
	$scope.updateDisplayedCompleteOrders = function () {
		var startIndex = ($scope.currentCompletePage - 1) * $scope.completePageSize;
		var endIndex = startIndex + $scope.completePageSize;
		$scope.displayedCompleteOrders = $scope.ordersComplete.slice(startIndex, endIndex);
	};

	// Hàm chuyển đến trang được chọn
	$scope.goToCompletePage = function (pageNumber) {
		if (pageNumber >= 1 && pageNumber <= $scope.completeTotalPages) {
			$scope.currentCompletePage = pageNumber;
			$scope.updateDisplayedCompleteOrders();
		}
	};


	//hiển thị dũ liệu cho cancelled
	$scope.ordersCancelled = [];
	$scope.currentCancelledPage = 1;
	$scope.cancelledPageSize = 5;
	$scope.cancelledTotalPages = 1;


	$scope.getCancelledOrders = function () {
		$http.get('/pcgearhub/rest/order-list/cancelled')
			.then(function (response) {

				$scope.ordersCancelled = response.data;
				console.log($scope.ordersCancelled);


				$scope.cancelledTotalPages = Math.ceil($scope.ordersCancelled.length / $scope.cancelledPageSize);


				$scope.updateDisplayedCancelledOrders();
			})
			.catch(function (error) {
				// Xử lý lỗi khi gọi API
				console.error('Error fetching cancelled order list:', error);
			});
	};

	// Gọi hàm để lấy danh sách đơn hàng khi trang được tải
	$scope.getCancelledOrders();

	// Hàm cập nhật danh sách đơn hàng hiển thị trên trang hiện tại
	$scope.updateDisplayedCancelledOrders = function () {
		var startIndex = ($scope.currentCancelledPage - 1) * $scope.cancelledPageSize;
		var endIndex = startIndex + $scope.cancelledPageSize;
		$scope.displayedCancelledOrders = $scope.ordersCancelled.slice(startIndex, endIndex);
	};

	// Hàm chuyển đến trang được chọn
	$scope.goToCancelledPage = function (pageNumber) {
		if (pageNumber >= 1 && pageNumber <= $scope.cancelledTotalPages) {
			$scope.currentCancelledPage = pageNumber;
			$scope.updateDisplayedCancelledOrders();
		}
	};


	$scope.cancelOrder = function (id) {
		var url = `/pcgearhub/rest/ordered-list/details/` + id;
		var data = { status: 'cancelled' };

		$http.put(url, data)
			.then(function (response) {
				// Handle success, e.g., show a success message
				console.log('Order cancelled successfully.');
			})
			.catch(function (error) {
				// Handle error, e.g., show an error message
				console.error('Error cancelling order:', error);
			});
	};

	$scope.showSwal = function () {
		// Show the SweetAlert dialog with custom animation
		Swal.fire({
			title: '',
			showClass: {
				popup: 'animate__animated animate__fadeInDown'
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOutUp'
			}
		})
	};

	$scope.showInputDialog = function (id) {
		Swal.fire({
			input: 'textarea',
			inputLabel: 'Lý do hủy đơn',
			inputPlaceholder: 'Nhập lý do hủy đơn...',
			inputAttributes: {
				'aria-label': 'Type your message here'
			},
			showCancelButton: true
		}).then(function (result) {
			if (result.isConfirmed && result.value) {

				$scope.cancelledOrder(id, result.value)
			}
		});
	}
	$scope.cancelledOrder = (id, result) => {
		console.log($scope.nodes + "000000")
		var urlID = `http://localhost:8088/pcgearhub/rest/invoice/${id}`;
		$http.get(urlID).then(resp => {
			$scope.invoice = resp.data;
			console.log("Success", resp);
			console.log($scope.invoice)
			var invoice = angular.copy($scope.invoice);
			invoice.status = "cancelled"
			invoice.node = result
			$http.put(urlID, invoice).then(resp => {
				var index = $scope.displayedOrders.findIndex(item => item.id == invoice.id)
				if (index !== -1) {
					$scope.displayedOrders.splice(index, 1); // Xóa phần tử tại index
				}
				console.log("Success", resp);
				/*Cập nhật lại số lượng sản phẩm*/
				$scope.updateQuantityProduct(invoice.id)
			}).catch(error => {
				console.log("Error", error);
			});
		}).catch(error => {
			console.log("Error", error);
		});
	}

	$scope.updateQuantityProduct = (invoiceID) => {
		var detailedInvoiceByInvoice = [];
		var detailedInvoices = "http://localhost:8088/pcgearhub/rest/detailedInvoices";
		var urlDetailedInvoices = `${detailedInvoices}`;

		$http.get(urlDetailedInvoices).then(resp => {
			$scope.detailedInvoices = resp.data;
			angular.forEach($scope.detailedInvoices, function (detailedInvoice) {
				if (detailedInvoice.invoice.id == invoiceID) {
					detailedInvoiceByInvoice.push(detailedInvoice);
				}
			});

			for (var i = 0; i < detailedInvoiceByInvoice.length; i++) {
				var detailedInvoice = detailedInvoiceByInvoice[i];
				var urlProduct = `http://localhost:8088/pcgearhub/rest/product/${detailedInvoice.product.id}`;

				console.log(urlProduct);
				console.log(detailedInvoice.product);

				var updatedProduct = angular.copy(detailedInvoice.product);
				updatedProduct.quantity += detailedInvoice.quantity;

				$http.put(urlProduct, updatedProduct).then(resp => {
					console.log("Success", resp);
				}).catch(error => {
					console.log("Error", error);
				});
			}

			console.log(detailedInvoiceByInvoice);
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	};

	var methodExecuted = false;

	// Phương thức thực hiện chỉ một lần
	function executeOnce() {
	  if (!methodExecuted) {
		// Lấy thẻ span theo ID
		var paymentMethodSpan = document.getElementById("paymentMethod");
  
		// Thực hiện thay đổi trong thẻ span
		paymentMethodSpan.innerHTML = "Thay đổi nội dung phương thức";
  
		// Đánh dấu biến cờ là đã thực hiện
		methodExecuted = true;
	  }
	}
  
	
	// Gọi hàm loadData để tải dữ liệu lên trang index ban đầu


	$scope.loadData();

	//
	$scope.cart.loadFormLocalStorage();//khởi chạy



	// let host = "http://localhost:8088/pcgearhub/rest";

	$scope.load_all_category = function () {
		var url = `${host}/categories`;
		$http.get(url).then(resp => {
			$scope.category = resp.data;
			console.log("Successssssssssss", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	};

	$scope.productByCategory =[]
	$scope.loadNames = function (name) {
		// $scope.productByCategory.push(name)
		var url = `${host}/productByCategory/${name}`;
		$http.get(url).then(resp => {
			// $scope.alo = "ká";
			$scope.productByCategory = resp.data.slice(0, 8);
			console.log("danh muc", $scope.productByCategory);
		}).catch(error => {
			console.log("Error", error);
		});
		console.log("danh muc", $scope.productByCategory);
	}; 
	// $scope.loadNames('C003')
	$scope.load_all_category();




});

// Trang commets
app.controller("loadAll", function ($scope, $http, $location) {
	let hostComment = "http://localhost:8088/pcgearhub/rest/comments";
	$scope.pageCount;
	$scope.user = {};
	$scope.items = [];
	$scope.filenames = [];
	$scope.userId = '${#request.remoteUser}';
	console.log($scope.userId + "----------------------------------")



	$scope.getIDProduct = () => {
		var currentURL = $location.absUrl();
		console.log("Current URL:", currentURL);

		var parts = currentURL.split('/'); // Tách đường dẫn thành mảng các phần tử
		const id = parts[parts.length - 1];
		return id;
	}
	$scope.load_all = function () {
		var id = $scope.getIDProduct();
		var url = `${hostComment}/product/${id}`;

		$http.get(url).then(resp => {
			// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.items
			$scope.items = resp.data;
			$scope.users = [];

			angular.forEach($scope.items, function (item) {
				$scope.users.push(item.user);
				console.log($scope.users)
			})
			angular.forEach($scope.users, function (item) {
				$scope.filenames.push(item.image)
			})
			/*Tổng số trang*/
			$scope.pageCount = Math.ceil($scope.items.length / 3);

			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	};
	$scope.url = function (filename) {
		var url = "http://localhost:8088/pcgearhub/rest/files/images";
		return `${url}/${filename}`

	}

	/*Thực hiện sắp xếp*/


	$scope.currentPage = 1;
	$scope.sortBy = function (prop) {
		$scope.prop = prop
	}


	$scope.begin = 0;
	console.log($scope.pageCount)

	$scope.first = function () {
		$scope.begin = 0;
		$scope.currentPage = 1; // Set currentPage to the first page
	}
	$scope.prev = function () {
		console.log($scope.begin)
		if ($scope.begin > 0) {
			$scope.begin -= 3;
			$scope.currentPage--;
		}
	}
	$scope.next = function () {
		console.log($scope.begin)

		console.log(($scope.pageCount - 1) * 3)

		if ($scope.begin < ($scope.pageCount - 1) * 3) {
			$scope.begin += 3;
			$scope.currentPage++;
		}
	}
	$scope.last = function () {
		$scope.begin = ($scope.pageCount - 1) * 3;
		$scope.currentPage = $scope.pageCount;
	}




	let host = "http://localhost:8088/pcgearhub/rest";
	// ẩn
	$scope.showRoleSection = false;
	$scope.showActivitySection = false;
	$scope.showConfirmationSection = false;
	$scope.product = {}
	$scope.user = {}
	$scope.matkhau = false;
	$scope.id = false;
	$scope.idUser = "";
	$scope.items = [];

	$scope.getUser = () => {

		var url = "http://localhost:8088/pcgearhub/api/user"
		console.log(url)
		$http.get(url).then(resp => {
			// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.form
			$scope.user = resp.data;
			$scope.idUser = $scope.user.id
			console.log($scope.user)
		}).catch(error => {
			console.log("Error", error);
		});

	}

	$scope.getProduct = () => {
		var currentURL = $location.absUrl();
		console.log("Current URL:", currentURL);

		var parts = currentURL.split('/'); // Tách đường dẫn thành mảng các phần tử
		const id = parts[parts.length - 1];
		var url = `${host}/product/${id}`;
		console.log(url)
		$http.get(url).then(resp => {
			// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.form
			$scope.product = resp.data;
			console.log($scope.product)
		}).catch(error => {
			console.log("Error", error);
		});


	}

	$scope.getUser()
	$scope.getProduct()

	$scope.message = (animation, title, icon) => {
		toastMixin.fire({
			animation: animation,
			title: title,
			icon: icon
		});
	}

	$scope.catcherror = () => {
		var check = 0;
		if (!$scope.comment.content) {
			$scope.message(null, "Phần bình luận còn trống !!", "error")
			check++;

		}
		if (check != 0) {
			return false;
		}
		return true;
	}



	$scope.create = function () {
		if ($scope.catcherror() == false) {
			return
		}

		var currentDate = new Date();
		var year = currentDate.getFullYear();
		var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Thêm số 0 vào trước tháng nếu cần
		var day = currentDate.getDate().toString().padStart(2, '0'); // Thêm số 0 vào trước ngày nếu cần
		var formattedDate = year + '-' + month + '-' + day;
		var comment = {};
		comment.content = $scope.comment.content;
		comment.orderDate = formattedDate
		comment.likeCount = 0
		comment.user = $scope.user;
		comment.product = $scope.product;

		var url = `${host}/comment`;

		$http.post(url, comment).then(resp => {
			$scope.items.push(comment);
			$scope.message(true, "Tải bình luận thành công", "success")
			console.log("Success", resp);
			$scope.comment.content = ""

			$scope.load_all();


		}).catch(error => {
			console.log("Error", error);
		});


	};
	$scope.cm = {};

	$scope.cm = {};
	$scope.checkUser = () => {

	}
	$scope.itemUlike = {};

	$scope.status = true
	$scope.statusSetlike = (id) => {
		console.log()
		if ($scope.status == true) {
			var urls = `${host}/comment/${id}`;
			console.log(urls)
			$http.get(urls).then(resp => {
				// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.form
				$scope.cm = resp.data;
				const dateTimeString = $scope.cm.orderDate
				const dateTime = new Date(dateTimeString);
				const dateString = dateTime.toISOString().split("T")[0];;
				$scope.cm;
				$scope.cm.orderDate = dateString;
				$scope.cm.likeCount = $scope.cm.likeCount + 1;

				var url = `${host}/comment/${id}`;

				$http.put(url, $scope.cm).then(resp => {
					var index = $scope.items.findIndex(item => item.id == id)

					/*Tìm được vị trí thì cập nhật lại sinh viên*/
					$scope.items[index] = resp.data;


					$scope.message(true, "Bạn đã thích bình luận của", "success")
					console.log("Success", resp);

					$scope.load_all();
					$scope.status = false
				}).catch(error => {
					console.log("Error", error);
				});

				console.log($scope.likeCount)
			}).catch(error => {
				console.log("Error", error);
			});
		}
		if ($scope.status == false) {
			var urls = `${host}/comment/${id}`;
			console.log(urls)
			$http.get(urls).then(resp => {
				$scope.cm = resp.data;
				const dateTimeString = $scope.cm.orderDate
				const dateTime = new Date(dateTimeString);
				const dateString = dateTime.toISOString().split("T")[0];;
				$scope.cm;
				$scope.cm.orderDate = dateString;
				$scope.cm.likeCount = $scope.cm.likeCount - 1;
				var url = `${host}/comment/${id}`;
				$http.put(url, $scope.cm).then(resp => {
					var index = $scope.items.findIndex(item => item.id == id)
					$scope.items[index] = resp.data;
					$scope.message(true, "Bạn đã thích bình luận của", "success")
					console.log("Success", resp);
					$scope.load_all();
					$scope.status = true
				}).catch(error => {
					console.log("Error", error);
				});
				console.log($scope.likeCount)
			}).catch(error => {
				console.log("Error", error);
			});
		}
	}


	$scope.setLike = (id) => {

		var urls = `${host}/comment/${id}`;
		console.log(urls)
		$http.get(urls).then(resp => {
			// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.form
			$scope.cm = resp.data;
			const dateTimeString = $scope.cm.orderDate
			const dateTime = new Date(dateTimeString);
			const dateString = dateTime.toISOString().split("T")[0];;
			$scope.cm;
			$scope.cm.orderDate = dateString;
			$scope.cm.likeCount = $scope.cm.likeCount + 1;

			var url = `${host}/comment/${id}`;

			$http.put(url, $scope.cm).then(resp => {
				var index = $scope.items.findIndex(item => item.id == id)

				/*Tìm được vị trí thì cập nhật lại sinh viên*/
				$scope.items[index] = resp.data;


				$scope.message(true, "Bạn đã thích bình luận của", "success")
				console.log("Success", resp);

				$scope.load_all();
			}).catch(error => {
				console.log("Error", error);
			});

			console.log($scope.likeCount)
		}).catch(error => {
			console.log("Error", error);
		});
	}
	/*	$scope.setLike2 = (id) => {
			
			var urls = `${host}/comment/${id}`;
			console.log(urls)
			$http.get(urls).then(resp => {
				$scope.cm = resp.data;
				const dateTimeString = $scope.cm.orderDate
				const dateTime = new Date(dateTimeString);
				const dateString = dateTime.toISOString().split("T")[0];;
				$scope.cm;
				$scope.cm.orderDate = dateString;
				$scope.cm.likeCount = $scope.cm.likeCount -1;
				var url = `${host}/comment/${id}`;
				$http.put(url, $scope.cm).then(resp => {
					var index = $scope.items.findIndex(item => item.id == id)
					$scope.items[index] = resp.data;
					$scope.message(true, "Bạn đã thích bình luận của", "success")
					console.log("Success", resp);
					$scope.load_all();
				}).catch(error => {
					console.log("Error", error);
				});
				console.log($scope.likeCount)
			}).catch(error => {
				console.log("Error", error);
			});
		}*/

	$scope.load_all();


});





/*Trang profile*/

app.controller("loadAlls", function ($scope, $http, $location) {
	$scope.user = {};
	$scope.showSuccessMessage = false;
	$scope.successMessage = "";


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


	$scope.reset = function () {
		$scope.user = { confirm: true, status: true, admin: false };
		$scope.loadData();
	};
	/*load all*/
	$scope.loadData = function () {
		var url = `${host}/users`;
		$http.get(url).then(resp => {
			$scope.items = resp.data;
			$scope.pageCount = Math.ceil($scope.items.length / 5);
			console.log("Success", resp);
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

		var alphanumericRegex = /^[a-zA-Z0-9]*$/;
		var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		var phoneRegex = /^\d{10}$/;

		var indexPhone = $scope.items.findIndex(itemx => itemx.phone === item.phone);
		if (!emailRegex.test(item.email)) {
			$scope.errorMessageEmail = "Email không đúng định dạng.";
			$scope.showErrorEmail = true;
			check++;
		} else {
			$scope.showErrorEmail = false;
			$scope.errorMessageEmail = "";
		}

		if (!alphanumericRegex.test(item.phone)) {
			$scope.errorMessagePhone = "Số điện thoại phải đúng định dạng.";
			$scope.showErrorPhone = true;
			check++;
		} else if (!phoneRegex.test(item.phone)) {
			$scope.errorMessagePhone = "Số điện thoại phải đủ 10 kí tự.";
			$scope.showErrorPhone = true;
			check++;
		} else {
			$scope.showErrorPhone = false;
			$scope.errorMessagePhone = "";
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

		}
		if (!item.email) {
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
			icon: icon,
			customClass: {
				container: 'custom-toast-container',
				title: 'custom-toast-title',
				icon: 'custom-toast-icon'
			}
		});
	}



	$scope.update = function () {
		var item = angular.copy($scope.user);
		var url = `${host}/users/${$scope.user.id}`;

		if ($scope.catcherror() == false) {
			return
		}
		if ($scope.validation() == false) {
			return
		}
		$http.put(url, item).then(resp => {


			localStorage.setItem('uploadedImage', $scope.user.image);
			$scope.message(true, "Cập nhật thành công", "success")
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

		var parts = currentURL.split('/');
		const id = parts[parts.length - 1];

		var item = $scope.items.find(item => item.id === id);

		var name = item ? item.image : null;
		var one = "one";
		var urlOneImage = `${url}/${one}/${name}`;

		$http.get(urlOneImage).then(resp => {
			$scope.filenames = resp.data;

			// Lấy tên ảnh đã lưu trước đó từ LocalStorage
			var uploadedImage = localStorage.getItem('uploadedImage');
			if (uploadedImage) {
				$scope.user.image = uploadedImage;
			}
		}).catch(error => {
			console.log("Error", error);
		});
	};


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
	$scope.loadData();
	$scope.cart.loadFormLocalStorage();//khởi chạy



	app.controller('MainController', ['$scope', function ($scope) {
		$scope.message = function (animation, title, icon) {
			toastMixin.fire({
				animation: animation,
				title: title,
				icon: icon
			});
		};
	}]);


});


// dang ky


app.controller("dangky", function ($scope, $http, $location) {
	let host = "http://localhost:8088/pcgearhub/rest";


	$scope.showRoleSection = false;
	$scope.showActivitySection = false;
	$scope.showConfirmationSection = false;


	$scope.user = {
		address: 'defaultAddress'
	};


	$scope.reset = function () {
		$scope.user = { confirm: true, status: true, admin: false };
		$scope.loadData();
	};
	/*load all*/
	$scope.loadData = function () {
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



	$scope.hideError = function (errorField) {
		switch (errorField) {
			case 'id':
				$scope.showErrorID = false;
				$scope.errorMessageID = "";
				break;
			case 'name':
				$scope.showErrorName = false;
				$scope.errorMessageName = "";
				break;
			case 'password':
				$scope.showErrorPassword = false;
				$scope.errorMessagePassword = "";
				break;
			case 'confirmPassword':
				$scope.showErrorConfirmPassword = false;
				$scope.errorMessageConfirmPassword = "";
				break;
			case 'gmail':
				$scope.showErrorEmail = false;
				$scope.errorMessageEmail = "";
				break;
			case 'phone':
				$scope.showErrorPhone = false;
				$scope.errorMessagePhone = "";
				break;
			// Thêm các trường khác nếu cần
			default:
				break;
		}
	};


	$scope.validation = function () {
		var item = angular.copy($scope.user);

		var alphanumericRegex = /^[a-zA-Z0-9]*$/;
		var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		var phoneRegex = /^\d{10}$/;

		var indexID = $scope.items.findIndex(itemx => itemx.id === item.id);
		var indexEmail = $scope.items.findIndex(itemx => itemx.email === item.email);
		var indexPhone = $scope.items.findIndex(itemx => itemx.phone === item.phone);

		var check = 0;

		if (indexID !== -1) {
			$scope.errorMessageID = "ID đã tồn tại, vui lòng nhập một ID khác.";
			$scope.showErrorID = true;
			check++;
		} else {
			if (!alphanumericRegex.test(item.id)) {
				$scope.errorMessageID = "ID không được chứa kí tự đặc biệt.";
				$scope.showErrorID = true;
				check++;
			} else {
				$scope.showErrorID = false;
				$scope.errorMessageID = "";
			}
		}

		if (!emailRegex.test(item.email)) {
			$scope.errorMessageEmail = "Email không đúng định dạng.";
			$scope.showErrorEmail = true;
			check++;
		} else if (indexEmail !== -1) {
			$scope.errorMessageEmail = "Email đã tồn tại, vui lòng nhập một email khác.";
			$scope.showErrorEmail = true;
			check++;
		} else {
			$scope.showErrorEmail = false;
			$scope.errorMessageEmail = "";
		}

		if (!phoneRegex.test(item.phone)) {
			$scope.errorMessagePhone = "Số điện thoại phải có 10 chữ số.";
			$scope.showErrorPhone = true;
			check++;
		} else if (indexPhone !== -1) {
			$scope.errorMessagePhone = "Số điện thoại đã tồn tại, vui lòng nhập một số điện thoại khác.";
			$scope.showErrorPhone = true;
			check++;
		} else {
			$scope.showErrorPhone = false;
			$scope.errorMessagePhone = "";
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

		} if (!$scope.confirmPassword) {
			$scope.errorMessageConfirmPassword = "Không được để trống mật khẩu xác nhận.";
			$scope.showErrorConfirmPassword = true;
			check++;
		} else {
			$scope.showErrorConfirmPassword = false;
			$scope.errorMessageConfirmPassword = "";
		}
		if (!item.email) {
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
			icon: icon,
			customClass: {
				container: 'custom-toast-container',
				title: 'custom-toast-title',
				icon: 'custom-toast-icon'
			}
		});
	}



	$scope.create = function () {
		if (!$scope.user.address) {
			$scope.user.address = 'defaultAddress';
		}

		var item = angular.copy($scope.user);
		item.confirm = false;
		var url = `${host}/users`;
		if ($scope.catcherror() == false) {
			return
		}
		if ($scope.validation() == false) {
			return
		}

		$http.post(url, item).then(resp => {
			console.log("Success", resp);
			$scope.message(true, "Thêm thành công", "success");
			console.log("Error", error);
			// Rest of your error handling code
		});

	};



	var url = "http://localhost:8088/pcgearhub/rest/files/images";

	$scope.url = function (filename) {
		return `${url}/${filename}`
	}

	$scope.list = function () {
		var currentURL = $location.absUrl();
		console.log("Current URL:", currentURL);

		var parts = currentURL.split('/');
		const id = parts[parts.length - 1];

		var item = $scope.items.find(item => item.id === id);

		var name = item ? item.image : null;
		var one = "one";
		var urlOneImage = `${url}/${one}/${name}`;

		$http.get(urlOneImage).then(resp => {
			$scope.filenames = resp.data;

			// Lấy tên ảnh đã lưu trước đó từ LocalStorage
			var uploadedImage = localStorage.getItem('uploadedImage');
			if (uploadedImage) {
				$scope.user.image = uploadedImage;
			}
		}).catch(error => {
			console.log("Error", error);
		});
	};


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
	$scope.loadData();
	// $scope.cart.loadFormLocalStorage();//khởi chạy





});
app.controller("orderList", function ($scope, $http) {
	//hiển thị dữ liệu trạng thái pending trong order-list
	$scope.ordersPending = [];
	$scope.currentPage = 1;
	$scope.pageSize = 5; // Số đơn hàng trên mỗi trang
	$scope.totalPages = 0;
	$scope.displayedOrders = [];

	$scope.updateDisplayedOrders = function () {
		const startIndex = ($scope.currentPage - 1) * $scope.pageSize;
		const endIndex = startIndex + $scope.pageSize;
		$scope.displayedOrders = $scope.ordersPending.slice(startIndex, endIndex);
	};

	$http.get('/pcgearhub/rest/order-list/pending')
		.then(function (response) {
			$scope.ordersPending = response.data;
			console.log($scope.ordersPending);
			// Tính tổng số trang dựa trên số đơn hàng và kích thước trang
			$scope.totalPages = Math.ceil($scope.ordersPending.length / $scope.pageSize);

			// Hiển thị các đơn hàng trên trang đầu tiên ban đầu
			$scope.updateDisplayedOrders();
		})
		.catch(function (error) {
			console.error('Error fetching order list:', error);
		});

	$scope.goToPage = function (pageNumber) {
		if (pageNumber >= 1 && pageNumber <= $scope.totalPages) {
			$scope.currentPage = pageNumber;
			$scope.updateDisplayedOrders();
		}
	};
	// --------------------------------------------------hiển thị dữ liệu của delivery
	$scope.ordersDelivery = [];
	$scope.currentDeliveryPage = 1;
	$scope.deliveryPageSize = 5;
	$scope.deliveryTotalPages = 1;

	$scope.getDeliveryOrders = function () {
		$http.get('/pcgearhub/rest/order-list/delivery')
			.then(function (response) {

				$scope.ordersDelivery = response.data;
				// Tính tổng số
				$scope.deliveryTotalPages = Math.ceil($scope.ordersDelivery.length / $scope.deliveryPageSize);

				// Hiển thị các đơn hàng trên trang đầu tiên ban đầu
				$scope.updateDisplayedDeliveryOrders();
			})
			.catch(function (error) {
				// Xử lý lỗi khi gọi API
				console.error('Error fetching delivery order list:', error);
			});
	};

	// Gọi hàm để lấy danh sách đơn hàng khi trang được tải
	$scope.getDeliveryOrders();

	// Hàm cập nhật danh sách đơn hàng hiển thị trên trang hiện tại
	$scope.updateDisplayedDeliveryOrders = function () {
		var startIndex = ($scope.currentDeliveryPage - 1) * $scope.deliveryPageSize;
		var endIndex = startIndex + $scope.deliveryPageSize;
		$scope.displayedDeliveryOrders = $scope.ordersDelivery.slice(startIndex, endIndex);
	};

	// Hàm chuyển đến trang được chọn
	$scope.goToDeliveryPage = function (pageNumber) {
		if (pageNumber >= 1 && pageNumber <= $scope.deliveryTotalPages) {
			$scope.currentDeliveryPage = pageNumber;
			$scope.updateDisplayedDeliveryOrders();
		}
	};
	//--------------hiển thị dữ liệ cho complete ---------------------
	$scope.ordersComplete = [];  // Mảng lưu trữ danh sách đơn hàng đã hoàn tất
	$scope.currentCompletePage = 1;      // Trang hiện tại
	$scope.completePageSize = 5;        // Số lượng đơn hàng trên mỗi trang
	$scope.completeTotalPages = 1;       // Tổng số trang, khởi tạo ban đầu

	// Hàm gọi API để lấy danh sách đơn hàng đã hoàn tất
	$scope.getCompleteOrders = function () {
		$http.get('/pcgearhub/rest/order-list/complete')
			.then(function (response) {
				// Xử lý phản hồi từ API thành công
				$scope.ordersComplete = response.data;
				console.log($scope.ordersComplete);

				// Tính tổng số trang dựa trên số đơn hàng và kích thước trang
				$scope.completeTotalPages = Math.ceil($scope.ordersComplete.length / $scope.completePageSize);

				// Hiển thị các đơn hàng trên trang đầu tiên ban đầu
				$scope.updateDisplayedCompleteOrders();
			})
			.catch(function (error) {
				// Xử lý lỗi khi gọi API
				console.error('Error fetching complete order list:', error);
			});
	};

	// Gọi hàm để lấy danh sách đơn hàng khi trang được tải
	$scope.getCompleteOrders();

	// Hàm cập nhật danh sách đơn hàng hiển thị trên trang hiện tại
	$scope.updateDisplayedCompleteOrders = function () {
		var startIndex = ($scope.currentCompletePage - 1) * $scope.completePageSize;
		var endIndex = startIndex + $scope.completePageSize;
		$scope.displayedCompleteOrders = $scope.ordersComplete.slice(startIndex, endIndex);
	};

	// Hàm chuyển đến trang được chọn
	$scope.goToCompletePage = function (pageNumber) {
		if (pageNumber >= 1 && pageNumber <= $scope.completeTotalPages) {
			$scope.currentCompletePage = pageNumber;
			$scope.updateDisplayedCompleteOrders();
		}
	};


	//hiển thị dũ liệu cho cancelled
	$scope.ordersCancelled = [];  // Mảng lưu trữ danh sách đơn hàng đã hủy
	$scope.currentCancelledPage = 1;      // Trang hiện tại
	$scope.cancelledPageSize = 5;        // Số lượng đơn hàng trên mỗi trang
	$scope.cancelledTotalPages = 1;       // Tổng số trang, khởi tạo ban đầu

	// Hàm gọi API để lấy danh sách đơn hàng đã hủy
	$scope.getCancelledOrders = function () {
		$http.get('/pcgearhub/rest/order-list/cancelled')
			.then(function (response) {
				// Xử lý phản hồi từ API thành công
				$scope.ordersCancelled = response.data;
				console.log($scope.ordersCancelled);

				// Tính tổng số trang dựa trên số đơn hàng và kích thước trang
				$scope.cancelledTotalPages = Math.ceil($scope.ordersCancelled.length / $scope.cancelledPageSize);

				// Hiển thị các đơn hàng trên trang đầu tiên ban đầu
				$scope.updateDisplayedCancelledOrders();
			})
			.catch(function (error) {
				// Xử lý lỗi khi gọi API
				console.error('Error fetching cancelled order list:', error);
			});
	};

	// Gọi hàm để lấy danh sách đơn hàng khi trang được tải
	$scope.getCancelledOrders();

	// Hàm cập nhật danh sách đơn hàng hiển thị trên trang hiện tại
	$scope.updateDisplayedCancelledOrders = function () {
		var startIndex = ($scope.currentCancelledPage - 1) * $scope.cancelledPageSize;
		var endIndex = startIndex + $scope.cancelledPageSize;
		$scope.displayedCancelledOrders = $scope.ordersCancelled.slice(startIndex, endIndex);
	};

	// Hàm chuyển đến trang được chọn
	$scope.goToCancelledPage = function (pageNumber) {
		if (pageNumber >= 1 && pageNumber <= $scope.cancelledTotalPages) {
			$scope.currentCancelledPage = pageNumber;
			$scope.updateDisplayedCancelledOrders();
		}
	};


	$scope.cancelOrder = function (id) {
		var url = `/pcgearhub/rest/ordered-list/details/` + id;
		var data = { status: 'cancelled' };

		$http.put(url, data)
			.then(function (response) {
				// Handle success, e.g., show a success message
				console.log('Order cancelled successfully.');
			})
			.catch(function (error) {
				// Handle error, e.g., show an error message
				console.error('Error cancelling order:', error);
			});
	};

	$scope.showSwal = function () {
		// Show the SweetAlert dialog with custom animation
		Swal.fire({
			title: '',
			showClass: {
				popup: 'animate__animated animate__fadeInDown'
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOutUp'
			}
		})
	};

	$scope.showInputDialog = function (id) {
		Swal.fire({
			input: 'textarea',
			inputLabel: 'Lý do hủy đơn',
			inputPlaceholder: 'Nhập lý do hủy đơn...',
			inputAttributes: {
				'aria-label': 'Type your message here'
			},
			showCancelButton: true
		}).then(function (result) {
			if (result.isConfirmed && result.value) {

				$scope.cancelledOrder(id, result.value)
			}
		});
	}
	$scope.cancelledOrder = (id, result) => {
		console.log($scope.nodes + "000000")
		var urlID = `http://localhost:8088/pcgearhub/rest/invoice/${id}`;
		$http.get(urlID).then(resp => {
			$scope.invoice = resp.data;
			console.log("Success", resp);
			console.log($scope.invoice)
			var invoice = angular.copy($scope.invoice);
			invoice.status = "cancelled"
			invoice.node = result
			$http.put(urlID, invoice).then(resp => {
				var index = $scope.displayedOrders.findIndex(item => item.id == invoice.id)
				if (index !== -1) {
					$scope.displayedOrders.splice(index, 1); // Xóa phần tử tại index
				}
				console.log("Success", resp);
				/*Cập nhật lại số lượng sản phẩm*/
				$scope.updateQuantityProduct(invoice.id)
			}).catch(error => {
				console.log("Error", error);
			});
		}).catch(error => {
			console.log("Error", error);
		});
	}

	$scope.updateQuantityProduct = (invoiceID) => {
		var detailedInvoiceByInvoice = [];
		var detailedInvoices = "http://localhost:8088/pcgearhub/rest/detailedInvoices";
		var urlDetailedInvoices = `${detailedInvoices}`;

		$http.get(urlDetailedInvoices).then(resp => {
			$scope.detailedInvoices = resp.data;
			angular.forEach($scope.detailedInvoices, function (detailedInvoice) {
				if (detailedInvoice.invoice.id == invoiceID) {
					detailedInvoiceByInvoice.push(detailedInvoice);
				}
			});

			for (var i = 0; i < detailedInvoiceByInvoice.length; i++) {
				var detailedInvoice = detailedInvoiceByInvoice[i];
				var urlProduct = `http://localhost:8088/pcgearhub/rest/product/${detailedInvoice.product.id}`;

				console.log(urlProduct);
				console.log(detailedInvoice.product);

				var updatedProduct = angular.copy(detailedInvoice.product);
				updatedProduct.quantity += detailedInvoice.quantity;

				$http.put(urlProduct, updatedProduct).then(resp => {
					console.log("Success", resp);
				}).catch(error => {
					console.log("Error", error);
				});
			}

			console.log(detailedInvoiceByInvoice);
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	};


});


// do danh muc 

app.controller("loadFormdanhmuc", function ($scope, $location, $http) {

});
