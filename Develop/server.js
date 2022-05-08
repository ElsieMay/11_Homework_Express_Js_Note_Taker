const fs = require("fs");
const util = require("util");
const path = require("path");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("./db/db.json");

const PORT = process.env.port || 3000;

const app = express();

// Middleware for parsing JSON and urlencoded from data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//static files
app.use(express.static("public"));

// GET Route for db.json file
app.get("/api/notes", (req, res) => {
	let notes = JSON.parse(fs.readFileSync("./db/db.json"));
	res.json(notes);
	console.log("GET NOTES!");
});

// POST Route for submitting new note
app.post("/api/notes", (req, res) => {
	//Destructuring for items in req.body
	const { text, title } = req.body;
	//validation for input
	if (text && title) {
		//Variable for the object saved in new note
		const newNote = {
			title,
			text,
			note_id: uuidv4(),
		};
		let readNote = JSON.parse(fs.readFileSync("./db/db.json"));
		readNote.push(newNote);
		//writes file
		fs.writeFileSync("./db/db.json", JSON.stringify(readNote));
		//provides a response if successfully posted
		const response = {
			status: "success",
			body: newNote,
		};
		res.status(201).json(response);
		//provides error message if posting is unsuccessful
	} else {
		res.status(404).json("error in posting note");
	}
});

app.delete("/api/notes/:id", (req, res) => {
	for (var j = 0; j < db.length; j++) {
		if (db[j].id == req.params.note_id) {
			db.splice(j, 1);
			break;
		}
	}
	fs.writeFileSync("./db/db.json", JSON.stringify(db), (err) => {
		if (err) throw err;
		console.log("Note deleted!");
	});
	res.json(db);
});

// GET Route for notes.html
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

// GET Route for index.html
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

//Start listen to port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
