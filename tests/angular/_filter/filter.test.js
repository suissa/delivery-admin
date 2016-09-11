'use strict';

describe('_filter', function () {
  beforeEach(module('app'));
  var $filter;

  beforeEach(inject(function(_$filter_){
    $filter = _$filter_;
  }));

  it('#telephone', function () {
    var telephone = $filter('telephone');
    expect(telephone('+551187654321')).toEqual('1187654321');
  });

  it('#telephone null param', function () {
    var telephone = $filter('telephone');
    expect(telephone()).toEqual();
  });

  it('#sum', function () {
    var sum = $filter('sum');
    expect(sum([{price: 1}, {price: 2},{price: 3}], 'price')).toEqual(6);
  });

  it('#sum null param', function () {
    var sum = $filter('sum');
    expect(sum()).toEqual(0);
  });

  it('#sum undefined prop', function () {
    var sum = $filter('sum');
    expect(sum([{total: 1}, {},{total: 3}], 'total')).toEqual(4);
  });

}); //describe
