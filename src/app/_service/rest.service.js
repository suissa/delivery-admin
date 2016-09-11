(function() {
  'use strict';

  angular
    .module('app.generic')
    .factory('RestService', RestService);

  /*@ngInject*/
  function RestService(HTTPService) {
    var service = {
      endpoint: '',
      list: function(params) {
        return HTTPService
          .get('/api/' + this.endpoint, params)
          .then(HTTPService.handleError);
      },
      byId: function(id) {
        return HTTPService
          .get('/api/' + this.endpoint + '/' + id)
          .then(HTTPService.handleError);
      },
      save: function(data) {
        var promise;
        if (data._id) {
          promise = HTTPService.put('/api/' + this.endpoint + '/' + data._id, data)
        } else {
          promise = HTTPService.post('/api/' + this.endpoint, data);
        }

        return promise
          .then(HTTPService.handleError);
      },
      remove: function(id) {
        return HTTPService
          .remove('/api/' + this.endpoint + '/' + id)
          .then(HTTPService.handleError);
      }
    };

    return service;
  };

})();
