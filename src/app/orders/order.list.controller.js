(function() {
  'use strict';

  angular
    .module('app.orders')
    .controller('OrderListController', OrderListController);


  /*@ngInject*/
  function OrderListController($state, $controller, RestService) {
    var vm = this;

    RestService.endpoint = 'orders';
    angular.extend(vm, $controller('GenericListController', {
        vm: vm, $state: $state, service: RestService
      })
    );

    return vm;
  }

})();
