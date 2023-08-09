/**
* 
*/
let host = "http://localhost:8088/pcgearhub/rest";

const app = angular.module("main", []);
app.controller("main", function($scope, $http) {
	$scope.pageCount = 1;
	$scope.user = {};
	$scope.items = [];
	$scope.u = {};
	$scope.load_user = function() {
		var s = "http://localhost:8088/pcgearhub/api/user"
		var url = `${s}`;
		$http.get(url).then(resp => {
			// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.items
			$scope.u = resp.data;
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	};
	
	$scope.load_user()

});