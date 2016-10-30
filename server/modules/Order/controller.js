const config = require('./config')

const bluebird = require('bluebird')
const debug = require('debug')('delivery-admin:controller:order')
const repository = require(config.REPOSITORY)
const PER_PAGE = 10

let OrderController = {
  list: function(request, response, next) {
    let query = {}
    let page = parseInt(request.query.page || 1, 10)

    if (request.query.q) {
      let search = new RegExp(request.query.q, 'i')
      query = {
        $or: [
          { 'customer.givenName': search }
        ]
      }
    }
    debug('query', query)

    bluebird.all([
      repository.find(query)
        .sort({ 'delivery.date': -1 })
        .limit(PER_PAGE)
        .skip(PER_PAGE * (page - 1)),
      repository.count(query)
    ])
    .then(function(results) {
      let result = results[0]
      let count = results[1]
      let data = {
        items: result,
        _metadata: {
          size: (result || []).length,
          total: count,
          perPage: PER_PAGE,
          page: page
        }
      }

      response.json(data)
    })
    .catch(next)
  },
  byId: function(request, response, next) {
    let _id = request.params._id
    repository.findOne({ _id: _id })
    .populate('_customer')
    .then(function(result) {
      if (!result) {
        let err = new Error('order not found')
        err.status = 404
        throw err
      }
      return result
    })
    .then(function(result) {
      debug('result', result)
      response.json(result)
    })
    .catch(next)
  },
  create: function(request, response, next) {
    let order = new repository(request.body)
    order.save()
      .then(function(result) {
        response.status(201).json(result)
      })
      .catch(function(err) {
        err.status = 422
        next(err)
      })
  },
  update: function(request, response, next) {
    let _id = request.params._id
    repository.update({ _id: _id }, { $set: request.body })
    .then(function(result) {
      response.json(result)
    })
    .catch(next)
  },
  remove: function(request, response, next) {
    let _id = request.params._id
    repository.remove({ _id: _id })
    .then(function(result) {
      response.sendStatus(204)
    })
    .catch(next)
  }
}

module.exports = OrderController
