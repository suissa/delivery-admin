(function() {
  'use strict';

  angular
    .module('app.products')
    .controller('ProductController', ProductController);


  /*@ngInject*/
  function ProductController($state, RestService, NotificationService) {
    var vm = this;
    var id = $state.params.id;

    RestService.endpoint = 'products';

    vm.product = {};
    vm.save = save;

    if (id) {
      _byId(id)
    }

    function save(data) {
      RestService.save(data)
        .then(function(response) {
          var data = response.data;

          if (response.status === 201) {
            $state.go($state.current.name, { id: data._id });
          }

          NotificationService.success({ title: 'product', message: 'form.saved' });
        })
        .catch(NotificationService.error);
    }

    /**
     * private
     */
    function _byId(id) {
      RestService.byId(id)
        .then(function(response) {
          vm.product = response.data;
        })
        .catch(NotificationService.error);
    }

    return vm;
  }

})();
