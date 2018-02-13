'use strict';
/*
  controller for managing the login activities of student and teachers
  Aditya Gupta
*/
angular.module('studentApp').controller('stTestCtrl',['$scope','$rootScope','$location','$timeout','$cookies','studentService', function ($scope,$rootScope,$location,$timeout,$cookies,studentService) {
   $scope.init = function(){
     $scope.upcomingTest = true;
     $scope.attemptedTest = false;
     //get test of students
     studentService.testSchedule()
       .then(function onSuccess(response) {
         if(response != undefined && typeof(response) == 'object'){
           if(response.data != undefined && response.data.length > 0){
              $scope.tests = response.data;
              console.log($scope.tests);
           }
         }else{
         }
       })
       .catch(function onError(errorResponse) {

       })
       .finally(function eitherWay(){
       })
   }
   $scope.openTestSchedule = function(testType) {
        if(testType == 'upcomingTest'){
            $scope.upcomingTest = true;
            $scope.attemptedTest = false;
        }else{
            $scope.upcomingTest = false;
            $scope.attemptedTest = true;
            //$scope.attemptedTest  = true;
        }
    }
  $scope.goBack  = function(){
    $location.path('/home');
  }

  $('.quesinfo-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  infinite: false,
  fade: true,
  asNavFor: '.question-slider'
});
$('.question-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.quesinfo-slider',
    dots: false,
    nav: false,
    infinite: false,
    prevArrow: false,
    nextArrow: false,
    centerMode: true,
    focusOnSelect: true
});
}]);

