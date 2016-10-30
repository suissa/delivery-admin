'use strict';

describe('order.service', function () {
  beforeEach(module('app'));

  var $httpBackend, service;

  beforeEach(inject(before));
  beforeEach(inject(function(_$httpBackend_, OrderService) {
    $httpBackend = _$httpBackend_;
    service = OrderService;
  }));

  it('#list', function() {
    $httpBackend
      .when('GET', '/api/orders')
      .respond(200, { items: [ORDER] });

    var result = service.list();
    $httpBackend.flush();

    expect(result.$$state.value.data.items).toEqual([ORDER]);
  });

  it('#getDeliveryTime', function() {
    var result = service.getDeliveryTime();

    expect(result.date.getTime()).toBeTruthy();
    expect(result.price).toEqual(5);
  });

  it('#getDateOptions', function() {
    var result = service.getDateOptions();

    expect(result.formatYear).toBe('yy');
    expect(result.startingDay).toEqual(1);
    expect(result.minDate.getTime()).toBeTruthy();
    expect(result.showWeeks).toBeFalsy();
  });

  it('#normalizeDeliveryDate', function() {
    var result = service.normalizeDeliveryDate();
    expect(result).toBe('');

    var result = service.normalizeDeliveryDate('2016-10-30T12:39:28.957Z');
    expect(result.getTime()).toBeTruthy();
    expect(result instanceof Date).toBeTruthy();
  });

  it('#createOrder', function() {
    $httpBackend
      .when('POST', '/api/orders')
      .respond(201, {});

    var order = {};
    ITEM.quantity = 2;
    GIFT.quantity = 1;
    var result = service.createOrder(CUSTOMER, order, [ITEM, {}, {}], [GIFT, {}]);
    $httpBackend.flush();

    expect(order.customer).toEqual(CUSTOMER);
    expect(order._customer).toEqual(CUSTOMER._id);
    expect(order.items.length).toEqual(1);
    expect(order.gifts.length).toEqual(1);
    expect(order.shippingAddress).toEqual(CUSTOMER.address);
  });

  it('#createOrder with money payment, without customer', function() {
    $httpBackend
      .when('POST', '/api/orders')
      .respond(201, {});

    var order = {
      payment: { paymentType: 'CREDIT CARD', change: 10.0, moneyTotal: 80.0 }
    };
    ITEM.quantity = 2;
    GIFT.quantity = 1;
    var result = service.createOrder(null, order, [ITEM, {}, {}], [GIFT, {}]);
    $httpBackend.flush();

    expect(order.items.length).toEqual(1);
    expect(order.gifts.length).toEqual(1);
    expect(order.payment.change).toEqual(null);
    expect(order.payment.moneyTotal).toEqual(null);
  });

}); //describe
