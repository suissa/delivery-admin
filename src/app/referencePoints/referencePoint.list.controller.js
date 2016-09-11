(function() {
  'use strict';

  angular
    .module('app.referencePoints')
    .controller('ReferencePointListController', ReferencePointListController);


  /*@ngInject*/
  function ReferencePointListController($state, $controller, RestService) {
    var vm = this;

    RestService.endpoint = 'referencePoints';
    angular.extend(vm, $controller('GenericListController', {
        vm: vm, $state: $state, service: RestService
      })
    );

    return vm;
  }

})();
