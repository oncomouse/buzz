/* global $ XMLHttpRequest */
let words = null;

function parseWords (regexp, yr) {
  words.filter(function (x) {
    return regexp.test(x) && yr.test(x);
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
    const regexp = new RegExp('^[' + yellowLetter + greyLetters + ']+$');
    const yr = new RegExp('^.*' + yellowLetter + '.*$');
    console.log('^[' + yellowLetter + greyLetters + ']+$', '^.*' + yellowLetter + '.*$');
    if (words === null) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'words.json');
      xhr.send();
      xhr.onload = function () {
        words = JSON.parse(xhr.response);
        parseWords(regexp, yr);
      };
    } else {
      parseWords(regexp, yr);
    }
    return false;
  });
});
