var db = require("../models");

module.exports = function(app) {

  app.post("/api/search", function(req, res) {
    db.SearchParam.create({
      name: req.body.name,
      activityIdentification: req.body.activityIdentification,
      difficulty: req.body.difficulty,
      length: req.body.length,
      rating: req.body.rating
    }).then(function(dbActivity) {
      res.json(dbActivity);
    });
  });

};