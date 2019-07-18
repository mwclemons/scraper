// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append('<div class="card bg-success"><div class="card-header"><p data-id='+ data[i]._id +'>'+ data[i].title +'</p></div><div class="card-body">'+ data[i].link +'</div></div><br>')
  }
});


$(document).on("click", "p", function() {
  
  // Empty the notes from the note section
  $("#comments").empty();
  $("#old-comments").empty();
  $("#new-comment").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");



  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      
      
      // The title of the article
      $("#comments").append("<h3>" + data[0].title + " <br>Comments</h3>");
      // A textarea to add a new note body
      $("#new-comment").append("<textarea id='authorinput' name='body'>Your Name</textarea><br>");
      $("#new-comment").append("<textarea id='bodyinput' name='body'>Comment</textarea><br>");

      // A button to submit a new note, with the id of the article saved to it
      $("#new-comment").append("<button type='button' class='btn btn-warning' data-id='" + data[0]._id + "' id='savenote'>Add Comment</button>");

      $.ajax({
        method: "GET",
        url: "/comment/" + thisId
      })
        // With that done, add the note information to the page
        .then(function(data) {
          
          for (x = 0; x < data.length; x++) {
            $("#old-comments").append('<br>' + data[x].author + ' said ' + data[x].body);
          }
      });
    });

  });


// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/comment/" + thisId,
    data: {
      
      author: $("#authorinput").val(),
      comment: $("#bodyinput").val(),
      // articleID: thisId
    
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      // console.log(data);
      // Empty the notes section
      $("#comments").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry

  $("#old-comments").append('<br>' + $("#authorinput") + ' said '+ $("#bodyinput").val());
  $("#bodyinput").val("New Comment");
});

// When you click the savenote button
$(document).on("click", "#scrape-button", function() {

  $.ajax({
    method: "GET",
    url: "/scrape"

  })
    // With that done
  .then(function(data) {
    location.reload();
  })
  .catch(function(err) {
    // If an error occurred, log it
    // console.log(err);
    res.json(err);
  });

});