// Import supertest to make HTTP requests to the Express app in a test environment
const request = require('supertest');

// Import chai for assertions
const chai = require('chai');
const expect = chai.expect;

// Import the Express application (must export the app, not the server listener)
const app = require('../server');

// Test suite for the MoodSphere API
describe('MoodSphere API', function () {

  // Test: GET /api/entries should return a list of entries
  it('GET /api/entries should return an array of entries', async function () {

    // Make a GET request to the entries endpoint
    const res = await request(app).get('/api/entries');

    // Expect success response
    expect(res.status).to.equal(200);

    // The API should return an object containing an "entries" array
    expect(res.body).to.have.property('entries');
    expect(res.body.entries).to.be.an('array');
  });

  // Test: POST /api/entries should create a new entry
  it('POST /api/entries should create an entry', async function () {

    // Mock entry data to send
    const payload = {
      title: 'Test Entry',
      content: 'This is a test entry for MoodSphere',
      createdAt: '2025-11-10T12:00:00.000Z'
    };

    // Send POST request with payload
    const createRes = await request(app)
      .post('/api/entries')
      .send(payload);

    // Expect "201 Created"
    expect(createRes.status).to.equal(201);

    // Ensure the API returns the created entry with an ID
    expect(createRes.body).to.have.property('id');
    expect(createRes.body.title).to.equal('Test Entry');
    expect(createRes.body.content).to.equal('This is a test entry for MoodSphere');
  });

});
