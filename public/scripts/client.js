// const data = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac",
//     },
//     content: {
//       text: "If I have seen further it is by standing on the shoulders of giants",
//     },
//     created_at: 1461116232227,
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd",
//     },
//     content: {
//       text: "Je pense , donc je suis",
//     },
//     created_at: 1461113959088,
//   },
// ];

//SHORTHAND VERSION OF .AJAX
const loadTweets = function() {
  $.get("/tweets/", function($tweet) {
    renderTweets($tweet);
  });
};


//REGULAR .AJAX WAY
// $.ajax({
//   url: "/tweets/",
//   method: "GET",
// }).done(function () {
//   renderTweets($tweet);
// });

//HELPER FUNCTION THAT CALLS createTweetElement() AND RENDERS IT TO THE WEBPAGE
const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet);
  }
};

//HELPER FUNCTION THAT MAKES THE TWEETS DYNAMIC BY USING OUR HTML SKELETON AND RETURNING IT AS A VARIABLE
const createTweetElement = function (data) {
  const $tweet = $(`<article class="tweet">
  <header>
    <div class="userGroup">
      <img src=${data.user.avatars}>
      <span class="userName">${data.user.name}</span>
    </div>
    <span>${data.user.handle}</span>
  </header>
  <p>${data.content.text}</p> 
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

$(document).ready(function () {
  loadTweets();
});

$(document).ready(function () {
  $("form").submit(function (event) {
    event.preventDefault();
    let serializedData = $(this).serialize();
    //verify here before posting
    if ($('textarea#tweet-text').val().length > 140) {
      alert("It looks like you've entered too many characters");
    }
    if ($('textarea#tweet-text').val().length === 0) {
      alert("It looks like you're tweet is empty!");
    }
    if ($('textarea#tweet-text').val() === null) {
      alert("It looks like you didn't tweet anything");
    }
    else {
      $.post("/tweets/", serializedData, function () {
        console.log("sucessfully posted:", serializedData);
      });
    }
  });
});
