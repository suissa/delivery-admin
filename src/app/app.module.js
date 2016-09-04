;(function() {
  'use strict';

  angular
    .module('app', [
      'ngStorage',
      'ngMessages',

      'pascalprecht.translate',

      'ui.router',
      'ui.bootstrap',

      'app.customers',
      'app.dashboard',
      'app.orders',
      'app.products',

      'templates'
    ])
    .config(config);

    /*@ngInject*/
    function config($translateProvider, $windowProvider) {
      var $window = $windowProvider.$get();
      $translateProvider.preferredLanguage('pt_BR');
      $translateProvider.useSanitizeValueStrategy('escape');

      $translateProvider.useStaticFilesLoader({
        prefix: 'app/_resources/locale-',
        suffix: '.json?r=' + ($window.rev || '')
      });
    }

})();
