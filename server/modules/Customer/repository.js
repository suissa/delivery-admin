const config = require('./config')
const mongoose = require('mongoose')
const schema = require(config.SCHEMA)
const name = config.NAME

const Repository  = mongoose.model(name, schema)

module.exports = Repository
