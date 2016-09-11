'use strict';

let debug = require('debug')('delivery-admin:controller:app');

let AppController = {
  notFound: function(request, response, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  },
  errorHandler: function(err, request, response, next) {
    let result = { message: err.message, errors: err.errors };

    response.status(err.status || 500);
    response.json(result);

    debug(err.message);
  }
};

module.exports = AppController;
