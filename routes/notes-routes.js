const express = require('express');
const router = express.Router();

const path = require('path');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static('./public'));

// '/notes/preview' will return the notes-preview HTML which allows users to look through notes
router.get('/preview', (req, res) => {
  // ** ADD CODE ** Add function to read through the DB and generate the current active notes
  res.sendFile(path.join(__dirname, '../public/notes-preview.html'));
});

// '/notes' will return main note editor HTML which allows users to post new notes
router.get('/', (req, res) => {
  // ** ADD CODE ** Add function to read through the DB and generate the current active notes
  res.sendFile(path.join(__dirname, '../public/notes-editor.html'));
});

module.exports = router;
