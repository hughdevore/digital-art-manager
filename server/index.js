const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;

app.use(cors());

app.get('/api', (req, res) => {
  console.log(`Server received this: ${req}`)
  res.send({ data: 'Welcome to the API' });
})

app.get('*', (req, res) => {
  console.log(`Server received this: ${req}`)
  res.send('PICK A ROUTE');
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
