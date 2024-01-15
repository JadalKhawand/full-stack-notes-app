"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const notes_1 = require("./controllers/notes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// JSON parsing middleware
app.use(express_1.default.json());
// Enable CORS
app.use((0, cors_1.default)());
// Auth middleware
// CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
// Routes
app.get("/ready", notes_1.test);
app.post("/users/create", notes_1.createUser);
app.post("/users/login", notes_1.login);
app.post("/notes/create", notes_1.authToken, notes_1.createNote);
app.get("/notes", notes_1.authToken, notes_1.getNotes);
app.get("/notes/:id", notes_1.getNote);
app.delete("/notes/delete/:id", notes_1.deleteNote);
app.put("/notes/update/:id", notes_1.updateNote);
app.get("/users", notes_1.getUsers);
app.delete("/users/:id", notes_1.deleteUser);
app.listen(process.env.PORT, () => {
    console.log(`🚀🚀🚀 Server is running at https://localhost:${process.env.PORT}`);
});
