//dependencies
const { application } = require("express");
const express = require("express");
const path = require("path");
const fs = require("fs");
const { Console } = require("console");


//express route
const app = express();
const PORT = process.env.PORT || 3003;
const dbFile = "./db/db.json";


//data parsing for express

app.use(express.json());
app.use(express.static("public"));


app.get("/notes", (req,res) => {
  console.log("/notes route, line 21");
  res.sendFile(path.join(_dirname, "public/notes.html"))
});

app.get("/api/notes", (req,res) => {
  fs.readFile(dbFile, "utf8", (error, data) =>{
    if(error) {
     console.log("/api/notes path error", dbFile, data, error);
     res.status(500).send("Can not read file");
    }
    res.status(200).json(JSON.parse(data));
  });
});

app.post('/api/notes', (req,res) => {
  const {title, text} =req.body;
  const note = {title, text };

  fs.readFile(dbFile, "utf8", (error, data) => {
    if(error) console.log("Error, file not read", error);

    let notes = [];
    if (data) notes = JSON.parse(data);

    notes.unshit(note);

    fs.writeFile(dbFile, JSON.stringify(notes), (error) => { if (error) {
      console.log("Note not added", error);
      res.status(500).json("Note not added");
    } else {
    console.log("Your note has beed added", note);
    res.status(200).send(JSON.stringify(note));
    }
  });
});
});

app.get("*", (req, res) => res.send("url requested does not exist or does not have a pathway in this app."));



//set up local port
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
