var request = require('request');
var db = require("../models");

module.exports = function(app) {
  app.get("/api/ex/google", function(req, res) {
    var address = req.query.address
    var queryUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address +"&key=AIzaSyCWa5eHnMAMi6rkFWh1pg_Ssxz8lTN6lQk";

    request(queryUrl, function(error, response, body){
      if (error){
        console.log("Error Occurred: " + error);
        return
      };
      res.send(body);
    });
  });
};