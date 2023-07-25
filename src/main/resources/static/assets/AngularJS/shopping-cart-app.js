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
        
         
        // remove(id){}, //xóa sản phẩm khỏi giỏ hàng

        // clear(){}, //xóa sạch các mặt hàng

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
        saveToLocalStorage(){
            var json = JSON.stringify(angular.copy(this.items));
            localStorage.setItem("cart", json);
        },

    };
});