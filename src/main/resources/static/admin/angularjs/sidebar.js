/**
* 
*/
let host = "http://localhost:8088/pcgearhub/rest";

const app = angular.module("myApp", []);
app.controller("ctrl", function ($scope, $http) {

	$scope.u = {};
	$scope.load_user = function () {

		var url = `${host}/users`;
		$http.get(url).then(resp => {
			// nếu có kết quả trả về thì nó sẽ nằm trong resp và đưa vào $scope.items
			$scope.u = resp.data;
			console.log("Success", resp);
		}).catch(error => {
			console.log("Error", error);
		});
	};
	$scope.load_User();

});