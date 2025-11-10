const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server');

describe('GET /api/health', () => {
  it('should return health status ok', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'ok');
  });
});

describe('GET /', () => {
  it('should return backend running message', async () => {
    const res = await request(app).get('/');

    expect(res.status).to.equal(200);
    expect(res.text).to.include('Moodsphere backend is running');
  });
});
