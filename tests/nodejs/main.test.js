'use strict';


describe('App', function() {
  it('GET /api should responds', function(done) {
    request
      .get('/api')
      .end(function(err, response) {
        assert.equal('PONG', response.text);
        done();
      });
  });

  it('GET /notFound should responds 404', function(done) {
    request
      .get('/notFound')
      .end(function(err, response) {
        assert.equal(404, response.status);
        done();
      });
  });
});
