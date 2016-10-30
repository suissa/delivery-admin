'use strict';

const mongoose = require('../../config/MongooseConfig.js');

const schema = mongoose.Schema({
  postalCode: { type: Number, maxlength: 8 },
  number: { type: Number },
  referencePoint: { type: String }
});


module.exports = schema;
