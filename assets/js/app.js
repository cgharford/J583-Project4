// Initially load in our json file
var victims = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "../victims.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

// Create angular application
var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);

myApp.controller('MyController', [ '$scope', '$http', "$window", function($scope, $http, $window) {
    $("#personal-info").hide();
    $scope.currentPage = 1;
    $scope.victims = [];
    $scope.showImage = false;
    $scope.showLink = false;
    $scope.victims = victims;
    size = window.innerWidth;
    if (size > 950) {
        $scope.pageSize = 5;
    }
    else if (size <= 950 && size > 600) {
        $scope.pageSize = 4;
    }
    else if (size <= 800 && size > 600) {
        $scope.pageSize = 3;
    }
    else if (size <= 600 && size > 450) {
        $scope.pageSize = 2;
    }
    else {
        $scope.pageSize = 1;
    }

    $scope.displayIndivudualInfo = function(person) {
        $("#personal-info").show(500);
        if (person.Photo != null && person.Photo != 0) {
            $scope.showImage = true;
            $scope.image = person.Photo;
        }
        else {
            $scope.showImage = false;
        }
        if (person["News Story"] != null && person["News Story"] != 0) {
            $scope.showLink = true;
            $scope.newsLink = person["News Story"];
        }
        else {
            $scope.showLink = false;
        }
        if (person["City"] != null && person["City"] != 0) {
            $scope.city = person["City"];
        }
        else {
            $scope.city = "Location unknown";
        }
        $scope.name = person.Name;
        $scope.cause = person['Cause of Death'];
        $scope.date = person['Date of Death'];
        $scope.gender = person['Gender'];
        $scope.age = person['Age'];
        $scope.race = person['Race'];
        $scope.armed = person['Was the deceased armed?'];
        $scope.priors = person['Did the deceased have priors?'];
        $scope.officer = person['Was the officer involved fired or suspended?'];
    }

    $scope.hideIndivudualInfo = function() {
        $("#personal-info").hide(500);
    }

    var w = angular.element($window);
    w.bind('resize', function () {
        size = window.innerWidth;
        if (size >= 950) {
            $scope.pageSize = 5;
        }
        else if (size < 950 && size >=800) {
            $scope.pageSize = 4;
        }
        else if (size < 800 && size >=600) {
            $scope.pageSize = 3;
        }
        else if (size <= 600 && size > 450) {
            $scope.pageSize = 2;
        }
        else {
            $scope.pageSize = 1;
        }

        angular.element(document.querySelector('#paging')).triggerHandler('click');
    });
}]);

myApp.controller('OtherController', ['$scope', function($scope){}]);

function updateVictims(data) {
    victims = data;
    console.log(victims);
}
