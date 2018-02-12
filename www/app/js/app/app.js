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
