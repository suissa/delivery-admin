'use strict';

let mongoose            = require('../configs/MongooseConfig'),
    schema              = require('../schemas/CustomerSchema');

let CustomerRepository  = mongoose.model('Customer', schema);

module.exports = CustomerRepository;
