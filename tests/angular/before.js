var FactoryGirl = {
  customer: function() {
    return {
      _id: 42,
      telephone: '+5511999998888',
      birthDate: new Date(),
      address: {
        postalCode: '01310000'
      }
    };
  },
  product: function() {
    return {
      name: 'Product 1', price: 5.0
    }
  },
  order: function() {
    return {
      shippingAddress: {
        location: { lat: 43, lng: 23 }
      },
      customer: {
        givenName: 'Jane',
        familyName: 'Doe'
      }
    }
  },
  item: function() {
    return {
      name: 'Product 1', price: 5.0
    }
  },
  gift: function() {
    return {
      name: 'Product 1', price: 5.0, gift: true
    }
  },
  address: function() {
    return {
      postalCode: '01310000',
      streetAddress: 'Av. Paulista',
      addressLocality: 'SP',
      district: 'SP',
      addressRegion: 'SP'
    }
  },
  location: function() {
    return { geometry: { location: {lat: 43, lng: 23} } }
  },
  referencePoint: function() {
    return {
      complement: 'Ao lado do metrô',
      referencePoint: 'Metrô Paulista'
    }
  },
  postalCode: function() {
    return ADDRESS
  }
};

var CUSTOMER,
    PRODUCT,
    ORDER,
    ITEM,
    GIFT,
    EVENT,
    ADDRESS,
    LOCATION,
    REFERENCE_POINT,
    POSTAL_CODE;

function getElement(compile, $scope, html){
  var element = compile(angular.element(html))($scope);
  $scope.$digest();
  return element;
}

var before = function($rootScope, _$httpBackend_, _$localStorage_) {
  $httpBackend = _$httpBackend_;
  $localStorage = _$localStorage_;

  $httpBackend.when('GET', /app\/_resources\/locale-pt_BR\.json/).respond(200,{
    "customer" : "Cliente"
  });

  $httpBackend.when('GET', /.*\.html/).respond(200, '');
  $httpBackend.when('GET', /\/version/).respond(200, { version: '1.0.168' });

  CUSTOMER          = FactoryGirl.customer();
  PRODUCT           = FactoryGirl.product();
  ORDER             = FactoryGirl.order();
  ITEM              = FactoryGirl.item();
  GIFT              = FactoryGirl.gift();
  ADDRESS           = FactoryGirl.address();
  LOCATION          = FactoryGirl.location();
  REFERENCE_POINT   = FactoryGirl.referencePoint();
  POSTAL_CODE       = FactoryGirl.postalCode();

  EVENT = {
    stopPropagation: function() {}
  };

  $localStorage.currentUser = CUSTOMER;
};
