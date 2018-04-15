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
        var $promise = $http.post('http://ajay.abhigna.info/api/api/RecommendedVideos', data, {
          headers: {
            'Authorization': 'bearer ' + access_token
            // 'Content-Type' : 'application/x-www-form-urlencoded'
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

    //function to get popular videos
    popularVideo: function(){
      var cookie = $cookies.get('access_token');
      if(cookie != undefined && cookie != null){
        cookie  = JSON.parse(cookie);
        var access_token = cookie.access_token;
        var data = {
          "StudentId" : cookie.UserID
        }
        console.log(data);
        var $promise = $http.post('http://ajay.abhigna.info/api/api/PopularVideos', data, {
          headers: {
            'Authorization': 'bearer ' + access_token
            // 'Content-Type' : 'application/x-www-form-urlencoded'
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
        var $promise = $http.post('http://ajay.abhigna.info/api/api/TestSchedule', data, {
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
    },
  //function to get questions
  getQuestions : function(testId){
    var cookie = $cookies.get('access_token');
    if(cookie != undefined && cookie != null){
      cookie  = JSON.parse(cookie);
      var access_token = cookie.access_token;
      var data = {
        "TestId" : testId
      }
      // var data = {
      //   "TestId":29,
      // 	"SubjectId":3,
      // 	"StartTime":"2018-02-08",
      // 	"EndTime":"2018-02-09",
      // 	"StudentId":4,
      // 	"lstQuesAns":[
      // 		{
      // 		"QuestionId":59,
      // 		"AnswerId":52
      // 	},
      // 	{
      // 		"QuestionId":60,
      // 		"AnswerId":53
      // 	},
      // 	{
      // 		"QuestionId":7,
      // 		"AnswerId":6
      // 	}
	    //  ]
      // }
      // console.log(data);
      // console.log(access_token);
      var $promise = $http.post('http://ajay.abhigna.info/api/api/TestQuestion', data, {
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
  },

  //submit the test here
  submitTest : function(data){
    var cookie = $cookies.get('access_token');
    if(cookie != undefined && cookie != null){
      cookie  = JSON.parse(cookie);
      var access_token = cookie.access_token;
      data.StudentId  =  cookie.UserID;
      var data = data;
      console.log(data);
      var $promise = $http.post('http://ajay.abhigna.info/api/api/TestAnswer', data, {
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
  },
  //function to get video details
  getVideoDetail : function(data){
    var cookie = $cookies.get('access_token');
    if(cookie != undefined && cookie != null){
      cookie  = JSON.parse(cookie);
      var access_token = cookie.access_token;
      var data = {
        "VideoId" : data
      }
      console.log(data);
      var $promise = $http.post('http://ajay.abhigna.info/api/api/GetVideosDetails ', data, {
        headers: {
          'Authorization': 'bearer ' + access_token
          // 'Content-Type' : 'application/x-www-form-urlencoded'
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
  }
  };
}])
