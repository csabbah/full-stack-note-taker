// ------- ------- ------- ------- ------- ------- ------- ------- IMPORTING AND DECLARING ROOT OBJECTS
const { returnData, addNote } = require('./lib/notes');
const express = require('express');
const fs = require('fs');

// Declare the port
const PORT = process.env.PORT || 3000;

// Declare the server object
const app = express();

// Import path module to response with HTML
const path = require('path');

// These allow us to parse/fetch JSON data and serves our static files in our public folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

// Import the JSON data
const noteDb = require('./data/db.json');

// ------- ------- ------- ------- ------- ------- ------- ------- API REQUESTS
// Return a response to show the data by visiting the /api/notes endpoint
app.get('/api/notes', (req, res) => {
  res.json(noteDb);
});

// Mock data - this newData object will successfully push to the data base
var newData = { note1: { Title: 'Osama', Body: 'Body' } };
app.post('/api/post', (req, res) => {
  // Push the newData to the noteDb and writeFile (push)
  addNote(noteDb, newData);
  // Return the JSON data via webpage
  res.json(noteDb);
});

// ------- ------- ------- ------- ------- ------- ------- ------- NOTE REQUESTS

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
