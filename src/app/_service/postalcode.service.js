(function() {
  'use strict';

  angular
  .module('app')
  .factory('PostalCodeService', PostalCodeService);

  /*@ngInject*/
  function PostalCodeService(HTTPService) {
    var service = {
      findReferencePoint: function(shippingAddress) {
        var params = {
          postalCode: shippingAddress.postalCode,
          number: shippingAddress.number
        };
        return HTTPService.get('/api/postalcodes/referencePoint', params, { cache: true });
      },
      findByPostalCode: function(postalCode) {
        return HTTPService.get('/api/postalcodes/' + postalCode, {}, { cache: true });
      },

      getLocation: function(shippingAddress) {
        return HTTPService
          .get('https://maps.google.com/maps/api/geocode/json?address=' +
              shippingAddress.streetAddress + ',' + shippingAddress.number + '&sensor=true')
          .then(HTTPService.handleError);
      }
    };

    return service;
  };

})();
