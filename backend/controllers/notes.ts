import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface User {
  email: string;
  password: string;
}

// Test endpoint
export const test = (req: Request, res: Response) => {
  res.status(200).send("OK");
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      throw new Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("User created successfully:", user);

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// User login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
          // @ts-ignore

      const accessToken = jwt.sign({ email }, process.env.SECRET, {
        expiresIn: "3 days",
      });
      res.status(200).json({ accessToken });
    } else {
      res.status(401).send("Invalid password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// Middleware to check and decode JWT token
export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(403).send("Access denied");
  // @ts-ignore

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(401).send("Unauthorized");
    // @ts-ignore
    req.user = user as User;
    next();
  });
};

// Create a new note
export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  const note = await prisma.note.create({
    data: {
      title,
      content,
    },
  });

  console.log("Note created successfully:", note);
  res.json(note);
};

// Get all notes for the authenticated user
export const getNotes = async (req: Request, res: Response) => {
  const notes = await prisma.note.findMany({
    // @ts-ignore
    where: { authorId: req.user.id },
  });

  res.json(notes);
};

// Get a specific note for the authenticated user
export const getNote = async (req: Request, res: Response) => {
  const noteId = parseInt(req.params.id);

  if (isNaN(noteId)) {
    return res.status(400).send("Note not found");
  }

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
  });

  if (!note) {
    return res.status(404).send("Note not found");
  }

  res.json(note);
};

// Delete a note
export const deleteNote = async (req: Request, res: Response) => {
  const noteId = parseInt(req.params.id);

  if (isNaN(noteId)) {
    return res.status(400).send("Note not found");
  }

  const note = await prisma.note.delete({
    where: {
      id: noteId,
    },
  });

  res.json(note);
};

// Update a note
export const updateNote = async (req: Request, res: Response) => {
  const noteId = parseInt(req.params.id);

  if (isNaN(noteId)) {
    return res.status(400).send("Note not found");
  }

  const updatedNote = await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      content: req.body.content,
    },
  });

  res.json(updatedNote);
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).send("User not found");
  }

  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  res.json(deletedUser);
};
