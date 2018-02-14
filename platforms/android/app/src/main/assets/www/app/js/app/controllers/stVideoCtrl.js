'use strict';
/*
  controller for managing the login activities of student and teachers
  Aditya Gupta
*/
angular.module('studentApp').controller('stVideoCtrl',['$scope','$rootScope','$location','$timeout','$cookies','studentService', function ($scope,$rootScope,$location,$timeout,$cookies,studentService) {
   $scope.init = function(){
     //get Recommended videos
     studentService.recommendedVideo()
       .then(function onSuccess(response) {
         if(response != undefined && typeof(response) == 'object'){
           if(response.data != undefined && response.data.length > 0){
             $scope.videos = response.data;
             console.log( $scope.videos);
           }
         }else{
         }
       })
       .catch(function onError(errorResponse) {

       })
       .finally(function eitherWay(){
       })
   }
   //Play a video
   $scope.pauseOrPlay = function(ele){
     var video = angular.element(ele.srcElement);
     if(video != undefined){
       if(video[0].paused){
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
         video[0].play();
       }else{
         video[0].pause();
       }
     }
   }
  $scope.goBack  = function(){
    $location.path('/home');
  }
}]);
