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

var validData = true;
// Handle post method - Upload notes to DB
router.post('/notes', (req, res) => {
  var newData = {
    // req.body == the FORM that initialized the post method and endpoint
    // while the .titleData and .bodyData == the 'name' parameters in the form inputs
    Title: req.body.titleData,
    Body: req.body.bodyData,
    id: noteDb.length + 1,
    currentlyPosted: true,
    currentlySelected: false,
  };

  // Before we add the new data....
  noteDb.forEach((dbNote) => {
    // Check the database for similarity in the new notes that the user is attempting to post
    if (newData.Title == dbNote.Title && newData.Body == dbNote.Body) {
      // If it exists, set variable to false
      validData = false;
    }
  });

  // If the data is unique, then we write it
  if (validData) {
    // Push the newData to the noteDb and writeFile (push)
    addNote(noteDb, newData, res);
    // Send the preview.html webpage as the response
    res.redirect(`/notes/${newData.id}`);
  } else {
    // Otherwise don't write
    res.send(
      '<script>alert("Note already exists."); window.location.href = "/notes";</script>'
    );
  }
});

// router.delete('/notes/:id', (req, res) => {
//   res.send('DELETE Request Called');
// });

module.exports = router;
