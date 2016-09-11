;(function() {
  'use strict';

  angular
    .module('app', [
      'ngStorage',
      'ngMessages',
      'ngMap',

      'pascalprecht.translate',

      'ui.router',
      'ui.bootstrap',
      'ui.utils.masks',

      'app.generic',
      'app.customers',
      'app.dashboard',
      'app.orders',
      'app.products',
      'app.referencePoints',

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
