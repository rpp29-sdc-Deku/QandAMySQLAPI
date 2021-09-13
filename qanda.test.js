// const serverFuncs = require ('./server/server.js');
// const request = require('supertest')("http://localhost:3030");

const app = require('./server/server.js') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

it('gets the test endpoint', async () => {
  const response = await request.get('/test')

  expect(response.status).toBe(200)
  expect(response.body.message).toBe('pass!')

});

describe('PUT /likeQuestion', () => {
  it("responds to successful PUT /likeQuestion req with success message", async () => {
    const response = await request.put("/likeQuestion").query({'question_id':1})
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('question liked');
  });
  it("responds to failed PUT /likeQuestion req with error message", async () => {
    const response = await request.put("/likeQuestion").query({'question_id': '22312s3123123'})
    expect(response.status).toEqual(201);
    expect(response.body).toEqual('error in PUT /likeQuestion');

  });
})

describe('PUT /likeAnswer', () => {
  it("responds to successful PUT /likeAnswer req with success message", async () => {
    const response = await request.put("/likeAnswer").query({'answer_id':1})
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('answer liked');
  });

  it("responds to failed PUT /likeAnswer req with error message", async () => {
    const response = await request.put("/likeAnswer").query({'answer_id': '22312s3123123'})
    expect(response.status).toEqual(201);
    expect(response.body).toEqual('error in PUT /likeAnswer');
  });

})