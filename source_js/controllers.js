var mp4Controllers = angular.module('mp4Controllers', []);

mp4Controllers.controller('QueryController', ['$scope', '$window', '$http', function($scope, $window, $http) {
  $scope.endpoint = $window.sessionStorage.query || "http://localhost:8080/SimpleDBRestAPI/api/query/";
  $scope.valid = false;
  $scope.select = "*";
  $scope.from = "STUDENT";
  $scope.where = "majorid = 10 or majorid = 20";
  $scope.result = "";

  $scope.statement = function() {
    var stmt = "select " + $scope.select + " from " + $scope.from;
    return $scope.where === "" ? stmt : (stmt + " where " + $scope.where);
  }

  $scope.check = function() {
    var select_valid = $scope.select === undefined ? false : $scope.select.length !== 0;
    var from_valid = $scope.from === undefined ? false : $scope.from.length !== 0;
    $scope.valid = select_valid && from_valid;
  }

  $scope.query = function(){
    $http.post($scope.endpoint, $scope.statement()).then(function(response) {
        $scope.result = response.data;
    }).catch(function(response) {
      $scope.result = response.data;
      var error_msg = $scope.result.error.replace(/\n/g, "<br>").replace(/\t/g, "&emsp;");
      $("#error-msg").html(error_msg);
    })
  };
}]);

mp4Controllers.controller('UpdateController', ['$scope', '$window', '$http', function($scope, $window, $http) {
  $scope.endpoint = $window.sessionStorage.update || "http://localhost:8080/SimpleDBRestAPI/api/update/";
  $scope.statement = "update STUDENT set MajorId=30 where SName = 'amy'";
  $scope.result = "";

  $scope.valid = false;
  $scope.check = function() {
    $scope.valid = $scope.statement === undefined ? false : $scope.statement.length !== 0;
  }

  $scope.update = function(){
    $http.post($scope.endpoint, $scope.statement).then(function(response) {
        $scope.result = response.data;
    }).catch(function(response) {
      $scope.result = response.data;
      var error_msg = $scope.result.error.replace(/\n/g, "<br>").replace(/\t/g, "&emsp;");
      $("#error-msg").html(error_msg);
    })
  };
}]);


mp4Controllers.controller('SettingsController', ['$scope', '$window', function($scope, $window) {
  $scope.queryUrl = $window.sessionStorage.query || "http://localhost:8080/SimpleDBRestAPI/api/query/";
  $scope.updateUrl = $window.sessionStorage.update || "http://localhost:8080/SimpleDBRestAPI/api/update/";
  $scope.message = "";

  $scope.setUrl = function(){
    $window.sessionStorage.query = $scope.queryUrl;
    $window.sessionStorage.update = $scope.updateUrl;
    $scope.message = "URLs Set";
  };

}]);
