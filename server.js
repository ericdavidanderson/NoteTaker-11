//dependencies
const express = require("express");
const path = require("path");

//express route
const app = express();
const PORT = process.env.PORT || 3000;

//data parsing for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//route requirements:
require("./routes/apiRoutes")(app);
require("./routes/homeRoutes")(app);

//set up local port
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
