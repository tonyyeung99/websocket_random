(function () {
'use strict'
var NUM_RANDOM = 50;
//var NUM_MAX_VALUE = 100;
//var NUM_MIN_VALUE = 1;
var THRESHOLD_UP = 80;
var THRESHOLD_DOWN = 20;
var TD_CLASSES = ['highlight-red', 'highlight-green','highlight-transparent'];

//var app = angular.module("app", ['ui.router']);
//angular.module('app',['ui.router']);
//angular.module('app')
//.config(RoutesConfig);
//
//
//RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
//function RoutesConfig($stateProvider, $urlRouterProvider ) {
//
//  // Redirect to tab 1 if no other URL matches
//  $urlRouterProvider.otherwise('random/tab1');
//
//  // Set up UI states
//  $stateProvider
//    .state('tab1', {
//      url: 'tab1',
//      templateUrl: 'tab1'
//    })
//
//    .state('tab2', {
//      url: 'tab2',
//      templateUrl: 'tab2'
//    });
//}

angular.module("app", [])

angular.module('app')
.controller("appcontrol", function ($scope, $timeout, $interval, $http) {
//.controller("appcontrol", function ($scope, $timeout, $interval) {
//    $scope.stop = false;
    //$scope.server_speed = 500;
    //$scope.current_server_speed = $scope.server_speed;
    $scope.numbers = new Array();
    for (var i = 0; i < NUM_RANDOM; i++) {
        $scope.numbers[i] = 0;
    };
    $scope.numbers_clone=$scope.numbers.slice(0) ;
    $scope.numberRange = function(min, max) {
      var items = [];
      for (var i = min; i < max; i++) {
          items.push($scope.numbers[i]);
      }
      return items;
    };

    var var_1=$interval(function(){
        $scope.numbers = $scope.numbers_clone
    },2000);

    var socket = io.connect('http://' +document.domain + ":" +location.port + '/random');

    socket.on('connect', function(){
        console.log('connected');
        socket.emit('startnewnumber', {})
    });


    socket.on('newnumber', function(msg){
        console.log("number:" + msg);
         $scope.numbers_clone.unshift(msg)
         $scope.numbers_clone.pop()
    });

    //get current seed
    $http({
        method: 'GET',
        url: 'http://' +document.domain + ":" +location.port + '/get_server_speed'
    }).success(function (data, status, headers, config) {
        $scope.server_speed = data;
        $scope.current_server_speed = data
    });

     // function to submit the form after all validation has occurred
    $scope.submitForm = function () {
        console.log("server_speed : " + $scope.server_speed)
        $http({
            method: 'GET',
            url: 'http://' +document.domain + ":" +location.port + '/server_speed',
            params: {
                new_speed: $scope.server_speed
            }
        }).success(function (data, status, headers, config) {
            $scope.current_server_speed = data
        });
//        console.log('Stackoverflow JS func caled');
//        var regData = {
//            "email": user.email,
//            "password": user.password1
//        };
//
//        var jsonData = JSON.stringify(regData);
//        var request = $.ajax({
//            url: 'myurl',
//            type: 'POST',
//            data: jsonData,
//            headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json'
//            },
//            dataType: 'json',
//            complete: function (response) {
//                console.log(response.responseText);
//                if (response.responseText == 'success') {
//                    console.log('Registration Success');
//                    alert('Success');
//                    $scope.msgalert = 'Registration Success, Proceed to Login and Continue';
//                } else if (response.responseText == 'fail') {
//                    alert('registration failed');
//                    $scope.msgalert = 'Registration Failed, Please try again';
//                }
//            }
//        });
    };


//    var poll = function () {
//        if ($scope.stop) return;
//
//        //simulate stock values rising and falling
//        for (var i = 0; i < NUM_RANDOM; i++) {
//            $scope.numbers[i] = getRandomInt(NUM_MIN_VALUE, NUM_MAX_VALUE);
//        }
//        $timeout(poll, 2500);
//    };
//    poll();
});

angular.module('app').directive('highlighter', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.highlighter, function (nv, ov) {
                var newclass;
                if(nv > THRESHOLD_UP){
                  removeHighlightClass(element);
                  element.addClass('highlight-red')
                }else if (nv < THRESHOLD_DOWN && nv > 0) {
                  removeHighlightClass(element);
                  element.addClass('highlight-green')
                } else{
                  removeHighlightClass(element);
                  element.addClass('highlight-transparent')
                }
            });
        }
    };
});





//function getRandomInt(min, max) {
//    return Math.floor(Math.random() * (max - min + 1)) + min;
//}

function removeHighlightClass(element){
  for (var i = 0; i < TD_CLASSES.length; i++) {
    if(element.hasClass(TD_CLASSES[i])){
      element.removeClass(TD_CLASSES[i]);
    }
  }
}
})();
