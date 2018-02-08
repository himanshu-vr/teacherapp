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
  }
  //function for student
  $scope.studentSelect = function(){
    $scope.UserTypeId = 1;
  }
  $scope.teacherSelect = function(){
    $scope.UserTypeId = 2;
  }

  $scope.login = function(user){
    $scope.loginObj = {
      "UserName" : user.name,
      "Password" : user.password,
      "UserTypeId" :  $scope.UserTypeId
    }
    //login user services api
    studentService.login($scope.loginObj)
      .then(function onSuccess(response) {
        console.log(response);
        if(response != undefined && typeof(response) == 'object'){
          if(response.data.ErrorMessage == '' && response.data.access_token != null){
            var now = new Date();
            var time = now.getTime();
            time += 3600 * 1000 * 14;
            now.setTime(time);
            $cookies.put("access_token",response.data.access_token,{expires:now.toUTCString()});
            $location.path('/home');
          }else{

            $scope.inValid = 'Invalid Username or Password';
          }
        }
      })
      .catch(function onError(sailsresponse) {
      })
      .finally(function eitherWay(){

      })
  }

}else{
  $location.path('/home');
}

}]);
