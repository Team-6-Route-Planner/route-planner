const request = require('supertest');
const app = require('../app');

describe('SUCCESS POST /trips', function() {
    it('responds with data in json', function(done) {
      request(app)
        .post('/trips')
        .send({
            userId: global.userId,
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
            global.tripId = body._id;
            global.routeId = body.routes[0]._id;
            expect(status).toBe(201);
            expect(body).toHaveProperty('_id', expect.any(String));
            expect(body.status).toBeFalsy();
            // expect(body.userId).toMatch(global.userId);
            expect(body).toHaveProperty('routes', expect.any(Array));
            done();
        })
    });
});
describe('FAIL POST /trips', function() {
    it('responds with message in json', function(done) {
      request(app)
        .post('/trips')
        .send({
            userId: global.userId,
            addresses: [
                "Deok", // Deok is not found in gmaps
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
            expect(status).toBe(400);
            expect(body).toHaveProperty('message', 'Wrong address');
            done();
        })
    });
});
describe('SUCCESS GET /trips', function() {
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
        .get(`/trips/${global.userId}/current`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty('_id', expect.any(String));
            expect(body.userId).toMatch(global.userId);
            expect(body).toHaveProperty('routes', expect.any(Array));
            done();
        })
    });
});
describe('SUCCESS PUT', function() {
    it('responds with data in json', function(done) {
      request(app)
        .put(`/trips/${global.tripId}`)
        .send({ status: true })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty('_id', expect.any(String));
            expect(body.status).toBeTruthy();
            expect(body.userId).toMatch(global.userId);
            expect(body).toHaveProperty('routes', expect.any(Array));
            done();
        })
    });
});
describe('SUCCESS GET HISTORY WITH USERID', function() {
    it('responds with data in json', function(done) {
      request(app)
        .get(`/trips/${global.userId}/history`)
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