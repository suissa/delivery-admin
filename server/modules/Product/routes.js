'use strict';

let router              = require('express').Router(),
    ProductController   = require('../../controller/ProductController');


router.get('/', ProductController.list);
router.get('/:_id', ProductController.byId);
router.post('/', ProductController.create);
router.put('/:_id', ProductController.update);
router.delete('/:_id', ProductController.remove);

module.exports = router;
