const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoute = require("./routes/user");

const app = express();
app.use(cors());
env.config();
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.DB_URL)
  .then(console.log("connected to DB"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api", userRoute);

let port = process.env.PORT || 2000;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("listening on port ", port);
  }
});
