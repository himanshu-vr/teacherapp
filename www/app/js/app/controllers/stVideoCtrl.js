'use strict';
/*
  controller for managing the login activities of student and teachers
  Aditya Gupta
*/
angular.module('studentApp').controller('stVideoCtrl',['$scope','$rootScope','$location','$timeout','$cookies','studentService', function ($scope,$rootScope,$location,$timeout,$cookies,studentService) {
   $scope.init = function(){
    $scope.vidimg = false;
     //get Recommended videos
     // studentService.recommendedVideo()
     //   .then(function onSuccess(response) {
     //     if(response != undefined && typeof(response) == 'object'){
     //       if(response.data != undefined && response.data.length > 0){
     //         $scope.videos = response.data;
     //         console.log( $scope.videos);
     //       }
     //     }else{
     //     }
     //   })
     //   .catch(function onError(errorResponse) {

     //   })
     //   .finally(function eitherWay(){
     //   })
   }
   //Play a video
   $scope.pauseOrPlay = function(ele){
    var video = document.getElementById("main_video");
    video = angular.element(video);
     if(video != undefined && video[0].paused){
         video[0].play();
         $scope.vidimg = false;
       }
         else{
         video[0].pause();
         $scope.vidimg = true;
       }
     }
  $scope.expandVideo  = function(){
    var video = document.getElementById("main_video");
    video = angular.element(video);
    if(video != undefined){
        if (video[0].requestFullscreen) {
              video[0].requestFullscreen();
          }
          else if (video[0].msRequestFullscreen) {
              video[0].msRequestFullscreen();
          }
          else if (video[0].mozRequestFullScreen) {
              video[0].mozRequestFullScreen();
          }
          else if (video[0].webkitRequestFullScreen) {
              video[0].webkitRequestFullScreen();
        } 
     }
  } 
  $scope.goBack  = function(){
    $location.path('/home');
  }
}]);
