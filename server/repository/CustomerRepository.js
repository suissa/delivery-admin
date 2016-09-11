'use strict';

let mongoose            = require('../config/MongooseConfig'),
    schema              = require('../schema/CustomerSchema');

let CustomerRepository  = mongoose.model('Customer', schema);

module.exports = CustomerRepository;
