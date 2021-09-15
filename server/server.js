const { response } = require('express');
const express = require('express');
const db = require('../database/index.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3030;


/////////////
// routes //
////////////
// root
app.get('/', async (req, res) => {
  res.json({status: 'received get req to root '})
})

// GET /qa/questions
app.get('/qa/questions', (req, res) => {
  let resultObj = {};
  // const query = `SELECT
  // Questions.product_id AS product_id, Questions.id AS question_id, Questions.body AS question_body,
  // Questions.date_written AS question_date, Questions.asker_name AS asker_name, Questions.helpful AS question_helpfulness,
  // Questions.reported AS reported, Answers.id, Answers.body, Answers.date_written AS date, Answers.answerer_name,
  // Answers.helpful AS helpfulness
  // FROM Questions, Answers
  // WHERE Questions.id = ${req.query['product_id']}
  // AND Questions.id = Answers.question_id`;
  const query =
`SELECT
id,
body,
date_written,
asker_name,
helpful,
reported,
(SELECT JSON_OBJECTAGG(
   Answers.id, (JSON_OBJECT(
     'id', id,
     'body', body,
     'date', date_written,
     'answerer_name', answerer_name,
     'reported', reported,
     'helpful', helpful
     ))
     )
     FROM Answers WHERE Answers.question_id = Questions.id
     ) AS answers
     FROM Questions
     WHERE product_id = 1 AND reported = 0;`
  db.query(query, [req.query['product_id'], req.query['count']], (error, results) => {
    if (error) {
      console.log('err err ', error);
    }
    if (!results[0]) {
      res.json('No questions found')
    } else {
      console.log(results)
      Promise.resolve(results.forEach(result => {
        if (result['answers'] !== undefined) {
          JSON.parse(result['answers']);
        }
        return results;
      }))
      .then(results => {
        console.log(results)
      })

      res.json(results.splice(0, req.query['count']));
    }
  })
})


// PUT /likeQuestion
app.put('/likeQuestion', (req, res) => {
  const questionId = req.body['question_id'];
   console.log('🎄🐮🎄');
  console.log(`question ${questionId} being liked`)
  const query = `UPDATE Questions SET helpful = helpful+1 WHERE id = ${questionId}`;
  db.query(query, (err, results) => {
    if (err) {
      console.log('errrr ', err);
      res.status(201).json('error in PUT /likeQuestion');
    } else {
      res.json('question liked');
    }
  });
});

// PUT /likeAnswer
app.put('/likeAnswer', (req, res) => {
  const answerId = req.body['answer_id']
  console.log('🐮🎄🐮');
  console.log(`answer ${answerId} being liked`)
  const query = `UPDATE Answers SET helpful = helpful+1 WHERE id = ${answerId}`;
  db.query(query, (err, results) => {
    if (err) {
      console.log('eerruyuh ', err);
      res.status(201).json('error in PUT /likeAnswer');
    } else {
      res.json('answer liked')
    }
  });
});

// PUT /reportQuestion
app.put('/reportQuestion', (req, res) => {
  const questionId = req.query['question_id'];
  const query = `UPDATE Questions SET reported = 1 WHERE id = ${questionId}`;
  db.query(query, (err, results) => {
    if (err) {
      console.log('errrr ', err);
      res.status(201).json('error in PUT /reportQuestion');
    } else {
      res.json('question reported');
    }
  });
});

// PUT /reportAnswer
app.put('/reportAnswer', (req, res) => {
  const answerId = req.query['answer_id'];
  const query = `UPDATE Answers SET reported = 1 WHERE id = ${answerId}`;
  db.query(query, (err, results) => {
    if (err) {
      console.log('errrr ', err);
      res.status(201).json('error in PUT /reportAnswer');
    } else {
      res.json('answer reported');
    }
  });
});

// POST /submitQuestion
app.post('/submitQuestion', (req, res) => {
  const data = req.body;
  const productId = req.body['product_id'];

  const query = `INSERT INTO Questions (product_id, body, date_written, asker_name, asker_email, reported, helpful)
  VALUES (${data['product_id']}, '${data['body']}', UNIX_TIMESTAMP(), '${data['name']}', '${data['email']}', 0, 0)
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.log('eeeroorrrrr, ', err);
      res.status(201).json('error in POST /submitQuestion');
    } else {
      res.json('question submitted')
    }
  })

});

// POST /submitAnswer
app.post('/submitAnswer', (req, res) => {
  const data = req.body;
  const questionId = req.body['question_id'];
  const query = `INSERT INTO Answers (question_id, body, answerer_name, answerer_email, reported, helpful, date_written)
   VALUES (${data['question_id']}, '${data['body']}', '${data['name']}', '${data['email']}', 0, 0, UNIX_TIMESTAMP())`
  let answerId;
  let photos = data.photos.slice(2, -2);
  db.query(query, (err, results) => {
    if (err) {
      console.log('eeeyyyyrror, ', err)
      res.status(201).json('error in POST /submitAnswer');
    } else {
      answerId = results['insertId'];
      res.json('answer submitted');
    }
  })

  setTimeout(() => {
    console.log(photos);
    db.query(`INSERT INTO Answers_photos (answer_id, url) VALUES (${answerId}, '${photos}')`)
  }, 2)
});


app.get('/test', async (req, res) => {
  res.json({message: 'pass!'})
})


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})

module.exports = app;