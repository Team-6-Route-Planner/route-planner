const request = require('supertest');
const app = require('../app');

const userId = '5f1b1d644ebba5e6035711b6';
let tripId;

describe('SUCCESS POST', function() {
    it('responds with data in json', function(done) {
      request(app)
        .post('/trips')
        .send({
            userId,
            addresses: [
                "Depok", 
                "Banten", 
                "Cirebon", 
                "Bekasi", 
                "Sukabumi", 
                "Sawangan, Depok"
            ]
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            tripId = body._id;
            expect(status).toBe(201);
            expect(body).toHaveProperty('_id', expect.any(String));
            expect(body.status).toBeFalsy();
            expect(body.userId).toMatch(userId);
            expect(body).toHaveProperty('routes', expect.any(Array));
            done();
        })
    });
});
describe('SUCCESS GET', function() {
    it('responds with data in json', function(done) {
      request(app)
        .get('/trips')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toEqual(expect.any(Array));
            done();
        })
    });
});
describe('SUCCESS GET CURRENT TRIP WITH USERID', function() {
    it('responds with data in json', function(done) {
      request(app)
        .get(`/trips/${userId}`)
        // .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty('_id', expect.any(String));
            expect(body.userId).toMatch(userId);
            expect(body).toHaveProperty('routes', expect.any(Array));
            done();
        })
    });
});
describe('SUCCESS PUT', function() {
    it('responds with data in json', function(done) {
      request(app)
        .put(`/trips/${tripId}`)
        .send({ status: true })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty('_id', expect.any(String));
            expect(body.status).toBeTruthy();
            expect(body.userId).toMatch(userId);
            expect(body).toHaveProperty('routes', expect.any(Array));
            done();
        })
    });
});
describe('SUCCESS GET HISTORY WITH USERID', function() {
    it('responds with data in json', function(done) {
      request(app)
        .get(`/trips/${userId}/history`)
        // .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toEqual(expect.any(Array));
            done();
        })
    });
});