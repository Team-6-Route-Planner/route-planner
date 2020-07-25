// if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
// }
const express = require("express");
const app = express();
const cors = require("cors");
const mongo = require("./configs/mongo");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./routes"));

module.exports = app;
