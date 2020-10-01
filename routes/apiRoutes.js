// ===============================================================================
// LOAD DATA

var noteData = require("../db/db");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests


  app.get("/api/notes", function(req, res) {
    res.json(noteData);
  });


  // API POST Requests
//---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    // post note data
   
      noteData.push(req.body);
      res.json(true);

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/notes/:id", function(req, res) {
    // Empty out the arrays of data
    if (id === noteData.id){
        noteData.length = 0;
        res.json({ ok: true });
    }
  });
};