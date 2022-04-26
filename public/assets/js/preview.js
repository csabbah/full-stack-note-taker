// This script handles the following:
// Extract the data base and populates the HTML with data
// Will handle the main function of being able to view the data based on the note you click
// Additionally behind the screen, it will track what we click and what we note we post so we can auto select this note from here
// Script is used in the public/notes-preview.html file

// Extract the data from the API database
var getNotes = async () => {
  // IMPORTANT - BECAUSE WE'RE  IN LOCAL, IT'S TAKING THIS PATH 'localhost:3000' by default so we include the endpoint
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

  // For each note, generate the elements
  notes.forEach((note) => {
    generateNoteEl(note);
    // When we visit this preview page, if the note was previously added, auto select it
    if (note.currentlyPosted) {
      selectNewestNote(note);
    }
    if (note.currentlySelected) {
      selectNote(note);
    }
    handleNoteEvent(notes);
  });
};

// The bottom function will execute in the getNotes() function and it will generate the HTML elements using the notes data
var noteContainer = document.getElementById('note-preview-list');
function generateNoteEl(notes) {
  var noteEl = document.createElement('a');
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

var addBtn = document.querySelector('.add');
addBtn.addEventListener('click', () => {
  window.location.href = '/notes';
});

// The below function will update the preview title and body in the preview page HTML
// It will look through the Database and compare with the existing elements in the webpage
var previewTitleEl = document.getElementById('note-preview-title');
var previewBodyEl = document.getElementById('note-preview-body');

var handleNoteEvent = (dbArr) => {
  var previewNotes = document.querySelectorAll('.note');
  previewNotes.forEach((previewNote) => {
    previewNote.addEventListener('click', () => {
      dbArr.forEach((dbNote) => {
        // If the database id matches with the note id of the existing element...
        if (dbNote.id == previewNote.classList[1].split('-')[1]) {
          // Update the actual title and body in the HTML page to display the clicked note
          previewBodyEl.textContent = dbNote.Body;
          previewTitleEl.textContent = dbNote.Title;
          // Check through all elements to see if any has an active class at the same time the user
          // clicks on a note. If there is an existing active class, remove it so we can add
          // a new one when clicking on the next note
          resetActive(previewNotes);
          // Add class of active to the clicked note
          previewNote.classList.add('active');
        }
      });
    });
  });
};

var resetActive = (htmlNodeList) => {
  htmlNodeList.forEach((checkClass) => {
    if (checkClass.classList.contains('active')) {
      checkClass.classList.remove('active');
    }
  });
};
// This auto selects the newest note that was created
var selectNewestNote = (note) => {
  var previewNotes = document.querySelectorAll('.note');
  resetActive(previewNotes);
  previewBodyEl.textContent = note.Body;
  previewTitleEl.textContent = note.Title;
  previewNotes[previewNotes.length - 1].classList.add('active');
};

// This auto selects the selected note
var selectNote = (note) => {
  var previewNotes = document.querySelectorAll('.note');
  previewBodyEl.textContent = note.Body;
  previewTitleEl.textContent = note.Title;
  previewNotes[note.id - 1].classList.add('active');
};

getNotes();
