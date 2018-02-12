'use strict';
/*
  controller for managing the login activities of student and teachers
  Aditya Gupta
*/
angular.module('studentApp').controller('homeCtrl',['$scope','$rootScope','$location','$timeout','$cookies', function ($scope,$rootScope,$location,$timeout,$cookies) {
  

  $scope.lecture = function(){
  	$location.path('/student/lecture');
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
}]);

  /* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}