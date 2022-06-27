/* global $ XMLHttpRequest */
let words = null;

function parseWords (re, yr) {
  words.filter(function (x) {
    return re.test(x) && yr.test(x);
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
    const re = new RegExp('^[' + yellowLetter + greyLetters + ']+$');
    const yr = new RegExp('^.*' + yellowLetter + '.*$');
    console.log('^[' + yellowLetter + greyLetters + ']+$', '^.*' + yellowLetter + '.*$');
    if (words === null) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'words.json');
      xhr.send();
      xhr.onload = function () {
        words = JSON.parse(xhr.response);
        parseWords(re, yr);
      };
    } else {
      parseWords(re, yr);
    }
    return false;
  });
});
