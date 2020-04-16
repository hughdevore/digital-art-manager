const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./queries');

app.use(cors());
app.enable('trust proxy');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (request, response) => {
  response.send({
    data: {
      message: 'Welcome to the API!',
      routes: {
        getArt: 'GET request to /art will return an array of art.',
        getArtById:
          'GET request to /art with an id param will return that piece of art.',
        createArt: 'POST request to /art will create a piece of art.',
        updateArt:
          'PUT request to /art with an id param will update that piece of art.',
        deleteArt:
          'DELETE request to /art with an id param will delete that piece of art.'
      }
    }
  });
});

app.get('/art', db.getArt);
app.get('/art/:id', db.getArtById);
app.post('/art', db.createArt);
app.put('/art/:id', db.updateArt);
app.delete('/art/:id', db.deleteArt);

module.exports = app;
