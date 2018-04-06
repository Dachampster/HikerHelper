$(document).ready(function(){

  function addActivity(data){
    $.ajax({
      method: "POST",
      url: "/api/activity",
      data: data
    }).done(function(result){
      console.log("added activity result: " + result);
    }).fail(function(xhr, responseText, responseStatus){
      if (xhr){
        console.log(xhr.responseText);
      };
    });
  };

  $("#add-activity").on("submit", function(event){
    event.preventDefault();
    console.log("clicked");
    var searchId = parseFloat($("#search-id").val());
    var actNum = parseFloat($("#act-num").val());
    var actName = $("#act-name").val().trim();
    var actDiff = $("#act-diff").val().trim();
    var actLength = parseFloat($("#act-length").val());
    var actRating = parseFloat($("#act-rating").val());
    var newActivity = {
      SearchParamId: searchId,
      activityNum: actNum,
      name: actName,
      difficulty: actDiff,
      length: actLength,
      rating: actRating
    };
    console.log(newActivity)
    addActivity(newActivity);
  });
  
});