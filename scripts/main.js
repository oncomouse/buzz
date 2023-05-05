/* global $ XMLHttpRequest */
$(function () {
  let words = null

  function parseWords (re) {
    words.forEach(function (word) {
      if (re.test(word)) {
        $('<li>' + word + ' (' + word.length + ')</li>').appendTo($('#output'))
      }
    })
  }

  $('form').on('submit', function (ev) {
    ev.preventDefault()
    $('#output').html('')
    const yellowLetter = $('#yellow')[0].value.toLowerCase()
    const greyLetters = $('#grey')[0].value.toLowerCase()
    const letters = '[' + yellowLetter + greyLetters + ']'
    const re = new RegExp('^' + letters + '*' + yellowLetter + letters + '*$')
    if (words === null) {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', 'words.json')
      xhr.send()
      xhr.onload = function () {
        words = JSON.parse(xhr.response)
        parseWords(re)
      }
    } else {
      parseWords(re)
    }
    return false
  })
})
