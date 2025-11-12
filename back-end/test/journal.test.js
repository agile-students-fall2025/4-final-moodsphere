// __tests__/journal.test.js
const request = require('supertest');
const app = require('../src/app');

describe('Journal API', () => {
  test('GET /api/journal returns entries', async () => {
    const res = await request(app).get('/api/journal');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.entries)).toBe(true);
  });

  test('POST /api/journal creates an entry and GET with mood filters', async () => {
    const payload = {
      mood: 'TestMood',
      date: '2025-11-10',
      time: '12:00',
      note: 'This is a test'
    };
    const createRes = await request(app).post('/api/journal').send(payload);
    expect(createRes.statusCode).toBe(201);
    expect(createRes.body.entry.mood).toBe('TestMood');

    const filterRes = await request(app).get('/api/journal').query({ mood: 'TestMood' });
    expect(filterRes.statusCode).toBe(200);
    expect(filterRes.body.entries.some(e => e.mood === 'TestMood')).toBe(true);

    // cleanup: delete entry
    const createdId = createRes.body.entry.id;
    await request(app).delete(`/api/journal/${createdId}`);
  });
});
