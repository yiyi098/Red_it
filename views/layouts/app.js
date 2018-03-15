// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").prepend("<div class='card'> <div class = 'card-body' > <p data-id='" + data[i]._id + "'> " + data[i].title + " <br/> " + data[i].link + " </p> </div> </div");
//   }
// });

//////////////////adding new articles/////////////////////////////
$(".scrape-new").on("click", function() {
  $('#articles').empty();
  $.get('/scrape').then(function(response) {
    window.location.reload();
  });
});

$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<div class = 'input-group'> <div class = 'input-group-prepend'> <span class = 'input-group-text'> Title </span></div> <textarea id='titleinput' name='title' class = 'form-control' aria-label = 'Title' > </textarea></div>");
      // A textarea to add a new note body
      $("#notes").append("<div class = 'input-group'> <div class = 'input-group-prepend'> <span class = 'input-group-text'> Comments </span></div> <textarea id='bodyinput' name='body' class = 'form-control' aria-label = 'Comments' > </textarea></div>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});