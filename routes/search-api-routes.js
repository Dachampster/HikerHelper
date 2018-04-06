var db = require("../models");

module.exports = function(app) {

  app.post("/api/search", function(req, res) {
    db.SearchParam.create({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      maxDistance: req.body.maxDistance,
      minLength: req.body.minLength,
      UserId: req.body.UserId
    }).then(function(dbSearch) {
      res.json(dbSearch);
    });
  });

  app.get("/api/search/:id", function(req, res) {
    db.SearchParam.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Activity]
    }).then(function(dbSearch) {
      res.json(dbSearch);
    });
  });

  app.get("/api/search", function(req, res) {
    db.SearchParam.findAll({
      where: {
        UserId: req.body.UserId
      },
      include: [db.Activity]
    }).then(function(dbSearch) {
      res.json(dbSearch);
    });
  });

};