'use strict';

let mongoose = require('../config/MongooseConfig');


let ReferencePointSchema = mongoose.Schema({
  postalCode: { type: Number, maxlength: 8 },
  number: { type: Number },
  referencePoint: { type: String }
});


module.exports = ReferencePointSchema;
