'use strict';
/*
  controller for managing the login activities of student and teachers
  Aditya Gupta
*/
angular.module('studentApp').controller('stTestCtrl',['$scope','$rootScope','$location','$timeout','$cookies','studentService', function ($scope,$rootScope,$location,$timeout,$cookies,studentService) {

  $scope.isTest = true;
  $scope.isInstruction = false;
  $scope.isScore = false;
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
             $(".uptest-info").not('.slick-initialized').slick(options)
         }, 1);
    }
  $scope.goBack  = function(){
    $location.path('/home');
  }
  $scope.goToTest = function(){
    $scope.isTest = true;
    $scope.isInstruction = false;
    $scope.isScore = false;
    $scope.isTestStart = false;
  //  $scope.init();
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
}, 1);

$scope.showInstructions = function(testId,SubjectId,SubjectName){
  $scope.TestId = testId;
  $scope.subjectID = SubjectId;
  $scope.SubjectName = SubjectName;
  $scope.isInstruction = true;
  $scope.isTest = false;
  $scope.isTestStart = false;
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
  $scope.last_question = false;
  $scope.answers = [];
  $scope.StartTime = $scope.getFormattedDate();
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
      console.log(questionIndex);
      if(questionIndex == 0){
        $scope.first_question = true;
        $scope.$apply();
      }else if (questionIndex + 1 == $scope.testQuestions.length) {
        $scope.last_question = true;
        $scope.$apply();
      }
      else{
        $scope.first_question = false;
        $scope.last_question = false;
        $scope.$apply();
      }
   });
    }, 1);
}
$scope.nextQuestion = function(){
  questionIndex+= 1
  if(questionIndex < $scope.testQuestions.length){
    $(".quesinfo-slider").slick( "slickGoTo", questionIndex);
  }
//  $scope.$apply();
}

$scope.prevQuestion = function(){
  questionIndex-= 1;
  console.log(questionIndex);
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

$scope.openSubmitModal = function(){
  setTimeout(function () {
         $('.modal').modal();
         $('#submitTest').modal('open');
    }, 1);
}
$scope.submitTest = function(){
  setTimeout(function () {
         $('#submitTest').modal('close');
    }, 1);
  $scope.EndTime = $scope.getFormattedDate();
  $scope.testData = {
    "TestId" : $scope.TestId,
    "SubjectId" : $scope.subjectID,
  	"StartTime":$scope.StartTime,
  	"EndTime": $scope.EndTime,
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
    setTimeout(function () {
           $('#submitTest').modal('close');
      }, 1);
  })
}

$scope.getFormattedDate = function(){
  var date = new Date();
  var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return str;
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
