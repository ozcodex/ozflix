const express = require("express");
const engine = require("express-handlebars").engine;
const controllers = require('./controllers')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ozflix');

const app = express();
const port = 4000;

app.engine(
	"spy",
	engine({
		defaultLayout: "main",
		extname: ".spy",
	})
);

app.set("view engine", "spy");

app.use(express.static("public"));

app.use(controllers)

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
