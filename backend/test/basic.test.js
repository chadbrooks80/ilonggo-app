// /backend/test/basic.test.js

const request = require('supertest');
const app = require('../server'); // Adjust the path if necessary
const mongoose = require('mongoose');

let server;

beforeAll((done) => {
  const PORT = 6000; // Use a different port for testing
  server = app.listen(PORT, () => {
    global.agent = request.agent(server);
    done();
  });
});

afterAll(async () => {
  await server.close();
  await mongoose.connection.close();
});

describe('Basic Functionality Test', () => {
  it('should verify that the server responds to ping', async () => {
    const res = await global.agent.get('/ping');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('pong');
  });
});
