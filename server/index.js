const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const port = process.env.PORT;
const db = require('./queries');

app.use(cors());
app.enable('trust proxy')
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (request, response) => {
  console.log(`Server received this: ${request}`)
  response.send({ 
    data: { 
      message:'Welcome to the API!',
      routes: {
        getArt: 'GET request to /art',
        createArt: 'POST request to /art',
        updateArt: 'PUT request to /art',
        deleteArt: 'DELETE request to /art',
      }
    }
  });
});

app.get('/art', db.getArt);
app.post('/art', db.createArt);
app.put('/art/:id', db.updateArt);
app.delete('/art/:id', db.deleteArt);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
