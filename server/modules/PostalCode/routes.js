const config = require('./config')
const Controller = require(config.CONTROLLER)
const router = require('express').Router()


router.get('/referencePoint', Controller.findReferencePoint);
router.get('/:postalCode', Controller.findByPostalCode);

module.exports = router;
