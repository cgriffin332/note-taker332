// ===============================================================================
// DEPENDENCIES
var path = require("path");

// ===============================================================================
// ROUTING

module.exports = function (app) {
  // HTML GET Requests
  //--------------------------------------------------------------------------
  // go to notes page
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // go to homepage
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
