const express = require('express');

// Declare the port
const PORT = process.env.PORT || 3001;

// Declare the server object
const app = express();

// These allow us to parse/fetch JSON data and serves our static files in our public folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// This is the JSON data
const noteDb = require('./data/db.json');

// This returns a webpage with JSON data from the db.json file
app.get('/api/notes', (req, res) => {
  res.json(noteDb);
});

// When the form submits, execute this function:
app.post('/notes', (req, res) => {
  // Add function to push the note to an array and to the existing JSON
  res.send('hi');
});
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
