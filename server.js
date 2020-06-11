/** @format */

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ImageHandler = require("./handlerServer/saveToShot");
const router = require("express").Router();
const fs = require("fs");
const { runInNewContext } = require("vm");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const formidable = require("formidable");

resolve = require("path").resolve;

// const page = require("./app/build/index.html");
const app = express();
const port = 8080;
function startServer() {
  let handlerImage = new ImageHandler();
  app.use("/static", express.static("static"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

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

  app.get("/createvideo", async (request, response) => {
    await handlerImage.createVideo();
    response.setHeader("Content-Type", "video/mp4");
    // response.sendFile(resolve(`short/output.mp4`), err => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log("success");
    //   }
    // });
    var rs = fs.createReadStream(`short/output.mp4`);
    rs.pipe(response);
  });

  app.post("/audio", (request, response) => {
    console.log(request.query);
  });
}

startServer();
