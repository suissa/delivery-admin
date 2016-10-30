const mongoose = require('../config/MongooseConfig');
const config = require('config')

const name = require(config.FIELDS_PATH + 'name')

let ProductSchema = mongoose.Schema({
  name,
  price: { type: Number, required: true },
  gift: { type: Boolean }
});


module.exports = ProductSchema;
