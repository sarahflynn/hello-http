const request = require('supertest');

const app = require('../lib/app');

describe('simple http server', () => {
    it('responds with a birthday + name greeting if the method is `GET` and url (path) is `/happy-birthday/<name>`', () => {
        return request(app).get('/happy-birthday/universe').then(res => {
            expect(res.text).toEqual('<html><body><p>Happy Birthday <strong>universe!</strong> </p></body></html>');
        });
    });

    it('responds with an added custom message', () => {
        return request(app).get('/happy-birthday/universe?custom=You%20Rock').then(res => {
            expect(res.text).toEqual('<html><body><p>Happy Birthday <strong>universe!</strong> You Rock</p></body></html>');
        });
    });

    it('responds with a birthday + stranger greeting if no name is provided', () => {
        return request(app).get('/happy-birthday').then(res => {
            expect(res.text).toEqual('<html><body><p>Happy Birthday <strong>Stranger!</strong> </p></body></html>');
        });
    });

    it('responds with a random fact about http', () => {
        return request(app).get('/fact').then(res => {
            expect(res.text).toEqual(expect.stringMatching(/HTTP/));
        });
    });

    it('responds with 404 not found', () => {
        return request(app).get('/ladeedah')
            .then(res => {
                expect(res.status).toEqual(404);
                expect(res.text).toMatch(/CANNOT/);
            });
    });

});
