
 $(document).ready(function() {
 var address = "";
 var searchLat = "";
 var searchLon = "";


  $("#searchButton").on("click",function(){
    event.preventDefault();
    console.log("clicked");
    
       address = $("#inlineFormInput").val().trim();
  
findCoordinates();
      $("#inlineFormInput").val("");
});


  function findCoordinates(){
  
     var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address +"&key=AIzaSyCWa5eHnMAMi6rkFWh1pg_Ssxz8lTN6lQk";
 
    $.ajax({
        url: queryURL,
        method: "GET",
        async: true
    }).done(function(response)
    {
      
      searchLat = response.results[0].geometry.location.lat;
      searchLon = response.results[0].geometry.location.lng;

      var formatLocation = {
        lat:searchLat ,
        lon: searchLon 
      };
      console.log("lat: "+ searchLat + ", lon: " + searchLon);
      hikingSearch(searchLat,searchLon);
     
     });
    } //function findCoordinates ends

    function hikingSearch(hikingLat,hikingLon){
      
      // Then run a request to the OMDB API with the movie specified
      var hikeSearch = {
          hikingApiKey : "200242829-ff1de9f4eecd59e41080ee24ed53c7ed",
          lat: hikingLat,
          lon:hikingLon,
      };
      
      
      
      var queryUrl = "https://www.hikingproject.com/data/get-trails?lat="+hikeSearch.lat+"&lon="+hikeSearch.lon+"&maxDistance=30&key=" + hikeSearch.hikingApiKey;
      console.log(" hikingSearch:  lat: "+ hikeSearch.lat + ", lng: " + hikeSearch.lon);
      
      $.ajax({
        url: queryUrl,
        method: "GET",
        async: true
    }).done(function(response)
    {
      
      var pullID = 0;
      if(response.trails.length == 0)
      console.log("No trails found");

      for(var i = 0; i < response.trails.length; i++){
      console.log(response.trails[i]);
     

      var newDiv = $("<div>");
      var newIMG = $("<img>");
      var trailIMG = response.trails[i].imgSmall.replace(/\\\//g, "/");
      if (trailIMG == '')
      trailIMG = "http://via.placeholder.com/240x180"
      newIMG.attr("src", trailIMG);
      
      newIMG.attr('data-pullID', pullID++);
      
      var hikeStars= response.trails[i].stars;
      
      var newP = $("<p>");
      newP.text( "Stars: " + hikeStars);
      newP.append("<br>Location: " + response.trails[i].location);
      
      // need to append to the div in html
      newDiv.append(newP);
      newDiv.append(newIMG);
      newDiv.addClass("trails");
      
      $("#hikingDiv").prepend(newDiv);
      
      }
     
     });
      }
});//jQuery ends