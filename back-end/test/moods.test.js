const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server');

describe('POST /api/moods', () => {
  it('should create a new mood when mood is provided', async () => {
    const res = await request(app)
      .post('/api/moods')
      .send({ mood: 'happy', loggedAt: '2025-11-06T00:00:00.000Z' });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body.mood).to.equal('happy');
  });

  it('should return 400 if mood is missing', async () => {
    const res = await request(app).post('/api/moods').send({});
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });
});
