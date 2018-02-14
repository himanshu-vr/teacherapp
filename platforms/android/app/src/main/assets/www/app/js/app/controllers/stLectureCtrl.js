'use strict';
/*
  controller for managing the login activities of student and teachers
  Aditya Gupta
*/
angular.module('studentApp').controller('stLectureCtrl',['$scope','$rootScope','$location','$timeout','$cookies', function ($scope,$rootScope,$location,$timeout,$cookies) {
  $scope.goBack  = function(){
    $location.path('/home');
  }
}]);
