var express = require("express");
const fs = require("fs");
var Movie = require("../models/movie");
const router = express.Router();

router.get("/", function (req, res, next) {
  Movie.find({})
    .lean()
    .then((movies) => {
      res.render("home.spy", { movies });
    })
    .catch(next);
});

router.post("/", function (req, res, next) {
  var movie = req.body;
  Movie.create(movie)
    .then((err) => {
      res.send(movie);
    })
    .catch(next);
});

router.get("/:id", function (req, res, next) {
  Movie.findOne({ id: req.params.id })
    .lean()
    .then((movie) => {
      res.render("movie.spy", movie);
    })
    .catch(next);
});

router.get("/:id/video", function (req, res, next) {
  // Ensure there is a range given for the video
  const range = req.headers.range;

  Movie.findOne({ id: req.params.id })
    .lean()
    .then((movie) => {
      // get video stats
      const videoPath = movie.location;
      const videoSize = fs.statSync(movie.location).size;

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
    })
    .catch(next);
});

module.exports = router;
