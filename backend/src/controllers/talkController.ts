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
    const talk = await prisma.talk.findUnique({
      where: { id },
      include: {
        speaker: true, // <--- ESTO ES LA CLAVE: Trae la info de la tabla Speaker
      },
    });

    if (!talk) {
      return res.status(404).json({ message: 'Talk not found' });
    }
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
    // 1. Crear la charla
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

    // --- BLOQUE DE NOTIFICACIONES ---
    try {
      // 2. Obtener datos extra para el mensaje (Nombre del Orador)
      const speaker = await prisma.speaker.findUnique({
        where: { id: speakerId },
        select: { speakerName: true }
      });
      const speakerName = speaker?.speakerName || 'Orador invitado';

      // 3. Buscar a todos los usuarios inscritos en el curso
      // Se puede filtrar por status: 'accepted' si solo quieres notificar a los aceptados
      const enrolledUsers = await prisma.userCourse.findMany({
        where: { courseId: courseId },
        select: { userId: true }
      });

      if (enrolledUsers.length > 0) {
        // Formatear la fecha para que sea legible en el mensaje
        const dateObj = new Date(startTime);
        const datePart = dateObj.toLocaleDateString(); // Ej: 12/10/2025
        const timePart = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Ej: 14:30

        const notificationsData = enrolledUsers.map((user) => ({
          userId: user.userId,
          type: 'NEW_TALK',
          title: title, 
          message: `Orador: ${speakerName}\nFecha: ${datePart}\nHora: ${timePart}\nSala: ${room}`,
          relatedCourseId: courseId,
          relatedTalkId: newTalk.id,
          isRead: false
        }));

        await prisma.notification.createMany({
          data: notificationsData
        });
      }

    } catch (notifyError) {
      // Si falla la notificación, no queremos que falle la creación de la charla, solo lo logueamos.
      console.error('Error enviando notificaciones de nueva charla:', notifyError);
    }
    // --------------------------------

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