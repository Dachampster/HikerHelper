$(document).ready(function(){

  function addUser(data){
    $.ajax({
      method: "POST",
      url: "/api/users",
      data: data
    }).done(function(result){
      getAllUsers();
    }).fail(function(xhr, responseText, responseStatus){
      if (xhr){
        console.log(xhr.responseText);
      };
    });
  };

  function getAllUsers(){
    $.get("/api/users", function(data){
      console.log(data);
    });
  };

  $("#add").on("submit", function(event){
    event.preventDefault();
    console.log("clicked");
    var userEmail = $("#user-email").val().trim();
    var userPass = $("#user-pass").val();
    var userName = $("#user-name").val().trim();
    var newUser = {
      email: userEmail,
      displayName: userName,
      password: userPass
    };
    addUser(newUser);
  });

  $("#get").on("submit", function(event){
    event.preventDefault();
    var userId = parseFloat($("#user-id").val());
    $.get("/api/users/" + userId, function(data){
      console.log(data);
    });
  });
});