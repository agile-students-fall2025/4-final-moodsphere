// supertest is used to simulate HTTP requests against an Express app
const request = require('supertest');

// chai gives us the 'expect' assertion style
const chai = require('chai');
const expect = chai.expect;

// Create a minimal Express application just for this test
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Define only the health-check route for isolated testing
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Test suite for the /api/health endpoint
describe('GET /api/health', () => {

  // Test: The route should return a 200 response with { status: "ok" }
  it('should return status ok', async () => {

    // Perform a GET request to /api/health
    const res = await request(app).get('/api/health');

    // Expect a successful status code
    expect(res.status).to.equal(200);

    // Expect the JSON response body to match exactly
    expect(res.body).to.deep.equal({ status: 'ok' });
  });
});