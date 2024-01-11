import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
require('dotenv').config()
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken")

export const test = (req: Request, res: Response) => {
  res.status(200).send("OK");
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const exists = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (exists) {
      throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        // @ts-ignore
        password: hash,
      },
    });
    

    console.log("User created successfully:", user);

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }




}

export const login = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
  const email = req.body.email
const user = {email: email}
const accessToken = jwt.sign(user, process.env.SECRET)
res.json({accessToken: accessToken})
};
export const authToken = (req: Request, res: Response, next:Function)=>{
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(!token) return res.status(403).send("Acces denied")
// @ts-ignore
  jwt.verify(token, process.env.SECRET, (err, user) =>{
    if(err) return res.send("null")
    // @ts-ignore
    req.user = user
  next()
  })
}

export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  const user = await prisma.note.create({
    data: {
      title: title,
      content: content,
    },
  });
  console.log(user);
  res.json(user);
};

export const getNotes = async (req: Request, res: Response) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
};

export const getNote = async (req: Request, res: Response) => {
  const user_id = parseInt(req.params.id);
  const notes = await prisma.note.findUnique({
    where: {
      id: user_id,
    },
  });
  if (isNaN(user_id)) return res.status(400).send("user not found");
  res.json(notes);
};

// delete a note
export const deleteNote = async (req: Request, res: Response) => {
  const user_id = parseInt(req.params.id);
  const notes = await prisma.note.delete({
    where: {
      id: user_id,
    },
  });
  if (isNaN(user_id)) return res.status(400).send("user not found");
  
  res.json(notes);
};

// update note
export const updateNote = async (req: Request, res: Response) => {
  const user_id = parseInt(req.params.id);
  const notes = await prisma.note.update({
    where: {
      id: user_id,
    },
    data:{
      content: req.body.content,
    }
  });
  if (isNaN(user_id)) return res.status(400).send("user not found");
  res.json(notes);
}

// get all users
export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    
  })
  res.json(users)
}

// delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const user_id = parseInt(req.params.id);
  const users = await prisma.user.delete({
    where: {
      id: user_id,
    }
  })
  res.json(users)
}
