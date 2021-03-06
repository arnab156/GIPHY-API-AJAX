var topics = ["roger federer","rafael nadal", "serena williams", "venus williams", 'martina navratilova', "pete sampras", "sania mirza", "martina hingis","dominic thiem","andy murray"];
console.log(topics);
function renderButtons() {
    $("#btnPanel").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#btnPanel").append(a);
    }
}

renderButtons();

$(".btn" ).on( "click", createGif);

function createGif() {
    // Grabbing and storing the data-name property value from the button
    event.preventDefault();
    var player = $(this).attr("data-name");
    // change the player to array index.

    console.log(player);
    // Constructing a queryURL using the player name Api Key:w9g39G9G9nZVdYiPeJpcpyZQDbhxdUQG &limit=10 to limit to 10 results
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +player + "&api_key=w9g39G9G9nZVdYiPeJpcpyZQDbhxdUQG&limit=10";
    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL, 
        method: "GET"
    })
        // After data comes back from the request
        .then(function(response) {
            console.log(queryURL);
            console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var playerDiv = $("<div class = 'col-sm-4' style ='background-color: none;' >");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            var title = $("<p>").text("Title: " + results[i].title);
            // Creating and storing an image tag
            var playerImage = $("<img style='height:200px; width:200px;'>");
            var dataStill =results[i].images.fixed_height_still.url;
            var dataAnimate = results[i].images.fixed_height.url;
            // Setting the src attribute of the image to a property pulled off the result item
            playerImage.attr("src", dataStill);
            playerImage.attr("class", "displayGif img-fluid text-bold");
            playerImage.attr("alt", "Gif Not Downloading");
            playerImage.attr ("data-state", "still");
            playerImage.attr ("data-still", dataStill);
            playerImage.attr ("data-animate", dataAnimate);
            // Appending the paragraph and image tag to the playerDiv
           
            // playerDiv.append("<a  href='"+dataStill+ "'download>");
            playerDiv.prepend(playerImage);
            var gifBtn = $("<a href='"+dataStill+ "' class='btn btn-secondary btn-sm btn-block active' role='button' download ='"+dataStill+ "' > Download </a>");
            // var gifBtn = $("<button class = 'btn btn-secondary btn-sm btn-block active' download>")
            playerDiv.append(gifBtn);
            $("#gifPanel").prepend(playerDiv);
            playerDiv.append(title);
            playerDiv.append(p);
        }
        $(".displayGif" ).on( "click", changeState);
        });
}

function changeState() {
// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
var state = $(this).attr("data-state");
console.log (state);
// If the clicked image's state is still, update its src attribute to what its data-animate value is.
// Then, set the image's data-state to animate
// Else set src to the data-still value
if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
} else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
}
}

$("#add-player").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    // This line will grab the text from the input box
    var player = $("#tennis-input").val().trim();
    console.log (player);
    // The movie from the textbox is then added to our array
    topics.push(player);
    console.log(topics);
    // calling renderButtons which handles the processing of our player array
    renderButtons();
    $(".btn" ).on( "click", createGif);
    });
