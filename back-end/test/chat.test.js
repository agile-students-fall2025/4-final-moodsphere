// supertest lets us simulate HTTP requests against our Express app
const request = require('supertest');

// chai provides the 'expect' assertion style
const chai = require('chai');
const expect = chai.expect;

// Import the Express app (must export the app instance, not the server listener)
const app = require('../server');

// Test suite for Chat API endpoints
describe('Chat API', () => {

  // Test case: GET /api/chat should return all chat messages
  it('should return all messages', async () => {
    // Make a GET request to the chat endpoint
    const res = await request(app).get('/api/chat');

    // Expect HTTP 200 OK
    expect(res.status).to.equal(200);

    // Response should have a 'messages' property
    expect(res.body).to.have.property('messages');

    // 'messages' should be an array
    expect(res.body.messages).to.be.an('array');
  });

  // Test case: POST /api/chat should create a new message
  it('should create a new message', async () => {
    const newMsg = { sender: 'User', text: 'Hello Chai!' };

    // Send POST request with message payload
    const res = await request(app)
      .post('/api/chat')
      .send(newMsg);

    // Expect HTTP 201 Created
    expect(res.status).to.equal(201);

    // Response should include an ID for the new message
    expect(res.body).to.have.property('id');

    // Ensure the returned message matches the payload
    expect(res.body.sender).to.equal('User');
    expect(res.body.text).to.equal('Hello Chai!');
  });

  // Test case: API should return 400 for invalid payloads
  it('should return 400 if sender or text missing', async () => {
    // Send POST request with incomplete data
    const res = await request(app)
      .post('/api/chat')
      .send({ text: '' }); // sender missing

    // Expect HTTP 400 Bad Request
    expect(res.status).to.equal(400);

    // Response should include an error message
    expect(res.body).to.have.property('error');
  });
});