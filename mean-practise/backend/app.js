const express = require("express");
const mongoose = require("mongoose");
const postRoute = require("./routes/post-route")
const app = express();

// mongoose.connect("mongodb://localhost:27017").then(()=>{
mongoose
  .connect(
    "mongodb+srv://Thiruzz:zOKs8lIx8518CEy4@cluster0.rff0uf8.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Mongo-Connected");
  })
  .catch((error) => {
    console.log("error in connection", error);
  });

require("dotenv/config");
const apis = process.env.API_URL;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT, POST,DELETE,UPDATE,PATCH,OPTIONS"
  );
  next();
});

app.use((req, res, next) => {
  console.log("middleware--", apis);
  next();
});

app.use("/api/posts",postRoute)
module.exports = app;
