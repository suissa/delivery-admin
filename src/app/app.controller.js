(function() {
  'use strict';

  angular
    .module('app')
    .controller('AppController', AppController);

    /*@ngInject*/
    function AppController($scope, $rootScope, $templateCache) {
      var vm = $scope;

      vm.toggleMenu = toggleMenu;
      vm.toogleMenuItem = toogleMenuItem;
      vm.closeMenu = closeMenu;

      $rootScope.isOpenMenu = false;

      var stateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        vm.closeMenu();
      });

      function toggleMenu($event) {
        $event.stopPropagation();
        $rootScope.isOpenMenu = !$rootScope.isOpenMenu;
      }

      function toogleMenuItem($event) {
        var $parent = angular.element($event.target).parent();

        if ($parent.hasClass('is-active')) {
          $parent.removeClass('is-active');
        } else {
          $parent.addClass('is-active');
        }
      }

      function closeMenu() {
        $rootScope.isOpenMenu = false;
      }


      return vm;
    }

})();
