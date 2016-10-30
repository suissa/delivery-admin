'use strict';
const MODULES_PATH = './../../modules/'
let router = require('express').Router();


router.get('/', function(request, response, next) {
  response.send('PONG');
})

const modules = require('../../../scripts/getModules')
modules.map((el, i) => {
  router.use('/'+el.toLowerCase()+'s', require(MODULES_PATH+el+'/routes'));
})
// router.use('/customers', require('Customer/routes'));
// router.use('/orders', require('Order/routes'));
// router.use('/postalcodes', require('Postalcode/routes'));
// router.use('/products', require('Product/routes'));
// router.use('/referencePoints', require('ReferencePoint/routes'));

module.exports = router;
