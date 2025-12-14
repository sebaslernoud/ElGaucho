import { Request, Response } from 'express';
import prisma from '../config/prisma';

// 1. Obtener todos los talks (GET /api/talks)
export const getAllTalks = async (req: Request, res: Response) => {
  try {
    const talks = await prisma.talk.findMany({});
    res.status(200).json(talks);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching talks', error: error.message });
  }
};

// 2. Obtener un talk por ID (GET /api/talks/:id)
export const getTalkById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const talk = await prisma.talk.findUnique({ where: { id } });
    if (!talk) return res.status(404).json({ message: 'Talk not found' });
    res.status(200).json(talk);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching talk', error: error.message });
  }
};

// 3. Crear un nuevo talk (POST /api/talks)
export const createTalk = async (req: Request, res: Response) => {
  const { courseId, title, description, startTime, endTime, room, status, speakerId } = req.body;

  if (!title || !description || !startTime || !endTime || !room || !speakerId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newTalk = await prisma.talk.create({
      data: {
        courseId,
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        room,
        status,
        speakerId,
      },
    });
    res.status(201).json(newTalk);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating talk', error: error.message });
  }
};

// 4. Actualizar un talk por ID (PUT /api/talks/:id)
export const updateTalk = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, startTime, endTime, room, speakerId, status, maxAttendees, qrCodeUrl } = req.body;

  try {
    const updatedTalk = await prisma.talk.update({
      where: { id },
      data: {
        title,
        description,
        startTime,
        endTime,
        room,
        speakerId,
        status,
      },
    });
    res.status(200).json(updatedTalk);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Talk not found' });
    res.status(500).json({ message: 'Error updating talk', error: error.message });
  }
};

// 5. Eliminar un talk por ID (DELETE /api/talks/:id)
export const deleteTalk = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.talk.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Talk not found' });
    res.status(500).json({ message: 'Error deleting talk', error: error.message });
  }
};