const bcrypt = require('bcrypt');
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

  $("#add").on("submit", function(event){
    event.preventDefault();
    console.log("clicked");
    var userEmail = $("#user-email").val().trim();
    var userPass = $("#user-pass").val();
    var userName = $("#user-name").val().trim();
    var pass;
    
    bcrypt.hash(userPass, 10, function (err, hash){
        if (err) {
          return next(err);
        }
        // pass up "hash" to mySQL instead of what they entered for password
        pass = hash;
    });
    console.log(boop);
    var newUser = {
      email: userEmail,
      displayName: userName,
      password: hash
    };
    addUser(newUser);
  });