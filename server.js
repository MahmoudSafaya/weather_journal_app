/* An object to act as endpoint for all routes */
projectData = {};

/* Requiring express */
const express = require('express');

/* instance of app */
const app = express();

const bodyParser = require('body-parser');
/* The Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
const { networkInterfaces } = require('os');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('files'));

// Spin up the server
const port = 'https://mahmoudsafaya.github.io/weather_journal_app/';
const server = app.listen(port, listening);

// Callback to debug
function listening() {
  console.log(`Server runs on localhost: ${port}`)
}


// Initialize all route with a callback function
app.get('/all', getData);

// Callback function to complete GET '/all'
function getData(req, res) {
  res.send(projectData);
}

// Post Route
app.post('/add', postData);

function postData(req, res) {
  newEntery = {
    temp: req.body.temp,
    date: req.body.date,
    userResponse: req.body.userResponse
  }

  projectData = newEntery;
  console.log(projectData);
}