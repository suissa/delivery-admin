(function() {
  'use strict';

  angular
    .module('app.products')
    .factory('ProductService', ProductService);

  /*@ngInject*/
  function ProductService(HTTPService) {
    var service = {
      list: function(params) {
        return HTTPService
          .get('/api/products', params)
          .then(HTTPService.handleError);
      }
    };

    return service;
  };

})();
