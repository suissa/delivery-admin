'use strict';

let mongoose            = require('../config/MongooseConfig'),
    schema              = require('../schema/PostalCodeSchema');

let PostalCodeRepository  = mongoose.model('PostalCodes', schema);

module.exports = PostalCodeRepository;
