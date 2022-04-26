// This file executes all requests and responses via routers and root requests

// ------- ------- ------- ------- ------- ------- ------- ------- IMPORTING AND DECLARING ROOT OBJECTS
const { application } = require('express');
const express = require('express');

// Declare the port
const PORT = process.env.PORT || 3001;

// Declare the server object
const app = express();

// Import path module to response with HTML
const path = require('path');

// These allow us to parse/fetch JSON data and serves our static files in our public folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'public')));

// ------- ------- ------- ------- ------- ------- ------- ------- API ROUTES
// Require our api routes and include all the methods
const apiRouter = require('./routes/api-routes.js');
// Use and include '/api' endpoint before each api route
app.use('/api', apiRouter);

// ------- ------- ------- ------- ------- ------- ------- ------- NOTE ROUTES

// Require our user routes and include all the methods so we can navigate through our app
const noteRouter = require('./routes/notes-routes.js');
// Use and include '/users' endpoint before each notes route
app.use('/notes', noteRouter);

// ------- ------- ------- ------- ------- ------- ------- ------- WILDCARD ROUTE

app.delete('/expressions/:id', (req, res, next) => {
  res.send('hi');
});
// Return the main HTML page in the root endpoint
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

// ------- ------- ------- ------- ------- ------- ------- ------- LISTEN FOR PORT
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
