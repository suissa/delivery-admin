'use strict';

let debug = require('debug')('delivery-admin:controller:customer');
let repository = require('../repositories/CustomerRepository');

let CustomerController = {
  list: function(request, response, next) {
    repository.find({}).exec(function(err, result) {
      if (err) {
        return next(err);
      }

      response.json({ items: result });
    });
  },
  byId: function(request, response, next) {
    let _id = request.params._id;
    repository.findOne({ _id: _id }).exec(function(err, result) {
      if (err) {
        return next(err);
      }

      response.json({ items: result });
    });
  },
  create: function(request, response, next) {
    let customer = new repository(request.body);
    customer.save()
      .then(function(result) {
        response.status(201).json(result);
      })
      .catch(function(err) {
        err.status = 422;
        next(err);
      });
  },
  update: function(request, response, next) {
    repository.update({ _id: _id }, request.body).exec(function(err, result) {
      if (err) {
        return next(err);
      }
      response.json(result);
    });
  },
  remove: function(request, response, next) {
    repository.remove({ _id: _id }).exec(function(err, result) {
      if (err) {
        return next(err);
      }
      response.sendStatus(204);
    });
  }
};

module.exports = CustomerController;
