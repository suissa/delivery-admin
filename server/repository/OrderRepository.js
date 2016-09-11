'use strict';

let mongoose            = require('../config/MongooseConfig'),
    schema              = require('../schema/OrderSchema');

let OrderRepository  = mongoose.model('Order', schema);

module.exports = OrderRepository;
