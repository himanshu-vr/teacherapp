'use strict';
/*
  controller for managing the login activities of student and teachers
  Aditya Gupta
*/
angular.module('studentApp').controller('streVideoCtrl',['$scope','$rootScope','$location','$timeout','$cookies','studentService', function ($scope,$rootScope,$location,$timeout,$cookies,studentService) {
   $scope.init = function(){
    $scope.vidimg = false;
    //setting now as static need to remove this code
    studentService.recommendedVideo()
      .then(function onSuccess(response) {
        if(response != undefined && typeof(response) == 'object'){
          if(response.data != undefined){
            $scope.videos = response.data;
            
       setTimeout(function () {
            console.log('sdfs');
             $(".uptest-info").not('.slick-initialized').slick()
         }, 10);
          }
        }else{
        }
      })
      .catch(function onError(errorResponse) {

      })
      .finally(function eitherWay(){
      })
   }
  //function to go to video detail
  $scope.videoDetail = function(id){
    $rootScope.videoId = id;
    $location.path('/recommended_video/video-details');
  }
  $scope.goBack  = function(){
    $location.path('/home');
  }
}]);
