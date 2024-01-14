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

  const user = await prisma.note.create({
    data: {
      title: title,
      content: content,
      userId:1
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
