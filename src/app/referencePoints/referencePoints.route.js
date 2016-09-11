(function() {
  'use strict';

  angular
    .module('app.referencePoints')
    .config(config);


  /*@ngInject*/
  function config ($stateProvider) {
    $stateProvider
    .state('app.referencePoints', {
      url: '/referencePoints?q?page?',
      controller: 'ReferencePointListController',
      controllerAs: 'vm',
      templateUrl: '/referencePoints/list.html',
      data : {
        title: 'Pontos de Referência'
      }
    })
    .state('app.referencePoint', {
      url: '/referencePoint/:id?',
      controller: 'ReferencePointController',
      controllerAs: 'vm',
      templateUrl: '/referencePoints/form.html',
      data : {
        title: 'Cadastro de Ponto de Ref'
      }
    });
  }
}());
