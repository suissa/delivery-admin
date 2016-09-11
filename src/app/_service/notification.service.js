(function() {
  'use strict';

  angular
    .module('app')
    .factory('NotificationService', NotificationService);

  /*@ngInject*/
  function NotificationService($rootScope) {
    function _nofity (type) {
      return function(notification) {
        var message = {
          type : type,
          message : angular.isObject(notification) ? notification.message : notification,
          title   : angular.isObject(notification) ? notification.title : false,
          timeout : angular.isObject(notification) ? notification.timeout : true
        };

        $rootScope.$broadcast('notificationChannel', message);
      };
    }

    var service = {
      success : _nofity('success'),
      warning : _nofity('warning'),
      error : _nofity('danger'),
      info : _nofity('info'),

      close: function() {
        $rootScope.$broadcast('notificationChannel', 'close');
      }
    };

    return service;
  };

})();
