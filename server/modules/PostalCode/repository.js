const config = require('./config')

module.exports = require('mongoose').model(config.NAME, require(config.SCHEMA))
