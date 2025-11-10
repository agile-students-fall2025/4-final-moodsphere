const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server');

describe('Auth Routes', () => {
  describe('POST /api/auth/signup', () => {
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
      expect(res.body.user).to.not.have.property('password');
    });

    it('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ password: 'password123' });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Email and password are required');
    });

    it('should return 400 if password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ email: 'test2@example.com' });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Email and password are required');
    });

    it('should return 409 if user already exists', async () => {
      // Create user first
      await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'duplicate@example.com',
          password: 'password123'
        });

      // Try to create same user again
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'duplicate@example.com',
          password: 'password123'
        });

      expect(res.status).to.equal(409);
      expect(res.body).to.have.property('error', 'User already exists');
    });

    it('should use "Anonymous" as default name if not provided', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          email: 'noname@example.com',
          password: 'password123'
        });

      expect(res.status).to.equal(201);
      expect(res.body.user).to.have.property('name', 'Anonymous');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user for login tests
      await request(app)
        .post('/api/auth/signup')
        .send({
          name: 'Login User',
          email: 'login@example.com',
          password: 'password123'
        });
    });

    it('should login successfully with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Login successful');
      expect(res.body).to.have.property('user');
      expect(res.body.user).to.have.property('email', 'login@example.com');
      expect(res.body.user).to.not.have.property('password');
    });

    it('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'password123' });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Email and password are required');
    });

    it('should return 400 if password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'login@example.com' });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Email and password are required');
    });

    it('should return 401 for non-existent user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('error', 'Invalid credentials');
    });

    it('should return 401 for wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword'
        });

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('error', 'Invalid credentials');
    });
  });

  describe('POST /api/auth/signout', () => {
    it('should successfully sign out', async () => {
      const res = await request(app)
        .post('/api/auth/signout');

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Sign out successful');
    });
  });
});
