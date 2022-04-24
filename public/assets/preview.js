// This script is for extracting active database and populating HTML with said data
// Used in the public/notes-preview.html file

var noteContainer = document.getElementById('note-preview-list');

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
  console.log(notes);
};

getNotes();

// function generateNoteEl(notes) {}

// var btn = document.createElement('button');
// btn.classList.add('search-btn');
// btn.textContent = item.searchTerm;
// btn.type = 'button';
// historyContainer.appendChild(btn);
