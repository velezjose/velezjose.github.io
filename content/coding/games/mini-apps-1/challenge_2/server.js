// Express Import and Port Nubmer
const express = require('express');
const app = express();
const port = 8080;

// Middleware and Util functions
const bodyParser = require('body-parser');
const jsonToCsv = require('./utils/jsonToCsv').jsonToCsv;

// Helper functions
const Promise = require('bluebird');
const fs = require('fs');
fs.readFileAsync = Promise.promisify(fs.readFile);
fs.writeFileAsync = Promise.promisify(fs.writeFile);
fs.unlinkAsync = Promise.promisify(fs.unlink);
const path = require('path');


// This is the same thing as:  app.use('/', express.static('client'));
// It serves all files in the client/ directory.
app.use(express.static('client'));
app.use(bodyParser.urlencoded());

app.post('/', (req, res) => {
  let csvText = jsonToCsv(JSON.parse(req.body.csvInput));

  fs.readFileAsync('./utils/counter.txt')
    .then(data => Promise.resolve(Number(data)))
    .catch(() => {
      return fs.writeFileAsync('./utils/counter.txt', 0)
        .then(() => 0);
    })
    .then(num => {
      return fs.writeFileAsync(`${__dirname}/utils/${num}.csv`, csvText)
        .then(() => Promise.resolve(num))
    })
    .catch(() => console.log('Error writing File Async.'))
    .then((num = 0) => {
      res.header("Content-Disposition", `attachment; filename=csv_report${num}.csv`);
      res.sendFile(path.join(__dirname, `/utils/${num}.csv`));
      return Promise.resolve(num);
    })
    .then(num => {
      fs.writeFileAsync(`./utils/counter.txt`, num + 1);
      return Promise.resolve(num);
    }) 
    .catch(() => console.log('Error in deleting file.'))
    
    // TODO: unlink/delete file that was just written. I tried to do this but failed 
    // many times.
});


app.listen(port, () => console.log(`Listening on port ${port}.`));