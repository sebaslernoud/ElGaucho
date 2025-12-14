import { Request, Response } from 'express';
import prisma from '../config/prisma';

// 1. Obtener todos los speakers (GET /api/speakers)
export const getAllSpeakers = async (req: Request, res: Response) => {
  try {
    const speakers = await prisma.speaker.findMany({});
    res.status(200).json(speakers);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching speakers', error: error.message });
  }
};

// 2. Obtener un speaker por ID (GET /api/speakers/:id)
export const getSpeakerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const speaker = await prisma.speaker.findUnique({ where: { id } });
    if (!speaker) return res.status(404).json({ message: 'Speaker not found' });
    res.status(200).json(speaker);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching speaker', error: error.message });
  }
};

// 3. Crear un nuevo speaker (POST /api/speakers)
export const createSpeaker = async (req: Request, res: Response) => {
  const { speakerName, bio, expertise } = req.body;

  if (!speakerName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newSpeaker = await prisma.speaker.create({
      data: {
        speakerName,
        bio,
        expertise,
      },
    });
    res.status(201).json(newSpeaker);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating speaker', error: error.message });
  }
};

// 4. Actualizar un speaker por ID (PUT /api/speakers/:id)
export const updateSpeaker = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { speakerName, bio, expertise } = req.body;

  try {
    const updatedSpeaker = await prisma.speaker.update({
      where: { id },
      data: {
        speakerName,
        bio,
        expertise,
      },
    });
    res.status(200).json(updatedSpeaker);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Speaker not found' });
    res.status(500).json({ message: 'Error updating speaker', error: error.message });
  }
};

// 5. Eliminar un speaker por ID (DELETE /api/speakers/:id)
export const deleteSpeaker = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.speaker.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Speaker not found' });
    res.status(500).json({ message: 'Error deleting speaker', error: error.message });
  }
};
