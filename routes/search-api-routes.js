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

  app.get("/api/check/search", function(req, res) {
    db.SearchParam.findAll({
      where: {
        latitude: req.query.latitude,
        longitude: req.query.longitude,
        maxDistance: req.query.maxDistance,
        minLength: req.query.minLength,
        UserId: req.query.UserId
      },
      include: [db.Activity]
    }).then(function(dbSearch) {
      res.json(dbSearch);
    });
  });

  app.delete("/api/search", function(req, res) {
    db.SearchParam.destroy({
      where: {
        id: req.body.id
      }
    }).then(function(dbSearch) {
      res.json(dbSearch);
    });
  });

};