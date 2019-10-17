var topic = [ "Superstore", "Friends", "The Office", "Adventure Time", "Spongebob Squarepants", "Jimmy Neutron", "Family Guy"];

function tvshowButtons() {

$("#tvshow-buttons").empty();

for (var i = 0; i < topic.length; i++) {

      var tvshowbutton = $("<button>");
      tvshowbutton.addClass("tvshow");
      tvshowbutton.attr("data-name", topic[i]);
      tvshowbutton.text(topic[i]);
      $("#tvshow-buttons").append(tvshowbutton);
    }
}

    $("#find-tvshow").on("click", function(event) {
      event.preventDefault();

      var tvshow = $("#show-input").val().trim();      
      topic.push(tvshow);
      var button = $("<button>").text(tvshow);
      button.attr("data-name", tvshow);
      button.addClass("tvshow-button");

      tvshowButtons();

    });

    

  tvshowButtons();

  $(document).on("click", ".tvshow", displayShowGif);

  

  function displayShowGif () {
    var tvshow = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvshow + "&api_key=SoP1reCn3w8jX9cpGCQLyD0G9zKcIXaY&limit=10";

    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
      console.log(response);
      $("#tvshow-view").empty();

      var gifs = response.data;

      for (var i = 0; i < gifs.length; i++) {
        var tvshowDiv = $("<div>");
        var rating = gifs[i].rating;
        var displayRating = $("<p>").html("Rating: " + rating);
        var showGIF = $("<img class='gif'>");
          showGIF.attr('src', gifs[i].images.fixed_height_still.url);
          showGIF.attr("data-state", "still");
          showGIF.attr("data-still", gifs[i].images.fixed_height_still.url);
          showGIF.attr("data-animate", gifs[i].images.fixed_height.url);

        tvshowDiv.append(displayRating).append(showGIF);

        $('#tvshow-view').prepend(tvshowDiv);
      }

      
  });
}




$(document).on("click", ".gif", function() {
  
  var state = $(this).attr("data-state");
    if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
