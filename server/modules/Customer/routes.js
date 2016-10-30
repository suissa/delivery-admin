const config = require('./config')
const router = require('express').Router()

router.get('/', config.CONTROLLER.list)
router.get('/:_id', config.CONTROLLER.byId)
router.post('/', config.CONTROLLER.create)
router.put('/:_id', config.CONTROLLER.update)
router.delete('/:_id', config.CONTROLLER.remove)

module.exports = router
