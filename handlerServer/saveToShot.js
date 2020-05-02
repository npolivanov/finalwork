const sharp = require("sharp");
const fs = require("fs");
const { spawn } = require("child_process");

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
      .then((info) => {
        console.log(info);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createVideo() {
    const args = ["-y", "-i", "short/%d.png", "short/output.mp4"];
    const ffmpeg = spawn("ffmpeg", args);

    ffmpeg.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });

    ffmpeg.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });
  }
}

module.exports = ImageHandler;
