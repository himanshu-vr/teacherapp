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
      var cookie = $cookies.get('access_token');
      if(cookie != undefined && cookie != null){
        cookie  = JSON.parse(cookie);
        var access_token = cookie.access_token;
        var data = {
          "StudentId" : cookie.UserID
        }
        console.log(data);
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
    }

    // function Service() {
    //     var modals = [1]; // array of modals on the page
    //     var service = {};
 
    //     service.Add = Add;
    //     service.Remove = Remove;
    //     service.Open = Open;
    //     service.Close = Close;
 
    //     return service;
 
    //     function Add(modal) {
    //         // add modal to array of active modals
    //         modals.push(modal);
    //     }
         
    //     function Remove(id) {
    //         // remove modal from array of active modals
    //         var modalToRemove = _.findWhere(modals, { id: id });
    //         modals = _.without(modals, modalToRemove);
    //     }
 
    //     function Open(id) {
    //         // open modal specified by id
    //         var modal = _.findWhere(modals, { id: id });
    //         modal.open();
    //     }
 
    //     function Close(id) {
    //         // close modal specified by id
    //         var modal = _.findWhere(modals, { id: id });
    //         modal.close();
    //     }
    // }
  };
}])
