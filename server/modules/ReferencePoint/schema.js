const mongoose = require('mongoose')

const _schema = mongoose.Schema({
  postalCode: { type: Number, maxlength: 8 },
  number: { type: Number },
  referencePoint: { type: String }
});


module.exports = _schema;
