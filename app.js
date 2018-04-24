const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const ArtistController = require('./controllers/Artist');

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
app.post('/Artist', ArtistController.post);

// GET route, lists all artists in collection
app.get('/Artist', ArtistController.list);

// GET route, returns specific artist
app.get('/Artist/:artistId', ArtistController.get);

// PUT route, updates an artist
app.put('/Artist/:artistId', ArtistController.put);

app.listen(3000, () => console.log('It works!'));
