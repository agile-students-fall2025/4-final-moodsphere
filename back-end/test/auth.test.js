// supertest allows us to simulate HTTP requests to the Express app
const request = require('supertest');

// chai provides the 'expect' assertion style
const chai = require('chai');
const expect = chai.expect;

// Import the Express app (must export the app instance, not the server listener)
const app = require('../server');

// Test suite for authentication routes
describe('Auth Routes', () => {

  // -----------------------------
  // Tests for POST /api/auth/signup
  // -----------------------------
  describe('POST /api/auth/signup', () => {

    // Test: successful signup with valid credentials
    it('should create a new user with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('message', 'User created successfully');
      expect(res.body).to.have.property('user');
      expect(res.body.user).to.have.property('id');
      expect(res.body.user).to.have.property('email', 'test@example.com');
      expect(res.body.user).to.have.property('name', 'Test User');
      expect(res.body.user).to.not.have.property('password'); // password should not be returned
    });

    // Test: missing email
    it('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ password: 'password123' });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Email and password are required');
    });

    // Test: missing password
    it('should return 400 if password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ email: 'test2@example.com' });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Email and password are required');
    });

    // Test: duplicate user
    it('should return 409 if user already exists', async () => {
      // First create the user
      await request(app)
        .post('/api/auth/signup')
        .send({ email: 'duplicate@example.com', password: 'password123' });

      // Attempt to create again
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ email: 'duplicate@example.com', password: 'password123' });

      expect(res.status).to.equal(409);
      expect(res.body).to.have.property('error', 'User already exists');
    });

    // Test: default name
    it('should use "Anonymous" as default name if not provided', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ email: 'noname@example.com', password: 'password123' });

      expect(res.status).to.equal(201);
      expect(res.body.user).to.have.property('name', 'Anonymous');
    });
  });

  // -----------------------------
  // Tests for POST /api/auth/login
  // -----------------------------
  describe('POST /api/auth/login', () => {

    // Create a user before each login test
    beforeEach(async () => {
      await request(app)
        .post('/api/auth/signup')
        .send({
          name: 'Login User',
          email: 'login@example.com',
          password: 'password123'
        });
    });

    // Successful login
    it('should login successfully with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'login@example.com', password: 'password123' });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Login successful');
      expect(res.body).to.have.property('user');
      expect(res.body.user).to.have.property('email', 'login@example.com');
      expect(res.body.user).to.not.have.property('password');
    });

    // Missing email
    it('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'password123' });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Email and password are required');
    });

    // Missing password
    it('should return 400 if password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'login@example.com' });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Email and password are required');
    });

    // Non-existent user
    it('should return 401 for non-existent user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nonexistent@example.com', password: 'password123' });

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('error', 'Invalid credentials');
    });

    // Wrong password
    it('should return 401 for wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'login@example.com', password: 'wrongpassword' });

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('error', 'Invalid credentials');
    });
  });

  // -----------------------------
  // Tests for POST /api/auth/signout
  // -----------------------------
  describe('POST /api/auth/signout', () => {
    it('should successfully sign out', async () => {
      const res = await request(app).post('/api/auth/signout');

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Sign out successful');
    });
  });
});