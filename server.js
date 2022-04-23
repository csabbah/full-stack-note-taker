// ------- ------- ------- ------- ------- ------- ------- ------- IMPORTING AND DECLARING ROOT OBJECTS
const express = require('express');
const fs = require('fs');

// Declare the port
const PORT = process.env.PORT || 3002;

// Declare the server object
const app = express();

// Import path module to response with HTML
const path = require('path');

// These allow us to parse/fetch JSON data and serves our static files in our public folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

// ------- ------- ------- ------- ------- ------- ------- ------- WORKING WITH JSON DATA

// Parse the JSON data from the database file to be viewed/used in our app (behind the screen)
fs.readFile('./data/db.json', 'utf8', (err, jsonString) => {
  if (err) {
    // If it doesn't exist, return error
    console.log('File read failed:', err);
    return;
  }
  // Else, return the file and all it's data
  console.log('File data:', jsonString);
});

// ------- ------- ------- ------- ------- ------- ------- ------- HANDLING REQUESTS

// Import the JSON data
const noteDb = require('./data/db.json');
// Return a response to show the data by visiting the /api/notes endpoint
app.get('/api/notes', (req, res) => {
  res.json(noteDb);
});

// Require our user routes and include all the methods so we can navigate through our app
const userRouter = require('./routes/notes.js');
// Use and include '/users' endpoint before each route
app.use('/notes', userRouter);

// Return the main HTML page in the root endpoint
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

// ------- ------- ------- ------- ------- ------- ------- ------- LISTEN FOR PORT
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
