const api = require("express").Router();
const postNote = require("../../lib/notes");

// GET Route for db.json file
app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "./db.json")));

// POST Route for submitting note
app.post("/api/notes", (req, res) => {
	console.log(req.body);
	if (req.body) {
		id = uuidv4();
		const newNote = postNote(notes);
		res.json(newNote);
	}
});
