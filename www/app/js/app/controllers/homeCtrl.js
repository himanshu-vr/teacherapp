'use strict';
/*
  controller for managing the login activities of student and teachers
  Aditya Gupta
*/
angular.module('studentApp').controller('homeCtrl',['$scope','$rootScope','$location','$timeout','$cookies','studentService', function ($scope,$rootScope,$location,$timeout,$cookies,studentService) {

  //init videos and other details
  $scope.init =  function(){
    //get Recommended videos
    studentService.recommendedVideo()
      .then(function onSuccess(response) {
        if(response != undefined && typeof(response) == 'object'){
          if(response.data != undefined && response.data.length > 0){
            $scope.popularVideos = response.data;
          }
        }else{
        }
      })
      .catch(function onError(errorResponse) {

      })
      .finally(function eitherWay(){
      })
  }
  $scope.lecture = function(){
  	$location.path('/student/lecture');
  }
  $scope.testSchedule = function(){
    $location.path('/test/schedule');
  }
  $scope.logout = function(){
    $cookies.remove("access_token");
    $location.path('/login');
  }
  /* Set the width of the side navigation to 250px */
   $scope.openNav =  function() {
      document.getElementById("mySidenav").style.width = "300px";
  }
  /* Set the width of the side navigation to 0 */
  $scope.closeNav =  function() {
      document.getElementById("mySidenav").style.width = "0";
  }
  $('#popular_videos').slick({
    centerMode: false,
    centerPadding: '0px',
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          infinite: false,
          centerMode: true,
          centerPadding: '50px',
          slidesToShow: 1,
          variableWidth: false
        }
      }
    ]
      });
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
}]);
