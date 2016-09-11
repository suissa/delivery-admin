'use strict';

let router              = require('express').Router(),
    ReferencePointController = require('../../controller/ReferencePointController');


router.get('/', ReferencePointController.list);
router.get('/:_id', ReferencePointController.byId);
router.post('/', ReferencePointController.create);
router.put('/:_id', ReferencePointController.update);
router.delete('/:_id', ReferencePointController.remove);

module.exports = router;
