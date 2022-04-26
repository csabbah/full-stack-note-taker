// This file handles all NOTE related requests, in this case, returning the appropriate HTML webpages

// ------- ------- ------- ------- ------- ------- ------- ------- IMPORTING AND DECLARING ROOT OBJECTS
const { removeRecent, autoSelect, resetAllBooleans } = require('../lib/notes');

const express = require('express');
const router = express.Router();

const path = require('path');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static('./public'));

// Import the JSON data
const noteDb = require('../data/db.json');

// ------- ------- ------- ------- ------- ------- ------- ------- HANDLING NOTE GET REQUESTS

// '/notes/<id-number>' will return the notes-preview HTML which allows users to look through notes
router.get('/:id', function (req, res) {
  // Use the id of the note (in the url) to auto select the note with matching id from the database
  autoSelect(noteDb, req.params.id);
  // Set all 'recentlyPosted' booleans in the database to false so it doesn't auto click on any of them when previewing notes
  removeRecent(noteDb);
  res.sendFile(path.join(__dirname, '../public/views/notes-preview.html'));
});

// '/notes' will return main note editor HTML which allows users to post new notes
router.get('/', (req, res) => {
  // Reset all booleans when you visit the editor page
  resetAllBooleans(noteDb);
  res.sendFile(path.join(__dirname, '../public/views/notes-editor.html'));
});

module.exports = router;
