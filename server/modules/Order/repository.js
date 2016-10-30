const mongoose = require('../../config/MongooseConfig.js')
const schema = require('./schema')
const name = 'Order'

const Repository  = mongoose.model(name, schema)

module.exports = Repository
