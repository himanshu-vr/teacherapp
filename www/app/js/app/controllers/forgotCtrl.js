'use strict';
/*
  controller for managing the login activities of student and teachers
  Himanshu Gupta
*/
angular.module('studentApp').controller('forgotCtrl',['$scope','$rootScope','$location','$timeout','$cookies','studentService', function ($scope,$rootScope,$location,$timeout,$cookies,studentService) {

if($cookies.get('access_token') == undefined || $cookies.get('access_token') == null){
  $scope.forgot = function(user){
    console.log(user);
  }
}else{
  $location.path('/home');
}
}]);
