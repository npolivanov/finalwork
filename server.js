const express = require("express");
const bodyParser = require("body-parser");
const ImageHandler = require("./handlerServer/saveToShot");
const app = express();
const port = 5000;

function startServer() {
  let handlerImage = new ImageHandler();

  app.use(bodyParser.json());
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "origin, content-type, accept",
    );
    next();
  });

  app.listen(port, (err) => {
    if (err) {
      return console.log("something bad happened", err);
    }
    console.log(`server is listening on ${port}`);
  });

  app.post("/short", (request, response) => {
    handlerImage.saveToShot(request.body.data);
    response.send();
  });

  app.get("/createvideo", (request, response) => {
    handlerImage.createVideo();
    response.send();
  });
}

module.exports = startServer;