// // 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
// // * We chose animals for our theme, but you can make a list to your own liking.
var topicsArray = ["hummingbird", "goat", "rabbit"];


// // 2. Your app should take the topics in this array and create buttons in your HTML.

function createButtons() {
    $(".buttons").empty();
    for (i = 0; i < topicsArray.length; i++) {
        var topicsBtn = $("<button>");
        topicsBtn.addClass("topicsButton");
        
        topicsBtn.text(topicsArray[i]);
        $(".buttons").append(topicsBtn);
    }
}

createButtons();

$(document).on("click", ".topicsButton", function () {
    // // * Try using a loop that appends a button for each string in the array.
    var inputGif = $(this).text();
    // // 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
    var apiKey = "&api_key=0f5kuZG5eoid7B1aXqNUPOs4epVY7q0E&limit=10&offset=0&rating=G&lang=en";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + inputGif + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            
            var data = response.data;
            $("#gifs-div").empty();
            for (i = 0; i < data.length; i++) {
                var gifImage = $("<img>").attr("src", data[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", data[i].images.fixed_height_downsampled.url);
                gifImage.attr("data-still", data[i].images.fixed_height_still.url);
                gifImage.attr("data-state", "still");
                var gifRating = $("<p>").text(data[i].rating);
                console.log(data[i].images.fixed_height_still.url);
                $("#gifs-div").append(gifImage);
                gifImage.append(gifRating);
            }
        });

});



// // 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
$("#gifs-div").on("click", "img", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    };
});


$("#select-gif").on("click", function (event) {
    event.preventDefault();
console.log("clicked");
    var inputGif = $("#gif-input").val().trim();
    topicsArray.push(inputGif);
    createButtons();
});
// // 5. Under every gif, display its rating (PG, G, so on).

// // * This data is provided by the GIPHY API.
// // * Only once you get images isplaying with button presses should you move on to the next step.


// $("button").on("click", function () {
//     var animal = $(this).attr("data-animate");

//     var apiKey = "&api_key=0f5kuZG5eoid7B1aXqNUPOs4epVY7q0E&limit=10&offset=0&rating=G&lang=en";
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//         animal + apiKey;

//     $.ajax({
//             url: queryURL,
//             method: "GET"
//         })

//         .then(function (response) {
//             console.log(queryURL);

//             console.log(response);
//             // storing the data from the AJAX request in the results variable
//             var results = response.data;

//             // Looping through each result item
//             for (var i = 0; i < results.length; i++) {

//                 // Creating and storing a div tag
//                 var animalDiv = $("<div>");

//                 // Creating a paragraph tag with the result item's rating
//                 var p = $("<p>").text("Rating: " + results[i].rating);

//                 // Creating and storing an image tag
//                 var animalImage = $("<img>");
//                 // Setting the src attribute of the image to a property pulled off the result item
//                 animalImage.attr("src", results[i].images.fixed_height_still.url);

//                 // Appending the paragraph and image tag to the animalDiv
//                 animalDiv.append(animalImage);
//                 animalDiv.append(p);

//                 // Append the animalDiv to the HTML page in the "#gifs-appear-here" div
//                 $("#gifs-appear-here").append(animalDiv);
//             }
//         });
// });

// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

// // 7. Deploy your assignment to Github Pages.

// // 8. **Rejoice**! You just made something really cool.

// // function searchGifTopics(gif) {