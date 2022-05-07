const api = require("./public/assets/js");
const fs = require("fs");
const path = require("path");
const express = require("express").Router();
const uuidv4 = require("uuid");

const PORT = process.env.port || 3307;

const app = express();

// Middleware for parsing JSON and urlencoded from data
app.use(express.json());
app.use("/api", api);
app.use(express.static("public"));

// GET Route for db.json file
app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "./db.json")));

// POST Route for submitting note
app.post("/api/notes", (req, res) => {
	console.log(req.body);
	const note = req.body;
});

// GET Route for notes.html
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

// GET Route for index.html
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

//Start listen to port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
