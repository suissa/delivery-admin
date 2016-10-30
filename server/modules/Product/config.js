const mongoose = require('../../config/MongooseConfig.js')
const schema = require('./schema')
const controller = require('./controller')
const routes = require('./routes')
const repository = require('./repository')
const name = 'Product'

module.exports = {
  mongoose,
  schema,
  name,
  controller,
  repository,
  routes
}
