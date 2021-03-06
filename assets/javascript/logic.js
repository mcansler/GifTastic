$(function(){
    populateButtons(searchArray,"searchButton","#buttonsArea");
})


var searchArray = ["Dog","Cat","Bird"];

function populateButtons(searchArray,classToAdd,areaToAddTo){
    $(areaToAddTo).empty();
    for(var i=0; i<searchArray.length; i++){
        var a = $("<buttons>");
        a.addClass(classToAdd);
        a.attr("data-type",searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
        
    }
}

$(document).on("click",".searchButton",function(){
    $("#searches").empty();
    var type = $(this).data("type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+type+"&api_key=sA3a1o9loPwQXGgpmCQmOoDo3wEg6Pot&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .done(function(response){
            for(var i=0; i<response.data.length; i++){
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text("Rating: "+rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $("<img>");
                image.attr("src",still);
                image.attr("data-still",still);
                image.attr("data-animated",animated);
                image.attr("data-state","still");
                image.addClass("searchImage");
                searchDiv.append(p);
                searchDiv.append(image);
                $("#searches").append(searchDiv);

            }
        }) 

})

$(document).on("click",".searchImage",function(){
    var state = $(this).attr("data-state");
    if(state === "still"){
        $(this).attr("src",$(this).data("animated"));
        $(this).attr("data-state","animated");
    } else {
        $(this).attr("src",$(this).data("still"));
        $(this).attr("data-state","still");  
    }
})

//var search = $("input").addClass('capitalize');
//var newSearch = search.eq(0).val();

$(document).on("click",".submitButton",function(){
    var newSearch = $("#search-input").val().trim();
    //var newSearch = String(search);
    //console.log(search);

    // for(var i = 0; i < searchArray.length; i++){

    if(newSearch === ""){
        populateButtons(searchArray,"searchButton","#buttonsArea");
        $("#search-input").val("");
        return false;

    }
    
    
    else if(searchArray.indexOf(newSearch) === -1) {
            searchArray.push(newSearch);
            populateButtons(searchArray,"searchButton","#buttonsArea");
            $("#search-input").val("");
            return false;
        
    }
    
    else {
            populateButtons(searchArray,"searchButton","#buttonsArea");
            $("#search-input").val("");
            return false;
            
        }
    //     var input = searchArray[i];
    //     var checkInput = String(input);
    //     if(newSearch === checkInput){

    //         console.log(searchArray[i]);
    //         return true;
    //     }
    //      else {

            //newSearch.addClass('capitalize');
            
         //}
    //}
    
})