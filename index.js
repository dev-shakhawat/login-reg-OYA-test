const express = require("express");
const app = express();
const env = require("dotenv").config();
const routes = require("./routes");
const dbConfig = require("./config/dbConfig");


// json parser
app.use(express.json());



// database connection
dbConfig();

// use route
app.use("/", routes);

app.listen(3000, () => console.log("server started on port 3000"));
