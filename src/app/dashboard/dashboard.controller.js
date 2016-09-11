(function() {
  'use strict';

  angular
    .module('app')
    .controller('DashboardController', DashboardController);

    /*@ngInject*/
    function DashboardController($rootScope) {
      var vm = this;

      console.log('DashboardController');

      return vm;
    }

})();
