const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server');

describe('Chat API', () => {
  it('should return all messages', async () => {
    const res = await request(app).get('/api/chat');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('messages');
    expect(res.body.messages).to.be.an('array');
  });

  it('should create a new message', async () => {
    const newMsg = { sender: 'User', text: 'Hello Chai!' };
    const res = await request(app)
      .post('/api/chat')
      .send(newMsg);
    
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body.sender).to.equal('User');
    expect(res.body.text).to.equal('Hello Chai!');
  });

  it('should return 400 if sender or text missing', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ text: '' });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });
});