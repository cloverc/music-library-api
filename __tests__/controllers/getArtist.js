const mongoose = require('mongoose');
const path = require('path');
const httpMocks = require('node-mocks-http');
const events = require('events');
const { get } = require('../../controllers/Artist');
const Artist = require('../../models/Artist');

require('dotenv').config({
  path: path.join(__dirname, '../../settings.env'),
});

describe('GET Artist endpoint', () => {
  // establish connection to mongodb
  beforeAll((done) => {
    mongoose.connect(process.env.TEST_DATABASE_CONN, done);
  });
  it('should retrieve Artist record from the database', (done) => {
    const artist = new Artist({ name: 'Wu-Tang Clan', genre: 'HipHop' });
    artist.save((err, artistCreated) => {
      if (err) {
        console.log(err, 'something went wrong');
      }
      const request = httpMocks.createRequest({
        method: 'GET',
        URL: '/Artist/1234',
        params: {
          artistId: artistCreated._id
        },
      });
      const response = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });

      get(request, response);

      response.on('end', () => {
        let artistFound = JSON.parse(response._getData()); //eslint-disable-line
        expect(artistFound.name).toBe('Wu-Tang Clan');
        expect(artistFound.genre).toBe('HipHop');
        done();
      });
    });
  });
  // delete artists from test database
  afterEach((done) => {
    Artist.collection.drop((e) => {
      if (e) {
        console.log(e);
      }
      done();
    });
  });
  // close db connection
  afterAll(() => {
    mongoose.connection.close();
  });
});
