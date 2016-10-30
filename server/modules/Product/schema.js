const mongoose = require('mongoose')

const _schema = mongoose.Schema({
  name: { type: String, trim: true, required: true },
  price: { type: Number, required: true },
  gift: { type: Boolean }
});

// Usamos o _schema pois podemos adicionar mais
// funcionalidades como methods, virtuals, etc

module.exports = _schema
