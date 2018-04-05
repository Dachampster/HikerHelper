// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // main route
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/usertest", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/testuserdb.html"));
  });

};