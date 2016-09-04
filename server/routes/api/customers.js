'use strict';

let router              = require('express').Router(),
    CustomerController  = require('../../controllers/CustomerController');


router.get('/', CustomerController.list);
router.get('/:_id', CustomerController.byId);
router.post('/', CustomerController.create);
router.put('/:_id', CustomerController.update);
router.delete('/:_id', CustomerController.remove);

module.exports = router;
