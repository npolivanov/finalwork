const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
// const page = require("./app/build/index.html");
const app = express();
const port = 8080;
function startServer() {
  app.use('/static', express.static('static'));
  app.use(bodyParser.json());


  app.listen(port, (err) => {
    if (err) {
      return console.log("something bad happened", err);
    }
    console.log(`server is listening on ${port}`);
  });

  app.get("/", (request, response) => {
   response.sendFile(path.join(__dirname, './app/build/index.html'));
  });

}

startServer();