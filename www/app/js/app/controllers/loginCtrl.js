'use strict';
/*
  controller for managing the login activities of student and teachers
  Himanshu Gupta
*/
angular.module('studentApp').controller('loginCtrl',['$scope','$rootScope','$location','$timeout','$cookies', function ($scope,$rootScope,$location,$timeout,$cookies) {
  


  $scope.login = function(){
  	$location.path('home');
  }
}]);
