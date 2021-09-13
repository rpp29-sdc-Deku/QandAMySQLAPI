const serverFuncs = require ('./server/server.js');
const request = require('supertest')("http://localhost:3030");

describe('PUT /likeQuestion', () => {
  it("It responds to successful PUT req with message", async () => {
    const response = await request.put("/likeQuestion").send('question_id=1')

    expect(response.status).to.eql(200);
    expect(response.body).to.eql('question liked');
  });
})