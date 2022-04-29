// This script handles the following:
// Form submission and validation
// Fetches for the data from the database and generates the elements accordingly
// Script is used in the public/notes-editor.html file

window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload(); //reload page if it has been loaded from cache
  }
};

// ------- ------- ------- ------- ------- ------- ------- ------- DECLARING OBJECTS FOR EVENT LISTENERS
const saveBtn = document.querySelector('.save');
const formInput = document.querySelectorAll('.note-input');
const bodyInput = document.getElementById('note-body');
const titleInput = document.getElementById('note-title');

const fade = document.querySelector('.placeholder');
var localFirstLaunch = localStorage.getItem('firstLaunch');
parsedScore = JSON.parse(localFirstLaunch);
if (!parsedScore) {
  fade.className = ''; // Remove the effect
} else {
  firstLaunch = false;
  localStorage.setItem('firstLaunch', JSON.stringify(firstLaunch));
  fade.className = 'first-launch';
}
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
  // In the HTML, we submit using the "POST" method and an action of ='/api/notes'
  document.querySelector('form').submit();

  // Set first launch to false so we don't re-execute the fade every time we visit /notes/
  firstLaunch = false;
  localStorage.setItem('firstLaunch', JSON.stringify(firstLaunch));
});

// Execute delete request and remove the appropriate element
function deleteNote(id) {
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json; charset=utf-8',
    },
  });
  // After data has been deleted from the JSON database, remove the element from the DOM
  var allNotes = document.querySelectorAll('.singleNote-container');
  allNotes.forEach((noteEl) => {
    // Extract all the IDs of the active elements
    var noteElId = noteEl.childNodes[0].classList[3].split('-')[1];
    // The id in this case would be the element associated with the trash icon we click on
    if (id == noteElId) {
      noteEl.remove();
    }
  });
}
// Extract the data from the API and populate our local array with it
var getNotes = async () => {
  var url = '/api/notes';
  // var publicUrl = 'https://full-stack-note-taker.herokuapp.com/api/notes';

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json; charset=utf-8',
      },
    });
    if (res.status > 400) {
      alert('No data returned!');
    } else {
      var notes = await res.json();
      // For each note, generate the elements
      notes.forEach((note) => {
        generateNoteEl(note);
      });
      // Add the event listeners for the trash buttons
      var deleteBtns = document.querySelectorAll('.trash');
      deleteBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
          // Extract the ID from the trash class which is associated with the note id
          var noteId = e.target.classList[3].split('-')[1];
          // Execute deleteNote() with the given id (uses delete method)
          deleteNote(noteId);
          updateEl();
        });
      });
      return notes;
    }

    // If the above fetch fails...
  } catch (error) {
    // Re-execute the fetch
    getNotes();
  }
};

// Upon deleting a note, update all other elements to ensure consistency in label values
// i.e. Update all links and labels (ids) starting value 0 and incrementing by 1
function updateEl() {
  var noteList = document.querySelectorAll('.note');
  var trashList = document.querySelectorAll('.trash');
  noteList.forEach((note, index) => {
    note.href = `/notes/${index}`;
    note.className = `note note-${index}`;
  });
  trashList.forEach((note, index) => {
    note.className = `fa-solid fa-trash-can trash trash-${index}`;
  });
}

// Generate the single note HTML elements using the notes data
var noteContainer = document.getElementById('note-list');
function generateNoteEl(notes) {
  var singleNote = document.createElement('div');
  singleNote.classList.add('singleNote-container');
  singleNote.innerHTML = `<i class="fa-solid fa-trash-can trash trash-${notes.id}" aria-hidden="true"></i>`;
  var noteEl = document.createElement('a');
  noteEl.href = `/notes/${notes.id}`;
  noteEl.classList.add(`note`, `note-${notes.id}`);
  noteEl.innerHTML = `<p>${notes.Title}</p>`;

  singleNote.appendChild(noteEl);
  noteContainer.appendChild(singleNote);
}

getNotes();
