'use strict';

let mongoose = require('../../../server/config/MongooseConfig');

describe('Order', function() {
  let id;
  beforeEach(function(done) {
    let db = mongoose.connection.db;
    let _order = Object.assign({}, ORDER);
    db.dropDatabase(function() {
      db.collection('orders').insert([_order], function(err, data) {
        debug('data', data);

        id = data.ops[0]._id;

        done();
      });
    });
  });

  it('GET /api/orders should list all', function(done) {
    request
      .get('/api/orders')
      .end(function(err, response) {
        let data = response.body;

        debug('data', data);
        assert.equal(response.status, 200);
        assert.ok(Array.isArray(response.body.items));
        assert.equal(data.items[0].customer.givenName, 'Jane');
        assert.equal(data.items.length, 1);
        done();
      });
  });

  it('GET /api/orders/:id should return order', function(done) {
    request
      .get(`/api/orders/${id}`)
      .end(function(err, response) {
        let data = response.body;
        assert.equal(data.customer.givenName, 'Jane');
        assert.equal(response.status, 200);
        assert.ok(data);
        done();
      });
  });

  it('GET /api/orders/:id nonexistent return not found', function(done) {
    request
      .get('/api/orders/57f37e574295dc4dc9f84fed')
      .end(function(err, response) {
        let data = response.body;

        assert.equal(response.status, 404);
        assert.equal(data.message, 'order not found');
        assert.ok(data);
        done();
      });
  });

  it('POST /api/orders should create', function(done) {
    request
      .post('/api/orders')
      .send(ORDER)
      .end(function(err, response) {
        let data = response.body;
        debug('response', response.body);

        assert.equal(response.status, 201);
        assert.equal(data.customer.givenName, ORDER.customer.givenName);
        assert.ok(data._id);
        done();
      });
  });

  it('PUT /api/orders/:id should update', function(done) {
    request
      .put(`/api/orders/${id}`)
      .send({ 'customer.givenName': 'Sinead' })
      .end(function(err, response) {
        debug('response', response.body);

        assert.equal(response.status, 200);
        assert.deepEqual(response.body, { ok: 1, nModified: 1, n: 1 });
        done();
      });
  });

  it('DELETE /api/orders/:id should remove', function(done) {
    request
      .delete(`/api/orders/${id}`)
      .end(function(err, response) {
        assert.equal(response.status, 204);
        done();
      });
  });

});
