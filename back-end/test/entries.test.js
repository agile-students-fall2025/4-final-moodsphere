const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;


const app = require('../server');

describe('POST /api/entries', () => {
  it('should create a new journal entry when content is provided', async () => {
    const res = await request(app)
      .post('/api/entries')
      .send({
        title: 'Test Entry',
        content: 'This is a test entry.',
        mood: 'happy',
        createdAt: '2025-11-06T00:00:00.000Z',
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body.content).to.equal('This is a test entry.');
  });

  it('should return 400 if content is missing', async () => {
    const res = await request(app)
      .post('/api/entries')
      .send({});

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });
});
