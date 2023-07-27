const app = angular.module("shopping-cart-app", []);
app.controller("shopping-cart-ctrl", function ($scope, $http) {

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
        $http.get('/pcgearhub/rest/product')
            .then(function (response) {
                $scope.products = response.data;
                $scope.calculateTotalPages(); // Tính tổng số trang sau khi nhận dữ liệu
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });
    };

    // Gọi hàm loadData để tải dữ liệu lên trang index ban đầu
    $scope.loadData();

    $scope.cart.loadFormLocalStorage();//khởi chạy

});