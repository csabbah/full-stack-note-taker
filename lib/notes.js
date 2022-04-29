// This file will use the data we submitted via the form in the api-routes and push it to the API database
// It also returns the data from the database using the file system module

// ------- ------- ------- ------- ------- ------- ------- ------- IMPORTING REQUIRED MODULES
const fs = require('fs');
const path = require('path');

// ------- ------- ------- ------- ------- ------- ------- ------- WORKING WITH JSON DATA
// Parse the JSON data from the database file to be viewed/used in our app (behind the screen)
var returnData = () => {
  fs.readFile('./data/db.json', 'utf8', (err, jsonString) => {
    if (err) {
      // If it doesn't exist, return error
      console.log('File read failed:', err);
      return;
    }
    // Else, return the file and all it's data
    console.log('File data:', jsonString);
  });
};
// ------- ------- ------- ------- ------- ------- ------- ------- PUSHING NOTES FUNCTION
// Take the original DB array and the new data
function addNote(notesArray, newData, res) {
  // For each note that was previously 'currentlyPosted = true', set it to false
  // That way we can set the latest added note to true
  notesArray.forEach((note) => {
    note.currentlyPosted = false;
  });
  // Push the new data to the DB array
  notesArray.push(newData);
  // Write the file - in other words - push the new changes
  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
}

function deleteNote(noteDb, noteId) {
  var newDb = noteDb.filter((item) => {
    if (item.id != noteId) {
      return item;
    }
  });

  newDb.forEach((note, index) => {
    note.id = index;
    note.currentlyPosted = false;
    note.currentlySelected = false;
  });

  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify(newDb, null, 2)
  );

  return newDb;
}

// This executes when we visit the notes/preview/ endpoint so that we can view what we clicked vs. showing the most recently added response
function removeRecent(notesArray) {
  notesArray.forEach((note) => {
    note.currentlyPosted = false;
  });

  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
}

function autoSelect(notesArray, id) {
  notesArray.forEach((note, index) => {
    note.id = index;
  });
  notesArray.forEach((note) => {
    // Reset existing booleans
    note.currentlySelected = false;
    // Convert to true AFTER we click the element
    if (id == note.id) {
      note.currentlySelected = true;
    }
  });
  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
}

// Assign an id to all existing notes and increment by each note
// Additionally reset all booleans
function resetAllBooleans(notesArray) {
  notesArray.forEach((note, index) => {
    note.id = index;
    note.currentlyPosted = false;
    note.currentlySelected = false;
  });

  // Write the file - in other words - push the new changes
  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
}

module.exports = {
  returnData,
  addNote,
  removeRecent,
  autoSelect,
  resetAllBooleans,
  deleteNote,
};
