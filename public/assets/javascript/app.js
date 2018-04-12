
$(document).ready(function() {
  var address = "";
  var searchLat = "";
  var searchLon = "";
  var searchLength;
  var searchDiff;
  var searchRadius;
  var currentSearchesArray = [];

  // click to submit the search request
  $("#searchButton").on("click",function(){
    event.preventDefault();

    // clear any previously submitted searches
    currentSearchesArray = [];
    $("#hikingDiv").empty();

    // get information from search form
    address = $("#inlineFormInput").val().trim();
    searchLength = parseFloat($("#search-min-lng").val().trim());
    searchDiff = $("#search-diff").val();
    searchRadius = parseFloat($("#search-max-dist").val().trim());

    // set trail length and search radius defaults if a number is not entered
    if (isNaN(searchLength)){
      searchLength = 0;
    };
    if (isNaN(searchRadius)){
      searchRadius = 30;
    };

    // create object containing search information
    var searchInfo = {
      address: address,
      searchLength: searchLength,
      searchRadius: searchRadius
    };
 
    // call function to get the trails based on the serach information entered
    findNewTrails(searchInfo);

    $("#inlineFormInput").val("");

    setTimeout(function(){ location.href= '#hikingDiv'; }, 500);
   
  });

  function findNewTrails(data){

    $.get("/api/ex/trail", data, function(response){
      console.log(response);
      searchLat = response.location.lat;
      searchLon = response.location.lng;

      $("#hikingDiv").attr("data-length", searchLength)
                     .attr("data-difficulty", searchDiff)
                     .attr("data-radius", searchRadius)
                     .attr("data-lat", searchLat)
                     .attr("data-lng", searchLon);

      var pullID = 0;
      if(response.trails.length == 0){
        console.log("No trails found");
      };
      
      var trailInfo = {};
      for(var i = 0; i < response.trails.length; i++){
      
        trailInfo = response.trails[i];
        // pushes response to array so that more info can be displayed to user in modal
        currentSearchesArray.push(trailInfo);
      
        var difficulty = trailInfo.difficulty;
        var trailName = trailInfo.name;

        var newDiv = $("<div data-toggle='modal' data-target='#moreInfo-Modal'>");
        newDiv.attr("data-actNum", trailInfo.id)
              .attr("data-actName", trailInfo.name)
              .attr("data-actDiff", trailInfo.difficulty)
              .attr("data-actLength", trailInfo.length)
              .attr("data-actRating", trailInfo.stars)
              .attr("data-lat", trailInfo.latitude)
              .attr("data-lng", trailInfo.longitude);
        var newIMG = $("<img>");
        var trailIMG = trailInfo.imgSmall.replace(/\\\//g, "/");
        if (trailIMG == ''){
          trailIMG = "http://via.placeholder.com/240x180"
        };
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
   
  };

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

          if(trailIMG == ""){
            trailIMG =  "http://via.placeholder.com/340x250";
          };
          
          $("#content-title").text(thisTrail.name);
          $(".modal-body img").attr("src", trailIMG)
                              .attr("data-actNum", $(this).attr("data-actNum"))
                              .attr("data-actName", $(this).attr("data-actName"))
                              .attr("data-actDiff", $(this).attr("data-actDiff"))
                              .attr("data-actLength", $(this).attr("data-actLength"))
                              .attr("data-actRating", $(this).attr("data-actRating"))
                              .attr("data-actLat", $(this).attr("data-lat"))
                              .attr("data-actLng", $(this).attr("data-lng"));
          $(".modal-body p").empty();
          $(".modal-body p").append("<p>"+thisTrail.location+"</p>");
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