const Artist = require('../models/Artist');

exports.post = (req, res) => {
  const artist = new Artist({ name: req.body.name, genre: req.body.genre });
  artist.save((err, artistCreated) => {
    res.json(artistCreated);
  });
};

exports.list = (req, res) => {
  // return all documents within the Artist collection
  Artist.find({}, (err, artists) => {
    if (err) {
      res.json('Something went wrong');
    }
    res.json(artists);
  });
};

// return specific artist by artistId
exports.get = (req, res) => {
  Artist.findById(req.params.artistId, (err, artist) => {
    if (err) {
      res.json('Something went wrong');
    }
    res.json(artist);
  });
};

// put handler
exports.put = (req, res) => {
  Artist.findById(req.params.artistId, (err, artist) => {
    if (err) {
      res.json('Something went wrong');
    }

    artist.set({ name: req.body.name });
    artist.set({ genre: req.body.genre });

    artist.save((updateErr, artistUpdated) => {
      if (updateErr) {
        res.json('Could not update');
      }

      res.json(artistUpdated);
    });
  });
};

exports.postAlbum = (req, res) => {
  Artist.findById(req.params.artistId, (err, artist) => {
    if (err) {
      res.json('Something went wrong');
    }

    artist.set({ albums: artist.albums.concat([req.body]) });

    artist.save((updateErr, artistUpdated) => {
      if (updateErr) {
        res.json('Could not update');
      }

      res.json(artistUpdated);
    });
  });
};

// delete handler
exports.deleteArtist = (req, res) => {
  Artist.findByIdAndRemove(req.params.artistId, (err) => {
    if (err) {
      res.json('Something went wrong');
    }
    res.json('Artist has been Deleted');
  });
};
