const express = require("express");
const api = require("./public/assets/js");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const PORT = process.env.port || 3307;

const app = express();

// Middleware for parsing JSON and urlencoded from data
app.use(express.json());
app.use("/api", api);
app.use(express.static("public"));

//Start listen to port
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
