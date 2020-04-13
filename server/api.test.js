const app = require('./index');
const supertest = require('supertest');
const request = supertest(app);

it('gets the art endpoint', async done => {
  const response = await request.get('/art');

  expect(response.status).toBe(200);
  expect(response.body.message).toBe('pass!');
  done();
});