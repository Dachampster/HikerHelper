var request = require('request');
var db = require("../models");

module.exports = function(app) {
  app.get("/api/ex/trail", function(req, res) {
    var address = req.query.address;
    var searchRadius = req.query.searchRadius;
    var searchLength = req.query.searchLength;

    var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address +"&key=AIzaSyCWa5eHnMAMi6rkFWh1pg_Ssxz8lTN6lQk";

    request(googleUrl, function(error, response, body){
      var externalRes = {};

      if (error){
        console.log("Error Occurred: " + error);
        return;   // todo - fix this to return an error
      };

      // collect lat & long from body
      var googleParsed = JSON.parse(body);
      externalRes.location = googleParsed.results[0].geometry.location;

      var trailUrl = "https://www.hikingproject.com/data/get-trails?lat="+
                      externalRes.location.lat+
                      "&lon="+externalRes.location.lng+
                      "&maxDistance="+searchRadius+
                      "&minLength="+searchLength+
                      "&key=" + "200242829-ff1de9f4eecd59e41080ee24ed53c7ed";

      request(trailUrl, function(error, response, body){
        if (error){
          console.log("Error Occurred: " + error);
          return;   // todo - fix this to return an error
        };

        var trailParsed = JSON.parse(body);
        externalRes.trails = trailParsed.trails;

        res.send(externalRes);
      });
    });
  });

  app.get("/api/ex/address", function(req, res) {
    var latlng = req.query.latitude + "," + req.query.longitude;

    var queryUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng +"&key=AIzaSyCWa5eHnMAMi6rkFWh1pg_Ssxz8lTN6lQk";

    request(queryUrl, function(error, response, body){
      if (error){
        console.log("Error Occurred: " + error);
        return;   // todo - fix this to return an error
      };

      var parsed = JSON.parse(body);

      res.send(parsed);
    });
  })
};