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
     setTimeout(function(){
       document.addEventListener("deviceready", onDeviceReady(), false);
     },1)
     $scope.TestId = '';
     $scope.upcomingTest = true;
     $scope.attemptedTest = false;
     //get test of students
     studentService.testSchedule()
       .then(function onSuccess(response) {
         if(response != undefined && typeof(response) == 'object'){
           if(response.data != undefined && response.data.length > 0){
              $scope.upcomingtests = response.data[0].Data;
              $scope.attemptedtests = response.data[1].Data;
           }
         }else{
         }
       })
       .catch(function onError(errorResponse) {

       })
       .finally(function eitherWay(){
       })
   }
   function onBackKeyDown() {
     console.log($scope.isTestStart);
     if($scope.isTestStart){
       console.log('here');
       setTimeout(function () {
              $('.modal').modal();
              $('#backTest').modal('open');
         }, 1);
     }else{
       console.log('there');
       $scope.goToTest();
       $scope.$apply();
     }
  }
  $scope.cancelTest = function(){
    $('#backTest').modal('close');
    $location.path('/home');
  }
   // device APIs are available
   //
   function onDeviceReady() {
     // Register the event listener
     document.addEventListener("backbutton", onBackKeyDown, false);
   };
   $scope.openTestSchedule = function(testType) {
        $scope.isScore = false;
        var options = {
              arrows: false,
              infinite: false,
              centerMode: true,
              centerPadding: '50px',
              slidesToShow: 1,
              variableWidth: false
         };
$scope.isSolutionShow = false;
        if(testType == 'upcomingTest'){
            $scope.upcomingTest = true;
            angular.element(document.querySelector("#uptest-btn1")).addClass("testbtn-active");
            angular.element(document.querySelector("#uptest-btn2")).removeClass("testbtn-active");
            setTimeout(function () {
                  $(".uptest-info").not('.slick-initialized').slick(options)
              }, 100);
        }else{
            $scope.upcomingTest = false;
            angular.element(document.querySelector("#uptest-btn1")).removeClass("testbtn-active");
            angular.element(document.querySelector("#uptest-btn2")).addClass("testbtn-active");
            setTimeout(function () {
                  $(".uptest-info").not('.slick-initialized').slick(options)
              }, 100);
            //$scope.attemptedTest  = true;
        }
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
    //$scope.$apply();
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
}, 1);

$scope.showInstructions = function(testId,SubjectId,SubjectName){
  $scope.TestId = testId;
  $scope.subjectID = SubjectId;
  $scope.SubjectName = SubjectName;
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
  $scope.last_question = false;
$scope.isSolutionShow = false;
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
        $scope.last_question = false;
        $scope.$apply();
      }else if (questionIndex + 1 == $scope.testQuestions.length && questionIndex != 0) {
        $scope.last_question = true;
        $scope.first_question = false;
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
$scope.nextQuestion = function(type){
  questionIndex+= 1
  if(type == 'Attempted'){
    if(questionIndex < $scope.testSolution.length){
      $(".quesinfo-slider").slick( "slickGoTo", questionIndex);
    }
  }else{
    if(questionIndex < $scope.testQuestions.length){
      $(".quesinfo-slider").slick( "slickGoTo", questionIndex);
    }
  }
//  $scope.$apply();
}

$scope.prevQuestion = function(){
  questionIndex-= 1;
  console.log('sdfsdf');
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
$scope.showSolution = function(testId){
    console.log('herer')
    questionIndex = 0;
    $scope.isTest = false;
    $scope.isInstruction = false;
    $scope.isScore = false;
    $scope.isTestStart = false;
    $scope.isSolutionShow = true;
    $scope.TestId = testId;
    $scope.first_question = true;
    $scope.last_question = false;
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
        $scope.last_question = false;
        $scope.$apply();
      }else if (questionIndex + 1 == $scope.testSolution.length && questionIndex != 0) {
        $scope.last_question = true;
        $scope.first_question = false;
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
	$scope.getFormattedDate = function(){
	  var date = new Date();
	  var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	  return str;
	}

  window.onload = function () {

  var chart = new CanvasJS.Chart("chartContainer", {
  	animationEnabled: true,
  	theme: "light2",
    backgroundColor: "rgba(0, 0, 0, 0)",
  	axisX:{
  		crosshair: {
  			enabled: true,
  			snapToDataPoint: true
  		}
  	},
  	axisY: {
  		crosshair: {
  			enabled: true
  		},
      lineThickness :1
  	},
  	toolTip:{
  		shared:true
  	},
  	legend:{
  		cursor:"pointer",
  		verticalAlign: "bottom",
  		horizontalAlign: "left",
  		dockInsidePlotArea: true,
  		itemclick: toogleDataSeries
  	},
  	data: [{
  		type: "line",
  		showInLegend: true,
  		name: "",
  		markerType: "circle",
  		color: "#F08080",
  		dataPoints: [
  			{ x:0, y: 10 },
        { x:10, y: 20 },
        { x:20, y: 30 },
        { x:25, y: 60 },
        { x:45, y: 70 },
        { x:90, y: 80 },
        { x:91, y: 99 }
  		]
  	},
  	{
  		type: "line",
  		showInLegend: true,
  		name: "",
      markerType: "circle",
  		dataPoints: [
        { x:2, y: 11 },
        { x:5, y: 18 },
        { x:15, y: 40 },
        { x:35, y: 51 },
        { x:50, y: 65 },
        { x:78, y: 81 },
        { x:94, y: 97 }
  		]
  	}]
  });
  chart.render();

  function toogleDataSeries(e){
  	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
  		e.dataSeries.visible = false;
  	} else{
  		e.dataSeries.visible = true;
  	}
  	chart.render();
  }
  }

}]);
