'use strict';

describe('order.controller', function () {
  beforeEach(module('app'));

  var $rootScope, $scope, $httpBackend, $controller;

  beforeEach(inject(before));
  beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$controller_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $controller = _$controller_;
  }));

  it('#init dateOptions', function() {
    var controller = $controller('OrderController', { $scope: $scope });
    expect(controller).toBeDefined();

    expect(controller.dateOptions.formatYear).toBe('yy');
    expect(controller.dateOptions.startingDay).toEqual(1);
    expect(controller.dateOptions.minDate.getTime()).toBeTruthy();
    expect(controller.dateOptions.showWeeks).toBeFalsy();
  });

  it('#init with id', function() {
    var stateMock = {
      params: { id: 42 }
    };

    ORDER.delivery = {
      date: new Date()
    };
    $httpBackend
      .when('GET', '/api/orders/42')
      .respond(200, ORDER);
    var controller = $controller('OrderController', { $scope: $scope, $state: stateMock });

    $httpBackend.flush();
    expect(controller.order).toEqual(ORDER);
  });

}); //describe
