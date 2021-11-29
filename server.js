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



//set up local port
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
