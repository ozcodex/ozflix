const express = require("express");
const router = express.Router();

router.use("/movie", require("./movie"));
//router.use('/users', require('./users'))

router.use("/", function (req, res) {
  res.redirect("/movie");
});

module.exports = router;
