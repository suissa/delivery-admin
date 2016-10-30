const mongoose = require('../../config/MongooseConfig.js')
const SCHEMA = require('./schema')
const CONTROLLER = require('./controller')
const ROUTES = require('./routes')
const REPOSITORY = require('./repository')
const NAME = __dirname.split('/').reverse()[0] // 'Customer'


module.exports = {
  mongoose,
  SCHEMA,
  NAME,
  CONTROLLER,
  REPOSITORY,
  ROUTES
}
