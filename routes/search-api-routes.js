var db = require("../models");

module.exports = function(app) {

  app.post("/api/search", function(req, res) {
    db.SearchParam.create({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      maxDistance: req.body.maxDistance,
      minLength: req.body.minLength
    }).then(function(dbSearch) {
      res.json(dbSearch);
    });
  });

};