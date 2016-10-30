'use strict';

describe('app.controller', function () {
  beforeEach(module('app'));

  var $rootScope, $scope, $controller;

  beforeEach(inject(before));
  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $controller = _$controller_;
  }));

  it('#init', function() {
    var controller = $controller('AppController', { $scope: $scope });

    expect(controller).toBeDefined();
  });

  it('#toggleMenu', function() {
    spyOn(EVENT, 'stopPropagation');

    var controller = $controller('AppController', { $rootScope: $rootScope, $scope: $scope });

    expect($rootScope.isOpenMenu).toBeFalsy();
    controller.toggleMenu(EVENT);
    expect($rootScope.isOpenMenu).toBeTruthy();
    expect(EVENT.stopPropagation).toHaveBeenCalled();
  });

  it('#closeMenu', function() {
    var controller = $controller('AppController', { $rootScope: $rootScope, $scope: $scope });

    $rootScope.isOpenMenu = true;
    controller.closeMenu();
    expect($rootScope.isOpenMenu).toBeFalsy();
  });

  it('#on stateChangeStart', function() {
    var controller = $controller('AppController', { $rootScope: $rootScope, $scope: $scope });
    spyOn(controller, 'closeMenu')
    $rootScope.$broadcast('stateChangeStart');
    $scope.$apply();
    expect(controller.closeMenu).toHaveBeenCalled();
  });

}); //describe
