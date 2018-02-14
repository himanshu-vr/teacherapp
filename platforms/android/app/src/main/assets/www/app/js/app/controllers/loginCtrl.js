'use strict';
/*
  controller for managing the login activities of student and teachers
  Himanshu Gupta
*/
angular.module('studentApp').controller('loginCtrl',['$scope','$rootScope','$location','$timeout','$cookies','studentService', function ($scope,$rootScope,$location,$timeout,$cookies,studentService) {

if($cookies.get('access_token') == undefined || $cookies.get('access_token') == null){
  $scope.init = function(){
    $scope.UserTypeId = 1;
    document.getElementById("isStudent").focus();
    $scope.inValid =  '';
    $scope.loginName = 'Sign In';
  }
  //function for student
  $scope.studentSelect = function(){
    $scope.UserTypeId = 1;
  }
  $scope.teacherSelect = function(){
    $scope.UserTypeId = 2;
  }

  $scope.login = function(user){
    $scope.loginName = 'Signing In...';
    $scope.loginObj = {
      "UserName" : user.name,
      "Password" : user.password,
      "UserTypeId" :  $scope.UserTypeId
    }
    //login user services api
    studentService.login($scope.loginObj)
      .then(function onSuccess(response) {
        if(response != undefined && typeof(response) == 'object'){
          if(response.data.ErrorMessage == '' && response.data.access_token != null){
            var now = new Date();
            var time = now.getTime();
            time += 3600 * 1000 * 14;
            now.setTime(time);
            $cookies.put("access_token",JSON.stringify(response.data),{expires:now.toUTCString()});
            $location.path('/home');
          }else{
            $scope.loginName = 'Sign In';
            $scope.inValid = 'Invalid Username or Password';
          }
        }else{
          $scope.loginName = 'Sign In';
        }
      })
      .catch(function onError(sailsresponse) {
      })
      .finally(function eitherWay(){
          $scope.loginName = 'Sign In';
      })
  }
}else{
  $location.path('/home');
}
}]);
