'use strict';
/*
  controller for managing the login activities of student and teachers
  Aditya Gupta
*/
angular.module('studentApp').controller('stTestCtrl',['$scope','$rootScope','$location','$timeout','$cookies','studentService', function ($scope,$rootScope,$location,$timeout,$cookies,studentService) {

  $scope.isTest = true;
  $scope.isInstruction = false;
  $scope.isTestStart = false;
  var questionIndex = 0;
   $scope.init = function(){
     $scope.upcomingTest = true;
     $scope.attemptedTest = false;
     //get test of students
     studentService.testSchedule()
       .then(function onSuccess(response) {
         if(response != undefined && typeof(response) == 'object'){
           if(response.data != undefined && response.data.length > 0){
              $scope.upcomingtests = response.data[0].Data;
              $scope.attemptedtests = response.data[0].Data;
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
  $scope.goTest = function(){
      $scope.isTest = true;
      $scope.isInstruction = false;
      $scope.isTestStart = false;
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
  }, 10);
    // var plant = document.getElementsByClassName('slick-current')[0].getAttribute('data-slick-index');
    // console.log(plant['data-slick-index']);
    // var fruitCount = plant.getAttribute('data-slick-index');
    // console.log(fruitCount);
//
// $scope.nextQues = function(){
//     console.log(document.querySelector(".slick-current").getAttribute("data-slick-index"));
//     if ((document.querySelector(".slick-current").getAttribute("data-slick-index")) == 0){
//             // $scope.txt-strt-btn = true;
//         }else{
//             // $scope.txt-strt-btn = true;
//     }
// }

$scope.showInstructions = function(){
  $scope.isInstruction = true;
  $scope.isTest = false;
  $scope.isTestStart = false;
}

$scope.startTest = function(){
  $scope.isInstruction = false;
  $scope.isTest = false;
  $scope.isTestStart = true;
  $scope.first_question = true;
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
  $('.question-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
    console.log($('.question-slider').find('.slick-current').attr('data-slick-index'));
    questionIndex = $('.question-slider').find('.slick-current').attr('data-slick-index');
    if(questionIndex == 0){
      $scope.first_question = true;
      $scope.$apply();
    }else{
      $scope.first_question = false;
      $scope.$apply();
    }
 });
  }, 1);
}
$scope.nextQuestion = function(){
  questionIndex+= 1
  console.log(questionIndex);
  $scope.first_question = false;
//  $scope.$apply();
}

$scope.prevQuestion = function(){
  questionIndex-= 1;
  if(questionIndex == 0){
    $scope.first_question = true;
  }else{
    $scope.first_question = false;
  }
}
}]);
