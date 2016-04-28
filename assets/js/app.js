// Angular component of application

// Initially load in our json file using ajax to gloabl variable
var deceased = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "../deceased.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

// Create angular application
var app = angular.module('app', ['angularUtils.directives.dirPagination']);

// Controller for individual boxes and information rendered
app.controller('MyController', [ '$scope', '$http', "$window", function($scope, $http, $window) {
    // Initially hide personal info box and reset information
    $("#personal-info").hide();
    $scope.currentPage = 1;
    $scope.deceased = [];
    $scope.showImage = false;
    $scope.showLink = false;
    $scope.deceased = deceased;
    resetPageSize();

    // When user clicks on box, set up personal information box and display as a dropdown
    $scope.displayIndivudualInfo = function(person) {
        $("#personal-info").show(500);
        // Add image if image is valid
        if (person.Photo != null && person.Photo != 0) {
            $scope.showImage = true;
            $scope.image = person.Photo;
        }
        else {
            $scope.showImage = false;
        }
        // Add news link if valid
        if (person["News Story"] != null && person["News Story"] != 0) {
            $scope.showLink = true;
            $scope.newsLink = person["News Story"];
        }
        else {
            $scope.showLink = false;
        }
        // Add city if valid
        if (person["City"] != null && person["City"] != 0) {
            $scope.city = person["City"];
        }
        else {
            $scope.city = "Location unknown";
        }
        // Add additional pieces of information from dataset
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

    // When user clicks 'X', hides the personal information box
    $scope.hideIndivudualInfo = function() {
        $("#personal-info").hide(500);
    }

    // Sets the appropriate number of boxes on the screen based on the screen width
    function resetPageSize() {
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
    }

    // When the window resizes, reset the number of boxes displayed for responsiveness
    var w = angular.element($window);
    w.bind('resize', function () {
        resetPageSize();
        angular.element(document.querySelector('#paging')).triggerHandler('click');
    });
}]);

// Separate controller for pagination
app.controller('OtherController', ['$scope', function($scope){}]);
