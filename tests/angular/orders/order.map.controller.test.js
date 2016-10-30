'use strict';

describe('order.map.controller', function () {
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
    $httpBackend
      .when('GET', '/api/orders')
      .respond(200, { items: [ORDER] });

    var controller = $controller('OrderMapController', { $scope: $scope });
    $httpBackend.flush();
    var expected = [{
      label: 'Jane',
      position: [43,23]
    }];

    expect(controller.markers).toEqual(expected);
    expect(controller.googleMapsUrl).toBe('https://maps.googleapis.com/maps/api/js?key=AIzaSyB7BimdwO2vhjoXDyKWKkWyuzrQsA4TwgM');
    expect(controller.zoom).toBe(15);
    expect(controller.shape).toEqual({ coords: [1, 1, 1, 20, 18, 20, 18 , 1], type: 'poly' });
  });
}); //describe
