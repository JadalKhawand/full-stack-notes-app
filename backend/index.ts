import express, { Express } from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors'
import dotenv from 'dotenv'
import {test, createNote, getNotes, getNote, deleteNote, updateNote} from './controllers/notes'
dotenv.config()
const app: Express = express()
const prisma = new PrismaClient()
app.use(cors())
app.use(express.json())

// testing 
app.get('/ready', test)

// create a note

app.post('/notes/create', createNote)

// get all notes

app.get('/notes', getNotes)

// get a single note

app.get('/notes/:id',getNote)

// delete a user

app.delete('/notes/delete/:id',deleteNote)

// update a note

app.put('/notes/update/:id', updateNote)





app.listen(process.env.PORT, () => {
  console.log(`🚀🚀🚀 Server is running at https://localhost:${process.env.PORT}`);
});