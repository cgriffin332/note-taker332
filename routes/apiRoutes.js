// LOAD DATA

const fs = require("fs");
const path = require("path");
//random id generator
const { v4: uuidv4 } = require("uuid");

// ROUTING
// ===============================================================================

module.exports = (app) => {
  // API GET Request

  app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) throw err;
      const updatedData = JSON.parse(data);
      res.json(updatedData);
    });
  });

  // API POST Request

  app.post("/api/notes", (req, res) => {
    // give each note unique id
    req.body.id = uuidv4();
    // read old list
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) throw err;
      const updatedData = JSON.parse(data);
      //add new note to array
      updatedData.push(req.body);
      // write it to html
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(updatedData, null, "\t"),
        (err) => {
          if (err) throw err;
          res.sendFile(path.join(__dirname, "../public/notes.html"));
        }
      );
    });
  });

  // ---------------------------------------------------------------------------
  // delete note
  app.delete("/api/notes/:id", (req, res) => {
    // read and compare id of note user clicked and array of notes
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) throw err;
      const updatedData = JSON.parse(data);
      const filteredNotes = updatedData.filter(
        (note) => req.params.id !== note.id
      );
      // write to db file
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(filteredNotes, null, 2),
        (err) => {
          if (err) throw err;
          res.sendFile(path.join(__dirname, "../public/notes.html"));
        }
      );
    });
  });
};
