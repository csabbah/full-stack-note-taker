// Declare the Elements for the event listeners
const saveBtn = document.querySelector('.save');
const formInput = document.querySelectorAll('.note-input');

const bodyInput = document.getElementById('note-body');
const titleInput = document.getElementById('note-title');

// Declare the form array
var formData = {};

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
  formData = notes; // Populate our local array with the current API data
};
getNotes();

// Execute the fetch function for post method (REFER TO THE UOFT PROJECT EXAMPLE)
var postNotes = async (formData) => {
  // fetch('/api/notes');
};

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
  // This pushes the values from the current input to the local object we created in this session
  // The local object will contain the current API data
  formData.push({
    note4: { title: titleInput.value, body: bodyInput.value },
  });
  // console.log(formData);
  document.querySelector('form').submit();
});
