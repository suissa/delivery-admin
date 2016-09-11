(function() {
  'use strict';

  angular
    .module('app.referencePoints')
    .controller('ReferencePointController', ReferencePointController);


  /*@ngInject*/
  function ReferencePointController($state, RestService, NotificationService) {
    var vm = this;
    var id = $state.params.id;

    RestService.endpoint = 'referencePoints';

    vm.referencePoint = {};
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

          NotificationService.success({ title: 'referencePoint', message: 'form.saved' });
        })
        .catch(NotificationService.error);
    }

    /**
     * private
     */
    function _byId(id) {
      RestService.byId(id)
        .then(function(response) {
          vm.referencePoint = response.data;
        })
        .catch(NotificationService.error);
    }

    return vm;
  }

})();
