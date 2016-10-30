const config = require('./config')
const Controller = require(config.CONTROLLER)
const router = require('express').Router()

router.get('/', Controller.list)
router.get('/:_id', Controller.byId)
router.post('/', Controller.create)
router.put('/:_id', Controller.update)
router.delete('/:_id', Controller.remove)

module.exports = router
