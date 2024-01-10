import express, { Express } from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors'
import dotenv from 'dotenv'
import { test } from "./controllers/notes";
dotenv.config()
const app: Express = express()
const prisma = new PrismaClient()
app.use(cors())
app.use(express.json())

// testing 
app.get('/ready', test)





app.listen(process.env.PORT, () => {
  console.log(`🚀🚀🚀 Server is running at https://localhost:${process.env.PORT}`);
});