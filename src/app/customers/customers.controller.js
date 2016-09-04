(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('CustomerController', CustomerController);


  /*@ngInject*/
  function CustomerController($state, CustomerService) {
    var vm = this;

    vm.data = {
      address: { addressRegion: 'SP' }
    };

    vm.save = save;

    function save(data) {
      CustomerService.save(data)
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(err) {
          console.log(err);
        })
    }

    return vm;
  }

})();
