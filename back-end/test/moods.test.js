// Import supertest to simulate HTTP requests to your Express app
const request = require('supertest');

// Import chai's expect assertion style
const chai = require('chai');
const expect = chai.expect;

// Import the Express app (server.js or server/index.js)
// This should export your configured Express instance
const app = require('../server');

// Test suite for the POST /api/moods endpoint
describe('POST /api/moods', () => {
  
  // Test case: Should successfully create a mood when valid data is provided
  it('should create a new mood when mood is provided', async () => {
    
    // Send a POST request with a valid payload
    const res = await request(app)
      .post('/api/moods')
      .send({
        mood: 'happy',
        loggedAt: '2025-11-06T00:00:00.000Z'
      });

    // Assert that the response status code is "201 Created"
    expect(res.status).to.equal(201);

    // Assert that the response body contains a generated ID
    expect(res.body).to.have.property('id');

    // Assert that the mood returned by the API matches what was sent
    expect(res.body.mood).to.equal('happy');
  });

  // Test case: Should fail if no mood is provided
  it('should return 400 if mood is missing', async () => {
    
    // Send a POST request with an empty body
    const res = await request(app)
      .post('/api/moods')
      .send({});

    // Expect a "400 Bad Request" status
    expect(res.status).to.equal(400);

    // Expect an error message in the body
    expect(res.body).to.have.property('error');
  });
});