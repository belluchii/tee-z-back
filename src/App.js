const router = require("./routes/router");
const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(3001, () => {
  console.log("server escuchandose en el puerto 3001");
  db();
});

module.exports = app;
