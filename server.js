//dependencies

const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = fs.readFileSync("./db/db.json");

let jsonNotes = JSON.parse(notes);
//express route
const app = express();
const PORT = process.env.PORT || 3003;
// const dbFile = "./db/db.json";

//data parsing for express

app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  console.log("/notes route, line 21");
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  //   fs.readFile(dbFile, "utf8", (error, data) =>{
  //     if(error) {
  //      console.log("/api/notes path error", dbFile, data, error);
  //      res.status(500).send("Can not read file");
  //     }
  //     res.status(200).json(data);
  //   });
  res.status(200).json(jsonNotes);
});

app.post("/api/notes", (req, res) => {
  const newNote = {
    id: Math.floor(Math.random() * 10000),
    title: req.body.title,
    text: req.body.text,
  };
  jsonNotes.push(newNote);

  fs.writeFile(dbFile, JSON.stringify(jsonNotes), (error, data) => {
    if (error) console.log("Error, file not read", error);
    +res.status(500).json("Note not added");
  });
  res.send(newNote);
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname,"./public/index.html"))
  
  );


//set up local port
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
