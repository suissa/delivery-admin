(function() {
  'use strict';

  angular
    .module('app.products')
    .controller('ProductListController', ProductListController);


  /*@ngInject*/
  function ProductListController($state, $controller, RestService) {
    var vm = this;

    RestService.endpoint = 'products';
    angular.extend(vm, $controller('GenericListController', {
        vm: vm, $state: $state, service: RestService
      })
    );

    return vm;
  }

})();
