(function() {
  'use strict';

  angular
  .module('app')
  .factory('HTTPInterceptor', HTTPInterceptor);

  /*@ngInject*/
  function HTTPInterceptor($rootScope, $timeout, $translate, $q) {
    var service = this;
    var canceller = $q.defer();
    service.request = function(config) {
      canceller = $q.defer();
      config.timeout = canceller.promise;

      // $timeout(function() {
      //   canceller.resolve('timeout');
      // }, 10 * 1000);

      return config;
    };
    service.response = function(response) {
      return response;
    };
    service.responseError = function(response) {
      var errors = {
        '401': 'unauthorized',
        '403': 'forbidden',
        '405': 'unavailable',
        '413': 'entity_too_large',
        '422': 'unprocessable_entity',
        '500': 'unavailable',
        '503': 'unavailable',
        '504': 'unavailable'
      };
      var key = String(response.status);
      var message = errors[key] ? errors[key] : 'try_again';

      if(/401|403|405|413|422|500|503|504/.test(key)) {
        canceller.resolve(errors[key]);

        $rootScope.$broadcast(message, response);
        return $q.reject(message);
      };

      return response;
    };

    return service;
  };

})();
