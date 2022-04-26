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
var validData = true;
// Take the original DB array and the new data
function addNote(notesArray, newData, res) {
  notesArray.forEach((dbNote) => {
    // Check the database for similarity in the new notes that the user is attempting to post
    if (newData.Title == dbNote.Title && newData.Body == dbNote.Body) {
      // If it exists, set variable to false
      validData = false;
    }
  });

  // If data is valid, add it
  if (validData) {
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
  } else {
    // If data is not valid, alert the user and redirect to editor page
    res.send(
      '<script>alert("Note already exists."); window.location.href = "/notes";</script>'
    );
  }
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
  notesArray.forEach((note) => {
    // Reset existing booleans
    note.currentlySelected = false;
    // Convert to true AFTER we click the element
    if (id == note.id) {
      note.currentlySelected = true;
    }

    fs.writeFileSync(
      path.join(__dirname, '../data/db.json'),
      JSON.stringify(notesArray, null, 2)
    );
  });
}
function resetAllBooleans(notesArray) {
  notesArray.forEach((note) => {
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
};
