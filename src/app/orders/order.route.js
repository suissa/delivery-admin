(function() {
  'use strict';

  angular
    .module('app.orders')
    .config(config);


  /*@ngInject*/
  function config ($stateProvider) {
    $stateProvider
    .state('app.orders', {
      url: '/orders?q?page?',
      controller: 'OrderListController',
      controllerAs: 'vm',
      templateUrl: '/orders/list.html',
      data : {
        title: 'Lista de Pedidos'
      }
    })
    .state('app.map', {
      url: '/map',
      controller: 'OrderMapController',
      controllerAs: 'vm',
      templateUrl: '/orders/map.html',
      data : {
        title: 'Mapa de Entregas'
      }
    })
    .state('app.order', {
      url: '/order/:id?',
      controller: 'OrderController',
      controllerAs: 'vm',
      templateUrl: '/orders/print.html',
      data : {
        title: 'Visualização do Pedido'
      }
    });
  }
}());
