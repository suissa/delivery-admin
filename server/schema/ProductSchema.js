'use strict';

let mongoose = require('../config/MongooseConfig');


let ProductSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  price: { type: Number, required: true },
  gift: { type: Boolean }
});


module.exports = ProductSchema;
