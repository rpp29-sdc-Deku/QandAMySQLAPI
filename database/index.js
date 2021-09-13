const mysql = require('mysql');
const mysqlConfig = require("./config.js");

//create connection paramaters
const db = mysql.createConnection({
  host: mysqlConfig.HOST,
  user: mysqlConfig.USER,
  database: mysqlConfig.DATABASE
})


// connect to database
  db.connect((err) => {
    if (err) {
      return console.log('err err ', err)
    }
      else {
       console.log('connected to MySQL db');
     }
});

module.exports = db;