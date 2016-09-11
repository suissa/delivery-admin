(function() {
  'use strict';
  angular
    .module('app')
    .filter('telephone', telephone)
    .filter('sum', sum);

  function telephone() {
    return function(str) {
      if (!str) return;
      return str.replace(/^\+55\s?/, '');
    };
  }

  function sum() {
    return function (arr, prop) {
      return (arr || []).reduce(function(prev, curr) {
        return !curr[prop] ? prev : prev + curr[prop];
      }, 0);
    };
  }

})();
