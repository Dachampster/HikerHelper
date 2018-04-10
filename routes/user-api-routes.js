var db = require("../models");
var bcrypt = require('bcrypt');

module.exports = function (app) {

  app.get("/api/users", function (req, res) {
    db.User.findAll({
      include: [
        {
          model: db.SearchParam, include: [
            { model: db.Activity }
          ]
        }
      ]
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.SearchParam, include: [
            { model: db.Activity }
          ]
        }
      ]
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  //Post route: Hash the password and store it in MySQL
  app.post("/api/users", function (req, res) {
    var pass;

    bcrypt.hash(req.body.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      // pass up "hash" to mySQL instead of what they entered for password
      pass = hash;
      db.User.create({
        email: req.body.email,
        displayName: req.body.displayName,
        password: pass
      }).then(function (dbUser) {
        res.json(dbUser);
      });
    });
  });


  app.delete("/api/users", function (req, res) {
    db.User.destroy({
      where: {
        id: req.body.id
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

};