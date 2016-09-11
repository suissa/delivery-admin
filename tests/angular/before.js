var FactoryGirl = {
  customer: function() {
    return {
      id: 42,
      telephone: '+5511999998888',
      birthDate: new Date(),
      address: {
        postalCode: '01310000'
      }
    };
  }
};

var CUSTOMER;


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

  $localStorage.currentUser = CUSTOMER;
};
