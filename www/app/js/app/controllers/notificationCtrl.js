'use strict';
/*
  controller for managing the notifications of student and teachers
  Aditya Gupta
*/
angular.module('studentApp').controller('notificationCtrl',['$scope','$rootScope','$location','$timeout','$cookies', function ($scope,$rootScope,$location,$timeout,$cookies) {

// for notifications
  $scope.notifyBack = function(){
    $location.path('/home');
  }
}]);