// ===============================================================================
// DEPENDENCIES
var path = require("path");

// ===============================================================================
// ROUTING

module.exports = (app) => {
  // HTML GET Requests
  //--------------------------------------------------------------------------
  // go to notes page
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // go to homepage
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
