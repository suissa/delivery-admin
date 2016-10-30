const mongoose = require('../../config/MongooseConfig')

const ProductSchema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  price: { type: Number, required: true },
  gift: { type: Boolean }
});


module.exports = ProductSchema
