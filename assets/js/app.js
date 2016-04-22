var victims = [];

var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);


myApp.controller('MyController', [ '$scope', '$http', function($scope, $http) {
  $scope.currentPage = 1;
  $scope.victims = [];

  $http.get('../victims.json').success(function(data){
    $scope.victims = data;
  });
}]);

myApp.controller('OtherController', ['$scope', function($scope){}]);
