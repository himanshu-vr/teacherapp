'use strict';
/*
  controller for managing the activities of uploaded and downloaded documents.
  Aditya Gupta
*/
angular.module('studentApp').controller('documentCtrl',['$scope','$rootScope','$location','$timeout','$cookies','studentService', function ($scope,$rootScope,$location,$timeout,$cookies,studentService) {

// for notifications
  $scope.goBack = function(){
    $location.path('/home');
  }

  $scope.init = function(){
    studentService.getalluploadeddocuments()
      .then(function onSuccess(response) {
        if(response != undefined && typeof(response) == 'object'){
          if(response.data != undefined && response.data){
             $scope.uploadDocumentData = response.data;
          }
        }else{
        }
      })
      .catch(function onError(errorResponse) {

      })
      .finally(function eitherWay(){
      })
  };

  $scope.filesubmit = function($files){
    $scope.file = $files;
    console.log($scope.file[0]);
    studentService.uploadDocument($scope.file[0])
      .then(function onSuccess(response) {
        if(response != undefined && typeof(response) == 'object' && response.data  != undefined){
            if(response.data.Message == 'Data saved successfully' && response.status == 200){
              alert('File uploaded successfully');
            }else{
              alert('Something went wrong, Please try after some time');
            }
        }
      })
      .catch(function onError(errorResponse) {

      })
      .finally(function eitherWay(){
      })
  }
}]);
