
 $(document).ready(function() {
  var address = "";
  var searchLat = "";
  var searchLon = "";
  var searchLength;
  var searchDiff;
  var searchRadius;
  var currentSearchesArray = [];
 
   $("#searchButton").on("click",function(){
     event.preventDefault();
     currentSearchesArray = [];
     $("#hikingDiv").empty();
   

     
   //   //  eventName= $("#eventName-input").val().trim();
        address = $("#inlineFormInput").val().trim();
   //   //  city = $("#city-input").val().trim();
   //   //  state = $("#state-input").val().trim();
        searchLength = parseFloat($("#search-min-lng").val().trim());
        searchDiff = $("#search-diff").val();
        searchRadius = parseFloat($("#search-max-dist").val().trim());
        if (isNaN(searchLength)){
          searchLength = 0;
        };
        if (isNaN(searchRadius)){
          searchRadius = 30;
        };
 
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

       $("#hikingDiv").attr("data-length", searchLength)
                      .attr("data-difficulty", searchDiff)
                      .attr("data-radius", searchRadius)
                      .attr("data-lat", searchLat)
                      .attr("data-lng", searchLon);

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
          
          
          
          var queryUrl = "https://www.hikingproject.com/data/get-trails?lat="+hikeSearch.lat+"&lon="+hikeSearch.lon+"&maxDistance="+searchRadius+"&minLength="+searchLength+"&key=" + hikeSearch.hikingApiKey;
          
          $.ajax({
            url: queryUrl,
            method: "GET",
            async: true
        }).done(function(response)
        {
          
          
          var pullID = 0;
          if(response.trails.length == 0){
            console.log("No trails found");
          };
          
          var trailInfo = {};
          for(var i = 0; i < response.trails.length; i++){
          // console.log(response.trails[i]);
            trailInfo = response.trails[i];
          // pushes respones to array so that more info can be displayed to user in modal
          currentSearchesArray.push(trailInfo);
          
            var difficulty = trailInfo.difficulty;
            var trailName = trailInfo.name;
    
          //   <div class="card border-primary mb-3" style="max-width: 20rem;">
          //     <div class="card-header">Header</div>
          //     <div class="card-body">
          //       <h4 class="card-title">Primary card title</h4>
          //       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          //     </div>
          //  </div>
    
            var newDiv = $("<div data-toggle='modal' data-target='#moreInfo-Modal'>");
            newDiv.attr("data-actNum", trailInfo.id)
                  .attr("data-actName", trailInfo.name)
                  .attr("data-actDiff", trailInfo.difficulty)
                  .attr("data-actLength", trailInfo.length)
                  .attr("data-actRating", trailInfo.stars);
            var newIMG = $("<img>");
            var trailIMG = trailInfo.imgSmall.replace(/\\\//g, "/");
            if (trailIMG == '')
            trailIMG = "http://via.placeholder.com/240x180"
            newIMG.attr("src", trailIMG);
            
            newDiv.attr('data-pullID', pullID++);
            
            var newP = $("<p>");
            var newH = $("<h5>");
            newH.append( trailInfo.name);
            newP.append(trailInfo.location);
            
            // need to append to the div in html
            newDiv.append(newH);
            newDiv.append(newP);
            newDiv.append(newIMG);
            newDiv.addClass("trails");
            
            $("#hikingDiv").append(newDiv);
          
          }
          console.log(currentSearchesArray);
          });
       }//hikingSearch ends

       function airportSearch(lat, lng){
        googlePlacesSearch = {
          apiKey: AIzaSyBk__NWtv6Kq1R5pKfscnW0t326OtvcBYc,
          lng:"",
          lon:""
        }
        
  
        var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+googlePlacesSearch.lng + ","+ googlePlacesSearch.lon + "&radius=5000&types=airport&key=AIzaSyBk__NWtv6Kq1R5pKfscnW0t326OtvcBYc";
    
       $.ajax({
           url: queryURL,
           method: "GET",
           async: true
       }).done(function(response)
       {
         
        //  searchLat = response.results[0].geometry.location.lat;
        //  searchLon = response.results[0].geometry.location.lng;
   
        //  var formatLocation = {
        //    lat:searchLat ,
        //    lon: searchLon 
        //  };
         console.log(response.results[1].name);
        
        
        });
       }//airport search ends
 
       $(document).on("click",".trails",function(){
          var thisIndex = $(this).attr("data-pullid");
          var thisTrail = currentSearchesArray[thisIndex];
          var trailIMG = thisTrail.imgSmallMed.replace(/\\\//g, "/");
          $("#content-title").text(thisTrail.name);
          $(".modal-body img").attr("src", trailIMG)
                              .attr("data-actNum", $(this).attr("data-actNum"))
                              .attr("data-actName", $(this).attr("data-actName"))
                              .attr("data-actDiff", $(this).attr("data-actDiff"))
                              .attr("data-actLength", $(this).attr("data-actLength"))
                              .attr("data-actRating", $(this).attr("data-actRating"))
          $(".modal-body p").text(thisTrail.location);
          $(".modal-body p").append("<p>Current Condition Details: " + thisTrail.conditionDetails + "</p>");
       })
 
       $(document).on("click","#bookTrip",function(){
        // var thisIndex = $(this).attr("data-pullid");
        // var thisTrail = currentSearchesArray[thisIndex];
        // airportSearch();
      
        if ("geolocation" in navigator){ //check geolocation available 
            //try to get user current location using getCurrentPosition() method
            navigator.geolocation.getCurrentPosition(function(position){ 
                    console.log("Found your location XX Lat : "+position.coords.latitude+" Lang :"+ position.coords.longitude);
                });
        }else{
            console.log("Browser doesn't support geolocation!");
        }
    
    });
       
 
 });//jQuery ends