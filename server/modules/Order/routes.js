'use strict';

let router              = require('express').Router(),
    OrderController     = require('../../controller/OrderController');


router.get('/', OrderController.list);
router.get('/:_id', OrderController.byId);
router.post('/', OrderController.create);
router.put('/:_id', OrderController.update);
router.delete('/:_id', OrderController.remove);

module.exports = router;
