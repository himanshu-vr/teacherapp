/*
 Author - Himanshu Gupta
 Purpose - app.js  - Responsible for all dependency injection and routing
 Date  - Jan15, 2018
*/

//Create a Global scope module here

var app  = angular.module('studentApp',['ngRoute' , 'ngCookies']);
angular.module('studentApp')

//Settig Up the routes

.config(function($routeProvider){
      $routeProvider
      .when('/login',
          { controller: 'loginCtrl', templateUrl: 'app/partials/auth/login.html'})
      .when('/home',
          { controller: 'homeCtrl', templateUrl: 'app/partials/home.html'})
      .when('/student/lecture',
          { controller: 'stLectureCtrl', templateUrl: 'app/partials/student/lecture.html'})
      .when('/test/schedule',
          { controller: 'stTestCtrl', templateUrl: 'app/partials/student/test/schedule.html'})
      .when('/notifications',
          { controller: 'notificationCtrl', templateUrl: 'app/partials/notifications.html'})
      .when('/test/instructions',
          { controller: 'stTestCtrl', templateUrl: 'app/partials/student/test/instructions.html'})
      .when('/student/recommended_video',
          { controller: 'stVideoCtrl', templateUrl: 'app/partials/student/video/recommended_video.html'})
      .when('/test/start',
          { controller: 'stTestCtrl', templateUrl: 'app/partials/student/test/start.html'})
      .when('/test/score',
          { controller: 'stTestCtrl', templateUrl: 'app/partials/student/test/score.html'})
      $routeProvider.otherwise('/login');
  });


// A filter to cut words in limit angular
angular.module('studentApp').filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });
  //set basic headers for api key and another base authentication
  app.run(['$http','$rootScope', '$cookies', '$location','$timeout', function ($http,$rootScope,$cookies,$location,$timeout) {
      $rootScope.$on('$routeChangeStart', function (event) {
        //get curent location of routes and check if it satisfy the url
        //Himanshu
          var readCookie = $cookies.get('access_token');
          $timeout(function () {
            if(readCookie == undefined || readCookie == null){
                $location.path('/login');
              }
            else{
              $rootScope.isloggedin = true;
            }
          }, 10);
    });

  }]);

  app.directive('slickSlider',function($timeout){
   return {
     restrict: 'A',
     link: function(scope,element,attrs) {
       $timeout(function() {
           $(element).slick(scope.$eval(attrs.slickSlider));
       });
     }
   }
  });

  app.directive('donut', function() {
  return { restrict: 'E',
           link: function(scope, element) {
                   //custom colors          
                  var color = d3.scale.ordinal()
                  .range(["#FFFF33", "#FF4500", "#3CB371"]);
                   var data = [4, 6, 10];
                   var width = 110;
                   var height = 110;
                   var pie = d3.layout.pie().sort(null);
                   var arc = d3.svg.arc()
                     .outerRadius(width / 2 * 0.9)
                     .innerRadius(width / 2 * 0.7)
                   var svg = d3.select(element[0]).append('svg')
                     .attr({width: width, height: height})
                     .append('g')
                     .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
                     // add the <path>s for each arc slice
                  svg.selectAll('path').data(pie(data))
                     .enter().append('path')
                     .attr('d', arc)
                     .attr('fill', function(d, i){ return color(i) });
            }
   }
  });
