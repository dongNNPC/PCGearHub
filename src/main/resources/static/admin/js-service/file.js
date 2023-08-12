app.controller("ctrls", function ($scope, $http) {
    var urlImage = "http://localhost:8088/pcgearhub/rest/files/images";

    $scope.urlImage = function (filename) {
        return `${urlImage}/${filename}`
    }

    $scope.listImage = function () {
        $http.get(urlImage).then(resp => {
            $scope.filenames = resp.data;
        }).catch(error => {
            console.log("Error", error)
        })
    }

        $scope.upload =function(files){
            var form = new FormData();
            for(var i=0; i< files.length;i++){
                form.append("files",files[i])
            }
            $http.post(urlImage,form,{
                transformRequest: angular.identity,
                headers:{'Content-Type':undefined}
            }).then(resp=>{
                $scope.filenames.push(...resp.data)
            }).catch(error =>{
                console.log("Errors",error)
            })
        }
    $scope.delete = function (filename) {
        $http.delete(`${urlImage}/${filename}`).then(resp => {
            let i = $scope.filenames.findIndex(name => name == filename);
            $scope.filenames.splice(i, 1);
        }).catch(error => {
            console.log("Error", error)
        });

    }

    $scope.download = function (filename) {
        $http.get(`${urlImage}/${filename}`).then(resp => {
            
        }).catch(error => {
            console.log("Error", error)
        });

    }

    $scope.listImage();
})