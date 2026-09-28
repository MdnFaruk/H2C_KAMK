const express = require('express');
const Database = require('./database.js');

const bodyParser = require('body-parser');

const connection = new Database();
const app = express();
const port = 8080;

var cors = require('cors');

var jsonParser = bodyParser.json()

// use CORS-middleware
app.use(cors());
// Allow access to UI files in /client
app.use(express.static(__dirname+'/client')); 

// GET reguest to /api/v1/presidents
app.get('/api/v1/presidents', (req, res) => {
  console.log("GET /api/v1/presidents");
  connection.getAll(function(presidents) {
    res.send(presidents);
  });
});

app.post('/api/v1/presidents', jsonParser, function (req, res) {
  console.log("POST /api/v1/presidents", req.body);
  connection.addPresidents(function(response) {
    res.send(response);
  }, req.body);
});

app.listen(port, '0.0.0.0', () => console.log(`Example app listening on port ${port}!`));