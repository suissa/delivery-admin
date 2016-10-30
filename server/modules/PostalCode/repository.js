const mongoose = require('../../config/MongooseConfig.js')
const schema = require('./schema')
const name = 'PostalCode'

const Repository  = mongoose.model(name, schema)

module.exports = Repository
