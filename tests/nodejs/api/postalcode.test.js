'use strict';

let mongoose = require('../../../server/config/MongooseConfig');

describe('Postal Code', function() {
  let id;
  beforeEach(function(done) {
    let db = mongoose.connection.db;
    let _postalCode = Object.assign({}, POSTAL_CODE);
    db.dropDatabase(function() {
      db.collection('postalcodes').insert([_postalCode, { postalCode: 5323001 }], function(err, data) {
        debug('data', data);

        id = data.ops[0]._id;

        done();
      });
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
