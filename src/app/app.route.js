(function() {
  'use strict';

  angular
    .module('app')
    .run(runBlock)
    .config(config);

  /*@ngInject*/
  function runBlock($rootScope, $state, $localStorage, NotificationService) {
    $rootScope.state = $state;

    var stateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      $rootScope.$storage = $localStorage;

      NotificationService.close();
    });
  }

  /*@ngInject*/
  function config ($stateProvider, $httpProvider, $urlRouterProvider, $compileProvider) {

    $httpProvider.interceptors.push('HTTPInterceptor');

    $urlRouterProvider.otherwise('/dashboard');

    // disable debug info in prod
    if (!location.port) {
      $compileProvider.debugInfoEnabled(false);
    }

    $stateProvider
    .state('app', {
      data: { requireLogin: true },
      abstract: true,
      views: {
        '': {
          templateUrl: '/_layout/layout.html'
        }
      }
    })
    .state('app.dashboard', {
      url: '/dashboard',
      controller: 'DashboardController',
      controllerAs: 'vm',
      templateUrl: '/dashboard/dashboard.html',
      data : {
        title: 'Dashboard'
      }
    });
  }
}());
