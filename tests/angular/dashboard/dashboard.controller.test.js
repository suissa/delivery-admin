'use strict';

describe('dashboard.controller', function () {
  beforeEach(module('app'));

  var $rootScope, $scope, $controller;

  beforeEach(inject(before));
  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $controller = _$controller_;
  }));

  it('#init', function() {
    var controller = $controller('DashboardController', { $scope: $scope });

    expect(controller).toBeDefined();
  });
}); //describe
