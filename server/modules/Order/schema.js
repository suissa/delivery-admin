const mongoose = require('../../config/MongooseConfig');
const config = require('config')

const name = require(config.FIELDS_PATH + 'name')

const OrderSchema = mongoose.Schema({
  _customer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Customer' },
  customer: {
    givenName: { type: String, trim: true, required: true },
    familyName: { type: String, trim: true },
    telephone: { type: String }
  },
  createdAt: { type: Date, default: Date.now },
  items: [{
    name,
    price: { type: Number },
    quantity: { type: Number }
  }],
  gifts: [{
    name,
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
    moneyTotal: { type: Number },
    total: { type: Number },
    change: { type: Number },
    paymentType: { type: String }
  },
  origin: {
    _externalId: { type: String },
    name
  },
  shippingAddress: {
    streetAddress: { type: String },
    number: { type: Number },
    district: { type: String },
    complement: { type: String },
    referencePoint: { type: String },
    addressLocality: { type: String },
    addressRegion: { type: String },
    postalCode: { type: String, maxlength: 9 },
    location: {
      lat: { type: Number },
      lng: { type: Number }
    }
  }
});


module.exports = OrderSchema;
