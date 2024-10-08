const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const initWebRoute = require("./src/routes/web");
const connectDB = require("./src/config/connectDB");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || 8081;

/// init route
initWebRoute(app);

//connect DB
connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
