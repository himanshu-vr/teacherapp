'use strict';
/*
  controller for managing the login activities of student and teachers
  Aditya Gupta
*/
angular.module('studentApp').controller('homeCtrl',['$scope','$rootScope','$location','$timeout','$cookies', function ($scope,$rootScope,$location,$timeout,$cookies) {

  var data = $cookies.get('access_token');
  console.log(JSON.parse(data));
  $scope.lecture = function(){
  	$location.path('/student/lecture');
  }
}]);
