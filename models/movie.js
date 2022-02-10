const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: "Number",
  title: "String",
  location: "String",
  genres: ["String"],
  director: "String",
  year: "Number",
  languages: ["String"],
});

const movie = mongoose.model("movie", schema);

module.exports = movie
