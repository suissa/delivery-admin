'use strict';

let mongoose = require('../configs/MongooseConfig');


let OrderSchema = mongoose.Schema({
  _customerId: { type: mongoose.types.ObjectId },
  items: [{
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number }
  }],
  gifts: [{
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number }
  }],
  delivery: {
    price: { type: Number },
    courier: { type: String },
    date: { type: Date }
  },
  payment: {
    discount: { type: Number },
    total: { type: Number },
    paymentType: { type: String }
  },
  shippingAddress: {
    streetAddress: { type: String },
    number: { type: Number },
    district: { type: String },
    complement: { type: String },
    referencePoint: { type: String },
    addressLocality: { type: String },
    addressRegin: { type: String },
    postalCode: { type: String, maxlength: 8 }
  }
});


module.exports = OrderSchema;
