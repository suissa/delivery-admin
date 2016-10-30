const router = require('express').Router();

const MODULES_PATH = './../../modules/'

router.get('/', function(request, response, next) {
  response.send('PONG');
})
router.use('/customers', require(MODULES_PATH + 'Customer/routes'));
router.use('/orders', require(MODULES_PATH + 'Order/routes'));
router.use('/postalcodes', require(MODULES_PATH + 'Postalcode/routes'));
router.use('/products', require(MODULES_PATH + 'Product/routes'));
router.use('/referencePoints', require(MODULES_PATH + 'ReferencePoint/routes'));

module.exports = router;
