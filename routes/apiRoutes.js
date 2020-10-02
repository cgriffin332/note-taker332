// ===============================================================================
// LOAD DATA

var noteData = require("../db/db.json");
const fs = require("fs");
var path = require("path");
const { v4: uuidv4 } = require("uuid");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests

  app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) throw err;
      const updatedData = JSON.parse(data);
      res.json(updatedData);
    });
  });

  // API POST Requests
  //---------------------------------------------------------------------------

  app.post("/api/notes", function (req, res) {
    // post note data
    console.log(req.body);
    // give each note unique id
    req.body.id = uuidv4();
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) throw err;
      console.log(data);
      const updatedData = JSON.parse(data);
      updatedData.push(req.body);
      console.log(updatedData);
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(updatedData, null, "\t"),
        (err) => {
          if (err) throw err;
          res.sendFile(path.join(__dirname, "../public/notes.html"));
        }
      );
    });

    //   res.json(true);
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.delete("/api/notes/:id", function (req, res) {
    // Empty out the arrays of data
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) throw err;
      const updatedData = JSON.parse(data);
      const filteredNotes = updatedData.filter((note) => {
        return req.params.id !== note.id;
      });
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(filteredNotes, null, "\t"),
        (err) => {
          if (err) throw err;
          res.sendFile(path.join(__dirname, "../public/notes.html"));
        }
      );
    });
  });
};
