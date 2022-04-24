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

// Take the original DB array and the new data
function addNote(notesArray, newData) {
  // Push the new data to the DB array
  notesArray.push(newData);
  // WriteFile - in other words - push the new changes
  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
  // Return the current Array
  return console.log(notesArray);
}

module.exports = {
  returnData,
  addNote,
};
