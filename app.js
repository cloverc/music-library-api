const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const ArtistController = require('./controllers/Artist');
const AlbumController = require('./controllers/Album');
const SongController = require('./controllers/Song');

// mLab connection string
require('dotenv').config({
  path: path.join(__dirname, './settings.env'),
});

const app = express();

// connect to DB
mongoose.connect(process.env.DATABASE_CONN);

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello MongoDb!'));
app.post('/Artist', ArtistController.post);
app.get('/Artist', ArtistController.list);
app.get('/Artist/:artistId', ArtistController.get);
app.get('/Artist/:artistId/albums', AlbumController.getAlbums);
app.put('/Artist/:artistId', ArtistController.put);
app.delete('/Artist/:artistId', ArtistController.deleteArtist);
app.post('/Artist/:artistId/albums', AlbumController.postAlbum);
app.post('/Album/:albumId/song', SongController.postSong);

app.listen(3000, () => console.log('It works!'));
