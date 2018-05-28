'use strict';
/*
  controller for managing the activities of uploaded and downloaded documents.
  Aditya Gupta
*/
angular.module('studentApp').controller('documentCtrl',['$scope','$rootScope','$location','$timeout','$cookies','studentService', function ($scope,$rootScope,$location,$timeout,$cookies,studentService) {

// for notifications
  $scope.goHome = function(){
    $location.path('/home');
  }

  $scope.init = function(){
    studentService.getalluploadeddocuments()
      .then(function onSuccess(response) {
        if(response != undefined && typeof(response) == 'object'){
          if(response.data != undefined && response.data){
             $scope.uploadDocumentData = response.data;
             console.log($scope.uploadDocumentData);
          }
        }else{
        }
      })

      .catch(function onError(errorResponse) {

      })
      .finally(function eitherWay(){
      })
  }
}]);