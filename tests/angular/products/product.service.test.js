'use strict';

describe('product.service', function () {
  beforeEach(module('app'));

  var $httpBackend, service;

  beforeEach(inject(before));
  beforeEach(inject(function(_$httpBackend_, ProductService) {
    $httpBackend = _$httpBackend_;
    service = ProductService;
  }));

  it('#list', function() {
    $httpBackend
      .when('GET', '/api/products')
      .respond(200, { items: [] });

    var result = service.list();
    $httpBackend.flush();

    expect(result.$$state.value.data.items).toEqual([]);
  });

}); //describe
