(function() {
  'use strict';

  angular
    .module('app.customers')
    .config(config);


  /*@ngInject*/
  function config ($stateProvider, $httpProvider, $urlRouterProvider, $compileProvider) {
    $stateProvider
    .state('app.customers', {
      url: '/customers',
      controller: 'CustomerListController',
      controllerAs: 'vm',
      templateUrl: '/customers/list.html',
      data : {
        title: 'Lista de Clientes'
      }
    })
    .state('app.customer', {
      url: '/customer',
      controller: 'CustomerController',
      controllerAs: 'vm',
      templateUrl: '/customers/form.html',
      data : {
        title: 'Cadastro de Cliente'
      }
    });
  }
}());
