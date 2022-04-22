const express = require('express');
const router = express.Router();

const path = require('path');
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static('./public'));

// When the form submits, execute this function:
router.post('/preview', (req, res) => {
  // Add function to push the note to an array and to the existing JSON
  // And load up /notes.html page with the new note that was just added
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// When the form submits, execute this function:
router.post('/', (req, res) => {
  // Add function to push the note to an array and to the existing JSON
  // And load up /notes.html page with the new note that was just added
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
