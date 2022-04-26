// This script handles the following:
// Form submission and validation
// Fetches for the data from the database and generates the elements accordingly
// Script is used in the public/notes-editor.html file

// ------- ------- ------- ------- ------- ------- ------- ------- DECLARING OBJECTS FOR EVENT LISTENERS
const saveBtn = document.querySelector('.save');
const formInput = document.querySelectorAll('.note-input');

const bodyInput = document.getElementById('note-body');
const titleInput = document.getElementById('note-title');

// This will listen for keyup event listeners on the inputs
// If both inputs have data, THEN reveal the save button
var validData = [false, false];
formInput.forEach((item) => {
  item.addEventListener('keyup', (e) => {
    // Check each input individually and inverse the appropriate boolean in the array
    if (e.target.dataset.input == 'title') {
      if (e.target.value.length >= 1) {
        validData[0] = true;
      } else {
        validData[0] = false;
      }
    }

    if (e.target.dataset.input == 'body') {
      if (e.target.value.length >= 1) {
        validData[1] = true;
      } else {
        validData[1] = false;
      }
    }

    // If both the title and body have valid value length and reveal the save button
    if (validData[0] && validData[1]) {
      saveBtn.classList.remove('inactive');
    } else {
      saveBtn.classList.add('inactive');
    }
  });
});

// When the user clicks on the save button, extract the current values and submit the form
saveBtn.addEventListener('click', () => {
  document.querySelector('form').submit();
});

// Extract the data from the API and populate our local array with it
var getNotes = async () => {
  // IMPORTANT - BECAUSE WE'RE  IN LOCAL, IT'S TAKING THIS PATH 'localhost:3000' by default so we just include the endpoint
  var url = '/api/notes';
  // WHEREAS, WHEN WE LAUNCH OUR APP, REFER TO THE PUBLIC URL
  // var publicUrl = 'https://full-stack-note-taker.herokuapp.com/api/notes';

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json; charset=utf-8',
    },
  });
  var notes = await res.json();
  notes.forEach((note) => {
    generateNoteEl(note);
  });
};

// The bottom function will execute in the getNotes() function and it will generate the HTML elements using the notes data
var noteContainer = document.getElementById('note-list');
function generateNoteEl(notes) {
  var noteEl = document.createElement('a');
  // For the link in the anchor tag, return the ID as the query parameter
  // noteEl.href = `/notes/preview?id=${notes.id}`;
  noteEl.href = `/notes/${notes.id}`;
  noteEl.classList.add(`note`, `note-${notes.id}`);
  noteEl.innerHTML = `
  <p>${notes.Title}</p>
  <img
  class="trash trash-1"
  src="./assets/images/trash.png"
  alt="Trash Icon"
  />
  `;

  noteContainer.appendChild(noteEl);
}

getNotes();
