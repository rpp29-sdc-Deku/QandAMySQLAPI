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
});

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
});

describe('PUT /reportQuestion', () => {
  it("responds to successful PUT /reportQuestion req with success message", async () => {
    const response = await request.put("/reportQuestion").query({'question_id':1})
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('question reported');
  });

  it("responds to failed PUT /reportQuestion' req with error message", async () => {
    const response = await request.put("/reportQuestion").query({'question_id': '22312s3123123'})
    expect(response.status).toEqual(201);
    expect(response.body).toEqual('error in PUT /reportQuestion');
  });
});

describe('PUT /reportAnswer', () => {
  it("responds to successful PUT /reportAnswer req with success message", async () => {
    const response = await request.put("/reportAnswer").query({'answer_id':1})
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('answer reported');
  });

  it("responds to failed PUT /reportQuestion req with error message", async () => {
    const response = await request.put("/reportAnswer").query({'answer_id': '22312s3123123'})
    expect(response.status).toEqual(201);
    expect(response.body).toEqual('error in PUT /reportAnswer');
  });
});

describe('POST /submitQuestion', () => {
  it("responds to successful PUT /submitQuestion req with success message", async () => {
    const response = await request.post("/submitQuestion").send({
      'product_id': 1,
      'body': 'test test test',
      'name': 'The Jester',
      'email': 'jesty@gmail.com',
    });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual('question submitted');
  });

  it("responds to failed POST /submitQuestion req with error message", async () => {
    const response = await request.post("/submitQuestion").send({
      'product_id': 'number1',
      'body': 'test test test',
      'name': 'The Jester',
      'email': 'jesty@gmail.com',
    });
    expect(response.status).toEqual(201);
    expect(response.body).toEqual('error in POST /submitQuestion');
  });
});

describe('POST /submitAnswer', () => {
  it("responds to successful PUT /submitAnswer req with success message", async () => {
    const response = await request.post("/submitAnswer").send({
      'question_id': 1,
      'body': 'testy testy testy',
      'name': 'The Jesty',
      'email': 'jesty@gmail.com',
    });

    expect(response.status).toEqual(500);

  });

  it("responds to failed POST /submitAnswerreq with error message", async () => {
    const response = await request.post("/submitAnswer").send({
      'product_id': 'number1',
      'body': 'test test test',
      'name': 'The Jester',
      'email': 'jesty@gmail.com',
    });
    expect(response.status).toEqual(500);

  });
});