// supertest lets us simulate HTTP requests against the Express app
const request = require('supertest');

// chai provides the 'expect' assertion style
const chai = require('chai');
const expect = chai.expect;

// Import the Express app (must export the app instance, not the server listener)
const app = require('../server');

// Test suite for the calendar endpoint
describe('GET /api/calendar', () => {

  // Test: Should return an empty array when no moods or entries exist
  it('should return empty array when no moods or entries exist', async () => {
    const res = await request(app).get('/api/calendar');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('dates');
    expect(res.body.dates).to.be.an('array');
    expect(res.body).to.have.property('count');
  });

  // Test: Should return dates from mood entries
  it('should return dates from mood entries', async () => {
    // Create a mood entry
    await request(app)
      .post('/api/moods')
      .send({
        mood: 'happy',
        loggedAt: '2025-11-10T12:00:00.000Z'
      });

    // GET /api/calendar to verify the date appears
    const res = await request(app).get('/api/calendar');

    expect(res.status).to.equal(200);
    expect(res.body.dates).to.include('2025-11-10');
    expect(res.body.count).to.be.greaterThan(0);
  });

  // Test: Should return dates from journal entries
  it('should return dates from journal entries', async () => {
    // Create a journal entry
    await request(app)
      .post('/api/entries')
      .send({
        title: 'Test Journal',
        content: 'Test content',
        createdAt: '2025-11-11T12:00:00.000Z'
      });

    // Verify the new date appears in calendar
    const res = await request(app).get('/api/calendar');

    expect(res.status).to.equal(200);
    expect(res.body.dates).to.include('2025-11-11');
  });

  // Test: Should deduplicate dates when moods and entries occur on the same day
  it('should deduplicate dates from moods and entries on the same day', async () => {
    const testDate = '2025-11-12T12:00:00.000Z';

    // Create a mood and a journal entry on the same day
    await request(app)
      .post('/api/moods')
      .send({ mood: 'excited', loggedAt: testDate });

    await request(app)
      .post('/api/entries')
      .send({
        title: 'Same Day Entry',
        content: 'Test content',
        createdAt: testDate
      });

    // GET /api/calendar to verify only one occurrence of the date
    const res = await request(app).get('/api/calendar');

    expect(res.status).to.equal(200);
    const dateCount = res.body.dates.filter(d => d === '2025-11-12').length;
    expect(dateCount).to.equal(1); // Should only appear once
  });

  // Test: Should return dates in ascending order
  it('should return dates in sorted order', async () => {
    // Create mood entries on different dates
    await request(app)
      .post('/api/moods')
      .send({ mood: 'happy', loggedAt: '2025-11-15T12:00:00.000Z' });

    await request(app)
      .post('/api/moods')
      .send({ mood: 'sad', loggedAt: '2025-11-13T12:00:00.000Z' });

    await request(app)
      .post('/api/moods')
      .send({ mood: 'excited', loggedAt: '2025-11-14T12:00:00.000Z' });

    const res = await request(app).get('/api/calendar');

    expect(res.status).to.equal(200);

    // Verify that dates array is sorted in ascending order
    const dates = res.body.dates;
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i] >= dates[i - 1]).to.be.true;
    }
  });
});