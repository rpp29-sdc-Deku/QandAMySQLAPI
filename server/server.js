const express = require('express');
const db = require('../database/index.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3030;

// routes


app.listen(PORT, () => {
  console.log(` Server is running on port: ${PORT}`)
})