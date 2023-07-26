const app = angular.module("shopping-cart-app",[]);
app.controller("shopping-cart-ctrl" , function ($scope ,$http) {
   
    $scope.cart = {
       
        items: [],

        add(id) {
            var stringId = id.toString(); // Chuyển đổi id thành kiểu String
        
            var item = this.items.find(item => item.id === stringId); // Sử dụng === để so sánh kiểu dữ liệu nghiêm ngặt
            if (item) { 
                item.qty++;
                this.saveToLocalStorage();
            } else {
                $http.get(`/pcgearhub/rest/product/${stringId}`).then(resp => {
                    resp.data.qty = 1;
                    this.items.push(resp.data);
                    this.saveToLocalStorage();
                });
            }
        },
        
      
       remove(id){
        var index = this.items.findIndex(item => item.id == id);
        this.items.splice(index ,1);
        this.saveToLocalStorage();
       }, //xóa sản phẩm khỏi giỏ hàng

         clear(){
            this.items = []
            this.saveToLocalStorage();
         }, //xóa sạch các mặt hàng

        // amt_of(item){},//tính thành  tiền của một sản phẩm
        // },

        get count(){//tổng số lượng trong mặt hàng
            return this.items
                    .map(item => item.qty)
                    .reduce((total ,qty) => total += qty,0);
        },

        get amount(){//tổng thành tiền của các mặt hàng
            return this.items
            .map(item => item.qty * item.price)
            .reduce((total ,qty) => total += qty,0);

        },
        saveToLocalStorage(){ // lưu vào localSto
            var json = JSON.stringify(angular.copy(this.items));
            localStorage.setItem("cart", json);
        },
        loadFormLocalStorage(){//đọc giỏ hàng từ local storage
            var json = localStorage.getItem("cart");
            this.items = json ? JSON.parse(json) : [];

        }, 

        decreaseQuantity(item) {
            if (item.qty > 1) {
                item.qty--;
                this.saveToLocalStorage();
            }
        },

        increaseQuantity(item) {
            if (item.qty < item.quantity) {
                item.qty++;
                this.saveToLocalStorage();
            }
        },
        
    }

    $scope.cart.loadFormLocalStorage();//khởi chạy

    $scope.hasCheckedItems = function () {//kiểm tra khi click vào thanh toán
        for (var i = 0; i < $scope.cart.items.length; i++) {
            if ($scope.cart.items[i].checked) {
                return true;
            }
        }
        return false;
    };

    $scope.checkAllItems = function () {//checkall
        for (var i = 0; i < $scope.cart.items.length; i++) {
          $scope.cart.items[i].checked = $scope.checkAll;
        }
      };

      $scope.updateSelectedItems = function () {//kiểm lỗi checkbox
        for (var i = 0; i < $scope.cart.items.length; i++) {
          $scope.cart.items[i].checked = $scope.checkAll;
        }
      };
    
      $scope.getTotalAmount = function () {
        var totalAmount = 0;
        for (var i = 0; i < $scope.cart.items.length; i++) {
          if ($scope.cart.items[i].checked) {
            totalAmount += $scope.cart.items[i].qty * $scope.cart.items[i].price;
          }
        }
        return totalAmount;
      };

      

      
});