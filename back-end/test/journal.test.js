const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server');

describe('Journal API', () => {
  it('GET /api/entries should return entries array', async () => {
    const res = await request(app).get('/api/entries');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('entries');
    expect(res.body.entries).to.be.an('array');
  });

  it('POST /api/entries should create a new entry', async () => {
    const payload = {
      title: 'Test Entry',
      content: 'This is a test entry',
      createdAt: '2025-11-10T12:00:00.000Z'
    };

    const createRes = await request(app).post('/api/entries').send(payload);
    expect(createRes.status).to.equal(201);
    expect(createRes.body).to.have.property('id');
    expect(createRes.body.content).to.equal('This is a test entry');

    // Confirm entry exists via GET
    const getRes = await request(app).get('/api/entries');
    expect(getRes.status).to.equal(200);
    expect(getRes.body.entries.some(e => e.content === 'This is a test entry')).to.be.true;
  });
});
