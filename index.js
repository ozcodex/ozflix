const express = require("express");
const engine = require("express-handlebars").engine;
const controllers = require("./controllers");
const mongoose = require("mongoose");
const parser = require("body-parser");

// configurations
const port = 4000;
const base_uri = "/ozflix";

// Database connection
mongoose.connect("mongodb://localhost:27017/ozflix");

// define Express an its modules
const app = express();
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(base_uri, express.static("public"));
app.use(base_uri, controllers);
// define the view rendering engine
app.engine(
	"spy",
	engine({
		defaultLayout: "main",
		extname: ".spy",
		helpers: {
			base_uri: function (argument) {
				return base_uri;
			},
		},
	})
);
app.set("view engine", "spy");

// starts the app
app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
