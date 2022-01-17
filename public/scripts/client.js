const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//SHORTHAND VERSION OF .AJAX
const loadTweets = function() {
  $.get("/tweets/", function($tweets) {
    $("#tweet-text").val(null);
    $("#tweet-text").attr("placeholder", 'What are you humming about?');
    $("#outputID").text(140);
    renderTweets($tweets);
  });
};

//HELPER FUNCTION THAT CALLS createTweetElement() AND RENDERS IT TO THE WEBPAGE

const renderTweets = function(tweets) {
  $("#tweets-container").empty();
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet);
  }
};

//HELPER FUNCTION THAT MAKES THE TWEETS DYNAMIC BY USING OUR HTML SKELETON AND RETURNING IT AS A VARIABLE
const createTweetElement = function(data) {
  const $tweet = $(`<article class="tweet">
  <header>
    <div class="userGroup">
      <img src=${data.user.avatars}>
      <span class="userName">${data.user.name}</span>
    </div>
    <span>${data.user.handle}</span>
  </header>
  <p>${escapeText(data.content.text)}</p> 
  <footer>
    <time>${timeago.format(data.created_at)}</time>
    <div class="iconGroup">
      <i class="fas fa-flag"></i>
      <i class="fas fa-heart"></i>
      <i class="fas fa-retweet"></i>
    </div>
  </footer>
</article>`);
  return $tweet;
};



$(document).ready(function() {
  $(".error-container").hide();
  $("form").submit(function(event) {
    loadTweets();
    event.preventDefault();
    let serializedData = $(this).serialize();
    if ($("textarea#tweet-text").val().length > 140) {
      $(".error-text").text("Ooops! It looks like you've entered too many characters");
      $(".error-container").slideDown("slow");
      return;
    }
    if ($("textarea#tweet-text").val().length === 0) {
      $(".error-text").text("It looks like your tweet is empty!");
      $(".error-container").slideDown("slow");
      return;
    }
    if ($("textarea#tweet-text").val() === null) {
      $(".error-text").text("It looks like your tweet is empty!");
      $(".error-container").slideDown("slow");
      return;
    }
    $.post("/tweets/", serializedData, function() {
      loadTweets();
    });
  });
});

