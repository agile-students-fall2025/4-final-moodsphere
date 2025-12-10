// supertest lets us simulate HTTP requests to our Express app
const request = require('supertest');

// chai provides the `expect` assertion style
const chai = require('chai');
const expect = chai.expect;

// Import the Express app instance (not the server listener)
const app = require('../server');

// Test suite for the Journal API
describe('Journal API', () => {

  // Test: GET /api/entries should return an array of entries
  it('GET /api/entries should return entries array', async () => {

    // Make a GET request to the endpoint
    const res = await request(app).get('/api/entries');

    // Expect successful response
    expect(res.status).to.equal(200);

    // Expect the response to contain an "entries" array
    expect(res.body).to.have.property('entries');
    expect(res.body.entries).to.be.an('array');
  });

  // Test: POST /api/entries should create a new entry and then appear in GET results
  it('POST /api/entries should create a new entry', async () => {

    // Payload representing the new journal entry
    const payload = {
      title: 'Test Entry',
      content: 'This is a test entry',
      createdAt: '2025-11-10T12:00:00.000Z'
    };

    // Send a POST request to create the new entry
    const createRes = await request(app)
      .post('/api/entries')
      .send(payload);

    // Expect a successful creation response
    expect(createRes.status).to.equal(201);

    // The response should include the new entry's ID
    expect(createRes.body).to.have.property('id');

    // Validate the returned content matches the payload
    expect(createRes.body.content).to.equal('This is a test entry');

    // After creation, perform a GET to ensure the entry now exists in the entries list
    const getRes = await request(app).get('/api/entries');
    expect(getRes.status).to.equal(200);

    // Check that at least one entry has the content we just posted
    expect(
      getRes.body.entries.some(e => e.content === 'This is a test entry')
    ).to.be.true;
  });
});