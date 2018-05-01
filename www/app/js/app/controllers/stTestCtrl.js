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
     setTimeout(function () {
            $('.modal').modal();
            $('#backTest').modal('open');
       }, 1);
    // $scope.goBack();
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
$scope.options = {
            chart: {
                type: 'cumulativeLineChart',
                height: 300,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 65
                },
                x: function(d){ return d[0]; },
                y: function(d){ return d[1]/100; },
                average: function(d) { return d.mean/100; },

                color: d3.scale.category10().range(),
                duration: 300,
                useInteractiveGuideline: false,
                clipVoronoi: false,

                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
                        return d3.time.format('%m/%d/%y')(new Date(d))
                    },
                    showMaxMin: false,
                    staggerLabels: false
                },

                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format(',.1%')(d);
                    },
                    axisLabelDistance: 20
                }
            }
        };

        $scope.chrr = [
            {
                key: "Long",
                values: [ [ 1083297600000 , -2.974623048543] , [ 1085976000000 , -1.7740300785979] , [ 1088568000000 , 4.4681318138177] , [ 1091246400000 , 7.0242541001353] , [ 1093924800000 , 7.5709603667586] , [ 1096516800000 , 20.612245065736] , [ 1099195200000 , 21.698065237316] , [ 1101790800000 , 40.501189458018] , [ 1104469200000 , 50.464679413194] , [ 1107147600000 , 48.917421973355] , [ 1109566800000 , 63.750936549160] , [ 1112245200000 , 59.072499126460] , [ 1114833600000 , 43.373158880492] , [ 1117512000000 , 54.490918947556] , [ 1120104000000 , 56.661178852079] , [ 1122782400000 , 73.450103545496] , [ 1125460800000 , 71.714526354907] , [ 1128052800000 , 85.221664349607] , [ 1130734800000 , 77.769261392481] , [ 1133326800000 , 95.966528716500] , [ 1136005200000 , 107.59132116397] , [ 1138683600000 , 127.25740096723] , [ 1141102800000 , 122.13917498830] , [ 1143781200000 , 126.53657279774] , [ 1146369600000 , 132.39300992970] , [ 1149048000000 , 120.11238242904] , [ 1151640000000 , 118.41408917750] , [ 1154318400000 , 107.92918924621] , [ 1156996800000 , 110.28057249569] , [ 1159588800000 , 117.20485334692] , [ 1162270800000 , 141.33556756948] , [ 1164862800000 , 159.59452727893] , [ 1167541200000 , 167.09801853304] , [ 1170219600000 , 185.46849659215] , [ 1172638800000 , 184.82474099990] , [ 1175313600000 , 195.63155213887] , [ 1177905600000 , 207.40597044171] , [ 1180584000000 , 230.55966698196] , [ 1183176000000 , 239.55649035292] , [ 1185854400000 , 241.35915085208] , [ 1188532800000 , 239.89428956243] , [ 1191124800000 , 260.47781917715] , [ 1193803200000 , 276.39457482225] , [ 1196398800000 , 258.66530682672] , [ 1199077200000 , 250.98846121893] , [ 1201755600000 , 226.89902618127] , [ 1204261200000 , 227.29009273807] , [ 1206936000000 , 218.66476654350] , [ 1209528000000 , 232.46605902918] , [ 1212206400000 , 253.25667081117] , [ 1214798400000 , 235.82505363925] , [ 1217476800000 , 229.70112774254] , [ 1220155200000 , 225.18472705952] , [ 1222747200000 , 189.13661746552] , [ 1225425600000 , 149.46533007301] , [ 1228021200000 , 131.00340772114] , [ 1230699600000 , 135.18341728866] , [ 1233378000000 , 109.15296887173] , [ 1235797200000 , 84.614772549760] , [ 1238472000000 , 100.60810015326] , [ 1241064000000 , 141.50134895610] , [ 1243742400000 , 142.50405083675] , [ 1246334400000 , 139.81192372672] , [ 1249012800000 , 177.78205544583] , [ 1251691200000 , 194.73691933074] , [ 1254283200000 , 209.00838460225] , [ 1256961600000 , 198.19855877420] , [ 1259557200000 , 222.37102417812] , [ 1262235600000 , 234.24581081250] , [ 1264914000000 , 228.26087689346] , [ 1267333200000 , 248.81895126250] , [ 1270008000000 , 270.57301075186] , [ 1272600000000 , 292.64604322550] , [ 1275278400000 , 265.94088520518] , [ 1277870400000 , 237.82887467569] , [ 1280548800000 , 265.55973314204] , [ 1283227200000 , 248.30877330928] , [ 1285819200000 , 278.14870066912] , [ 1288497600000 , 292.69260960288] , [ 1291093200000 , 300.84263809599] , [ 1293771600000 , 326.17253914628] , [ 1296450000000 , 337.69335966505] , [ 1298869200000 , 339.73260965121] , [ 1301544000000 , 346.87865120765] , [ 1304136000000 , 347.92991526628] , [ 1306814400000 , 342.04627502669] , [ 1309406400000 , 333.45386231233] , [ 1312084800000 , 323.15034181243] , [ 1314763200000 , 295.66126882331] , [ 1317355200000 , 251.48014579253] , [ 1320033600000 , 295.15424257905] , [ 1322629200000 , 294.54766764397] , [ 1325307600000 , 295.72906119051] , [ 1327986000000 , 325.73351347613] , [ 1330491600000 , 340.16106061186] , [ 1333166400000 , 345.15514071490] , [ 1335758400000 , 337.10259395679] , [ 1338436800000 , 318.68216333837] , [ 1341028800000 , 317.03683945246] , [ 1343707200000 , 318.53549659997] , [ 1346385600000 , 332.85381464104] , [ 1348977600000 , 337.36534373477] , [ 1351656000000 , 350.27872156161] , [ 1354251600000 , 349.45128876100]]
            },
            {
                key: "S&P 1500",
                values: [ [ 1083297600000 , -1.7798428181819] , [ 1085976000000 , -0.36883324836999] , [ 1088568000000 , 1.7312581046040] , [ 1091246400000 , -1.8356125950460] , [ 1093924800000 , -1.5396564170877] , [ 1096516800000 , -0.16867791409247] , [ 1099195200000 , 1.3754263993413] , [ 1101790800000 , 5.8171640898041] , [ 1104469200000 , 9.4350145241608] , [ 1107147600000 , 6.7649081510160] , [ 1109566800000 , 9.1568499314776] , [ 1112245200000 , 7.2485090994419] , [ 1114833600000 , 4.8762222306595] , [ 1117512000000 , 8.5992339354652] , [ 1120104000000 , 9.0896517982086] , [ 1122782400000 , 13.394644048577] , [ 1125460800000 , 12.311842010760] , [ 1128052800000 , 13.221003650717] , [ 1130734800000 , 11.218481009206] , [ 1133326800000 , 15.565352598445] , [ 1136005200000 , 15.623703865926] , [ 1138683600000 , 19.275255326383] , [ 1141102800000 , 19.432433717836] , [ 1143781200000 , 21.232881244655] , [ 1146369600000 , 22.798299192958] , [ 1149048000000 , 19.006125095476] , [ 1151640000000 , 19.151889158536] , [ 1154318400000 , 19.340022855452] , [ 1156996800000 , 22.027934841859] , [ 1159588800000 , 24.903300681329] , [ 1162270800000 , 29.146492833877] , [ 1164862800000 , 31.781626082589] , [ 1167541200000 , 33.358770738428] , [ 1170219600000 , 35.622684613497] , [ 1172638800000 , 33.332821711366] , [ 1175313600000 , 34.878748635832] , [ 1177905600000 , 40.582332613844] , [ 1180584000000 , 45.719535502920] , [ 1183176000000 , 43.239344722386] , [ 1185854400000 , 38.550955100342] , [ 1188532800000 , 40.585368816283] , [ 1191124800000 , 45.601374057981] , [ 1193803200000 , 48.051404337892] , [ 1196398800000 , 41.582581696032] , [ 1199077200000 , 40.650580792748] , [ 1201755600000 , 32.252222066493] , [ 1204261200000 , 28.106390258553] , [ 1206936000000 , 27.532698196687] , [ 1209528000000 , 33.986390463852] , [ 1212206400000 , 36.302660526438] , [ 1214798400000 , 25.015574480172] , [ 1217476800000 , 23.989494069029] , [ 1220155200000 , 25.934351445531] , [ 1222747200000 , 14.627592011699] , [ 1225425600000 , -5.2249403809749] , [ 1228021200000 , -12.330933408050] , [ 1230699600000 , -11.000291508188] , [ 1233378000000 , -18.563864948088] , [ 1235797200000 , -27.213097001687] , [ 1238472000000 , -20.834133840523] , [ 1241064000000 , -12.717886701719] , [ 1243742400000 , -8.1644613083526] , [ 1246334400000 , -7.9108408918201] , [ 1249012800000 , -0.77002391591209] , [ 1251691200000 , 2.8243816569672] , [ 1254283200000 , 6.8761411421070] , [ 1256961600000 , 4.5060912230294] , [ 1259557200000 , 10.487179794349] , [ 1262235600000 , 13.251375597594] , [ 1264914000000 , 9.2207594803415] , [ 1267333200000 , 12.836276936538] , [ 1270008000000 , 19.816793904978] , [ 1272600000000 , 22.156787167211] , [ 1275278400000 , 12.518039090576] , [ 1277870400000 , 6.4253587440854] , [ 1280548800000 , 13.847372028409] , [ 1283227200000 , 8.5454736090364] , [ 1285819200000 , 18.542801953304] , [ 1288497600000 , 23.037064683183] , [ 1291093200000 , 23.517422401888] , [ 1293771600000 , 31.804723416068] , [ 1296450000000 , 34.778247386072] , [ 1298869200000 , 39.584883855230] , [ 1301544000000 , 40.080647664875] , [ 1304136000000 , 44.180050667889] , [ 1306814400000 , 42.533535927221] , [ 1309406400000 , 40.105374449011] , [ 1312084800000 , 37.014659267156] , [ 1314763200000 , 29.263745084262] , [ 1317355200000 , 19.637463417584] , [ 1320033600000 , 33.157645345770] , [ 1322629200000 , 32.895053150988] , [ 1325307600000 , 34.111544824647] , [ 1327986000000 , 40.453985817473] , [ 1330491600000 , 46.435700783313] , [ 1333166400000 , 51.062385488671] , [ 1335758400000 , 50.130448220658] , [ 1338436800000 , 41.035476682018] , [ 1341028800000 , 46.591932296457] , [ 1343707200000 , 48.349391180634] , [ 1346385600000 , 51.913011286919] , [ 1348977600000 , 55.747238313752] , [ 1351656000000 , 52.991824077209] , [ 1354251600000 , 49.556311883284]]
            }
        ];

}]);
