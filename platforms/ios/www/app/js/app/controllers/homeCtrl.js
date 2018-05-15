'use strict';
/*
  controller for managing the login activities of student and teachers
  Aditya Gupta
*/
angular.module('studentApp').controller('homeCtrl',['$scope','$rootScope','$location','$timeout','$cookies','studentService', function ($scope,$rootScope,$location,$timeout,$cookies,studentService) {

  //init videos and other details
  $scope.init =  function(){
    // setTimeout(function(){
    //   document.addEventListener("deviceready", onDeviceReady(), false);
    // },1)
    $rootScope.videoId = '';
    //get Recommended videos
    studentService.popularVideo()
      .then(function onSuccess(response) {
        if(response != undefined && typeof(response) == 'object'){
          if(response.data != undefined && response.data.length > 0){
            $scope.popularVideos = response.data;
            var Slideroptions = {
              arrows: false,
              infinite: false,
              centerMode: false,
              centerPadding: '50px',
              slidesToShow: 2,
              variableWidth: true
             };
             console.log('hee');
           setTimeout(function () {
              console.log('sdf');
                 $(".popularvideo").slick(Slideroptions)
             }, 1);
          }
        }else{
        }
      })
      .catch(function onError(errorResponse) {

      })
      .finally(function eitherWay(){
      })
  }
  // device APIs are available
  //
 //  function onDeviceReady() {
 //    // Register the event listener
 //    document.addEventListener("backbutton", onBackKeyDown, false);
 //  };
 //  function onBackKeyDown() {
 //    navigator.app.exitApp();
 // }
  var video = '';
  $scope.lecture = function(){
  	$location.path('/student/lecture');
  }
  // for test schedule
  $scope.testSchedule = function(){
    $location.path('/test/schedule');
  }
  // for logout
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
// for notifications
  $scope.notifyMsg = function(){
    $location.path('/notifications');
  }
  //for recommended video
  $scope.recommendedVideo = function(id){
    $rootScope.videoId = id;
    $location.path('/student/recommended_video');
  }
  // for video play
  $scope.vidPlay = function(id){
    $rootScope.videoId = id;
    $location.path('/recommended_video/video-details');
  }
  $scope.resultsAnalysis = function(){
  $location.path('/results');
}
$('.modal').modal();
  // $('#popular_videos').slick({
  //   centerMode: false,
  //   centerPadding: '0px',
  //   slidesToShow: 1,
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         arrows: false,
  //         centerMode: true,
  //         centerPadding: '40px',
  //         slidesToShow: 3
  //       }
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         arrows: false,
  //         infinite: false,
  //         centerMode: true,
  //         centerPadding: '50px',
  //         slidesToShow: 1,
  //         variableWidth: false
  //       }
  //     }
  //   ]
  //     });

  // for user profile
  $scope.userProfile = function(){
    $location.path('/profile');
  }
}]);
