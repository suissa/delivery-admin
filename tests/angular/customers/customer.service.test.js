'use strict';

describe('customer.service', function () {
  beforeEach(module('app'));

  var $httpBackend, service;

  beforeEach(inject(before));
  beforeEach(inject(function(_$httpBackend_, CustomerService) {
    $httpBackend = _$httpBackend_;
    service = CustomerService;
  }));

  it('#search', function() {
    $httpBackend
      .when('GET', '/api/customers')
      .respond(200, { items: [CUSTOMER] });

    var result = service.search();
    $httpBackend.flush();

    expect(result.$$state.value.data.items).toEqual([CUSTOMER]);
  });

  it('#getDateOptions', function() {
    var result = service.getDateOptions();

    expect(result.formatYear).toBe('yy');
    expect(result.startingDay).toEqual(1);
    expect(result.minDate.getTime()).toBeTruthy();
    expect(result.showWeeks).toBeFalsy();
  });

  it('#normalizeBirthDate', function() {
    var result = service.normalizeBirthDate();
    expect(result).toBe('');

    var result = service.normalizeBirthDate('2016-10-30T12:39:28.957Z');
    expect(result.getTime()).toBeTruthy();
    expect(result instanceof Date).toBeTruthy();
  });

}); //describe
