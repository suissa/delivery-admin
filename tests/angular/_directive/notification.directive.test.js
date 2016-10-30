'use strict';

describe('notification.directive', function () {
  beforeEach(module('app'));

  var $rootScope, $scope, compile, element;

  beforeEach(inject(before));
  beforeEach(inject(function(_$rootScope_, $compile) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    compile = $compile;
  }));

  it('#init', function() {
    element = getElement(compile, $scope, '<app-notification></app-notification>');
    $rootScope.$apply($rootScope.$broadcast('notificationChannel', { title: 'customer' }));

    $scope.$apply();
    expect(element.text()).toBe('');
  });
}); //describe
