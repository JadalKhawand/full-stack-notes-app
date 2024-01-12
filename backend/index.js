"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const notes_1 = require("./controllers/notes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(notes_1.authToken);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// testing
app.get("/ready", notes_1.test);
// create a new user
app.post("/users/create", notes_1.createUser);
// login
app.post('/users/login', notes_1.login);
// create a note
app.post("/notes/create", notes_1.createNote);
// get all notes
app.get("/notes", notes_1.getNotes);
// get a single note
app.get("/notes/:id", notes_1.getNote);
// delete a user
app.delete("/notes/delete/:id", notes_1.deleteNote);
// update a note
app.put("/notes/update/:id", notes_1.updateNote);
// get all users
app.get("/users", notes_1.getUsers);
// delete a user
app.delete("/users/:id", notes_1.deleteUser);
app.listen(process.env.PORT, () => {
    console.log(`🚀🚀🚀 Server is running at https://localhost:${process.env.PORT}`);
});
