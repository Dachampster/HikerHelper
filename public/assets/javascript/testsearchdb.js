$(document).ready(function(){

  function addSearch(data){
    $.ajax({
      method: "POST",
      url: "/api/search",
      data: data
    }).done(function(result){
      console.log("added search result: " + result);
    }).fail(function(xhr, responseText, responseStatus){
      if (xhr){
        console.log(xhr.responseText);
      };
    });
  };

  $("#add-search").on("submit", function(event){
    event.preventDefault();
    console.log("clicked");
    var userId = parseFloat($("#user-id").val());
    var searchLat = parseFloat($("#search-lat").val());
    var searchLng = parseFloat($("#search-lng").val());
    var searchMaxDist = parseFloat($("#search-max-dist").val());
    var searchMinLng = parseFloat($("#search-min-lng").val());
    var newSearch = {
      UserId: userId,
      latitude: searchLat,
      longitude: searchLng,
      maxDistance: searchMaxDist,
      minLength: searchMinLng
    };
    console.log(newSearch)
    addSearch(newSearch);
  });
  
});