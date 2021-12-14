$(document).ready(function() {
  $('textarea#tweet-text').on('input', function() {
    let textInput = this.value;
    let remainingChars = 140;
    let textCounter = $('output.counter');
    let counter = remainingChars - textInput.length;
    if (textInput.length >= 1) {
      textCounter.text(counter);
    }
    if (counter < 0) {
      $('output.counter').css('color', 'red');
    }
    if (counter >= 0) {
      $('output.counter').css('color', 'black');
    }
  });
});