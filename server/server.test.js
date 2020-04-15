const supertest = require('supertest');
const app = require('./server');

test('GET /', done => {
  supertest(app)
    .get('/')
    .expect(
      200,
      JSON.stringify({
        data: {
          message: 'Welcome to the API!',
          routes: {
            getArt: 'GET request to /art will return an array of art.',
            getArtById: 'GET request to /art with an id param will return that piece of art.',
            createArt: 'POST request to /art will create a piece of art.',
            updateArt: 'PUT request to /art with an id param will update that piece of art.',
            deleteArt: 'DELETE request to /art with an id param will delete that piece of art.'
          }
        }
      })
    )
    .end(done);
});
