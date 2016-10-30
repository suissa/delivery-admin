const mongoose = require('../../config/MongooseConfig.js')
const schema = require('./schema')
const controller = require('./controller')
const routes = require('./routes')
const repository = require('./repository')
const name = __dirname.split('/').reverse()[0] // 'Customer'
const FIELDS_PATH = '../../fields/'

module.exports = {
  mongoose,
  schema,
  name,
  controller,
  repository,
  routes,
  FIELDS_PATH
}
