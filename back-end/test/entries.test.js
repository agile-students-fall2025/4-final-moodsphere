// supertest allows us to simulate HTTP requests to our Express app
const request = require('supertest');

// chai provides the `expect` assertion style used in the tests
const chai = require('chai');
const expect = chai.expect;

// Import the main Express app (must export the app, not the server listener)
const app = require('../server');

// Test suite for POST /api/entries
describe('POST /api/entries', () => {

  // Test case: successfully creating a journal entry
  it('should create a new journal entry when content is provided', async () => {

    // Send a POST request with a valid payload
    const res = await request(app)
      .post('/api/entries')
      .send({
        title: 'Test Entry',
        content: 'This is a test entry.',
        mood: 'happy',
        createdAt: '2025-11-06T00:00:00.000Z',
      });

    // Expect HTTP 201 "Created"
    expect(res.status).to.equal(201);

    // Response should include an auto-generated ID
    expect(res.body).to.have.property('id');

    // The API should return the correct content
    expect(res.body.content).to.equal('This is a test entry.');
  });

  // Test case: API should reject invalid requests missing required fields
  it('should return 400 if content is missing', async () => {

    // Send a POST request with an empty payload (invalid)
    const res = await request(app)
      .post('/api/entries')
      .send({});

    // Expect a 400 "Bad Request" response
    expect(res.status).to.equal(400);

    // API should return an error message
    expect(res.body).to.have.property('error');
  });
});