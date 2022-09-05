const fetch = require('node-fetch');

const request = require('supertest')
const expressApp = require('express')

const { getStartedServer } = require('./app-server')

let server = expressApp;

beforeAll(async () => {
    server = await getStartedServer()
})

describe('GET /search', () => {
    describe(
        'GIVEN a valid request AND ' +
        'GIVEN two database entries ' +
        'WHEN send request to the server ' +
        'THEN responses with a list of objects, including ', () => {
            it('should return 200 & valid response if request param list is empty', done => {
                request(server)
                    .get(`/search`)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err)
                        expect(res.body[0].doc._id).toBe('e14259104a826e7db48cd27e07000582')
                        done()
                    })
            }, 5000)
        });
});