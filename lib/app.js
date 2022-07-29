require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/goblins', require('./controllers/goblins'));

app.get('/', (req, res) => {
  res.send('Hello, goblins!!!');
});

module.exports = app;
