'use strict';

let app = require('../../server/app');

global.request  = require('supertest')(app);
global.assert   = require('assert');
global.debug    = require('debug')('delivery-admin:test');
