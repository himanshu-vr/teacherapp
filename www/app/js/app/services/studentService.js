/*
 Date- July2, 2017
 Purpose- this service is responsible for getting the all detail of a user
 */

'use strict';
angular.module('studentApp').factory('studentService', ['$http', '$cookies', function($http, $cookies) {
  return {
    //function to get user detail
    login: function(loginData) {
      var $promise = $http.post('http://ajay.abhigna.info/api/api/Authenticate',loginData);
          $promise.then(function onSuccess(response){
          })
          .catch(function onError(){

          })
          return $promise;
    },

  };
}])
