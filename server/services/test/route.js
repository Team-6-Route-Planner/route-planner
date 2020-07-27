const request = require('supertest');
const app = require('../app');
describe('SUCCESS PUT ONE ROUTE', function() {
    it('responds with data in json', function(done) {
      request(app)
        .put(`/routes/${global.userId}/${global.routeId}`)
        .send({ status: true, arrivedAt: '22:10' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            console.log(response, '<<<<<<<<< ini respon')
            const { body, status } = response;
            expect(status).toBe(200);
            // expect(body).toHaveProperty('_id', expect.any(String));
            // expect(body).toHaveProperty('routes', expect.any(Array));
            done();
        })
    });
});
