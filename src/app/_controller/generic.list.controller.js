(function() {
  'use strict';

  angular
    .module('app.generic')
    .controller('GenericListController', GenericListController);


  /*@ngInject*/
  function GenericListController($state, vm, service, NotificationService) {
    vm.q = $state.params.q;

    _init({ q: vm.q, page: $state.params.page });

    /**
     * private
     */
    function _init(query) {
      service.list(query)
        .then(function(response) {
          vm.data = response.data;
        })
        .catch(NotificationService.error);
    }

    return vm;
  }

})();
