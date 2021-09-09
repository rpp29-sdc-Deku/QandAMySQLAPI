const { response } = require('express');
const express = require('express');
const db = require('../database/index.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3030;

// routes //

// root
app.get('/', async (req, res) => {
  res.json({status: 'received get req to root '})
})

// GET /qa/questions
app.get('/qa/questions', (req, res) => {
  let resultObj = {};
  const query = `SELECT
  Questions.product_id AS product_id, Questions.id AS question_id, Questions.body AS question_body,
  Questions.date_written AS question_date, Questions.asker_name AS asker_name, Questions.helpful AS question_helpfulness,
  Questions.reported AS reported, Answers.id, Answers.body, Answers.date_written AS date, Answers.answerer_name,
  Answers.helpful AS helpfulness
  FROM Questions, Answers
  WHERE Questions.id = ${req.query['product_id']}
  AND Questions.id = Answers.question_id`;
  //const query = `SELECT * FROM Questions JOIN Answers ON Questions.id = Answers.id WHERE Questions.id = 1`
  db.query(query, [req.query['product_id'], req.query['count']], (error, results) => {
    if (error) {
      console.log('err err ', error);
    }
    if (!results[0]) {
      res.json('No questions found')
    } else {
      console.log(results);

      res.json(results.splice(0, req.query['count']));
    }
  })
})

// PUT /likeQuestion
app.put('/likeQuestion', (req, res) => {
  const questionId = req.query['question_id'];
  const query = `UPDATE Questions SET helpful = helpful+1 WHERE id = ${questionId}`;
  db.query(query, (err, results) => {
    if (err) {
      console.log('errrr ', err);
    } else {

      res.json('question Liked');
    }
  });
});

// PUT /likeAnswer
app.put('/likeAnswer', (req, res) => {
  const answerId = req.query['answer_id']
  const query = `UPDATE Answers SET helpful = helpful+1 WHERE id = ${answerId}`;
  db.query(query, (err, results) => {
    if (err) {
      console.log('eerruyuh ', err);
    } else {
      res.json('answer Liked')
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
    } else {
      res.json('question Reported');
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
    } else {
      res.json('answer Reported');
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

  db.query(query, (err, results) => {
    if (err) {
      console.log('eeeyyyyrror, ', err)
    } else {
      console.log(results);
      res.json('answer Submitted');
    }
  })
});





app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})

// {
//   "product_id": "47600",
//   "results": [
//       {
//           "question_id": 398619,
//           "question_body": "Ut enim optio dolores aut reprehenderit illo doloremque ipsam.",
//           "question_date": "2021-02-11T00:00:00.000Z",
//           "asker_name": "Mariana89",
//           "question_helpfulness": 23,
//           "reported": false,
//           "answers": {
//               "3731557": {
//                   "id": 3731557,
//                   "body": "Deserunt distinctio quam numquam ipsam accusamus minus.",
//                   "date": "2021-08-06T00:00:00.000Z",
//                   "answerer_name": "Ludie.Howe",
//                   "helpfulness": 2,
//                   "photos": []
//               },
//               "3731558": {
//                   "id": 3731558,
//                   "body": "Hic quam quos impedit quam perspiciatis labore facilis.",
//                   "date": "2021-08-03T00:00:00.000Z",
//                   "answerer_name": "Evert14",
//                   "helpfulness": 3,
//                   "photos": []
//               }
//           }
//       },
//       {
//           "question_id": 398615,
//           "question_body": "Deserunt nisi placeat officia doloribus.",
//           "question_date": "2020-10-05T00:00:00.000Z",
//           "asker_name": "Emerson77",
//           "question_helpfulness": 22,
//           "reported": false,
//           "answers": {
//               "3731506": {
//                   "id": 3731506,
//                   "body": "Sed ullam qui.",
//                   "date": "2021-02-01T00:00:00.000Z",
//                   "answerer_name": "Doris12",
//                   "helpfulness": 13,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
//                   ]
//               },
//               "3731507": {
//                   "id": 3731507,
//                   "body": "Fuga autem officiis quam possimus ducimus mollitia quaerat numquam ad.",
//                   "date": "2021-02-19T00:00:00.000Z",
//                   "answerer_name": "Telly27",
//                   "helpfulness": 4,
//                   "photos": []
//               },
//               "3731508": {
//                   "id": 3731508,
//                   "body": "Debitis dicta quod aut incidunt.",
//                   "date": "2020-12-17T00:00:00.000Z",
//                   "answerer_name": "Herman_Rogahn",
//                   "helpfulness": 18,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1560095633-6803ba0461cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"
//                   ]
//               }
//           }
//       }
//   ]
// }

// app.get('/qa/questions', (req, res) => {
//   let responseObj = {};
//   let answerObj = {};
//   const query = 'SELECT * FROM QUESTIONS WHERE product_id = ?';
//   db.query(query, [req.query['product_id'], req.query['count']], (error, results) => {
//     if (error) {
//       console.log('err err ', error);
//     }
//     if (!results[0]) {
//       res.json('No questions found')
//     } else {
//       for (let i = 0; i < req.query['count']; i++) {
//         responseObj['product_id'] = req.query['product_id'];
//         if (!responseObj['results']) {
//           responseObj['results'] = [];
//         }
//         responseObj['results'].push({
//           'question_id': results[i]['id'],
//           'question_body': results[i]['body'],
//           'question_date': results[i]['date_written'],
//           'asker_name': results[i]['asker_name'],
//           'question_helpfulness': results[i]['helpful'],
//           'reported': results[i]['helpful'] === 0 ? true : false,
//           'answers': []
//         });
//       }
//       for (let j = 0; j < responseObj.results.length - 1; j++) {
//         db.query(`SELECT * FROM ANSWERS WHERE question_id = ${responseObj.results[j]['question_id']}`, (error, answers) => {
//           if (error) {
//             console.log('errrerrrr ', error);
//           }
//           if (!answers) {
//             console.log('No answers found');
//           } else {
//             answerObj['id'] = answers[j]['id'];
//             answerObj['body'] = answers[j]['body'];
//             answerObj['date'] = answers[j]['date_written'];
//             answerObj['answerer_name'] = answers[j]['answerer_name'];
//             answerObj['helpfulness'] = answers[j]['helpful'];
//             answerObj['photos'] = [];

//             responseObj['results'][j]['answers'].push(answerObj);
//             console.log(responseObj);
//             console.log(JSON.stringify(responseObj))
//           }
//         })
//       }


//       res.json(results.splice(0, req.query['count']));
//     }
//   })
// })