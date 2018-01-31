'use strict'

angular.module('playerApp').service('courseQuestionsAdapter', ['$rootScope', '$http',
  'httpAdapter', '$q', 'toasterService',
  function ($rootScope, $http, httpAdapter, $q, toasterService) {
    this.getQuestions = function (contextId) {
      var data = ''
      return handleHttpRequest('/discussions/v1/list/'+ contextId, data, 'GET',
        'Error while loading questions, please try again later')
    }
    this.getQuestionById = function (threadId) {
      var data = ''
      return handleHttpRequest('/discussions/v1/thread/' + threadId, data, 'GET',
        'Error while loading questions, please try again later')
    }
    this.composeThread = function (obj) {
      var data = obj
      console.log(data)
      return handleHttpRequest('/discussions/v1/thread', data, 'POST',
        'Error while posting the question, please try again later')
    }

    this.replyThread = function (threadId, obj) {
      var data = obj
      console.log(data)
      return handleHttpRequest('/discussions/v1/thread/reply/' + threadId, data, 'POST',
        'Error while posting your reply, please try again later')
    }

    this.actions = function (replyId,actionTypeId) {
      var data = {
        'actionTypeId':actionTypeId
      }
      return handleHttpRequest('/discussions/v1/thread/actions/' + replyId, data, 'POST',
        'Error while up voting, please try again')
    }

    this.undoActions = function (actionTypeId) {
      var data = {}
      return handleHttpRequest('/discussions/v1/thread/undoActions/' + actionTypeId, data, 'POST',
        'Error while down voting, please try again')
    }

    function handleHttpRequest (url, data, type, errMsg) {
      var deferred = $q.defer()
      var response = httpAdapter.httpCall(url, data, type)
      response.then(function (res) {
        if (res && res.responseCode === 'OK') {
          deferred.resolve(res)
        } else {
          toasterService.error(errMsg)
          deferred.reject(res)
        }
      }, function (err) {
        toasterService.error(errMsg)
        deferred.reject(err)
      })
      return deferred.promise
    }
  }
])