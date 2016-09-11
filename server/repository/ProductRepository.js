'use strict';

let mongoose            = require('../config/MongooseConfig'),
    schema              = require('../schema/ProductSchema');

let ProductRepository  = mongoose.model('Product', schema);

module.exports = ProductRepository;
