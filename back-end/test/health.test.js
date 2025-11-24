const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// copy just the health route into this mini app for now:
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

describe('GET /api/health', () => {
  it('should return status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ status: 'ok' });
  });
});
