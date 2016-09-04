'use strict';

let mongoose = require('../configs/MongooseConfig');


let CustomerSchema = mongoose.Schema({
  givenName: { type: String, trim: true, required: true },
  familyName: { type: String, trim: true },
  nickName: { type: String },
  gender: { type: String, enum: ['F','M'] },
  email: { type: String, lowercase: true },
  telephones: [{ type: String }],
  birthDate: { type: String },
  address: {
    streetAddress: { type: String },
    number: { type: Number },
    district: { type: String },
    complement: { type: String },
    referencePoint: { type: String },
    addressLocality: { type: String },
    addressRegion: { type: String },
    postalCode: { type: String, maxlength: 8 }
  }
});


module.exports = CustomerSchema;
