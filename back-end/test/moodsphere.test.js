const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server');

describe('MoodSphere API', function () {

  it('GET /api/journal should return an array of entries', async function () {
    const res = await request(app).get('/api/journal');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('entries');
    expect(res.body.entries).to.be.an('array');
  });

  it('POST /api/journal should create an entry and allow filtering by mood', async function () {
    const payload = {
      mood: 'TestMood',
      date: '2025-11-10',
      time: '12:00',
      note: 'This is a test entry for MoodSphere'
    };

    // Create new journal entry
    const createRes = await request(app).post('/api/journal').send(payload);
    expect(createRes.status).to.equal(201);
    expect(createRes.body).to.have.property('entry');
    expect(createRes.body.entry.mood).to.equal('TestMood');

    // Retrieve entry by mood filter
    const filterRes = await request(app)
      .get('/api/journal')
      .query({ mood: 'TestMood' });
    expect(filterRes.status).to.equal(200);
    expect(filterRes.body.entries).to.be.an('array');
    const hasTestMood = filterRes.body.entries.some(e => e.mood === 'TestMood');
    expect(hasTestMood).to.be.true;

    // Cleanup (delete test entry)
    const createdId = createRes.body.entry.id;
    if (createdId) {
      const deleteRes = await request(app).delete(`/api/journal/${createdId}`);
      expect([200, 204]).to.include(deleteRes.status);
    }
  });

});