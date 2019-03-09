const express = require('express');
const app = express();
const host = 'localhost';
const port = 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./db/index.js');

app.use(express.static('public'));
app.use(bodyParser.text());
app.use(morgan('tiny'));


app.post('/', (req, res) => {
  console.log(req.body);
  console.log('post request received!!!');
  // debugger;

  res.send();
});

app.listen(port, () => console.log(`Listening to requests on port ${port}.`));