(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('CustomerListController', CustomerListController);


  /*@ngInject*/
  function CustomerListController($state, CustomerService) {
    var vm = this;

    vm.goTo = goTo;

    CustomerService.list()
      .then(function(response) {
        vm.data = response.data.items;
      })
      .catch(function(err) {
        console.log(err);
      });


    function goTo(stateName) {
      $state.go(stateName);
      vm.data = {};
    }

    return vm;
  }

})();
