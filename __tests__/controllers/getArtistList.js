const mongoose = require('mongoose');
const path = require('path');
const httpMocks = require('node-mocks-http');
const events = require('events');
const { list } = require('../../controllers/Artist');
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
    const artists = [
      { name: 'tame impala', genre: 'rock' },
      { name: 'jamal', genre: '90s hiphop' },
      { name: 'Jeru the Damaja', genre: '90s hiphop' },
    ];
    Artist.create(artists, (err) => {
      if (err) {
        console.log(err, 'stuff went wrong');
      }
      const request = httpMocks.createRequest({
        method: 'GET',
        URL: '/Artist',
      });

      const response = httpMocks.createResponse({
        eventEmitter: events.EventEmitter,
      });
      list(request, response);

      response.on('end', () => {
        const listOfArtists = JSON.parse(response._getData()); //eslint-disable-line
        const artistNames = listOfArtists.map(e => e.name);
        expect(artistNames).toEqual(expect.arrayContaining(['tame impala', 'jamal', 'Jeru the Damaja']));
        expect(listOfArtists).toHaveLength(3);
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
