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

  // user sign-up (create account) route
  app.get("/createacct", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/userSignUp.html"));
  });

  // saved searches route
  app.get("/savedsearches", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/savedSearches.html"));
  });

  // test routes
  app.get("/usertest", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/testuserdb.html"));
  });

  app.get("/searchtest", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/testsearchdb.html"));
  });

  app.get("/acttest", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/testactivitydb.html"));
  });

};