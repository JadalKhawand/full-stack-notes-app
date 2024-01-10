import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export const test = (req: Request, res: Response) => {
  res.status(200).send('OK');
};

export const createNote = async (req: Request, res: Response) => {
  const { name, title, content } = req.body

    const user = await prisma.note.create({
        data: {
            name: name,
            title: title,
            content: content
        },
    })
    console.log(user)
    res.json(user)
};


export const getNotes = async (req: Request, res: Response) => {
  
    const notes = await prisma.note.findMany({})
    res.json(notes)
};

export const getNote = async (req: Request, res: Response) => {
  
  const user_id = parseInt(req.params.id)
  const notes = await prisma.note.findUnique(
    {where: {
      id: user_id
    }}
  )
  if (isNaN(user_id)) return res.status(400).send('user not found')
  res.json(notes)
};


