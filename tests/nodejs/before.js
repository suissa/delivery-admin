'use strict';

global.CUSTOMER = {
  givenName: 'Jane',
  familyName: 'Doe',
  email: 'jane@doe.com'
};

global.POSTAL_CODE = {
  postalCode: 1310000,
  streetAddress: 'AV PAULISTA'
};

global.REFERENCE_POINT = {
  postalCode: 1310000,
  number: 1000,
  referencePoint: 'Condomínio Story'
};

global.PRODUCT = {
  name: 'Strudel de Maçã',
  price: 70.0,
  gift: false
};

global.GIFT = {
  name: 'Mini Strudel de Maçã',
  price: 4.0,
  gift: true
};

global.ORDER = {
  _customer: '57f37e574295dc4dc9f84fed',
  customer: {
    _id: '57f37e574295dc4dc9f84fed',
    givenName: 'Jane'
  },
  createdAt: new Date(),
  items: [PRODUCT],
  gifts: [GIFT]
};
