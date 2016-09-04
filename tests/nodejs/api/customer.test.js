'use strict';

const USER = {
  givenName: 'Jane',
  familyName: 'Doe',
  email: 'jane@doe.com'
};

let mongoose = require('../../../server/configs/MongooseConfig');

describe('Customer', function() {
  beforeEach(function() {
    mongoose.connection.db.dropDatabase();
  });

  it('GET /api/customers should list all', function(done) {
    request
      .get('/api/customers')
      .end(function(err, response) {
        assert.ok(Array.isArray(response.body.items));
        done();
      });
  });

  it('POST /api/customers should create', function(done) {
    request
      .post('/api/customers')
      .send(USER)
      .end(function(err, response) {
        debug('response', response.body);

        assert.equal(response.status, 201);
        assert.equal(response.body.givenName, USER.givenName);
        assert.equal(response.body.familyName, USER.familyName);
        assert.equal(response.body.email, USER.email);
        assert.ok(response.body._id);
        done();
      });
  });

});
