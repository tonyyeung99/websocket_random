(function () {
'use strict'
var NUM_RANDOM = 50;
//var NUM_MAX_VALUE = 100;
//var NUM_MIN_VALUE = 1;
var THRESHOLD_UP = 80;
var THRESHOLD_DOWN = 20;
var TD_CLASSES = ['highlight-red', 'highlight-green','highlight-transparent'];

var app = angular.module("app", []);
app.controller("appcontrol", function ($scope, $timeout, $interval) {
//    $scope.stop = false;
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

//    socket.on('message', function(msg){
//        console.log(msg);
//    });

    socket.on('newnumber', function(msg){
        console.log("number:" + msg);
         $scope.numbers_clone.unshift(msg)
         $scope.numbers_clone.pop()
    });

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
app.directive('highlighter', function ($timeout) {
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
