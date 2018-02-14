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
  $timeout(function() {
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

    $('.quesinfo-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    fade: true,
    asNavFor: '.question-slider'
  });   
      console.log(document.querySelector(".slick-current").getAttribute("data-slick-index"));
  }, 10);
    // var plant = document.getElementsByClassName('slick-current')[0].getAttribute('data-slick-index');
    // console.log(plant['data-slick-index']);
    // var fruitCount = plant.getAttribute('data-slick-index');
    // console.log(fruitCount);

$scope.nextQues = function(){
    console.log(document.querySelector(".slick-current").getAttribute("data-slick-index"));
    if ((document.querySelector(".slick-current").getAttribute("data-slick-index")) == 0){
            $scope.txt-strt-btn = true;   
        }else{
            $scope.txt-strt-btn = true;
    }
}

}]);
// .$(this).attr("data-slick-index");


// $('.question-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
//       //$(".slick-slide").removeClass('works');
//       $('.slick-current').addClass('works');        
//    });

// if (data-slick-index != 0) {
//   $('#txt-strt-btn').addClass('hides');
//   $('#txt-nxt-prev-btn').removeClass('hides'); 
// }


