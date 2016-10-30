'use strict';

describe('customer.controller', function () {
  beforeEach(module('app'));

  var $rootScope, $scope, $httpBackend, $controller, $window, NotificationService;

  beforeEach(inject(before));
  beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$controller_, _$window_, _NotificationService_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $controller = _$controller_;
    $window = _$window_;
    NotificationService = _NotificationService_;

    $httpBackend
      .when('GET', '/api/products?attr=items&size=30')
      .respond(200, CUSTOMER);
  }));

  it('#init dateOptions and deliveryDateOptions', function() {
    var controller = $controller('CustomerController', { $scope: $scope });
    expect(controller).toBeDefined();

    expect(controller.dateOptions.formatYear).toBe('yy');
    expect(controller.dateOptions.startingDay).toEqual(1);
    expect(controller.dateOptions.minDate.getTime()).toBeTruthy();
    expect(controller.dateOptions.showWeeks).toBeFalsy();

    expect(controller.deliveryDateOptions.formatYear).toBe('yy');
    expect(controller.deliveryDateOptions.startingDay).toEqual(1);
    expect(controller.deliveryDateOptions.minDate.getTime()).toBeTruthy();
    expect(controller.deliveryDateOptions.showWeeks).toBeFalsy();
  });

  it('#init with id', function() {
    var stateMock = {
      params: { id: 42 }
    };

    $httpBackend
      .when('GET', '/api/customers/42')
      .respond(200, CUSTOMER);

    var controller = $controller('CustomerController', { $scope: $scope, $state: stateMock });

    $httpBackend.flush();
    expect(controller.customer).toEqual(CUSTOMER);
  });



  it('#saveCustomer create', function() {
    var stateMock = {
      params: {},
      current: { name: 'stateMock' },
      go: function() {}
    };
    spyOn(stateMock, 'go');
    spyOn(NotificationService, 'success');

    $httpBackend
      .when('POST', '/api/customers')
      .respond(201, CUSTOMER);
    var controller = $controller('CustomerController', { $state: stateMock });

    controller.saveCustomer({});
    $httpBackend.flush();
    expect(stateMock.go).toHaveBeenCalled();
    expect(NotificationService.success).toHaveBeenCalled();
  });

  it('#saveCustomer update', function() {
    var stateMock = {
      params: {},
      current: { name: 'stateMock' }
    };
    spyOn(NotificationService, 'success');

    $httpBackend
      .when('PUT', '/api/customers/42')
      .respond(200, CUSTOMER);
    var controller = $controller('CustomerController', { $state: stateMock });

    controller.saveCustomer({ _id: 42 });
    $httpBackend.flush();
    expect(NotificationService.success).toHaveBeenCalled();
  });

  it('#saveOrder update', function() {
    spyOn(NotificationService, 'success');
    spyOn($window, 'print');

    $httpBackend
      .when('POST', '/api/orders')
      .respond(200, CUSTOMER);
    var controller = $controller('CustomerController', { $window: $window });

    controller.saveOrder({}, {}, [], []);
    $httpBackend.flush();
    expect(NotificationService.success).toHaveBeenCalled();
    expect($window.print).toHaveBeenCalled();
  });

  it('#findByPostalCode', function() {
    $httpBackend
      .when('GET', '/api/postalcodes/01310000')
      .respond(200, POSTAL_CODE);

    var controller = $controller('CustomerController', {});
    controller.findByPostalCode('01310000');
    $httpBackend.flush();

    expect(controller.disableAddressFields).toBeTruthy();
    expect(controller.customer.address).toEqual(POSTAL_CODE);
  });

  it('#findByPostalCode error', function() {
    $httpBackend
      .when('GET', '/api/postalcodes/01310000')
      .respond(422, '');

    var controller = $controller('CustomerController', {});
    controller.findByPostalCode('01310000');
    $httpBackend.flush();

    expect(controller.disableAddressFields).toBeFalsy();
  });

  it('#findByPostalCode validations', function() {
    var controller = $controller('CustomerController', {});
    controller.findByPostalCode('013100');
    $httpBackend.flush();

    expect(controller.disableAddressFields).toBeFalsy();
  });

  it('#findReferencePoint', function() {
    $httpBackend
      .when('GET', 'https://maps.google.com/maps/api/geocode/json?address=Av. Paulista,1000&sensor=true')
      .respond(200, { results: [LOCATION] });
    $httpBackend
      .when('GET', '/api/postalcodes/referencePoint?number=1000&postalCode=01310000')
      .respond(200, REFERENCE_POINT);

    var controller = $controller('CustomerController', {});
    ADDRESS.number = 1000;
    controller.findReferencePoint(ADDRESS);
    $httpBackend.flush();

    expect(controller.customer.address.location).toEqual(LOCATION.geometry.location);
    expect(controller.customer.address.referencePoint).toBe(REFERENCE_POINT.referencePoint);
  });

  it('#changePaymentType != MONEY', function() {
    var controller = $controller('CustomerController', {});
    var payment = {}
    controller.changePaymentType(payment);
    expect(payment.change).toBe(0);
    expect(payment.moneyTotal).toBe(0);
  });

  it('#changePaymentType == MONEY', function() {
    var controller = $controller('CustomerController', {});
    var payment = { type: 'MONEY', total: 100.0 }
    controller.changePaymentType(payment);
    expect(payment.moneyTotal).toBe(100.0);
  });

}); //describe
