// This script is for extracting active database and populating HTML with said data
// Used in the public/notes-preview.html file

// Extract the data from the API and populate our local array with it
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

  notes.forEach((note) => {
    generateNoteEl(note);
  });
};

getNotes();

// The bottom function will execute in the getNotes() function and it will generate the HTML elements using the notes data
var noteContainer = document.getElementById('note-preview-list');
function generateNoteEl(notes) {
  var noteEl = document.createElement('a');
  // For the link in the anchor tag, return the ID as the query parameter
  noteEl.href = `/notes/preview?id=${notes.id}`;
  noteEl.classList.add(`note`, `note-${notes.id}`);
  noteEl.innerHTML = `
  <p>${notes.Title}</p>
  <img
  class="trash trash-1"
  src="./assets/images/trash.png"
  alt=""
  />
  `;
  noteContainer.appendChild(noteEl);
}
