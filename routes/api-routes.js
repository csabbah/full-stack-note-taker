// This file handles all API related requests, including, posting notes and returning data from the database

// ------- ------- ------- ------- ------- ------- ------- ------- IMPORTING AND DECLARING ROOT OBJECTS
const { addNote } = require('../lib/notes');
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static('./public'));

// Import the JSON data
const noteDb = require('../data/db.json');

// ------- ------- ------- ------- ------- ------- ------- ------- HANDLING API GET AND POST REQUESTS
// Return a response to show the data by visiting the /api/notes endpoint
router.get('/notes', (req, res) => {
  res.json(noteDb);
});

// Handle post method - Upload notes to DB
router.post('/notes', (req, res) => {
  var newData = {
    // req.body == the FORM that initialized the post method and endpoint
    // while the .titleData and .bodyData == the 'NAME' parameters in the form inputs
    Title: req.body.titleData,
    Body: req.body.bodyData,
    id: noteDb.length + 1,
    currentlyPosted: true,
    currentlySelected: false,
  };
  // Push the newData to the noteDb and writeFile (push)
  addNote(noteDb, newData, res);
  // Send the preview.html webpage as the response
  res.redirect(`/notes/${newData.id}`);
});

// router.delete('/notes/:id', (req, res) => {
//   res.send('DELETE Request Called');
// });

module.exports = router;
