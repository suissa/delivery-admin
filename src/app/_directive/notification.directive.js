(function() {
  'use strict';
  angular
    .module('app')
    .directive('appNotification', appNotification);

    function appNotification() {

      var _template = [
        '<div class="alert-container" ng-if="alert.display()">',
        '<div class="alert alert-{{ alert.type }}" role="alert">',
        '<i class="fa" ng-class="{ \'fa-exclamation-circle\': (alert.type === \'warning\' || alert.type === \'danger\'), \'fa-check-circle\': alert.type === \'success\' }" aria-hidden="true"></i>',
        '<p class="alert-text"><b ng-if="alert.title">{{ alert.title | translate }} </b>{{ alert.message | translate }}</p>',
        '<i class="fa fa-close alert-close" ng-click="alert.close()" aria-hidden="true"></i>',
        '</div>',
        '</div>'];

      return {
        restrict: 'EA',
        replace: false,
        transclude: true,
        scope: true,
        template : _template.join(''),
        controller: NotificationController
      };

      /*@ngInject*/
      function NotificationController($scope, $rootScope, $timeout) {
        var TIME_OUT = 5000;
        var intv;

        var flashMessage = {
          type : 'success',
          message : null,
          timeout : true,

          display : function () {
            return this.isVisible;
          },

          close : function () {
            this.isVisible = false;
          },

          notify : function (config) {
            this.message = config.message;
            this.title = config.title;
            this.type = config.type;
            this.timeout = config.timeout;

            this.init();
          },

          init : function () {
            $timeout.cancel(intv);

            this.isVisible = true;
            if (this.timeout && !isNaN(this.timeout) && this.timeout > TIME_OUT) {
              intv = $timeout(this.close.bind(this), this.timeout);
            } else {
              intv = $timeout(this.close.bind(this), TIME_OUT);
            }
          }
        };

        $scope.alert = flashMessage;

        var $notificationChannel = $rootScope.$on('notificationChannel', function ($event, data) {
          if (data === 'close') {
            return flashMessage.close();
          }
          flashMessage.notify(data);
        });
      }

    }
})();
