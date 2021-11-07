const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

const notes = require("./Develop/db/db.json");

// Use css and js
app.use(express.static("Develop/public"));

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// Parse incoming Json
app.use(express.json());

// INDEX ROUTES START
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});
// INDEX ROUTES END

// show all notes from db.json in the notes section
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// add notes from user input
app.post("/api/notes", (req, res) => {

  req.body.id = notes.length.toString();

  // store user input in variable
  var newNote = JSON.stringify(req.body);

  // push that input into the already created notes
  newNote = JSON.parse(newNote);
  const pastNotes = notes;
  pastNotes.push(newNote);

  // write the db.json with all current notes
  fs.writeFile("./Develop/db/db.json", JSON.stringify(pastNotes), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("written");
    }
  });
  res.send("success");
});

// app.get("/api/notes:id", (req, res) => {
//   console.log(req.body.id);
// });

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}!`);
});
