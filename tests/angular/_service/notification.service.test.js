'use strict';

describe('notification.service', function () {
  beforeEach(module('app'));

  var $rootScope, service;

  beforeEach(inject(before));
  beforeEach(inject(function(_$rootScope_, NotificationService) {
    $rootScope = _$rootScope_;
    service = NotificationService;
  }));

  it('#notify', function() {
    service.success('sucesso!');
  });

}); //describe
