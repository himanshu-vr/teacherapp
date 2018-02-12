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
        }else{
            $scope.upcomingTest = false;
            //$scope.attemptedTest  = true;
        }
        var options = {
              arrows: false,
              infinite: false,
              centerMode: true,
              centerPadding: '50px',
              slidesToShow: 1,
              variableWidth: false
         };
       setTimeout(function () {
            console.log('sdfs');
             $(".uptest-info").not('.slick-initialized').slick(options)
         }, 10);
    }
  $scope.goBack  = function(){
    $location.path('/home');
  }
}]);
