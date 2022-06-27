/* global $ XMLHttpRequest */
let words = null;

function parseWords (re) {
  words.filter(function (x) {
    return re.test(x);
  }).map(function (word) {
    return $('<li>' + word + '</li>').appendTo($('#output'));
  });
}

$(function () {
  $('form').on('submit', function (ev) {
    ev.preventDefault();
    $('#output').html('');
    const yellowLetter = $('#yellow')[0].value.toLowerCase();
    const greyLetters = $('#grey')[0].value.toLowerCase();
    const letters = '[' + yellowLetter + greyLetters + ']';
    const re = new RegExp('^' + letters + '*' + yellowLetter + letters + '*$');
    if (words === null) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'words.json');
      xhr.send();
      xhr.onload = function () {
        words = JSON.parse(xhr.response);
        parseWords(re);
      };
    } else {
      parseWords(re);
    }
    return false;
  });
});
