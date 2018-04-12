var db = require("../models");

module.exports = function(app) {

  app.post("/api/activity", function(req, res) {
    db.Activity.create({
      name: req.body.name,
      activityNum: req.body.activityNum,
      difficulty: req.body.difficulty,
      length: req.body.length,
      rating: req.body.rating,
      lat: req.body.lat,
      lng: req.body.lng,
      SearchParamId: req.body.SearchParamId
    }).then(function(dbActivity) {
      res.json(dbActivity);
    });
  });

  app.delete("/api/activity", function(req, res) {
    db.Activity.destroy({
      where: {
        id: req.body.id
      }
    }).then(function(dbActivity) {
      res.json(dbActivity);
    });
  });

};