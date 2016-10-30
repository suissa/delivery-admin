'use strict';

let router = require('express').Router();

router.get('/', function(request, response, next) {
  response.send('PONG');
})
router.use('/customers', require('./../../modules/Customer/routes'));
router.use('/orders', require('./../../modules/Order/routes'));
router.use('/postalcodes', require('./../../modules/Postalcode/routes'));
router.use('/products', require('./../../modules/Product/routes'));
router.use('/referencePoints', require('./../../modules/ReferencePoint/routes'));

module.exports = router;
