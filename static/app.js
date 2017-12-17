//Assumpution:  1.  The random number range from 1 ~ 100
//              2.  If number is larger than or equal to 80, the color of the number will change to red
//              3.  If number is smaller than or equal to 20, the color of the number will change to green
//              4.  The rendering speed in the UI is 2000 ms, i.e. render every 2000 ms

(function () {
'use strict'
var NUM_RANDOM = 50;
var THRESHOLD_UP = 80;
var THRESHOLD_DOWN = 20;
var UI_RENDERING_SPEED = 2000;
var TD_CLASSES = ['highlight-red', 'highlight-green','highlight-transparent'];

angular.module("app", [])

//Controller
angular.module('app')
.controller("appcontrol", function ($scope, $timeout, $interval, $http) {
    self = this;

    //initialize variables
    $scope.numbers = initArray(NUM_RANDOM);
    $scope.numbers_clone = $scope.numbers.slice(0);

    //initialize actions
    setRenderingSpeed($scope, $interval)
    connectRandomServer($scope);
    getCurrentServerSpeedGeneratingNumber($scope, $http)

    //*************************************************************
    //function for get the slice of number specified by the parameer
    //@start - start index
    //@end - end index
    //*************************************************************
    $scope.numberRange = function(start, end) {
      var items = [];
      for (var i = start; i < end; i++) {
          items.push($scope.numbers[i]);
      }
      return items;
    };

    //*************************************************************
    // function to set the Server Speed
    //*************************************************************
    $scope.changeServerSpeed = function () {
        console.log("server_interval : " + $scope.server_interval)
        $http({
            method: 'GET',
            url: getURLString('/set_server_interval'),
            params: {
                new_interval: $scope.server_interval
            }
        }).success(function (data, status, headers, config) {
            $scope.current_server_interval = data
        });
    };
});

//Directive
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

function getCurrentServerSpeedGeneratingNumber($scope, $http){
    $http({
        method: 'GET',
        url: getURLString('/get_server_interval')
    }).success(function (data, status, headers, config) {
        $scope.server_interval= Number(data);
        $scope.current_server_interval= Number(data);
    });
}

function getURLString(uri){
    return 'http://' +document.domain + ":" +location.port + uri;
}

function setRenderingSpeed($scope, $interval){
    var var_1=$interval(function(){
        $scope.numbers = $scope.numbers_clone;
    },UI_RENDERING_SPEED);
}

function connectRandomServer($scope){
    //var socket = io.connect('http://' +document.domain + ":" +location.port + '/random');
    var socket = io.connect(getURLString('/random'));
    socket.on('connect', function(){
        console.log('connected');
        socket.emit('startnewnumber', {})
    });

    socket.on('newnumber', function(msg){
         $scope.numbers_clone.unshift(msg)
         $scope.numbers_clone.pop()
    });
}

function initArray(number){
    var arr = new Array()
    for (var i = 0; i < number; i++) {
        arr[i] = 0;
    };
    return arr
}

function removeHighlightClass(element){
  for (var i = 0; i < TD_CLASSES.length; i++) {
    if(element.hasClass(TD_CLASSES[i])){
      element.removeClass(TD_CLASSES[i]);
    }
  }
}
})();
