'use strict';

let router              = require('express').Router(),
    PostalCodeController  = require('../../controller/PostalCodeController');


router.get('/referencePoint', PostalCodeController.findReferencePoint);
router.get('/:postalCode', PostalCodeController.findByPostalCode);

module.exports = router;
