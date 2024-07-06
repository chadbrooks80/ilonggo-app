const request = require('supertest');
const app = require('../server'); // Adjust the path if necessary
const mongoose = require('mongoose');
const crypto = require('crypto');


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

  it('should log in a user with valid credentials', async () => {
    const res = await global.agent
      .post('/api/auth/login')
      .send({ email: 'j@j.com', password: 'jjj' });
  
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('token');
  });


  it('should return invalid login for incorrect credentials', async () => {
    const res = await global.agent
      .post('/api/auth/login')
      .send({ email: 'invalid@user.com', password: 'wrongpassword' });
  
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Invalid email or password.');
  });

  it('should register a new user', async () => {
    const randomEmail = `random${crypto.randomBytes(3).toString('hex')}@random.com`;
    const res = await global.agent
      .post('/api/auth/register')
      .send({ email: randomEmail, password: 'jjj' });
  
    expect(res.statusCode).toEqual(201); // Assuming 201 Created is the response status for successful registration
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });
  
  it('should not register a user with an existing email', async () => {
    const existingEmail = 'existing@user.com';
    
    // First, create a user with the existing email
    await global.agent
      .post('/api/auth/register')
      .send({ email: existingEmail, password: 'jjj' });
  
    // Now, attempt to register another user with the same email
    const res = await global.agent
      .post('/api/auth/register')
      .send({ email: existingEmail, password: 'jjj' });
  
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Error: that email address is already in use.');
  });


});
