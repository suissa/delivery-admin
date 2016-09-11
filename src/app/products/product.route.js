(function() {
  'use strict';

  angular
    .module('app.products')
    .config(config);


  /*@ngInject*/
  function config ($stateProvider) {
    $stateProvider
    .state('app.products', {
      url: '/products?q?page?',
      controller: 'ProductListController',
      controllerAs: 'vm',
      templateUrl: '/products/list.html',
      data : {
        title: 'Lista de Produtos'
      }
    })
    .state('app.product', {
      url: '/product/:id?',
      controller: 'ProductController',
      controllerAs: 'vm',
      templateUrl: '/products/form.html',
      data : {
        title: 'Cadastro de Produto'
      }
    });
  }
}());
