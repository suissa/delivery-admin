'use strict';

describe('customer.list.controller', function () {
  beforeEach(module('app'));

  var $rootScope, $scope, $httpBackend, $controller;

  beforeEach(inject(before));
  beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$controller_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $controller = _$controller_;
  }));

  it('#init', function() {
    var stateMock = {
      params: { q: 'some search' }
    };

    $httpBackend
      .when('GET', '/api/customers?q=some+search')
      .respond(200, {});

    var controller = $controller('CustomerListController', { $scope: $scope, $state: stateMock });
    $httpBackend.flush();
    expect(controller).toBeDefined();
    expect(controller.q).toBe('some search');
  });
}); //describe
