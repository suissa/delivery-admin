'use strict'

global.APP_ROOT = require('path').join(__dirname + '/../')

const mongoose = require('./config/MongooseConfig')

let express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const debug = require('debug')('delivery-admin:app')
const app = express()

let AppController = require('./modules/App/controller')


app.set('json replacer', null)
app.set('json spaces', false)
app.set('port', process.env.PORT || 3000)

app.disable('etag')
app.disable('x-powered-by')

app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'ASP.Net')
  next()
})

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(compression())
app.use((req, res, next) => {
  console.log('rota', req.url)
})
app.use(express.static(APP_ROOT + '/../client/public/'))
app.use('/', require('./router'))


app.use(AppController.notFound)
app.use(AppController.errorHandler)


debug('env:', process.env.NODE_ENV || 'development')
module.exports = app
