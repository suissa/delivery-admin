(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('CustomerListController', CustomerListController);


  /*@ngInject*/
  function CustomerListController($state, $controller, RestService) {
    var vm = this;

    RestService.endpoint = 'customers';
    angular.extend(vm, $controller('GenericListController', {
        vm: vm, $state: $state, service: RestService
      })
    );

    return vm;
  }

})();
