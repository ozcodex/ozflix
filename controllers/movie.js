var express = require("express");
var Movie = require("../models/movie");
const router = express.Router();

router.get("/", function (req, res, next) {
  Movie.find({})
    .then((movies) => {
      res.render('home.spy', { movies });
    })
    .catch(next);
});

module.exports = router;
