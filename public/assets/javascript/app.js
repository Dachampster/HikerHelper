
 $(document).ready(function() {
 var address = "";
 var searchLat = "";
 var searchLon = "";


  $("#searchButton").on("click",function(){
    event.preventDefault();
    console.log("clicked");
    
  //   //  eventName= $("#eventName-input").val().trim();
       address = $("#inlineFormInput").val().trim();
  //   //  city = $("#city-input").val().trim();
  //   //  state = $("#state-input").val().trim();

  // searchAndAdd();
findCoordinates();
  //   // $("#eventName-input").val("");
      $("#inlineFormInput").val("");
  //   // $("#city-input").val("");
  //   // $("#state-input").val("");
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
      for(var i = 0; i < response.trails.length; i++){
      console.log(response.trails[i]);
    }
     
     });
      }
});//jQuery ends