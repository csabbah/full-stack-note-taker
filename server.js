const express = require('express');
const fs = require('fs');

// Declare the port
const PORT = process.env.PORT || 3002;

// Declare the server object
const app = express();

// These allow us to parse/fetch JSON data and serves our static files in our public folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

// Import path module to response with HTML
const path = require('path');

// Import the JSON data
const noteDb = require('./data/db.json');
// This returns a webpage with JSON data from the db.json file
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

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
