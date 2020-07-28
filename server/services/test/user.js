const request = require('supertest');
const app = require('../app');

describe('SUCCESS /register', function() {
    it('responds with data in json', function(done) {
      request(app)
        .post('/register')
        .send({username: 'test', password: '1234'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            global.userId = body._id;
            global.username = body.username
            expect(status).toBe(201);
            expect(body).toHaveProperty('_id', expect.any(String));
            expect(body).toHaveProperty('username', 'test');
            expect(body).toHaveProperty('password', expect.any(String));
            done();
        })
    });
});

describe('FAIL /register', function() {
    it('responds with message in json', function(done) {
      request(app)
        .post('/register')
        .send({username: 'test', password: '1234'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty('message', 'Username exists');
            done();
        })
    });
});

describe('SUCCESS /login', function() {
    it('responds with data in json', function(done) {
      request(app)
        .post('/login')
        .send({username: 'test', password: '1234'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty('message', 'Login success');
            done();
        })
    });
});

describe('FAIL /login', function() {
    it('responds with message in json', function(done) {
      request(app)
        .post('/login')
        .send({username: 'test', password: '123'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty('message', 'Wrong password');
            done();
        })
    });
});
describe('NOT FOUND /login', function() {
    it('responds with message in json', function(done) {
      request(app)
        .post('/login')
        .send({username: 'notfound', password: '123'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(404);
            expect(body).toHaveProperty('message', 'User not found');
            done();
        })
    });
});
describe('SUCCESS GET /availables', function() {
    it('responds with data in json', function(done) {
      request(app)
        .get('/availables')
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
describe('SUCCESS PUT LOCATION /:id', function() {
    it('responds with message in json', function(done) {
      request(app)
        .put(`/${global.userId}`)
        .send({lat: -6.275246399999999, lng: 106.7735448})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body.username).toEqual(global.username);
            expect(body).toHaveProperty('lat', -6.275246399999999);
            expect(body).toHaveProperty('lng', 106.7735448);
            done();
        })
    });
});
describe('SUCCESS GET /:userId', function() {
    it('responds with data in json', function(done) {
      request(app)
        .get(`/${global.userId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty('_id', expect.any(String));
            done();
        })
    });
});
describe('SUCCESS GET /all', function() {
    it('responds with data in json', function(done) {
      request(app)
        .get('/all')
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
describe('NOT FOUND /:userId', function() {
    it('responds with data in json', function(done) {
      request(app)
        .get('/5f1f7e330ad5b170a218bbd6')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(404);
            expect(body).toHaveProperty('message', 'User not found');
            done();
        })
    });
});