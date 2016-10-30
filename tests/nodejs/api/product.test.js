'use strict';

let mongoose = require('../../../server/config/MongooseConfig');

describe('Product', function() {
  let id;
  beforeEach(function(done) {
    let db = mongoose.connection.db;
    let _product = Object.assign({}, PRODUCT);
    db.dropDatabase(function() {
      db.collection('products').insert([_product, { name: 'Product 1' }], function(err, data) {
        debug('data', data);

        id = data.ops[0]._id;

        done();
      });
    });
  });

  it('GET /api/products should list all', function(done) {
    request
      .get('/api/products')
      .end(function(err, response) {
        let data = response.body;

        debug('data', data);
        assert.equal(response.status, 200);
        assert.ok(Array.isArray(response.body.items));
        assert.equal(data.items[0].name, 'Strudel de Maçã');
        assert.equal(data.items.length, 2);
        done();
      });
  });

  it('GET /api/products?q=strudel should filter results', function(done) {
    request
      .get('/api/products?q=strudel')
      .end(function(err, response) {
        let data = response.body;
        assert.equal(response.status, 200);
        assert.ok(Array.isArray(response.body.items));
        assert.equal(data.items[0].name, 'Strudel de Maçã');
        assert.equal(data.items.length, 1);
        done();
      });
  });

  it('GET /api/products/:id should return product', function(done) {
    request
      .get(`/api/products/${id}`)
      .end(function(err, response) {
        let data = response.body;
        assert.equal(data.name, 'Strudel de Maçã');
        assert.equal(response.status, 200);
        assert.ok(data);
        done();
      });
  });

  it('GET /api/products/:id nonexistent return not found', function(done) {
    request
      .get('/api/products/57f37e574295dc4dc9f84fed')
      .end(function(err, response) {
        let data = response.body;

        assert.equal(response.status, 404);
        assert.equal(data.message, 'product not found');
        assert.ok(data);
        done();
      });
  });

  it('POST /api/products should create', function(done) {
    request
      .post('/api/products')
      .send(PRODUCT)
      .end(function(err, response) {
        debug('response', response.body);

        assert.equal(response.status, 201);
        assert.equal(response.body.name, PRODUCT.name);
        assert.equal(response.body.familyName, PRODUCT.familyName);
        assert.equal(response.body.email, PRODUCT.email);
        assert.ok(response.body._id);
        done();
      });
  });

  it('PUT /api/products/:id should update', function(done) {
    request
      .put(`/api/products/${id}`)
      .send({ name: 'Product 1' })
      .end(function(err, response) {
        debug('response', response.body);

        assert.equal(response.status, 200);
        assert.deepEqual(response.body, { ok: 1, nModified: 1, n: 1 });
        done();
      });
  });

  it('DELETE /api/products/:id should remove', function(done) {
    request
      .delete(`/api/products/${id}`)
      .end(function(err, response) {
        assert.equal(response.status, 204);
        done();
      });
  });

});
