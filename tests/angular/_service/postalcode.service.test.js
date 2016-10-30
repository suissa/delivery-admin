'use strict';

describe('notification.service', function () {
  beforeEach(module('app'));

  var $rootScope, $httpBackend, service;

  beforeEach(inject(before));
  beforeEach(inject(function(_$rootScope_, _$httpBackend_, PostalCodeService) {
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    service = PostalCodeService;
  }));

  it('#findReferencePoint', function() {
    $httpBackend
      .when('GET', '/api/postalcodes/referencePoint?number=1000&postalCode=01310000')
      .respond(200, { complement: 'Próximo ao Metrô' });

    var shippingAddress = {
      postalCode: '01310000',
      number: 1000
    };

    var result = service.findReferencePoint(shippingAddress);
    $httpBackend.flush();

    expect(result.$$state.value.config.cache).toBeTruthy();
    expect(result.$$state.value.data).toEqual({ complement: 'Próximo ao Metrô' });
  });

  it('#findByPostalCode', function() {
    $httpBackend
      .when('GET', '/api/postalcodes/01310000')
      .respond(200, { streetAddress: 'Av. Paulista' });

    var result = service.findByPostalCode('01310000');
    $httpBackend.flush();

    expect(result.$$state.value.config.cache).toBeTruthy();
    expect(result.$$state.value.data).toEqual({ streetAddress: 'Av. Paulista' });
  });

  it('#getLocation', function() {
    $httpBackend
      .when('GET', 'https://maps.google.com/maps/api/geocode/json?address=Av. Paulista,1000&sensor=true')
      .respond(200, { results: [ { geometry: { location: {lat: 43, lng: 23} } } ] });

    var shippingAddress = {
      streetAddress: 'Av. Paulista',
      number: 1000
    };

    var result = service.getLocation(shippingAddress);
    $httpBackend.flush();

    expect(result.$$state.value.data).toEqual({ results: [ { geometry: { location: {lat: 43, lng: 23} } } ] });
  });

}); //describe
