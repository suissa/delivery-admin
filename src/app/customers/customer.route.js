(function() {
  'use strict';

  angular
    .module('app.customers')
    .config(config);


  /*@ngInject*/
  function config ($stateProvider) {
    $stateProvider
    .state('app.customers', {
      url: '/customers?q?page?',
      controller: 'CustomerListController',
      controllerAs: 'vm',
      templateUrl: '/customers/list.html',
      data : {
        title: 'Lista de Clientes'
      }
    })
    .state('app.customer', {
      url: '/customer/:id?',
      controller: 'CustomerController',
      controllerAs: 'vm',
      templateUrl: '/customers/form.html',
      data : {
        title: 'Cadastro de Cliente'
      }
    });
  }
}());
