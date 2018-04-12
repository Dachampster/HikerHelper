var request = require('request');
var db = require("../models");

module.exports = function(app) {
  app.get("/api/ex/google", function(req, res) {
    var address = req.query.address;
    var searchRadius = req.query.searchRadius;
    var searchLength = req.query.searchLength;

    var queryUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address +"&key=AIzaSyCWa5eHnMAMi6rkFWh1pg_Ssxz8lTN6lQk";

    request(queryUrl, function(error, response, body){
      var myResponse = {};

      if (error){
        console.log("Error Occurred: " + error);
        return;   // todo - fix this to return an error
      };

      // collect lat & long from body
      var parsed = JSON.parse(body);
      myResponse.location = parsed.results[0].geometry.location;

      var queryUrl2 = "https://www.hikingproject.com/data/get-trails?lat="+
                      myResponse.location.lat+
                      "&lon="+myResponse.location.lng+
                      "&maxDistance="+searchRadius+
                      "&minLength="+searchLength+
                      "&key=" + "200242829-ff1de9f4eecd59e41080ee24ed53c7ed";

      request(queryUrl2, function(error, response, body){
        if (error){
          console.log("Error Occurred: " + error);
          return;   // todo - fix this to return an error
        };

        var parsed2 = JSON.parse(body);
        myResponse.trails = parsed2.trails;

        res.send(myResponse);
      });
    });
  });
};