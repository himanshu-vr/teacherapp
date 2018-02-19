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

    //function to get recommended videos
    recommendedVideo: function(){
      var cookie = $cookies.get('access_token');
      if(cookie != undefined && cookie != null){
        cookie  = JSON.parse(cookie);
        var access_token = cookie.access_token;
        var data = {
          "StudentId" : cookie.UserID
        }
        console.log(data);
        var $promise = $http.post('http://ajay.abhigna.info/api/api/RecommendedVideos', {
          data : data
          }, {
          headers: {
            'Authorization': 'bearer ' + access_token
          }
        })
        $promise.then(function onSuccess(result) {
          })
          .catch(function onError(error) {
          });
        return $promise;
      }else{
        return [];
      }
    },
    //function to get scheduleTest
    testSchedule : function(){
      var cookie = $cookies.get('access_token');
      if(cookie != undefined && cookie != null){
        cookie  = JSON.parse(cookie);
        var access_token = cookie.access_token;
        var data = {
          "StudentId" : cookie.UserID
        }
        var $promise = $http.post('http://ajay.abhigna.info/api/api/TestSchedule', {
          data : data
          }, {
          headers: {
            'Authorization': 'bearer ' + access_token
          }
        })
        $promise.then(function onSuccess(result) {
          })
          .catch(function onError(error) {
          });
        return $promise;
      }else{
        return [];
      }
    },
  //function to get questions
  getQuestions : function(testId){
    console.log(testId);
    var cookie = $cookies.get('access_token');
    if(cookie != undefined && cookie != null){
      cookie  = JSON.parse(cookie);
      var access_token = cookie.access_token;
      var data = {
        "TestId" : "2"
      }
      console.log(data);
      console.log(access_token);
      var $promise = $http.post('http://ajay.abhigna.info/api/api/TestQuestion', {
        data : data
        }, {
        headers: {
          'Authorization': 'bearer ' + access_token
        }
      })
      $promise.then(function onSuccess(result) {
        console.log(result);
        })
        .catch(function onError(error) {
        });
      return $promise;
    }else{
      return [];
    }
  }
  };
}])
