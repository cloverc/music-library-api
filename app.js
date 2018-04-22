const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const artist = require('./controllers/Artist');

// mLab connection string
require('dotenv').config({
  path: path.join(__dirname, './settings.env'),
});

const app = express();

// connect to DB
mongoose.connect(process.env.DATABASE_CONN);

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello MongoDb!'));

// POST route
app.post('/Artist', artist.post);

app.listen(3000, () => console.log('It works!'));
