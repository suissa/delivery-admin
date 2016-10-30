'use strict';

let mongoose = require('../../../server/config/MongooseConfig');

describe('Reference Point', function() {
  let id;
  beforeEach(function(done) {
    let db = mongoose.connection.db;
    let _referencePoint = Object.assign({}, REFERENCE_POINT);
    db.dropDatabase(function() {
      db.collection('referencepoints').insert([_referencePoint, {}], function(err, data) {
        debug('data', data);

        id = data.ops[0]._id;

        done();
      });
    });
  });

  it('GET /api/referencePoints should list all', function(done) {
    request
      .get('/api/referencePoints')
      .end(function(err, response) {
        let data = response.body;

        debug('data', data);
        assert.equal(response.status, 200);
        assert.ok(Array.isArray(response.body.items));
        assert.equal(data.items[0].referencePoint, 'Condomínio Story');
        assert.equal(data.items.length, 2);
        done();
      });
  });

  it('GET /api/referencePoints/:id should return referencePoint', function(done) {
    request
      .get(`/api/referencePoints/${id}`)
      .end(function(err, response) {
        let data = response.body;
        assert.equal(data.referencePoint, 'Condomínio Story');
        assert.equal(response.status, 200);
        assert.ok(data);
        done();
      });
  });

  it('GET /api/referencePoints/:id nonexistent return not found', function(done) {
    request
      .get('/api/referencePoints/57f37e574295dc4dc9f84fed')
      .end(function(err, response) {
        let data = response.body;

        assert.equal(response.status, 404);
        assert.equal(data.message, 'referencePoint not found');
        assert.ok(data);
        done();
      });
  });

  it('POST /api/referencePoints should create', function(done) {
    request
      .post('/api/referencePoints')
      .send(REFERENCE_POINT)
      .end(function(err, response) {
        let data = response.body;
        debug('response', response.body);

        assert.equal(response.status, 201);
        assert.equal(data.referencePoint, REFERENCE_POINT.referencePoint);
        assert.ok(data._id);
        done();
      });
  });

  it('PUT /api/referencePoints/:id should update', function(done) {
    request
      .put(`/api/referencePoints/${id}`)
      .send({ 'referencePoint': 'Sinead' })
      .end(function(err, response) {
        debug('response', response.body);

        assert.equal(response.status, 200);
        assert.deepEqual(response.body, { ok: 1, nModified: 1, n: 1 });
        done();
      });
  });

  it('DELETE /api/referencePoints/:id should remove', function(done) {
    request
      .delete(`/api/referencePoints/${id}`)
      .end(function(err, response) {
        assert.equal(response.status, 204);
        done();
      });
  });

});
