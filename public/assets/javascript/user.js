
$( document ).ready(function() {

  // function that checks to see if a user is logged into the site and add either a dropdown (if logged in) or a sign in button (if not logged in)
  function checkLogin(){
    $("#signInLink").empty();
    var user = sessionStorage.getItem("user");
    var listItem = $("<li>");
    if(user){
      listItem.attr("class", "nav-item dropdown");
      var drop = $("<a>");
      drop.attr("class", "nav-link dropdown-toggle")
          .attr("data-toggle", "dropdown")
          .attr("href", "#")
          .attr("role", "button")
          .attr("aria-haspopup", "true")
          .attr("aria-expanded", "false")
          .text(user);
      var dropDownDiv = $("<div>");
      dropDownDiv.attr("class", "dropdown-menu")
      var menuItem1 = $("<a>");
      menuItem1.attr("class", "dropdown-item")
               .attr("id", "savedSearches")
               .attr("href", "#")
               .text("My Searches");
      var menuItem2 = $("<a>");
      menuItem2.attr("class", "dropdown-item")
               .attr("id", "signOut")
               .attr("href", "#")
               .text("Sign Out");
      dropDownDiv.append(menuItem1, menuItem2);
      listItem.append(drop, dropDownDiv);
    } else {
      listItem.attr("class", "nav-item");
      var signInBttn = $("<button>");
      signInBttn.attr("type", "button")
                .attr("class", "nav-link btn btn-primary")
                .attr("id", "signIn")
                .attr("data-toggle", "modal")
                .attr("data-target", "#signIn-Modal")
                .text("Sign In");
      listItem.append(signInBttn);
    };
    $("#signInLink").append(listItem);
  };

  // function to call the post route adding a user to the database
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

  // function to check the user's login credentials against the database and set session variables if they are valid
  function loginUser(data){
    $.get("/api/users", data, function(result){
      sessionStorage.clear();
      if (result.loggedin){
        sessionStorage.setItem("id", result.id);
        sessionStorage.setItem("user", result.displayName);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("password", data.password);
        $("#signIn-Modal").modal("toggle");
        checkLogin();
      } else {
        $("#login-pass").addClass("is-invalid");
      };
    });
  };
  
  // click event getting the new login information submitted by the user
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

    addUser(newUser);
  });

  // click event getting the login credentials submitted by the user
  $("#login").on("click", function(event){
    event.preventDefault();
    var loginEmail = $("#login-email").val().trim();
    var loginPass = $("#login-pass").val();

    var loginData = {
      email: loginEmail,
      password: loginPass
    };

    loginUser(loginData);
  });

  // click event to log out the user
  $(document).on("click", "#signOut", function(){
    sessionStorage.clear();
    $("#hikingDiv").empty();
    checkLogin();
  });

  checkLogin();

});

  