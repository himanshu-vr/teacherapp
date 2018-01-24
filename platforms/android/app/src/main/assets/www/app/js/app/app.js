/*
 Author - Himanshu Gupta
 Purpose - app.js  - Responsible for all dependency injection and routing
 Date  - Jan15, 2018
*/

//Create a Global scope module here

angular.module('studentApp',['ngRoute' , 'ngCookies']);
angular.module('studentApp')

//Settig Up the routes

.config(function($routeProvider){
      $routeProvider
      .when('/login',
          { controller: 'loginCtrl', templateUrl: 'app/partials/auth/login.html'})
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
