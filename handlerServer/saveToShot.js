const sharp = require("sharp");
const fs = require("fs");
const { spawn } = require("child_process");

var deleteFolderRecursive = function (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};
/* Обрабатывает буферы фотографий  */
class ImageHandler {
  constructor() {
    this.imageArray = [];
  }

  saveToShot(image) {
    const uri = image.split(";base64,").pop();
    const photoBuffer = Buffer.from(uri, "base64");
    this.imageArray.push(photoBuffer);
    if (!fs.existsSync("./short")) {
      fs.mkdirSync("./short");
    }
    sharp(photoBuffer)
      .png()
      .toFile(`short/${this.imageArray.length}.png`)
      .then(info => {
        console.log(info);
      })
      .catch(err => {
        console.log(err);
      });
  }

  delete() {
    if (fs.existsSync("./short")) {
      deleteFolderRecursive("./short");
    }
    if (!fs.existsSync("./short")) {
      fs.mkdirSync("./short");
    }
    this.imageArray = [];
  }

  createVideo() {
    return new Promise((resolve, reject) => {
      const args = ["-y", "-i", "./short/%d.png", "./short/output.mp4"];
      const ffmpeg = spawn("ffmpeg", args);

      ffmpeg.stdout.on("data", data => {
        // console.log(`stdout: ${data}`);
      });

      ffmpeg.stderr.on("data", data => {
        console.log(data);
        //  resolve();
        // console.error(`stderr: ${data}`);
      });
      ffmpeg.on("close", code => {
        resolve();
      });
    });
  }
}

module.exports = ImageHandler;
