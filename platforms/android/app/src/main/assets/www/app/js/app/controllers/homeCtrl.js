'use strict';
/*
  controller for managing the login activities of student and teachers
  Aditya Gupta
*/
angular.module('studentApp').controller('homeCtrl',['$scope','$rootScope','$location','$timeout','$cookies','studentService', function ($scope,$rootScope,$location,$timeout,$cookies,studentService) {

  //init videos and other details
  $scope.init =  function(){
    $rootScope.videoId = '';
    //get Recommended videos
    studentService.popularVideo()
      .then(function onSuccess(response) {
        if(response != undefined && typeof(response) == 'object'){
          if(response.data != undefined && response.data.length > 0){
            $scope.popularVideos = response.data;

            for(var i = 0; i< $scope.popularVideos.length; i++){
              for(var k =0; k < $scope.popularVideos[i].lstVideoModel.length; k++){
                console.log($scope.popularVideos[i].lstVideoModel[k].VideoPath);
                navigator.createThumbnail($scope.popularVideos[i].lstVideoModel[k].VideoPath, function(err, imageData) {
                  console.log(imageData);
                  if (err){
                    throw err;
                  }
                  $scope.popularVideos[i].lstVideoModel[k].PosterImage = imageData; // Will log the base64 encoded string in console.
              });
              }
            }
            var Slideroptions = {
                  arrows: false,
                  infinite: false,
                  centerMode: false,
                  centerPadding: '500px',
                  slidesToShow: 2,
                  variableWidth: true
             };
           setTimeout(function () {
                  console.log('sdf');
                 $(".popular-info").not('.slick-initialized').slick(Slideroptions)
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
}]);
