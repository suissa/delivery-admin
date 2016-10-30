'use strict';

describe('referencePoint.controller', function () {
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
      .when('GET', '/api/referencePoints/42')
      .respond(200, REFERENCE_POINT);
    var controller = $controller('ReferencePointController', { $state: stateMock });

    $httpBackend.flush();
    expect(controller.referencePoint).toEqual(REFERENCE_POINT);
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
      .when('POST', '/api/referencePoints')
      .respond(201, REFERENCE_POINT);
    var controller = $controller('ReferencePointController', { $state: stateMock });

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
      .when('PUT', '/api/referencePoints/42')
      .respond(200, REFERENCE_POINT);
    var controller = $controller('ReferencePointController', { $state: stateMock });

    controller.save({ _id: 42 });
    $httpBackend.flush();
    expect(NotificationService.success).toHaveBeenCalled();
  });
}); //describe
