'use strict';
/*
  controller for managing the login activities of student and teachers
  Aditya Gupta
*/
angular.module('studentApp').controller('stTestCtrl',['$scope','$rootScope','$location','$timeout','$cookies','studentService', function ($scope,$rootScope,$location,$timeout,$cookies,studentService) {

  $scope.isTest = true;
  $scope.isInstruction = false;
  $scope.isScore = false;
  $scope.isSolutionShow = false;
  $scope.isTestStart = false;
  var questionIndex = 0;
  $scope.TestId = '';
   $scope.init = function(){
     $scope.TestId = '';
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
        $scope.isScore = false;
        $scope.isSolutionShow = false;
        if(testType == 'upcomingTest'){
            $scope.upcomingTest = true;
            angular.element(document.querySelector("#uptest-btn1")).addClass("testbtn-active");
            angular.element(document.querySelector("#uptest-btn2")).removeClass("testbtn-active");
        }else{
            $scope.upcomingTest = false;
            angular.element(document.querySelector("#uptest-btn1")).removeClass("testbtn-active");
            angular.element(document.querySelector("#uptest-btn2")).addClass("testbtn-active");
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
  $scope.goToTest = function(){
    $scope.isTest = true;
    $scope.isInstruction = false;
    $scope.isScore = false;
    $scope.isTestStart = false;
    $scope.isSolutionShow = false;
  //  $scope.init();
  }
  $scope.goTest = function(){
      $scope.isTest = true;
      $scope.isInstruction = false;
      $scope.isTestStart = false;
      $scope.isSolutionShow = false;
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

$scope.showInstructions = function(testId,SubjectId){
  $scope.TestId = testId;
  $scope.subjectID = SubjectId;
  $scope.isInstruction = true;
  $scope.isTest = false;
  $scope.isTestStart = false;
  $scope.isSolutionShow = false;
  //get the question based on test ID
  studentService.getQuestions($scope.TestId)
    .then(function onSuccess(response) {
    if(response != undefined && typeof(response) == 'object'){
      if(response.data != undefined && response.data.length > 0){
         $scope.testQuestions = response.data;
        }
      }else{
      }
    })
    .catch(function onError(errorResponse) {

    })
  .finally(function eitherWay(){
  });
}

$scope.startTest = function(){
  $scope.isInstruction = false;
  $scope.isTest = false;
  $scope.isTestStart = true;
  $scope.first_question = true;
  $scope.isSolutionShow = false;
  $scope.answers = [];
  //function to get test questions

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
      questionIndex = parseInt($('.question-slider').find('.slick-current').attr('data-slick-index'));
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
  if(questionIndex < $scope.testQuestions.length){
    $scope.first_question = false;
    $(".quesinfo-slider").slick( "slickGoTo", questionIndex);
  }
//  $scope.$apply();
}

$scope.prevQuestion = function(){
  questionIndex-= 1;
  if(questionIndex == 0){
    $scope.first_question = true;
    $(".quesinfo-slider").slick( "slickGoTo", questionIndex);
  }else{
    $(".quesinfo-slider").slick( "slickGoTo", questionIndex);
    $scope.first_question = false;
  }
}

$scope.submitAnswer = function(QuestionId,AnswerId,index,parentIndex){
  $timeout(function() {
    $(".bg_" + parentIndex).removeClass('bl-bg');
    $(".selected_" + index + '_' + parentIndex).addClass('bl-bg');
    $scope.$apply();
  }, 1);
  var key = {
    "QuestionId" : QuestionId,
    "AnswerId" : AnswerId
  }
  if($scope.answers.length > 0){
    for(var i = 0; i < $scope.answers.length; i++){
        if($scope.answers[i].QuestionId == QuestionId){
          $scope.answers.splice(i,1);
        }
    }
  }
  $scope.answers.push(key);
}

$scope.submitTest = function(){
  console.log($scope.TestId + '==' + $scope.subjectID);
  $scope.testData = {
    "TestId" : $scope.TestId,
    "SubjectId" : $scope.subjectID,
  	"StartTime":"2018-02-08",
  	"EndTime":"2018-02-09",
    "lstQuesAns" : $scope.answers
  }
  //submit the test
  studentService.submitTest($scope.testData)
    .then(function onSuccess(response) {
    if(response != undefined && typeof(response) == 'object'){
      if(response.data != undefined){
        $scope.testScore = response.data;
         $scope.isScore = true;
         $scope.isInstruction = false;
         $scope.isTest = false;
         $scope.isTestStart = false;
        }
      }else{
      }
    })
    .catch(function onError(errorResponse) {

    })
  .finally(function eitherWay(){
  })
}
$scope.showSolution = function(testId){
    console.log('herer')
    $scope.isTest = false;
    $scope.isInstruction = false;
    $scope.isScore = false;
    $scope.isTestStart = false;
    $scope.isSolutionShow = true;
    $scope.TestId = testId;
      studentService.getSolutions($scope.TestId)
    .then(function onSuccess(response) {
    if(response != undefined && typeof(response) == 'object'){
      if(response.data != undefined && response.data.length > 0){
         $scope.testSolution = response.data;
         
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
      questionIndex = parseInt($('.question-slider').find('.slick-current').attr('data-slick-index'));
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
      }else{
      }
    })
    .catch(function onError(errorResponse) {

    })
  .finally(function eitherWay(){
  });

  //  $scope.init();
  }
// Get the modal
var modal = document.getElementById('submit_Modal');

// Get the button that opens the modal
var btn = document.getElementById("submit_Btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//     modal.style.display = "block";
// }
//
// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

  $scope.labels = ["Download Sales", "In-Store Sales"];
  $scope.data = [300, 500];
  $scope.colors = ['#42AEF3', '#ffffff'];


}]);
