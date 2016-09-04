'use strict';

let mongoose = require('../configs/MongooseConfig');


let ProductSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  price: { type: Number, required: true }
});


module.exports = ProductSchema;
