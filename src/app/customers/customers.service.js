(function() {
  'use strict';

  angular
    .module('app.customers')
    .factory('CustomerService', CustomerService);

  /*@ngInject*/
  function CustomerService(HTTPService) {
    var service = {
      list: function() {
        return HTTPService
          .get('/api/customers')
          .then(HTTPService.handleError);
      },
      byId: function(id) {
        return HTTPService
          .get('/api/customers/' + id)
          .then(HTTPService.handleError);
      },
      save: function(data) {
        var promise;
        if (data._id) {
          promise = HTTPService.update('/api/customers/' + data._id, data)
        } else {
          promise = HTTPService.post('/api/customers', data);
        }

        return promise
          .then(HTTPService.handleError);
      },
      remove: function(id) {
        return HTTPService
          .remove('/api/customers/' + id)
          .then(HTTPService.handleError);
      }
    };

    return service;
  };

})();
