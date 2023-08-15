/**
* 
*/
app.controller("ctrl", function($scope, $http) {
	$scope.pageCount = 1;
	$scope.items = [];
	$scope.invoice = {};
	$scope.nodes = '';

	$scope.load_all = function() {

		var url = `${host}/invoices/pending`;
		$http.get(url).then(resp => {
			// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.items
			$scope.items = resp.data;
			$scope.nodes = 's'
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


	$scope.message = (animation, title, icon) => {
		toastMixin.fire({
			animation: animation,
			title: title,
			icon: icon
		});
	}

	$scope.update = (id) => {
		var urlID = `${host}/invoice/${id}`;
		$http.get(urlID).then(resp => {
			$scope.invoice = resp.data;
			var invoice = angular.copy($scope.invoice);
			invoice.status = "delivery"
			$http.put(urlID, invoice).then(resp => {
				var index = $scope.items.findIndex(item => item.id == invoice.id)
				if (index !== -1) {
					$scope.items.splice(index, 1); // Xóa phần tử tại index
				}
				console.log("Success", resp);
				/*Thông báo thành công*/
				$scope.history("Đã chuyển trạng thái của đơn hàng " + id + " sang đang giao hàng")
				$scope.message(true, "Chuyển trạng thái sang giao hàng thành công", "success")
			}).catch(error => {
				console.log("Error", error);
			});
		}).catch(error => {
			console.log("Error", error);
		});
	}

	$scope.cancelledOrder = (id) => {
		var giaTriNhap = document.getElementById('node').value;
		console.log('Giá trị đã nhập:', giaTriNhap);
		console.log($scope.nodes + "000000")
		var urlID = `${host}/invoice/${id}`;
		$http.get(urlID).then(resp => {
			$scope.invoice = resp.data;
			console.log("Success", resp);
			console.log($scope.invoice)
			var invoice = angular.copy($scope.invoice);
			invoice.status = "cancelled"

			invoice.node = giaTriNhap
			$http.put(urlID, invoice).then(resp => {
				var index = $scope.items.findIndex(item => item.id == invoice.id)
				if (index !== -1) {
					$scope.items.splice(index, 1); // Xóa phần tử tại index
				}
				console.log("Success", resp);
				$scope.history("Đã chuyển trạng thái của đơn hàng " + id + " sang đã hủy")
				$scope.message(true, "Chuyển trạng thái sang hủy đơn", "success")
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
			angular.forEach($scope.detailedInvoices, function(detailedInvoice) {
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