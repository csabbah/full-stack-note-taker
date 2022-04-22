const express = require('express');
const fs = require('fs');

// Declare the port
const PORT = process.env.PORT || 3001;

// Declare the server object
const app = express();

// These allow us to parse/fetch JSON data and serves our static files in our public folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Import path module to response with HTML
const path = require('path');
// Return the main HTML page in the root endpoint
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Import the JSON data
const noteDb = require('./data/db.json');
// This returns a webpage with JSON data from the db.json file
app.get('/api/notes', (req, res) => {
  res.json(noteDb);
});

// When the form submits, execute this function:
app.post('/notes', (req, res) => {
  // Add function to push the note to an array and to the existing JSON
  // And load up /notes.html page with the new note that was just added
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
