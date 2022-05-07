const fs = require("fs");
const path = require("path");
const express = require("express").Router();
const uuidv4 = require("uuid");
var bodyParser = require("body-parser");
// create application/json parser
var jsonParser = bodyParser.json();

const PORT = process.env.port || 3307;

const app = express();

// Middleware for parsing JSON and urlencoded from data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//static files
app.use(express.static("public"));
app.use(bodyParser.json());
// parse an HTML body into a string
app.use(bodyParser.text({ type: "text/html" }));

// GET Route for db.json file
app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "./db.json")));

// POST Route for submitting note
app.post("/api/notes", jsonParser, (req, res) => {
	console.log(req.body);
	const note = req.body(uuidv4);
	const newNote = note.toString();
});

// GET Route for notes.html
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

// GET Route for index.html
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

//Start listen to port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
