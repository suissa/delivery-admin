(function() {
  'use strict';

  angular
    .module('app.orders')
    .controller('OrderController', OrderController);


  /*@ngInject*/
  function OrderController($state, RestService, ProductService, NotificationService, CustomerService, OrderService) {
    var vm = this;
    var id = $state.params.id;

    RestService.endpoint = 'orders';

    vm.order = {};
    vm.saveOrder = saveOrder;
    vm.autocompleteCustomer = autocompleteCustomer;

    if (id) {
      _byId(id);
    }

    vm.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1,
      showWeeks: false
    };

    function saveOrder(order) {
      OrderService.save(order)
        .then(function(response) {
          var data = response.data;

          if (response.status === 201) {
            $state.go($state.current.name, { id: data._id });
          }

          NotificationService.success({ title: 'order', message: 'form.saved' });
        })
        .catch(NotificationService.error);
    }

    function autocompleteCustomer(search) {
      CustomerService.search({ q: search });
    }

    /**
     * private
     */
    function _byId(id) {
      RestService.byId(id)
        .then(function(response) {
          vm.order = response.data;

          if (vm.order.delivery && vm.order.delivery.date) {
            vm.order.delivery.date = OrderService.normalizeDeliveryDate(vm.order.delivery.date);
          }
          console.log(vm.order)
        })
        .catch(NotificationService.error);
    }

    return vm;
  }

})();
