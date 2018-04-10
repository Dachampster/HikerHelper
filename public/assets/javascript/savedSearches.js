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

  function saveSearch(searchData, activityData){
    $.ajax({
      method: "POST",
      url: "/api/search",
      data: searchData
    }).done(function(result){
      activityData.SearchParamId = result.id;
      saveActivity(activityData);
    }).fail(function(xhr, responseText, responseStatus){
      if (xhr){
        console.log(xhr.responseText);
      };
    });
  };

  function saveActivity(activityData){
    $.ajax({
      method: "POST",
      url: "/api/activity",
      data: activityData
    }).done(function(result){
      console.log("added activity result: " + result);
    }).fail(function(xhr, responseText, responseStatus){
      if (xhr){
        console.log(xhr.responseText);
      };
    });
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

  $(document).on("click", "#save-act", function(){
    var userId = 1;
    var searchLat = parseFloat($("#hikingDiv").attr("data-lat"));
    var searchLng = parseFloat($("#hikingDiv").attr("data-lng"));
    var searchDist = parseFloat($("#hikingDiv").attr("data-radius"));
    var searchLength = parseFloat($("#hikingDiv").attr("data-length"));

    var actName = $(".modal-body img").attr("data-actName");
    var actNum = parseFloat($(".modal-body img").attr("data-actNum"));
    var actDiff = $(".modal-body img").attr("data-actDiff");
    var actLength = parseFloat($(".modal-body img").attr("data-actLength"));
    var actRating = parseFloat($(".modal-body img").attr("data-actRating"));

    var searchInfo = {
      latitude: searchLat,
      longitude: searchLng,
      maxDistance: searchDist,
      minLength: searchLength,
      UserId: userId
    };

    var activityInfo = {
      name: actName,
      activityNum: actNum,
      difficulty: actDiff,
      length: actLength,
      rating: actRating
    };

    $.get("/api/check/search", searchInfo, function(data){
      console.log(data);
      if (data.length === 0){
        saveSearch(searchInfo, activityInfo);
      } else {
        activityInfo.SearchParamId = data[0].id;
        saveActivity(activityInfo);
      };
    });

  });

});