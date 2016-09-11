'use strict';

let mongoose = require('../../../server/config/MongooseConfig');

describe('Customer', function() {
  let id;
  beforeEach(function(done) {
    let db = mongoose.connection.db;
    let _user = Object.assign({}, CUSTOMER);
    db.dropDatabase(function() {
      db.collection('customers').insert([_user, { givenName: 'Sinead' }], function(err, data) {
        debug('data', data);

        id = data.ops[0]._id;

        done();
      });
    });
  });

  it('GET /api/customers should list all', function(done) {
    request
      .get('/api/customers')
      .end(function(err, response) {
        let data = response.body;

        debug('data', data);
        assert.equal(response.status, 200);
        assert.ok(Array.isArray(response.body.items));
        assert.equal(data.items[0].givenName, 'Jane');
        assert.equal(data.items.length, 2);
        done();
      });
  });

  it('GET /api/customers?q=jane should filter results', function(done) {
    request
      .get('/api/customers?q=jane')
      .end(function(err, response) {
        let data = response.body;
        assert.equal(response.status, 200);
        assert.ok(Array.isArray(response.body.items));
        assert.equal(data.items[0].givenName, 'Jane');
        assert.equal(data.items.length, 1);
        done();
      });
  });

  it('GET /api/customers/:id should return customer', function(done) {
    request
      .get(`/api/customers/${id}`)
      .end(function(err, response) {
        let data = response.body;
        assert.equal(data.givenName, 'Jane');
        assert.equal(data.familyName, 'Doe');
        assert.equal(response.status, 200);
        assert.ok(data);
        done();
      });
  });

  it('GET /api/customers/:id nonexistent return not found', function(done) {
    request
      .get('/api/customers/57f37e574295dc4dc9f84fed')
      .end(function(err, response) {
        let data = response.body;

        assert.equal(response.status, 404);
        assert.equal(data.message, 'customer not found');
        assert.ok(data);
        done();
      });
  });

  it('POST /api/customers should create', function(done) {
    request
      .post('/api/customers')
      .send(CUSTOMER)
      .end(function(err, response) {
        debug('response', response.body);

        assert.equal(response.status, 201);
        assert.equal(response.body.givenName, CUSTOMER.givenName);
        assert.equal(response.body.familyName, CUSTOMER.familyName);
        assert.equal(response.body.email, CUSTOMER.email);
        assert.ok(response.body._id);
        done();
      });
  });

  it('PUT /api/customers/:id should update', function(done) {
    request
      .put(`/api/customers/${id}`)
      .send({ givenName: 'Sinead' })
      .end(function(err, response) {
        debug('response', response.body);

        assert.equal(response.status, 200);
        assert.deepEqual(response.body, { ok: 1, nModified: 1, n: 1 });
        done();
      });
  });

  it('DELETE /api/customers/:id should remove', function(done) {
    request
      .delete(`/api/customers/${id}`)
      .end(function(err, response) {
        assert.equal(response.status, 204);
        done();
      });
  });

});
