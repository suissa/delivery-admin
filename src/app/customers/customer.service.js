(function() {
  'use strict';

  angular
  .module('app.customers')
  .factory('CustomerService', CustomerService);

  /*@ngInject*/
  function CustomerService(HTTPService) {
    var service = {
      search: function(params) {
        return HTTPService
          .get('/api/customers', params)
          .then(HTTPService.handleError);
      },

      getDateOptions: function() {
        return {
          formatYear: 'yy',
          maxDate: new Date(),
          minDate: new Date(1900, 0, 1),
          startingDay: 1,
          showWeeks: false
        };
      },

      normalizeBirthDate: function(birthDate) {
        return birthDate ? new Date(birthDate) : '';
      }
    };

    return service;
  };

})();
