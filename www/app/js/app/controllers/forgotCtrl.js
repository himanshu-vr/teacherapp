'use strict';
/*
  controller for managing the login activities of student and teachers
  Himanshu Gupta
*/
angular.module('studentApp').controller('forgotCtrl',['$scope','$rootScope','$location','$timeout','$cookies','studentService', function ($scope,$rootScope,$location,$timeout,$cookies,studentService) {

if($cookies.get('access_token') == undefined || $cookies.get('access_token') == null){
  $scope.forgot = function(user){
    console.log(user);
    if(user != undefined && user.email != undefined && user.email != ''){
      $scope.loginObj = {
        "Email" : user.email
      }
      //login user services api
      studentService.forgotPassword($scope.loginObj)
        .then(function onSuccess(response) {
          if(response != undefined && response.Message == 'Email has been sent'){
            $scope.successMail = 'An email has been sent with the instructions, Please check your email';
          }else{
            $scope.isError = true;
            $scope.successMail = 'An error occured, Please try again later';
          }
        })
        .catch(function onError(sailsresponse) {
        })
        .finally(function eitherWay(){
            $scope.loginName = 'Sign In';
            $('#loginModal').modal('close');
        })
    }else{
      $scope.inValid = 'Email is mandatory'
    }
  }
}else{
  $location.path('/home');
}
$scope.goBack = function(){
    $location.path('/home');
  }
}]);
