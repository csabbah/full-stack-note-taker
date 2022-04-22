const noteTitle = document.getElementById('note-title');
const noteBody = document.getElementById('note-body');

const formEl = document.getElementById('note-form');

formEl.addEventListener('keyup', function (event) {
  if (event.code === 'Enter') {
    document.querySelector('form').submit();
  }
});
