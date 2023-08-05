var app = angular.module('myApp', []);
let host = "http://localhost:8088/pcgearhub/rest";
app.controller('ReportController', function ($scope, $http, $filter) {

    //tổng doanh thu trong index
    $http.get(`${host}/detailedInvoice/totalRevenue`)
        .then(function (response) {
            $scope.reports = response.data;
        })
        .catch(function (error) {
            console.error('Error loading data:', error);
        });

    //tổng phiếu nhập kho trong index
    $http.get(`${host}/stockReceipt/getTotalQuantityStock`)
        .then(function (response) {
            $scope.reportsTotalQuantity = response.data;
        })
        .catch(function (error) {
            console.error('Error loading data:', error);
        });

     //tổng phiếu nhập kho trong index
     $http.get(`${host}/users/getTotalUser`)
     .then(function (response) {
         $scope.reportsUser = response.data;
     })
     .catch(function (error) {
         console.error('Error loading data:', error);
     });

    //tổng số lượng trong table của thống kê doanh thu chi tiết
    $http.get(`${host}/detailedInvoice/totalRevenueDetails`)
        .then( (response) => {
            $scope.totalRevenueDetails = response.data;

        })
        .catch( (error) =>{
            console.error('Error loading data:', error);
        });


    $scope.currentPage = 1;
    $scope.itemsPerPage = 5;

    // Hàm gọi API và cập nhật dữ liệu
    function fetchData()  {
        $http.get(`${host}/detailedInvoice/totalRevenueDetails`)
            .then( (response) =>{
                $scope.totalRevenueDetails = response.data;
                $scope.totalItems = $scope.totalRevenueDetails.length;
                updatePageData();
            })
            .catch( (error)=> {
                console.error('Error loading data:', error);
            });
    }

    // Hàm cập nhật dữ liệu phân trang
    function updatePageData() {
        $scope.begin = ($scope.currentPage - 1) * $scope.itemsPerPage;
        $scope.end = $scope.begin + $scope.itemsPerPage;
        $scope.displayedData = $scope.totalRevenueDetails.slice($scope.begin, $scope.end);
    }

    // Gọi fetchData để lấy dữ liệu ban đầu
    fetchData();

    // Xử lý khi trang thay đổi
    $scope.pageChanged =  () =>{
        updatePageData();
    };

    // Các hàm phân trang tương tự như trước
    $scope.first =  () =>{
        $scope.currentPage = 1;
        $scope.pageChanged();
    };

    $scope.prev =  () =>{
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            $scope.pageChanged();
        }
    };

    $scope.next =  () =>{
        if ($scope.currentPage < Math.ceil($scope.totalItems / $scope.itemsPerPage)) {
            $scope.currentPage++;
            $scope.pageChanged();
        }
    };

    $scope.last =  ()=> {
        $scope.currentPage = Math.ceil($scope.totalItems / $scope.itemsPerPage);
        $scope.pageChanged();
    };

    $scope.formatDate =  (dateString)=> {
        var date = new Date(dateString);
        return $filter('date')(date, 'dd-MM-yyyy');
    };

    $scope.generatePDF =  ()=> {
        var totalRevenue = 0;
        for (var i = 0; i < $scope.totalRevenueDetails.length; i++) {
            totalRevenue += $scope.totalRevenueDetails[i].productPrice * $scope.totalRevenueDetails[i].quantity;
        }

        var tableBody = $scope.totalRevenueDetails.map(rp => [
            rp.userName,
            rp.productName,
            rp.productPrice,
            rp.quantity,
            $scope.formatDate(rp.orderDate),
            rp.paymentMethod
        ]);

        var docDefinition = {
            content: [
                { text: 'THỐNG KÊ TỔNG DOANH THU', style: 'header' },
                { text: '---------------------0--------------------', alignment: 'center' }, // Đường ngang
                { text: 'Tổng doanh thu là: ' + $filter('number')(totalRevenue, 0) + 'vnđ', alignment: 'right', bold: true },
                { text: '              ' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body: [
                            [
                                { text: 'Tên người mua', bold: true, fillColor: '#f2f2f2' },
                                { text: 'Tên sản phẩm', bold: true, fillColor: '#f2f2f2' },
                                { text: 'Giá', bold: true, fillColor: '#f2f2f2' },
                                { text: 'Số lượng', bold: true, fillColor: '#f2f2f2' },
                                { text: 'Ngày mua', bold: true, fillColor: '#f2f2f2' },
                                { text: 'Phương thức thanh toán', bold: true, fillColor: '#f2f2f2' }
                            ],
                            ...tableBody
                        ],
                        bodyStyles: { border: undefined },
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center'
                }
            }
        };

        pdfMake.createPdf(docDefinition).download('thong_ke_doanh_thu.pdf');



    };

    //thống kê theo năm
    $scope.exportDataByYear =  ()=> {
        var selectedYear = parseInt($scope.selectedYear);

        // Filter the data based on the selected year
        var filteredData = $scope.totalRevenueDetails.filter(function (rp) {
            return parseInt(rp.orderDate.substring(0, 4)) === selectedYear;

        });
        console.log(filteredData)

        var totalRevenue = 0;
        for (var i = 0; i < filteredData.length; i++) {
            totalRevenue += filteredData[i].productPrice * filteredData[i].quantity;
        }

        var tableBody = filteredData.map(rp => [
            rp.userName,
            rp.productName,
            rp.productPrice,
            rp.quantity,
            $scope.formatDate(rp.orderDate),
            rp.paymentMethod
        ]);

        var docDefinition = {
            content: [
                { text: 'THỐNG KÊ TỔNG DOANH THU NĂM ' + selectedYear, style: 'header' },
                { text: '---------------------0--------------------', alignment: 'center' }, // Đường ngang
                { text: 'Tổng doanh thu là: ' + $filter('number')(totalRevenue, 0) + 'vnđ', alignment: 'right', bold: true },
                { text: '              ' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body: [
                            [
                                { text: 'Tên người mua', bold: true, fillColor: '#f2f2f2' },
                                { text: 'Tên sản phẩm', bold: true, fillColor: '#f2f2f2' },
                                { text: 'Giá', bold: true, fillColor: '#f2f2f2' },
                                { text: 'Số lượng', bold: true, fillColor: '#f2f2f2' },
                                { text: 'Ngày mua', bold: true, fillColor: '#f2f2f2' },
                                { text: 'Phương thức thanh toán', bold: true, fillColor: '#f2f2f2' }
                            ],
                            ...tableBody
                        ],
                        bodyStyles: { border: undefined },
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center'
                }
            }
        };

        pdfMake.createPdf(docDefinition).download(`thong_ke_doanh_thu_${selectedYear}.pdf`);
    };

    //tìm kiếm sản phẩm trong index
    $scope.search = (name) => {
        if (name != "") {
            var url = `${host}/detailedInvoice/totalRevenueDetails/search/${name}`;
        } else {
            var url = `${host}/detailedInvoice/totalRevenueDetails`;
        }
        $http({
            method: "GET",
            url: url,
        })
            .then((resp) => {
                $scope.totalRevenueDetails = resp.data;
                updatePageData();
                // Cập nhật số lượng trang sau khi cập nhật dữ liệu
                $scope.totalItems = $scope.totalRevenueDetails.length;
                console.log("search", resp);
            })
            .catch((error) => {
                console.log("Error_edit", error);
            });
    };

});
app.filter('uniqueYear',  () =>{
    return  (input) =>{
        var uniqueYears = []; // Khai báo và gán giá trị ban đầu
        var output = [];

        angular.forEach(input,  (rp)=> {
            var year = new Date(rp.orderDate).getFullYear();
            if (uniqueYears.indexOf(year) === -1) {
                uniqueYears.push(year);
                output.push(rp);
            }
        });

        return output;
    };



});