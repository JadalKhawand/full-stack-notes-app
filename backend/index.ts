import express, { Express } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";

import {
  test,
  createNote,
  getNotes,
  getNote,
  deleteNote,
  updateNote,
  getUsers,
  deleteUser,
  createUser,
  login,
  authToken
} from "./controllers/notes";

dotenv.config();
const app: Express = express();
const prisma = new PrismaClient();

// Enable CORS before defining routes
app.use(cors());

// Auth middleware


// JSON parsing middleware
app.use(express.json());

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
app.get("/ready", test);
app.post("/users/create", createUser);
app.post('/users/login', login)
app.use(authToken)
app.post("/notes/create", createNote);
app.get("/notes", getNotes);
app.get("/notes/:id", getNote);
app.delete("/notes/delete/:id", deleteNote);
app.put("/notes/update/:id", updateNote);
app.get("/users", getUsers);
app.delete("/users/:id", deleteUser);

app.listen(process.env.PORT, () => {
  console.log(`🚀🚀🚀 Server is running at https://localhost:${process.env.PORT}`);
});
