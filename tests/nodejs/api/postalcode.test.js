'use strict';

let mongoose = require('../../../server/config/MongooseConfig');

describe('Postal Code', function() {
  beforeEach(function(done) {
    let db = mongoose.connection.db;
    let _postalCode = Object.assign({}, POSTAL_CODE);
    let _referencePoint = Object.assign({}, REFERENCE_POINT);

    db.dropDatabase(function() {
      db.collection('postalcodes').insert([_postalCode, { postalCode: 5323001 }], function(err, data) {
        db.collection('referencepoints').insert([_referencePoint], done)
      });
    });
  });

  it('GET /api/postalcodes/referencePoint?number=1000&postalCode=01310000 should return referencePoint', function(done) {
    request
      .get(`/api/postalcodes/referencePoint?number=1000&postalCode=01310000 should return referencePoint`)
      .end(function(err, response) {
        let data = response.body;

        debug('data', data);
        assert.equal(response.status, 200);
        assert.equal(data.referencePoint, 'Condomínio Story');
        done();
      });
  });

  it('GET /api/postalcodes/:postalCode should return address', function(done) {
    request
      .get(`/api/postalcodes/${POSTAL_CODE.postalCode}`)
      .end(function(err, response) {
        let data = response.body;

        debug('data', data);
        assert.equal(response.status, 200);
        assert.equal(data.streetAddress, 'AV PAULISTA');
        done();
      });
  });

});
