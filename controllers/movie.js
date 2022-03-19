var express = require("express");
const fs = require("fs");
const router = express.Router();
const movieFolder = '/media/oz/TOSHIBA EXT/Peliculas/'

router.get("/", function (req, res, next) {
  fs.readdir(movieFolder, (err, files) =>{
    if(err) return next(err)
    res.render("home.spy", { files });
  })
});

router.get("/:name", function (req, res, next) {
  const name = req.params.name    
  res.render("movie.spy", {name});
});

router.get("/:name/video", function (req, res, next) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  const movie = req.params.name;

      // get video stats
      const videoPath = `${movieFolder}/${movie}`;
      const videoSize = fs.statSync(videoPath).size;
  console.log(videoPath)

      if (range) {
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        // Create headers
        const contentLength = end - start + 1;
        const headers = {
          "Content-Range": `bytes ${start}-${end}/${videoSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": "video/webm",
        };
        res.writeHead(206, headers);

        // create video read stream for this particular chunk
        const videoStream = fs.createReadStream(videoPath, { start, end });

        // Stream the video chunk to the client
        videoStream.pipe(res);
      } else {
        const headers = {
          "Content-Length": videoSize,
          "Content-Type": "video/webm",
        };
        res.writeHead(200, headers);
        fs.createReadStream(videoPath).pipe(res);
      }
});

module.exports = router;
