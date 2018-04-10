
$( document ).ready(function() {
    $("#signup").on("click", function(event){
        event.preventDefault();
        console.log("form submit captured!");
        var userEmail = $("#user-email").val().trim();
        var userPass = $("#user-pass").val();
        var userName = $("#user-name").val().trim();
        
        var newUser = {
          displayName: userName,
          email: userEmail,
          password: userPass
        };
        console.log(newUser);
        addUser(newUser);
      });
  });



function addUser(data){
    console.log("attempting to add user!");
    $.ajax({
      method: "POST",
      url: "/api/users",
      data: data
    }).done(function(result){
    console.log(result);
    }).fail(function(xhr, responseText, responseStatus){
      if (xhr){
        console.log(xhr.responseText);
      };
    });
  };

  