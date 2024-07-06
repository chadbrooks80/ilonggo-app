// /client/src/__tests__/homePage.test.js

const request = require('supertest');

describe('Home Page', () => {
  it('should return status 200', async () => {
    const res = await request('http://localhost:3000').get('/');
    expect(res.statusCode).toEqual(200);
  });
});
