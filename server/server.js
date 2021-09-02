const express = require('express');
const db = require('../database/index.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3030;

// routes
app.get('/', async (req, res) => {
  res.json({status: 'received get req to root '})
})

app.get('/qa/questions', (req, res) => {
  let responseObj = {};
  const query = 'SELECT * FROM QUESTIONS WHERE product_id = ?';
  db.query(query, [req.query['product_id'], req.query['count']], (error, results) => {
    if (error) {
      console.log('err err ', error)
    }
    if (!results[0]) {
      res.json('No questions found')
    } else {
      responseObj['product_id'] = req.query['product_id'];
      responseObj['results'] = [];
      for (let i = 0; i < req.query['count']; i++) {
        responseObj['results'].push({
          'question_id': results[i]['id'],
          'question_body': results[i]['body'],
          'question_date': results[i]['date_written'],
          'asker_name': results[i]['asker_name'],
          'question_helpfulness': results[i]['helpful'],
          'reported': results[i]['helpful'] === 0 ? true : false
        });
      }
      console.log(responseObj);
      res.json(results.splice(0, req.query['count']));
    }
  })
})

app.listen(PORT, () => {
  console.log(` Server is running on port: ${PORT}`)
})

// {
//   "product_id": "47601",
//   "results": [
//       {
//           "question_id": 398624,
//           "question_body": "Voluptate adipisci aut velit nesciunt vitae eveniet.",
//           "question_date": "2020-08-26T00:00:00.000Z",
//           "asker_name": "Howell.Leuschke58",
//           "question_helpfulness": 3,
//           "reported": false,
//           "answers": {
//               "3731617": {
//                   "id": 3731617,
//                   "body": "Libero dicta et reprehenderit consequuntur est quo explicabo velit sint.",
//                   "date": "2021-06-10T00:00:00.000Z",
//                   "answerer_name": "Gussie3",
//                   "helpfulness": 14,
//                   "photos": []
//               },
//               "3731618": {
//                   "id": 3731618,
//                   "body": "Est laborum dolores.",
//                   "date": "2021-06-02T00:00:00.000Z",
//                   "answerer_name": "King97",
//                   "helpfulness": 18,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
//                   ]
//               },
//               "3731619": {
//                   "id": 3731619,
//                   "body": "Adipisci dolor consequatur ut minus enim voluptates soluta est.",
//                   "date": "2021-03-25T00:00:00.000Z",
//                   "answerer_name": "Frederic36",
//                   "helpfulness": 7,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1516199707327-5399434d0aa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1083&q=80",
//                       "https://images.unsplash.com/photo-1558014356-f7c41bc744f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
//                   ]
//               },
//               "3731620": {
//                   "id": 3731620,
//                   "body": "Ab voluptate maiores magnam recusandae.",
//                   "date": "2020-12-01T00:00:00.000Z",
//                   "answerer_name": "Emilio_Hessel34",
//                   "helpfulness": 1,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1520904549193-5ab0027b3fa6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
//                       "https://images.unsplash.com/photo-1487174244970-cd18784bb4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"
//                   ]
//               },
//               "3731621": {
//                   "id": 3731621,
//                   "body": "Odit ea corporis aut sed.",
//                   "date": "2021-02-01T00:00:00.000Z",
//                   "answerer_name": "Gino.Baumbach",
//                   "helpfulness": 14,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
//                   ]
//               },
//               "3731622": {
//                   "id": 3731622,
//                   "body": "Ea dignissimos ad doloremque dicta officiis.",
//                   "date": "2020-11-20T00:00:00.000Z",
//                   "answerer_name": "Lexie76",
//                   "helpfulness": 17,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1534550017194-5df79ed78967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
//                       "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
//                   ]
//               },
//               "3731623": {
//                   "id": 3731623,
//                   "body": "Ex quibusdam et quisquam nostrum.",
//                   "date": "2020-12-17T00:00:00.000Z",
//                   "answerer_name": "Loren.Marquardt",
//                   "helpfulness": 11,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1514613818067-e207c3441db0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//                       "https://images.unsplash.com/photo-1517438476312-10d79c077509?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
//                   ]
//               },
//               "3731624": {
//                   "id": 3731624,
//                   "body": "Velit aliquam aut quidem molestiae tempora.",
//                   "date": "2021-05-09T00:00:00.000Z",
//                   "answerer_name": "Floyd.Boyer40",
//                   "helpfulness": 8,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1526113438757-122d6d54da4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1563&q=80",
//                       "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
//                   ]
//               },
//               "3731625": {
//                   "id": 3731625,
//                   "body": "Quaerat voluptas aliquam non vero laudantium.",
//                   "date": "2021-05-17T00:00:00.000Z",
//                   "answerer_name": "Caesar_Friesen",
//                   "helpfulness": 19,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
//                       "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
//                   ]
//               },
//               "3731628": {
//                   "id": 3731628,
//                   "body": "Quisquam deleniti rem voluptates error eum.",
//                   "date": "2021-06-26T00:00:00.000Z",
//                   "answerer_name": "Alda.Luettgen",
//                   "helpfulness": 5,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1482876555840-f31c5ebbff1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
//                   ]
//               },
//               "3731629": {
//                   "id": 3731629,
//                   "body": "Nihil aut quae mollitia qui saepe nesciunt dolore facere.",
//                   "date": "2021-04-13T00:00:00.000Z",
//                   "answerer_name": "Trent_Weissnat70",
//                   "helpfulness": 9,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80"
//                   ]
//               },
//               "3731630": {
//                   "id": 3731630,
//                   "body": "Voluptas quis est minus sequi magni impedit nihil sed.",
//                   "date": "2021-08-20T00:00:00.000Z",
//                   "answerer_name": "Kaylie_Heller11",
//                   "helpfulness": 5,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
//                   ]
//               },
//               "3731631": {
//                   "id": 3731631,
//                   "body": "Delectus eius et consequatur.",
//                   "date": "2021-08-24T00:00:00.000Z",
//                   "answerer_name": "Selmer.Kunde",
//                   "helpfulness": 6,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
//                   ]
//               },
//               "3731632": {
//                   "id": 3731632,
//                   "body": "Atque est voluptate ut incidunt et.",
//                   "date": "2021-01-16T00:00:00.000Z",
//                   "answerer_name": "Nasir_Conn",
//                   "helpfulness": 2,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
//                   ]
//               },
//               "3731633": {
//                   "id": 3731633,
//                   "body": "Et magni voluptatem fugiat ut id.",
//                   "date": "2021-06-20T00:00:00.000Z",
//                   "answerer_name": "Berenice16",
//                   "helpfulness": 9,
//                   "photos": [
//                       "https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//                       "https://images.unsplash.com/photo-1553830591-d8632a99e6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1511&q=80"
//                   ]
//               },
//               "3731634": {
//                   "id": 3731634,
//                   "body": "Minus illum sequi aut modi reprehenderit qui numquam pariatur enim.",
//                   "date": "2021-06-17T00:00:00.000Z",
//                   "answerer_name": "Darrell45",
//                   "helpfulness": 9,
//                   "photos": []
//               }
//           }
//       }
//   ]
// }