'use strict';
/*
  controller for managing the login activities of student and teachers
  Aditya Gupta
*/
angular.module('studentApp').controller('stTestCtrl',['$scope','$rootScope','$location','$timeout','$cookies', function ($scope,$rootScope,$location,$timeout,$cookies) {
   //document.getElementById("defaultOpen").click();

   $scope.upcomingTest = true;

   console.log($scope.upcomingTest);
   $scope.openTestSchedule = function(testType) {
        console.log(testType);
        if(testType == 'upcomingTest'){
            $scope.upcomingTest = true;
        }else{
            $scope.upcomingTest = false;    
        }
    }
//     $('.uptest-info').on('edge', function(event, slick){
//     console.log("initialized")
// });
    $('.uptest-info').slick({
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

	

