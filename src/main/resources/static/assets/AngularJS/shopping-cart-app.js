let host = "http://localhost:8088/pcgearhub/rest";

const app = angular.module("shopping-cart-app", []);
app.controller("shopping-cart-ctrl", function ($scope, $location, $http, $timeout) {

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


    $scope.productsPerPage = 8; // Số lượng sản phẩm hiển thị trên mỗi trang
    $scope.currentPage = 1; // Trang hiện tại
    $scope.totalPages = 0; // Tổng số trang, ban đầu sẽ là 0
    $scope.products = []; // Mảng chứa danh sách sản phẩm

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


    $scope.order = {
        orderDate: new Date(),
        address: "",
        user: $("#user_id").text(),

        status: "pending",
        // phoneNumber: "",
        get detailedInvoices() {

            return $scope.selectedItems.map(item => {
                return {
                    product: { id: item.id },
                    price: item.price,
                    quantity: item.qty,
                    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value

                }
            })
        },
        confirm() {

            // const phoneNumberInput = document.querySelector('input[name="phoneNumber"]');
            // $scope.order.phoneNumber = phoneNumberInput ? phoneNumberInput.value : "";
            var order = angular.copy(this);
            $http.post("/pcgearhub/rest/orders", order).then(resp => {
                Swal.fire(
                    'Đặt hàng thành công',
                    '',
                    'success'
                )
                $scope.selectedItems = [];
                localStorage.removeItem('selectedItems');
                this.saveToLocalStorage();
                location.href = "/pcgearhub/ordered-list/" + resp.data.id;
            }).catch(error => {
                Swal.fire(
                    'Đặt hàng không thành công',
                    '',
                    'error'
                )
                console.log(error);
            })


        }
    }

    ///xử lý lấy các sản phẩm được tích sang trang confirm-info
    $scope.selectedItems = [];
    $scope.getSelectedItems = function () {
        $scope.selectedItems = [];
        for (var i = 0; i < $scope.cart.items.length; i++) {
            if ($scope.cart.items[i].checked) {
                $scope.selectedItems.push($scope.cart.items[i]);
            }
        }

        // Lưu vào Local Storage để sử dụng sau này trên trang mới
        localStorage.setItem('selectedItems', JSON.stringify($scope.selectedItems));

        // Chuyển sang trang mới
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









// sssssssssssssssssssssssssssssssssssssssssssssssss







    // ẩn
    $scope.showRoleSection = false;
    $scope.showActivitySection = false;
    $scope.showConfirmationSection = false;
    $scope.matkhau = false;
    $scope.id = false;


    $scope.reset = function () {
        $scope.user = { confirm: true, status: true, admin: false };
        $scope.loadData();
    };
    /*load all*/
    $scope.loadData1 = function () {
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

    $scope.validation = function () {
        var item = angular.copy($scope.user);
        $scope.errorMessageEmail = "";
        return true;
    }


    $scope.update = function () {
        if (!$scope.validation()) {
            // Validation failed, do not proceed with update
            return;
        }

        var item = angular.copy($scope.user);
        var url = `${host}/users/${$scope.user.id}`;
        $http.put(url, item).then(resp => {
            $scope.successMessage = "Cập nhật người dùng thành công.";
            $scope.showSuccessMessage = true;

            // Hiển thị Modal thông báo thành công
            $("#successModal").modal('show');

            // Tự động ẩn Modal sau 2 giây
            $timeout(function () {
                $("#successModal").modal('hide');
                $scope.showSuccessMessage = false;
            }, 2000);

            // Ẩn thông báo lỗi nếu không có lỗi
            $scope.hideError();

            // Hide the radio buttons after a successful update
            $scope.showRadioButtons = false;
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

    // Gọi hàm loadData để tải dữ liệu lên trang index ban đầu
    $scope.loadData();
    $scope.loadData1();
    $scope.cart.loadFormLocalStorage();//khởi chạy

});