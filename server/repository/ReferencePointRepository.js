'use strict';

let mongoose            = require('../config/MongooseConfig'),
    schema              = require('../schema/ReferencePointSchema');

let ReferencePointRepository  = mongoose.model('ReferencePoints', schema);

module.exports = ReferencePointRepository;
