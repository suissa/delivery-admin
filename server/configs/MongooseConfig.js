'use strict';

let mongoose  = require('mongoose'),
    debug     = require('debug')('delivery-admin:config:mongoose'),
    config    = require('config');

function _connection(vars) {
  let username  = vars.MONGO_USERNAME || config.get('mongo.username'),
      password  = vars.MONGO_PASSWORD || config.get('mongo.password'),
      host      = vars.MONGO_HOST     || config.get('mongo.host'),
      port      = vars.MONGO_PORT     || config.get('mongo.port'),
      database  = vars.MONGO_DATABASE || config.get('mongo.database'),

      auth = username ? /* istanbul ignore next */ username + ':' + password + '@' : '';

  return 'mongodb://' + auth + host + ':' + port + '/' + database;
}


mongoose.Promise = require('bluebird');
mongoose.connect(_connection(process.env));
let db = mongoose.connection;
/* istanbul ignore next */
db.on('error', function(err) {
  debug(err);
});

db.once('open', function (callback) {
  debug('connected to mongodb');
});

module.exports = mongoose;
