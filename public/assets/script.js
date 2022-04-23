const formInput = document.querySelectorAll('.note-input');
const formEl = document.getElementById('note-form');

formEl.addEventListener('keyup', function (event) {
  if (event.code === 'Enter') {
    document.querySelector('form').submit();
  }
});

// This will listen for keyup event listeners on the inputs
// If both inputs have data, THEN reveal the save button
var saveBtn = document.querySelector('.save');
var validData = [false, false];
formInput.forEach((item) => {
  item.addEventListener('keyup', (e) => {
    if (e.target.dataset.input == 'title') {
      if (e.target.value.length > 1) {
        validData[0] = true;
      } else {
        validData[0] = false;
      }
    }

    if (e.target.dataset.input == 'body') {
      if (e.target.value.length > 1) {
        validData[1] = true;
      } else {
        validData[1] = false;
      }
    }

    // If both the title and body have valid value length, reveal the save button
    if (validData[0] && validData[1]) {
      saveBtn.classList.remove('inactive');
    } else {
      saveBtn.classList.add('inactive');
    }
  });
});
