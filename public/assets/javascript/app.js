
 $(document).ready(function() {
  var address = "";
  var searchLat = "";
  var searchLon = "";
  var currentSearchesArray = [];
 
   $("#searchButton").on("click",function(){
     event.preventDefault();
     currentSearchesArray = [];
     $("#hikingDiv").empty();
   
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

   setTimeout(function(){ location.href= '#hikingDiv'; }, 500);
   
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
      // console.log(response.trails[i]);
 
       // pushes respones to array so that more info can be displayed to user in modal
       currentSearchesArray.push(response.trails[i]);
       
         var difficulty = response.trails[i].difficulty;
         var trailName = response.trails[i].name;
 
       //   <div class="card border-primary mb-3" style="max-width: 20rem;">
       //     <div class="card-header">Header</div>
       //     <div class="card-body">
       //       <h4 class="card-title">Primary card title</h4>
       //       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
       //     </div>
       //  </div>
 
         var newDiv = $("<div data-toggle='modal' data-target='#moreInfo-Modal'>");
         var newIMG = $("<img>");
         var trailIMG = response.trails[i].imgSmall.replace(/\\\//g, "/");
         if (trailIMG == '')
         trailIMG = "http://via.placeholder.com/240x180"
         newIMG.attr("src", trailIMG);
         
         newDiv.attr('data-pullID', pullID++);
         
         var newP = $("<p>");
         var newH = $("<h5>");
         newH.append( response.trails[i].name);
         newP.append(response.trails[i].location);
         
         // need to append to the div in html
         newDiv.append(newH);
         newDiv.append(newP);
         newDiv.append(newIMG);
         newDiv.addClass("trails");
         
         $("#hikingDiv").append(newDiv);
       
       }
      console.log(currentSearchesArray);
      });
       }
 
       $(document).on("click",".trails",function(){
         var thisIndex = $(this).attr("data-pullid");
         var thisTrail = currentSearchesArray[thisIndex];
         var trailIMG = thisTrail.imgSmallMed.replace(/\\\//g, "/");
       $(".modal-title").text(thisTrail.name);
       $(".modal-body img").attr("src", trailIMG);
       $(".modal-body p").text(thisTrail.location);
       })
 
       
 
 });//jQuery ends