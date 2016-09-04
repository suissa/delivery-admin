(function() {
  'use strict';

  angular
  .module('app')
  .factory('HTTPService', HTTPService);

  /*@ngInject*/
  function HTTPService($http) {
    var service = {
      get: function(url) {
        var req = {
          url: url,
          method: 'GET'
        };
        return $http(req).then(_handleResponseData);
      },
      post: function post(url, data, headers) {
        var req = {
          url: url,
          data: data,
          method: 'POST',
          headers: headers || {}
        };
        return $http(req).then(_handleResponseData);
      },
      put: function put(url, data, headers) {
        var req = {
          url: url,
          data: data,
          method: 'PUT',
          headers: headers || {}
        };
        return $http(req).then(_handleResponseData);
      },
      delete: function(url, headers) {
        var req = {
          url: url,
          method: 'DELETE',
          headers: headers || {}
        };
        return $http(req).then(_handleResponseData);
      },
      handleError: function (response) {
        if (response.status >= 400) {
          throw new Error(response.data || 'Ocorreu um erro');
        }
        return response;
      }
    };

    return service;
  };

  function _handleResponseData(response) {
    if (!angular.isString(response.data)) {
      response.data = response.data || {};
    }
    return response;
  }

})();
