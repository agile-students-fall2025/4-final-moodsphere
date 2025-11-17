const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server');

describe('MoodSphere API', function () {

  it('GET /api/entries should return an array of entries', async function () {
    const res = await request(app).get('/api/entries');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('entries');
    expect(res.body.entries).to.be.an('array');
  });

  it('POST /api/entries should create an entry', async function () {
    const payload = {
      title: 'Test Entry',
      content: 'This is a test entry for MoodSphere',
      createdAt: '2025-11-10T12:00:00.000Z'
    };

    // Create new journal entry
    const createRes = await request(app).post('/api/entries').send(payload);
    expect(createRes.status).to.equal(201);
    expect(createRes.body).to.have.property('id');
    expect(createRes.body.title).to.equal('Test Entry');
    expect(createRes.body.content).to.equal('This is a test entry for MoodSphere');
  });

});