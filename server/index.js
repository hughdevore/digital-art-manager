const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;

app.use(cors());

// Feel free to remove this
app.get('*', (req, res) => {
  console.log('Server received it')
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});