$(document).ready(function(){

  var userId = sessionStorage.getItem("id");

  function initial(){
    if(userId){
      getSaves();
    }
  };

  function getSaves(){
    $.get("/api/users/" + userId, function(data){
      console.log(data);
      var displayName = data.displayName;
      $("#title").text(`${displayName}'s Saved Searches`);
      $("#saves").empty();
      data.SearchParams.forEach(function(item){
        createSavesList(item);
      });
    });
  };

  function createSavesList(data){
    var latlng = data.latitude + "," + data.longitude;
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng +"&key=AIzaSyCWa5eHnMAMi6rkFWh1pg_Ssxz8lTN6lQk";

    $.ajax({
      url: queryURL,
      method: "GET",
      async: true
    }).done(function(response){
      var address = response.results[2].formatted_address;
      console.log(response.results[2].formatted_address);
      var listItem = $("<li>");
      var listItemSpan = $("<span>");
      listItemSpan.attr("data-lat", data.latitude)
                  .attr("data-lng", data.longitude)
                  .text(address);
      var delSearchBttn = $("<button>");
      delSearchBttn.attr("class", "btn btn-primary del")
                   .attr("data-id", data.id)
                   .attr("data-type", "search")
                   .text("Delete Search");
      listItem.append(listItemSpan, delSearchBttn);
      var subList;
      var subListItem;
      var delActBttn;
      var subListSpan;
      if (data.Activities.length > 0){
        subList = $("<ul>");
        data.Activities.forEach(function(item){
          subListItem = $("<li>");
          subListSpan = $("<span>");
          subListSpan.attr("data-activity", item.activityNum)
                     .text(item.name);
          delActBttn = $("<button>");
          delActBttn.attr("class", "btn btn-sm btn-primary del")
                    .attr("data-id", item.id)
                    .attr("data-type", "activity")
                    .text("Delete Activity");
          subListItem.append(subListSpan, delActBttn);
          subList.append(subListItem);
        });
        listItem.append(subList);
      };
      $("#saves").append(listItem);
    });
  };

  function saveActivity(){
    gsl
  }

  $(document).on("click", ".del", function(){
    console.log("clicked");
    var delId = {
      id: parseInt($(this).attr("data-id"))
    };
    var type = $(this).attr("data-type");
    var url = "/api/" + type;

    $.ajax({
      method: "DELETE",
      url: url,
      data: delId
    }).done(function(result){
      getSaves();
    }).fail(function(xhr, responseText, responseStatus){
      if(xhr){
        console.log(xhr.responseText);
      };
    });
  });

});