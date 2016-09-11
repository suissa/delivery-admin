(function() {
  'use strict';

  angular
    .module('app.orders')
    .factory('OrderService', OrderService);

  /*@ngInject*/
  function OrderService(HTTPService) {
    var DELIVERY_TIME = 50 * 60 * 1000;

    var service = {
      list: function(params) {
        return HTTPService
          .get('/api/orders', params)
          .then(HTTPService.handleError);
      },

      getDeliveryTime: function() {
        var now = new Date().getTime();
        return {
          date: new Date(now + DELIVERY_TIME),
          price: 5
        };
      },

      normalizeDeliveryDate: function(deliveryDate) {
        return deliveryDate ? new Date(deliveryDate) : '';
      },
      save: function(order) {

      },

      getDateOptions: function() {
        return {
          formatYear: 'yy',
          minDate: new Date(),
          startingDay: 1,
          showWeeks: false
        };
      },

      createOrder: function(customer, order, items, gifts) {
        if (customer) {
          order._customer = customer._id;
          order.customer = customer;
          order.shippingAddress = customer.address;
        }

        order.items = _filterProductsWithQuantity(items);
        order.gifts = _filterProductsWithQuantity(gifts);

        if (order.payment && order.payment.paymentType !== 'MONEY') {
          order.payment.change = null;
          order.payment.moneyTotal = null;
        }

        return HTTPService.post('/api/orders', order)
          .then(HTTPService.handleError);
      }
    };

    function _filterProductsWithQuantity(items) {
      return (items || []).filter(function(item) {
        return item.quantity;
      });
    }

    return service;
  };

})();
