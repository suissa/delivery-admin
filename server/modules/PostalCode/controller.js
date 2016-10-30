const config = require('./config')

const debug = require('debug')('delivery-admin:controller:postalcode')
const repository = require(config.REPOSITORY)
const rprepository = require('../ReferencePoint/repository')

let PostalCodeController = {
  findReferencePoint: function(request, response, next) {
    let postalCode = parseInt(request.query.postalCode, 10)
    let number = parseInt(request.query.number, 10)

    rprepository.findOne({ postalCode, number })
    .then(function(result) {
      response.json(result)
    })
    .catch(next)
  },

  findByPostalCode: function(request, response, next) {
    let postalCode = parseInt(request.params.postalCode, 10)

    debug('postalCode', postalCode, { postalCode })

    repository.findOne({ postalCode })
    .then(function(result) {
      response.json(result)
    })
    .catch(next)
  }
}

module.exports = PostalCodeController
