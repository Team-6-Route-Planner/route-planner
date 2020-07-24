const request = require('supertest');
const app = require('./app');

describe('SUCCESS /register', function() {
    it('responds with data in json', function(done) {
      request(app)
        .post('/register')
        .send({username: 'test', password: '1234'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response;
            expect(status).toBe(201);
            expect(body).toHaveProperty('insertedId', expect.any(String));
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