// Declare the Elements for the event listeners
const saveBtn = document.querySelector('.save');
const formInput = document.querySelectorAll('.note-input');

const bodyInput = document.getElementById('note-body');
const titleInput = document.getElementById('note-title');

// Declare the form array

const formData = [];

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
  // This returns the values from the current input
  formData.push({ title: titleInput.value, body: bodyInput.value });

  document.querySelector('form').submit();
});

// FIND A WAY TO ACCESS FORM DATA IN THE SERVER SO WE CAN POST THE DATA TO THE API
