// Server Setup constants
const express = require('express');
const app = express();
const host = '127.0.0.1';
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbInstance = require('./db/db');

//Set up default mongoose connection
mongoose.connect('mongodb://localhost:27017/myDB', { useNewUrlParser: true });
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('open', () => console.log('connected!'))
  .on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/', (req, res) => {
  let instance = new dbInstance(req.body);

  instance.save(function (err) {
    if (err) return handleError(err);
    console.log('saved!');
  });

  res.status(200);
  res.end();
});



app.listen(3000, host, () => console.log('Server listening on ', host, ':', port));