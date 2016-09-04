(function() {
  'use strict';

  angular
    .module('app')
    .controller('AppController', AppController);

    /*@ngInject*/
    function AppController($rootScope, $templateCache) {
      var vm = this;

      return vm;
    }

})();
