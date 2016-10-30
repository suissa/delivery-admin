const mongoose = require('mongoose')

const _schema = mongoose.Schema({
  postalCode: { type: Number, maxlength: 8 },
  streetAddress: { type: String },
  addressLocality: { type: String },
  district: { type: String },
  addressRegion: { type: String },
  ibge: { type: Number }
})


module.exports = _schema
