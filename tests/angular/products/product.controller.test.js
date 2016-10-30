'use strict';

describe('product.controller', function () {
  beforeEach(module('app'));

  var $rootScope, $scope, $httpBackend, $controller, NotificationService;

  beforeEach(inject(before));
  beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$controller_, _NotificationService_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $controller = _$controller_;
    NotificationService = _NotificationService_;
  }));

  it('#init with id', function() {
    var stateMock = {
      params: { id: 42 }
    };

    $httpBackend
      .when('GET', '/api/products/42')
      .respond(200, PRODUCT);
    var controller = $controller('ProductController', { $state: stateMock });

    $httpBackend.flush();
    expect(controller.product).toEqual(PRODUCT);
  });

  it('#save create', function() {
    var stateMock = {
      params: {},
      current: { name: 'stateMock' },
      go: function() {}
    };
    spyOn(stateMock, 'go');
    spyOn(NotificationService, 'success');

    $httpBackend
      .when('POST', '/api/products')
      .respond(201, PRODUCT);
    var controller = $controller('ProductController', { $state: stateMock });

    controller.save({});
    $httpBackend.flush();
    expect(stateMock.go).toHaveBeenCalled();
    expect(NotificationService.success).toHaveBeenCalled();
  });

  it('#save update', function() {
    var stateMock = {
      params: {},
      current: { name: 'stateMock' }
    };
    spyOn(NotificationService, 'success');

    $httpBackend
      .when('PUT', '/api/products/42')
      .respond(200, PRODUCT);
    var controller = $controller('ProductController', { $state: stateMock });

    controller.save({ _id: 42 });
    $httpBackend.flush();
    expect(NotificationService.success).toHaveBeenCalled();
  });
}); //describe
