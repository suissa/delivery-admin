'use strict';

describe('notification.service', function () {
  beforeEach(module('app'));

  var service;

  beforeEach(inject(before));
  beforeEach(inject(function(NotificationService) {
    service = NotificationService;
  }));

  it('#notify', function() {
    service.success('sucesso!');
  });

}); //describe
