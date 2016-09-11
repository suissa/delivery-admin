(function() {
  'use strict';

  angular
    .module('app.orders')
    .controller('OrderMapController', OrderMapController);


  /*@ngInject*/
  function OrderMapController($state, OrderService) {
    var vm = this;

    vm.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB7BimdwO2vhjoXDyKWKkWyuzrQsA4TwgM';
    vm.zoom = 15;
    vm.organization = {
      location: '-23.6024185,-46.7881249',
      icon: '/assets/images/organization-marker-image.png'
    };
    vm.shape = {
      coords: [1, 1, 1, 20, 18, 20, 18 , 1],
      type: 'poly'
    };


    OrderService.list()
      .then(function(response) {
        var data = response.data;

        vm.markers = (data.items || [])
          .filter(function(item) {
            return item.shippingAddress.location;
          })
          .map(function(item) {
            console.log('item', item);
            return {
              label: item.customer.givenName,
              position: [item.shippingAddress.location.lat, item.shippingAddress.location.lng]
            }
          });
      });

    return vm;
  }

})();
