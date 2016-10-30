(function() {
  'use strict';

  angular
    .module('app')
    .controller('AppController', AppController);

    /*@ngInject*/
    function AppController($scope, $rootScope, $templateCache) {
      var vm = $scope;

      vm.toggleMenu = toggleMenu;
      vm.closeMenu = closeMenu;

      $rootScope.isOpenMenu = false;

      var stateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        vm.closeMenu();
      });

      function toggleMenu($event) {
        $event.stopPropagation();
        $rootScope.isOpenMenu = !$rootScope.isOpenMenu;
      }

      function closeMenu() {
        $rootScope.isOpenMenu = false;
      }


      return vm;
    }

})();
