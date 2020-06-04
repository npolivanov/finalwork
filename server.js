/** @format */

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ImageHandler = require("./handlerServer/saveToShot");
const fs = require("fs");
// const page = require("./app/build/index.html");
const app = express();
const port = 8080;
function startServer() {
  let handlerImage = new ImageHandler();
  app.use("/static", express.static("static"));
  app.use(bodyParser.json());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "origin, content-type, accept",
    );
    next();
  });

  app.listen(port, err => {
    if (err) {
      return console.log("something bad happened", err);
    }
    console.log(`server is listening on ${port}`);
  });

  app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "./app/build/index.html"));
  });

  app.post("/short", (request, response) => {
    handlerImage.saveToShot(request.body.data);
    response.send();
  });

  app.get("/delete", (request, response) => {
    handlerImage.delete();
    response.send();
  });

  app.get("/createvideo", (request, response) => {
    handlerImage.createVideo();
    response.send();
  });
}

startServer();
